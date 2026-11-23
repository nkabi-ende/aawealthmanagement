import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import AgentInterestForm from "@/components/AgentInterestForm";
import { ArrowRight, BriefcaseBusiness, ClipboardCheck, Handshake, ShieldCheck, UsersRound } from "lucide-react";

export const Route = createFileRoute("/for-agents")({
  head: () => ({
    meta: [
      { title: "For Agents | Insurance Field Sales Opportunities — AA Wealth" },
      {
        name: "description",
        content:
          "Explore commission-only field sales representative opportunities with AA Wealth Management in Durban and KwaZulu-Natal. FSP 50739.",
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
            <h1>Make a living helping families <em>protect theirs.</em></h1>
            <p className="partner-hero-copy">
              Explore commission-only insurance field sales opportunities with a Durban-based
              brokerage. Real conversations, community connections and work that matters.
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
