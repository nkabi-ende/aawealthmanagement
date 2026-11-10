# AA Wealth Zoho website intake

## What is configured in CRM

Production organisation `943284005` (AA Wealth Management), Contacts Standard layout `7649509000000091033`. Existing Customer_Status is retained. Nineteen new fields were created and verified on 11 November 2026. All API names below were read back from CRM:

- Website_Full_Name, Product_Interest, Age_Range, Employment_Status
- Monthly_Budget_Range, Existing_Cover_Details, Preferred_Contact_Method, Preferred_Callback_Time
- Cover_Amount_Range, Family_Cover_Scope, Group_Type, Group_Member_Range
- Enquiry_Goal, Enquiry_Priority, Consent_Version, Latest_Enquiry_ID
- Enquiry_Consent (boolean), Enquiry_Received_At (datetime), Latest_Enquiry_Answers (large text)

Text fields preserve the full website option labels across every branch. Customer_Status is set to Prospect only on a new Contact. Last_Name stores the entered full name (limited to CRM's 80 characters); Website_Full_Name and the enquiry note preserve the complete name. Email is optional and limited to CRM's 100 characters. Age Range is not Date of Birth. Monthly Budget Range is not an actual premium.

## Deployment and authorisation still required

This change is deliberately gated. The live site retains its existing WhatsApp/email flow until BOTH public build variables are configured. The standalone Worker is deployed separately because the current root Wrangler configuration serves static assets only. Do not replace that configuration with a server-rendering deployment.

1. Authorise a dedicated Zoho OAuth application for this organisation using the US domains (`accounts.zoho.com`, `www.zohoapis.com`). Use offline access and narrowly scoped Contacts READ/CREATE, Notes READ/CREATE and ZohoSearch.securesearch.READ. Confirm actual scope names with Zoho's OAuth consent screen. The ChatGPT MCP authorisation is separate and is NOT a website credential.
2. Store ZOHO*CLIENT_ID, ZOHO_CLIENT_SECRET and ZOHO_REFRESH_TOKEN as secrets in the **aawealth-zoho-intake** Cloudflare Worker. Never use VITE* for secrets. Do not paste credentials into chat, source or build logs. Provisioning/consenting to the new OAuth access needs the account owner's approval.
3. Create a Cloudflare Turnstile widget restricted to aawealthmanagement.co.za and www.aawealthmanagement.co.za. Store its secret as TURNSTILE_SECRET on the intake Worker.
4. Deploy `workers/zoho-intake/wrangler.jsonc`; this creates a SQLite Durable Object namespace. It defaults to ENABLED=false. Confirm plan availability and cost before enabling any paid feature. Set optional ZOHO_OWNER_ID to the intended active adviser ID; otherwise Zoho assigns the authorised integration user.
5. Enable Worker with ENABLED=true after verifying credentials, routes and storage. Configure its exact deployed HTTPS `/api/intake` URL as the site's public VITE_ZOHO_INTAKE_URL. Set public VITE_TURNSTILE_SITE_KEY. Rebuild/redeploy the site.
6. Test the complete live flow and inspect the resulting Contact and Note in Zoho. Do not claim live completion based on mocked tests. Test a no-email enquiry, a repeat, every product branch, consent rejection, failed delivery/retry, and spam rejection. Use labelled test records and prevent unwanted outbound CRM automations during testing.

## Runtime behaviour

Submission → server validation → Turnstile → durable inbox → receipt reference → Zoho Contact lookup/create → dated enquiry Note. The browser says received only after durable storage confirms it. It does not claim immediate Zoho delivery. A 202 response means queued.

Inbox objects are partitioned by SHA-256 of normalised SA mobile number. Within an object jobs are processed serially. The same enquiry reference and payload is idempotent; changed answers require a new reference. At most five new enquiries per phone per day are accepted. Limits are supplementary to Turnstile, not a substitute for account-level abuse monitoring.

Zoho search can return approximate matches; phone/email results are compared exactly after normalisation. Multiple matching Contacts are held for operator review, never silently merged. Existing Contact names, emails, customer status and adviser ownership are not overwritten by a public submission; repeat answers are stored in a new Note. New Contacts also have the structured intake snapshot. Representatives should read the latest dated Note for repeat enquiries.

Delivery retries every five minutes, up to 12 attempts, then stays in review. Worker logs identify references needing attention without logging answers, phone, email, tokens or upstream error bodies. Configure an operator alert on `Zoho intake needs operator review` and a monitored operational owner before enabling. Review entries must be recovered by an authorised operator from Durable Object storage; an operator UI is not part of this change. No submitted enquiry should be silently discarded.

Successful jobs and their temporary data are purged 30 days after sync. Review jobs remain until handled under the business's retention process. This temporary storage policy is disclosed in the form. Zoho's own retention policy must be set independently. No unrelated marketing permission is inferred. No Deal or invoice is automatically created by this intake change.

A timeout after a Zoho write can produce uncertain delivery. Retrying rechecks exact Contacts and enquiry Note titles before writing again. Zoho search consistency means absolute exactly-once creation cannot be guaranteed across service failures; reconcile duplicates using the enquiry reference. Do not advertise guaranteed exactly-once CRM delivery.

## Validation

- `node --experimental-strip-types --test tests/zoho-intake.test.ts`
- `node --experimental-transform-types --test tests/zoho-inbox.test.ts`
- `bun test tests/intake.test.ts`
- `bun run build`

Official references: https://www.zoho.com/crm/developer/docs/api/v8/auth-request.html ; https://www.zoho.com/crm/developer/docs/api/v8/search-records.html ; https://www.zoho.com/crm/developer/docs/api/v8/create-notes.html ; https://developers.cloudflare.com/durable-objects/api/alarms/
