import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import AgentInterestForm from "@/components/AgentInterestForm";
import { ArrowRight, BriefcaseBusiness, ClipboardCheck, Handshake, ShieldCheck, UsersRound } from "lucide-react";

export const Route = createFileRoute("/for-agents")({
  head: () => ({
    meta: [
      { title: "Funeral & Life Insurance Sales Agent Jobs Durban | AA Wealth" },
      {
        name: "description",
        content:
          "Explore commission-only funeral and life insurance sales agent jobs and field sales representative opportunities in Durban, KZN with AA Wealth. No guaranteed salary.",
      },
      { property: "og:title", content: "Funeral & Life Insurance Sales Agent Jobs Durban | AA Wealth" },
      {
        property: "og:description",
        content: "Funeral cover and life insurance field sales representative opportunities in Durban and KZN. Commission only, subject to suitability and onboarding.",
      },
      { property: "og:url", content: "https://aawealthmanagement.co.za/for-agents" },
      { name: "twitter:title", content: "Funeral & Life Insurance Field Sales Roles | AA Wealth" },
      {
        name: "twitter:description",
        content: "Explore funeral and life insurance sales agent opportunities in Durban and KZN. Commission-only field roles.",
      },
    ],
    links: [{ rel: "canonical", href: "https://aawealthmanagement.co.za/for-agents" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "Funeral and Life Insurance Field Sales Agent Opportunities in Durban",
              url: "https://aawealthmanagement.co.za/for-agents",
              description:
                "Commission-only field sales representative opportunities with AA Wealth Management in Durban and KwaZulu-Natal.",
              isPartOf: { "@type": "WebSite", name: "AA Wealth Management", url: "https://aawealthmanagement.co.za" },
            },
            {
              "@type": "Organization",
              name: "AA Wealth Management",
              url: "https://aawealthmanagement.co.za",
              description: "Licensed long-term insurance brokerage, FSP 50739, based in Durban, South Africa.",
            },
          ],
        }),
      },
    ],
  }),
  component: ForAgents,
});

const responsibilities = [
  {
    number: "01",
    title: "Start the conversation",
    detail: "Introduce AA Wealth and the types of family protection we help customers explore.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Understand the customer",
    detail: "Identify interest and basic protection needs without making promises about cover or claims.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Support the process",
    detail: "Help customers connect with authorised advisors and complete the appropriate next steps.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Represent the brand well",
    detail: "Work professionally, respect customer information and follow applicable sales and compliance processes.",
    icon: ShieldCheck,
  },
];

