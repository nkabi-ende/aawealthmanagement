# AA Wealth website optimisation — 18 October 2026

## Benchmark findings

Traffic is estimated, domain-wide traffic; it includes existing customers and unrelated products. It does not establish life-insurance sales conversion, broker market share or the best-performing user flow. No conversion-rate claims were verified.

Semrush's September 2026 South African insurance table reports:

| Domain | Estimated visits | Mobile share | Role in this review |
|---|---:|---:|---|
| discovery.co.za | 1.74m | 76.21% | Insurer; direct quote entry |
| oldmutual.co.za | 1.41m | 85.48% | Insurer; needs-led cover explanations |
| momentum.co.za | 605.03k | See source | Insurer; product-specific quote actions |
| hippo.co.za | 101.72k | 76.31% | Comparison intermediary; staged quote journey |

Source: https://www.semrush.com/trending-websites/za/insurance (retrieved 18 October 2026). These are distinct business models, not a ranking of brokers.

- Hippo: clear primary action, explicit sequence from questions to comparisons and representative contact. https://www.hippo.co.za/life-insurance-quote/
- PSG: established advice-led brokerage benchmark; adviser finder and local offices make the human next step clear. Reliable comparable traffic/conversion figures were not obtained. https://www.psg.co.za/ and https://advisers.psg.co.za/find-adviser
- Discovery: direct entry to a life quote and alternative contact routes. https://www.discovery.co.za/life-insurance/get-a-quote/
- Momentum: separates life benefits and gives product-specific online quote actions. https://www.momentum.co.za/momentum/personal/life-insurance
- Old Mutual: describes life cover with optional disability and critical illness benefits and consultant contact. https://www.oldmutual.co.za/personal/solutions/life-and-disability/life-insurance/

## Implemented

Preserved navy/gold/green branding and existing routes. Added goal-based home entry, a three-step explanation, an inline review form, focused FAQs, mobile action bar, keyboard skip link and reduced-motion support. Cover cards retain selection through contact URLs. Updated social metadata. Removed unverified testimonials, generic payout deadlines and unsubstantiated starting premiums.

The old form merely set a local success state. The new form validates inputs, prepares a reviewable message, then hands off to the existing repository's WhatsApp number (+27 76 588 5126), with an email-app alternative using the repository's existing hello@aawealth.co.za. It never claims delivery. The visitor must press Send in their chosen app. There is no CRM, inbox API or lead database integration. No enquiry was sent during validation.

FSP number, contact details, service scope and business hours were retained from the source repository; they were not independently reverified. Before running paid campaigns, the business should verify these details and current product documentation. Existing policy terms control benefits and eligibility.

## Measurement next step

Connect the business's analytics and measure goal selection → enquiry prepared → WhatsApp opened → advisor contact → policy issued. Opening WhatsApp is not a confirmed lead or sale. Do not put names, phone numbers or message contents into analytics events. No analytics identifiers or CRM credentials were available in this task.

## Validation

TypeScript check and production build; static export checks cover all five routes and local asset references. Interactive browser QA was unavailable in this environment, so responsive and handoff behaviour still needs a real-device smoke check. The preview is a separately deployed copy; changing GitHub does not automatically update it.
