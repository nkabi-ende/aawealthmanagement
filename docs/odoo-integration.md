# AA Wealth: guided intake and Odoo activation

Status: guided intake implemented; standalone server-side adapter prepared and mock-tested. No CRM connection, online intake endpoint, database, agent assignments, API keys or live quote engine has been configured. The published site still prepares a WhatsApp/email enquiry and never claims online delivery.

## Is Odoo sufficient?

Yes for a brokerage's CRM and sales operations: contacts, opportunities, teams, assignment rules, activities, pipeline reporting and configurable follow-up. It is not automatically an insurer quotation engine, underwriting service, policy administration platform, commission reconciliation system or a complete regulated-advice record workflow. Those require insurer connections and/or additional configuration or modules.

For an existing custom website calling Odoo Online, external API access requires the Custom pricing plan. Verify the actual instance version, plan, access rights and available methods before choosing API implementation. Odoo 19 introduced JSON-2; the prepared adapter targets this API. Older versions need another adapter. No paid plan has been purchased.

Official references (checked 18 October 2026):
- https://www.odoo.com/documentation/19.0/developer/reference/external_api.html
- https://www.odoo.com/documentation/19.0/applications/sales/crm/track_leads/lead_scoring.html
- https://www.odoo.com/documentation/19.0/applications/sales/crm/optimize/utilize_activities.html
- https://www.odoo.com/documentation/19.0/applications/sales/crm/performance/win_loss.html

## What has been built

- Four-step adaptive form: cover → product-specific needs → contact and callback preferences → editable review and enquiry consent.
- Budgets are preferences, not premiums. No birth dates, IDs, medical history or documents are requested.
- State is held in page memory, not local storage, URL parameters or analytics. Leaving/reloading loses the draft. Only the cover category may be present in a link.
- Product-specific fields are allowlisted; stale answers are excluded from the handoff.
- `integrations/odoo.ts` is a server-side building block, not a deployed HTTP endpoint. It validates intake, escapes HTML, maps to `crm.lead` opportunities, and uses JSON-2 bearer authentication, a timeout and no redirects. No client bundle imports it.
- Routing IDs come from trusted server configuration. An unassigned opportunity goes to the configured team if no user is provided.
- Tests use fake fetch responses, not a real Odoo instance.

## Proposed CRM setup

Stages: New enquiry → Contact attempted → Needs assessed → Quotes requested → Quote presented → Application submitted → Policy issued / Lost.

Configure cover categories and sales teams before enabling routing. Set a first-contact activity for each accepted lead and a manager view of overdue follow-ups. Decide rules for cover type, province, language (only if later collected) and agent availability. Agree business-hour response targets rather than publishing an unverified response promise.

## Field mapping

| Intake value | Odoo target |
|---|---|
| Reference + cover + name | crm.lead.name |
| Name | contact_name |
| Normalised mobile | phone |
| Optional email | email_from |
| Needs, budget, province, callback preference/time | escaped description initially |
| Enquiry consent version and received timestamp | description initially |
| Sales team / assigned user | team_id / user_id from server configuration |
| Opportunity | type = opportunity |

For reporting, add dedicated Studio/custom fields for cover, budget, province, consent version/time, reference and source. The initial standard-field adapter avoids assuming those fields exist. Confirm FSP/product permissions and commission/disclosure workflows separately.

## Activation dependencies and remaining implementation

1. Obtain the Odoo URL, hosting model, version, database identifier (if needed), CRM installation and API-compatible plan. Provision a dedicated least-privilege integration user; set its API key in server secrets, never in chat, Git or VITE_* variables.
2. Configure teams, stages, ownership, access controls and activity automation. Confirm the business's contact details, privacy notice, retention policy and authorized products.
3. Deploy a same-origin intake endpoint behind validation, origin checks and bot/rate protection. Generate a server reference and persist the accepted lead/outbox before acknowledging receipt. The static Sites preview cannot execute the adapter.
4. Implement idempotent intake and a durable delivery worker: unique submission keys, delivery status, safe retries, reconciliation after ambiguous Odoo timeouts and administrator alerts. The adapter itself does not provide this. Never blindly retry create calls because the initial call may have succeeded.
5. Route the saved submission using configured team/user IDs; create a follow-up activity or an Odoo automation. Save the confirmed Odoo ID. Implement restricted operator retry/status tools without publicly exposing enquiry data.
6. Show online success only after durable acceptance, with a reference and accurate pending/delivered language. Keep WhatsApp as an optional support route. The current deployed frontend does not yet offer online submission.
7. Run a consented synthetic lead end to end: normal submission, double-click/retry, invalid consent, spam, Odoo timeout, denied permissions, agent reassignment and activity follow-up. Remove test records deliberately afterward.

Estimated implementation effort after access: roughly 3–5 working days for a reliable initial intake-to-CRM path with configuration, failure handling and acceptance testing. This is a planning estimate, not a fixed delivery promise. Insurer pricing integrations, migration, custom compliance records and messaging-provider approvals are separate work.

## Quotation boundary

The intake supports an advisor-generated quote. Displaying a binding or personalized premium online needs authorized insurer rating APIs or insurer-approved quote systems. Odoo can coordinate that workflow but does not supply the insurance rates by itself.