function ForAgents() {
  return (
    <SiteLayout>
      <section className="partner-hero partner-hero--agents">
        <div className="wrap partner-hero-grid">
          <div>
            <p className="partner-hero-eyebrow"><span /> FIELD OPPORTUNITIES · KZN</p>
            <h1>Funeral & life insurance sales <em>agent opportunities.</em></h1>
            <p className="partner-hero-copy">
              Looking for funeral insurance sales agent jobs or life insurance field sales work in Durban?
              Explore AA Wealth’s commission-only representative opportunities across KwaZulu-Natal.
              Real conversations, community connections and work that matters.
            </p>
            <div className="partner-actions">
              <a className="btn btn-gold" href="#agent-enquiry">
                Express your interest <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="partner-text-link" href="#agent-role">See what the role involves</a>
            </div>
          </div>
          <aside className="partner-hero-panel" aria-label="Opportunity overview">
            <div className="partner-panel-top">
              <BriefcaseBusiness size={26} strokeWidth={1.6} aria-hidden="true" />
              <span>AA / PEOPLE & DISTRIBUTION</span>
            </div>
            <p className="partner-panel-label">The opportunity</p>
            <h2>On the ground.<br />In your community.</h2>
            <div className="partner-panel-facts">
              <div><span>MODEL</span><strong>Commission only</strong></div>
              <div><span>FOCUS</span><strong>Field sales · Insurance</strong></div>
              <div><span>BASE</span><strong>Durban & KwaZulu-Natal</strong></div>
            </div>
            <p className="partner-panel-footnote">
              Earnings are not guaranteed. Appointment and activities are subject to selection,
              agreed terms and applicable regulatory requirements.
            </p>
          </aside>
        </div>
      </section>

      <section className="sec white" id="agent-role">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow">The role, clearly explained</p>
              <h2>What our field representatives do.</h2>
            </div>
            <p>
              We want people who can build trust, explain the next step clearly and connect
              customers with the right support.
            </p>
          </div>
          <div className="partner-feature-grid">
            {responsibilities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="partner-feature" key={item.number}>
                  <div className="partner-feature-top">
                    <span>{item.number}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap partner-split">
          <div>
            <p className="eyebrow">Who should enquire?</p>
            <h2>People first.<br />Experience helps.</h2>
            <p className="partner-body-copy">
              Whether you have sales experience or are looking to enter the field, we welcome
              enquiries from motivated people who are comfortable engaging their communities.
            </p>
          </div>
          <div className="partner-requirements">
            <p><span>01</span> Comfortable speaking to customers face-to-face</p>
            <p><span>02</span> Dependable, organised and willing to follow a process</p>
            <p><span>03</span> Able to treat personal customer information responsibly</p>
            <p><span>04</span> Willing to complete relevant screening and onboarding steps</p>
            <small>
              Candidates must meet the applicable fit-and-proper, appointment, supervision and
              product-training requirements for their duties. Enquiring does not constitute an appointment.
            </small>
          </div>
        </div>
      </section>

      <section className="sec navy">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow" style={{ color: "var(--gold-l)" }}>Your next steps</p>
              <h2>Three steps to start the conversation.</h2>
            </div>
          </div>
          <div className="partner-process">
            <div><span>01 / ENQUIRE</span><h3>Introduce yourself</h3><p>Tell us your area and relevant sales experience.</p></div>
            <div><span>02 / DISCUSS</span><h3>Understand the role</h3><p>We can talk through the opportunity, commission-only structure and expectations.</p></div>
            <div><span>03 / ASSESS</span><h3>Explore suitability</h3><p>Any next steps depend on role suitability and required compliance checks.</p></div>
          </div>
        </div>
      </section>

      <section className="sec white agent-search-section" aria-labelledby="agent-search-heading">
        <div className="wrap agent-search-grid">
          <div>
            <p className="eyebrow">Insurance sales careers / Durban & KZN</p>
            <h2 id="agent-search-heading">Funeral and life insurance sales representative opportunities.</h2>
            <p>
              If you're searching for <strong>funeral cover sales jobs in Durban</strong>,
              a <strong>life insurance sales agent role</strong>, or
              <strong> commission-only field sales representative work in KwaZulu-Natal</strong>,
              this is the starting point for a conversation with AA Wealth Management.
            </p>
            <p>
              Our representative enquiries are focused on customer outreach, community engagement
              and helping prospects reach authorised advisors. Opportunities may suit people with
              experience in insurance sales, field marketing, direct sales or client-facing work.
              The commission structure and selection process are explained before any agreement.
            </p>
          </div>
          <div className="agent-search-details">
            <div><span>ROLE</span><strong>Field insurance sales representative</strong></div>
            <div><span>PRODUCT FOCUS</span><strong>Funeral cover & life insurance</strong></div>
            <div><span>LOCATION</span><strong>Durban, KwaZulu-Natal</strong></div>
            <div><span>REMUNERATION</span><strong>Commission only; no guaranteed salary</strong></div>
            <div><span>NEXT STEP</span><strong>Register your interest for screening</strong></div>
            <a href="#agent-enquiry">Start an agent enquiry <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="sec ivory partner-agent-faq-section" aria-labelledby="agent-faq-heading">
        <div className="wrap partner-faq-grid">
          <div>
            <p className="eyebrow">Before you enquire</p>
            <h2 id="agent-faq-heading">Know the role.<br />Know the process.</h2>
            <p>We want the expectations to be clear before you take the next step.</p>
          </div>
          <div className="partner-faq-items">
            <details>
              <summary>Is this a salaried position?</summary>
              <p>No. These are commission-only field-sales opportunities. There is no guaranteed basic salary or guaranteed monthly income. The terms and eligibility are discussed before any agreement.</p>
            </details>
            <details>
              <summary>Do I need previous insurance sales experience?</summary>
              <p>Relevant sales experience is helpful, but we welcome initial enquiries from people with different customer-facing backgrounds. Appointment and duties depend on suitability, any applicable regulatory requirements and available opportunities.</p>
            </details>
            <details>
              <summary>Does filling in this page mean I am appointed?</summary>
              <p>No. This page prepares an enquiry only. Selection, formal agreements, screening, role induction and any required regulatory or insurer processes happen separately.</p>
            </details>
            <details>
              <summary>Do I need to send an ID or banking documents?</summary>
              <p>Not at this stage. Please do not send identity documents or financial records in the initial WhatsApp or email enquiry. Any later verification should use an agreed secure process.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="sec white" id="agent-enquiry">
        <div className="wrap agent-enquiry-grid">
          <div className="agent-enquiry-copy">
            <p className="eyebrow">For prospective representatives</p>
            <h2>Start with a conversation. <em>Build from there.</em></h2>
            <p>
              Tell us where you're based and what experience you bring. We’ll discuss
              the opportunity, how commission arrangements work and the next recruitment steps.
            </p>
            <div className="agent-enquiry-details">
              <div><span>01</span><strong>Role suitability</strong><p>Understand the responsibilities, field activity and selection requirements.</p></div>
              <div><span>02</span><strong>Commission structure</strong><p>Discuss the agreed commission terms before proceeding. No earnings are guaranteed.</p></div>
              <div><span>03</span><strong>Regulatory onboarding</strong><p>Any appointment and regulated sales duties depend on the applicable FAIS and insurer requirements.</p></div>
            </div>
            <p className="agent-enquiry-contact">
              Prefer to make contact directly? <a href="mailto:hello@aawealthmanagement.co.za">hello@aawealthmanagement.co.za</a>
            </p>
          </div>
          <AgentInterestForm />
        </div>
      </section>
    </SiteLayout>
  );
}
