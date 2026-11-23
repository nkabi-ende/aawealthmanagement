# AA Wealth — broker services and agent recruitment implementation playbook

## Purpose and current delivery status

This document accompanies the **For Brokers** and **For Agents** landing pages. Both pages use AA Wealth's existing brand tokens, typography and responsive shell. Their first release intentionally uses a **user-initiated WhatsApp / email handoff** instead of a new backend. This provides a useful lead qualification experience without implying that an enquiry is already recorded in Zoho.

**Important:** The retail protection-review intake in \`src/components/LeadForm.tsx\` sends product-specific prospect data to \`aawealth-zoho-intake\` only when deployment variables, Turnstile and the standalone Worker are properly configured. Its schema, CRM assumptions and consent text are not appropriate for broker-service leads or applicants. Do not recycle that endpoint for these professional enquiries.

## Broker service catalogue

### Digital Foundation — implementation-led

- Professional responsive brokerage website or rebuild.
- SEO structure, mobile optimisation, local discoverability and Google Business Profile assistance.
- Forms, WhatsApp handoff and clear lead attribution entry points.
- Core analytics, OpenGraph and conversion-event configuration where approved.

**Ideal client:** newly established brokerage, incumbent with an outdated online presence or a team still collecting enquiries through personal inboxes.

**Commercial shape:** one-time discovery/build/launch quote, with optional maintenance and hosting support. Domain, hosting, third-party licences and content production should be itemised.

### Growth Engine — acquisition + conversion

- Social media planning, paid campaign execution, landing pages and creative production.
- CRM setup and integration, pipeline stages, deduplication, qualification and routing.
- Response-time and lost-lead audits, attribution, regular optimisation.
- Performance reporting connected to the actual enquiry and sales workflow.

**Ideal client:** brokerage with predictable campaign spend but poor follow-up, inconsistent handovers or weak visibility into outcomes.

**Commercial shape:** defined setup and ongoing monthly management. Advertising budget and CRM seats are distinct pass-through costs, not silently included. No guaranteed CPL, policies sold or sales uplift.

### Broker Operations — enablement + service

- Agent onboarding and field-sales process materials.
- CRM task queues, reminders, basic activity reporting and review cadences.
- Client communication templates, servicing requests and coverage review reminders.
- Manager dashboards, sales coaching routines and operating SOPs.

**Ideal client:** teams managing multiple representatives, field territories, channels or brokers.

**Commercial shape:** discovery and scoped implementation with optional ongoing support. **Agent enablement is not accredited FAIS regulatory training or CPD certification.** Compliance oversight remains with the authorised FSP.

### AA Software — separately scoped custom technology

- Broker/agent portals, internal dashboards, workflow automations and API integrations.
- Custom reporting, process orchestration, authentication and permission models.
- Future white-label policy administration/claims workflows **only after** independent scope, permissions, insurer agreements and regulatory assessment.

Do not publicly market a policy administration SaaS, binder services, delegated claims authority or insurer underwriting as currently operational until approved and evidenced.

## Professional enquiry forms

### Broker page
Fields:
- Contact name (optional).
- Brokerage/business name (optional).
- Team size (optional).
- Current CRM maturity (optional).
- Preferred service package (optional, selected by the user).
- Multiple service priorities (optional).
- Main operational challenge (optional, max 280 characters).

The page generates a URL-encoded, structured message. Opening WhatsApp or email requires a user click. Neither message builder writes to AA Wealth's server or CRM. Anything typed remains transient in the browser's React state. Do not say **submitted**, **saved** or **received** on this step.

### Agent page
Fields:
- Applicant name and area (required to enable the message links).
- Prior sales experience and availability (optional).
- Positive acknowledgement of the commission-only nature and absence of guaranteed earnings (required to enable the message links).

No ID number, passport, banking information, medical conditions or background-check files are requested. Do not suggest that the online enquiry constitutes appointment, accreditation or employment.

The message includes role interest, area, experience, availability and commission-only acknowledgement. The CTA is explicit that the user must **send** the message in the chosen messaging app.

## Proposed Zoho CRM structure for a later, separately authorised integration

Avoid mixing these records into the existing retail prospect Contact flow.

**B2B pipeline (new Leads or appropriate custom module; confirm Zoho plan and licensing):**
- Record type: Broker Services.
- Contact name; business name; verified contact method; optional FSP number.
- Source (For Brokers page); timestamp; campaign UTMs (non-sensitive).
- Team size; CRM maturity; preferred package; service priorities; business challenge.
- Enquiry consent with version/time; assigned owner; last activity; next action.
- Stage: New → Contact Attempted → Discovery Booked → Qualified → Proposal Sent → Negotiating → Won / Lost.
- Distinct marketing and delivery budgets where provided, without invented quotes.
- Post-win customer account, service engagement/project and recurring service agreement as appropriate.

**Agent recruiting pipeline (separate module/view):**
- Name; area; source; availability; experience; consent/acknowledgement; assigned recruiter.
- Stage: New → Screening → Interview → Compliance Review → Offer/Agreement → Onboarding → Active / Not Proceeding.
- Fit-and-proper and onboarding checks **must** be handled via appropriate secure channels, not public landing-page forms.
- Do not misclassify job applicants as retail insurance buyers.

**Integration architecture (future work):**
- Dedicated B2B endpoint and separate validation schema with consent versioning.
- Turnstile, payload size limits, narrow CORS, rate limiting, idempotency, secure secret storage and safe logs.
- Queue and retry behavior with observable failure states and operator recovery.
- CRM lookup, duplicate handling, ownership and least-privilege tokens.
- POPIA privacy disclosure, retention policy, DSAR process, purpose limitation and third-party disclosures.
- Explicit review of direct marketing and advice/representative-supervision restrictions.

**No B2B CRM write is implemented by this PR.** Before enabling auto-submission, confirm who owns the records, which Zoho module to use and who will receive alerts.

## Suggested sales discovery

A 15–30 minute diagnostic meeting should gather:
1. Core products and distribution channels.
2. How enquiries arrive today (website, field sales, social, partners).
3. Team size, territories, representative status and lead handover.
4. Current CRM/policy admin stack and significant integration constraints.
5. Average response time, known drop-off and what leadership measures.
6. Existing online presence, assets, campaign spend and content approval.
7. A ranked shortlist of the three biggest operational constraints.

Only after discovery, create a written scope with milestones, acceptance criteria, client-provided assets, ownership, data processing obligations, support terms and exclusions.

## Compliance and delivery boundaries

- AA Wealth FSP 50739 must distinguish brokerage activities from third-party software/marketing services.
- No recommendation should be presented as guaranteed commercial performance.
- Any insurer brand, product material or regulated advice content needs the relevant approvals.
- Representatives' regulated activities, fitness/propriety and supervision remain subject to applicable requirements.
- Avoid passing consumer personal information to external campaign systems without suitable authority and lawful basis.
- Third-party subscriptions, ad spend and data hosting must be specified before contracting.

## Page release checklist

- [ ] Check both routes on desktop, tablet and mobile; confirm no horizontal scrolling or overlapping navigation.
- [ ] Verify one-click package selection and the selected state in the enquiry component.
- [ ] Verify all checked priorities, team size, CRM and challenge text survive in the external message.
- [ ] Verify carriage-return/newline inputs cannot inject mail subject headers.
- [ ] Confirm commission-only acknowledgement gates the agent enquiry links.
- [ ] Confirm neither page claims an online CRM submission.
- [ ] Confirm consumer free-review CTA does not appear on the professional pages.
- [ ] Validate Netlify deploy-preview build and navigation, including footer and site map.
- [ ] Review all service claims with AA Wealth's principal; confirm what can be delivered today.
- [ ] Merge after content sign-off; add a separate B2B CRM integration issue/PR only once access and requirements are confirmed.
