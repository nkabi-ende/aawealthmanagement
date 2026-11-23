import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import { ArrowRight, Building2, GitBranch, Handshake, Network, Workflow } from "lucide-react";

export const Route = createFileRoute("/for-brokers")({
  head: () => ({
    meta: [
      { title: "For Brokers | Distribution & Digital Partnerships — AA Wealth" },
      {
        name: "description",
        content:
          "Explore distribution collaborations and potential digital workflow partnerships with AA Wealth Management, a Durban-based authorised FSP 50739.",
      },
    ],
  }),
  component: ForBrokers,
});

const brokerWhatsApp =
  "https://wa.me/27765885126?text=Hello%20AA%20Wealth%2C%20I%20would%20like%20to%20discuss%20a%20broker%20partnership.";
const brokerEmail =
  "mailto:hello@aawealthmanagement.co.za?subject=Broker%20Partnership%20Enquiry";

const opportunities = [
  {
    number: "01",
    title: "Distribution collaboration",
    description:
      "Discuss field-based distribution opportunities, including KZN community reach and agreed customer engagement models.",
    icon: Handshake,
  },
  {
    number: "02",
    title: "Introductions & referrals",
    description:
      "Explore mutually suitable lead and referral workflows, with consent, clear accountability and lawful remuneration.",
    icon: GitBranch,
  },
  {
    number: "03",
    title: "Digital enquiry journeys",
    description:
      "Explore website-to-enquiry workflows, structured intake and CRM routing for brokerage distribution operations.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "Future broker technology",
    description:
      "Join an exploratory conversation about branded broker tools and digital policyholder experiences as our software capabilities develop.",
    icon: Network,
  },
];

function ForBrokers() {
  return (
    <SiteLayout>
      <section className="partner-hero partner-hero--brokers">
        <div className="wrap partner-hero-grid">
          <div>
            <p className="partner-hero-eyebrow"><span /> FOR BROKERS & DISTRIBUTION PARTNERS</p>
            <h1>Better distribution starts with <em>better partners.</em></h1>
            <p className="partner-hero-copy">
              AA Wealth is opening conversations with independent brokers, licensed FSPs and
              distribution businesses interested in practical collaboration and digital growth.
            </p>
            <div className="partner-actions">
              <a href="#broker-enquiry" className="btn btn-gold">
                Explore a partnership <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="partner-text-link" href="#broker-scope">Areas to explore</a>
            </div>
          </div>
          <aside className="partner-hero-panel partner-hero-panel--brokers">
            <div className="partner-panel-top">
              <Building2 size={26} strokeWidth={1.6} aria-hidden="true" />
              <span>AA / BROKER RELATIONSHIPS</span>
            </div>
            <p className="partner-panel-label">A partnership approach</p>
            <h2>Distribution.<br />Service.<br />Technology.</h2>
            <div className="partner-panel-facts">
              <div><span>BASED IN</span><strong>Durban, South Africa</strong></div>
              <div><span>FOCUS</span><strong>Long-term insurance</strong></div>
              <div><span>FSP</span><strong>50739</strong></div>
            </div>
            <p className="partner-panel-footnote">
              Collaboration is exploratory and subject to licensing, commercial agreements,
              insurer permissions and appropriate regulatory approvals.
            </p>
          </aside>
        </div>
      </section>

      <section className="sec white" id="broker-scope">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow">Potential collaboration areas</p>
              <h2>Where we could create value together.</h2>
            </div>
            <p>
              We’re interested in sensible partnerships that improve customer access,
              streamline enquiries and make distribution easier to manage.
            </p>
          </div>
          <div className="partner-feature-grid">
            {opportunities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="partner-feature" key={item.number}>
                  <div className="partner-feature-top">
                    <span>{item.number}</span><Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
          <p className="partner-disclaimer">
            These are discussion areas, not a catalogue of contracted or live services. Specific
            services, financial arrangements and operating responsibilities would be agreed separately.
          </p>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap partner-split">
          <div>
            <p className="eyebrow">Beyond the traditional broker model</p>
            <h2>Digital capability is part of the conversation.</h2>
            <p className="partner-body-copy">
              We see opportunities for better prospect journeys, online intake, agent enablement
              and clearer servicing workflows. Our longer-term interest includes broker-facing
              software through AA Software.
            </p>
            <p className="partner-body-copy">
              We’d rather understand your operation first than sell you a system you don’t need.
            </p>
          </div>
          <div className="partner-requirements">
            <p><span>01</span> Lead capture and contact-routing workflows</p>
            <p><span>02</span> Mobile-friendly enquiry and onboarding experiences</p>
            <p><span>03</span> Service handovers and case visibility</p>
            <p><span>04</span> Potential custom or branded digital tooling</p>
            <small>Technology concepts are subject to scoping, delivery arrangements and compliance review.</small>
          </div>
        </div>
      </section>

      <section className="sec navy">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow" style={{ color: "var(--gold-l)" }}>A considered approach</p>
              <h2>Partnerships built around real needs.</h2>
            </div>
          </div>
          <div className="partner-process">
            <div><span>01 / UNDERSTAND</span><h3>Tell us about your business</h3><p>Your licensing, customer base, distribution model and operating challenges.</p></div>
            <div><span>02 / SCOPE</span><h3>Identify the right collaboration</h3><p>Discuss a clearly defined use case, owners, responsibilities and potential value.</p></div>
            <div><span>03 / AGREE</span><h3>Formalise before delivery</h3><p>Confirm permissions, compliance, contracts, remuneration and data safeguards.</p></div>
          </div>
        </div>
      </section>

      <section className="sec white" id="broker-enquiry">
        <div className="wrap">
          <div className="partner-cta-band">
            <p className="eyebrow">For licensed brokers & prospective partners</p>
            <h2>Let’s find the right way to work together.</h2>
            <p>
              Introduce your firm, FSP number (where applicable), and what you want to explore.
              We’ll start with a practical conversation.
            </p>
            <div className="partner-actions">
              <a href={brokerEmail} className="btn btn-gold">
                Email our team <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href={brokerWhatsApp} className="btn btn-ghost on-dark">WhatsApp partnership enquiry</a>
            </div>
            <small>AA Wealth Management · FSP 50739 · Scope subject to regulatory and contractual review</small>
          </div>
          <p className="partner-compliance-note">
            AA Wealth does not represent that it offers insurer-delegated binder functions,
            claims adjudication, third-party policy administration or a commercial white-label
            platform. Any such future service would require the applicable authority and agreement.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
