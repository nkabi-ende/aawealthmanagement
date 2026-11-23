import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import {
  buildBrokerEnquiryMessage,
  emailEnquiryUrl,
  whatsappEnquiryUrl,
} from "@/lib/b2b-enquiry";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ClipboardList,
  Code2,
  Globe2,
  Handshake,
  Megaphone,
  MessageCircle,
  Network,
  RefreshCw,
  Route as RouteIcon,
  SearchCheck,
  Settings2,
  UsersRound,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/for-brokers")({
  head: () => ({
    meta: [
      { title: "For Brokers | Websites, CRM & Growth Services — AA Wealth" },
      {
        name: "description",
        content:
          "Website development, CRM setup, social media marketing, lead management, lead optimisation and agent enablement for South African insurance brokers. Discuss broker services with AA Wealth Management, FSP 50739.",
      },
      { property: "og:title", content: "AA Wealth | Websites, CRM & Growth for Insurance Brokers" },
      {
        property: "og:description",
        content: "Brokerage websites, lead management, CRM integration, digital campaigns and sales-team enablement. Scope the right service package for your insurance business.",
      },
      { property: "og:url", content: "https://aawealthmanagement.co.za/for-brokers" },
      { name: "twitter:title", content: "AA Wealth | Growth Services for Brokers" },
      {
        name: "twitter:description",
        content: "Websites, marketing, CRM, lead routing and agent enablement for South African insurance brokers.",
      },
    ],
  }),
  component: ForBrokers,
});

const services = [
  {
    number: "01",
    category: "DIGITAL PRESENCE",
    title: "Websites & quote journeys",
    description:
      "Professional brokerage websites that build trust and turn visits into relevant enquiries.",
    includes: ["Mobile-first web design", "Quote and enquiry funnels", "SEO & Google Business Profile", "Hosting and maintenance options"],
    icon: Globe2,
  },
  {
    number: "02",
    category: "SYSTEMS & OPERATIONS",
    title: "CRM setup & integration",
    description:
      "Put prospects, follow-ups and servicing activities into an organised brokerage workflow.",
    includes: ["Zoho or suitable CRM setup", "Custom pipelines & permissions", "Website-to-CRM forms", "Data migration & integration scoping"],
    icon: Settings2,
  },
  {
    number: "03",
    category: "AUDIENCE & ACQUISITION",
    title: "Social media & digital marketing",
    description:
      "Build visibility with purposeful content and campaigns aligned with your audience.",
    includes: ["Meta, Google & TikTok campaigns", "Social content and creative assets", "Landing pages & campaign tracking", "Organic presence and local search"],
    icon: Megaphone,
  },
  {
    number: "04",
    category: "LEAD OPERATIONS",
    title: "Lead management & routing",
    description:
      "Know where each enquiry came from, who owns it and what needs to happen next.",
    includes: ["Multi-channel lead capture", "Deduplication & qualification", "Agent assignment rules", "Follow-up queues & reminders"],
    icon: RouteIcon,
  },
  {
    number: "05",
    category: "CONVERSION",
    title: "Lead optimisation",
    description:
      "Find the friction between a new enquiry, a conversation and a submitted application.",
    includes: ["Funnel and landing-page audits", "Lead-quality & source reporting", "Response-time review", "Conversion experiments & coaching insights"],
    icon: SearchCheck,
  },
  {
    number: "06",
    category: "TEAM ENABLEMENT",
    title: "Agent onboarding & training",
    description:
      "Give sales teams a repeatable process, consistent messaging and clearer performance visibility.",
    includes: ["Sales playbooks & call guides", "Product-journey process training", "Onboarding materials & scorecards", "Team coaching & review routines"],
    icon: BookOpenCheck,
  },
  {
    number: "07",
    category: "CLIENT EXPERIENCE",
    title: "Retention & servicing workflows",
    description:
      "Build better communication after the first sale, with clear handovers and client touchpoints.",
    includes: ["Policy review reminders", "Consent-aware WhatsApp flows", "Service request tracking", "Renewal & lapse-risk workflows where relevant"],
    icon: RefreshCw,
  },
  {
    number: "08",
    category: "MEASUREMENT",
    title: "Analytics & automation",
    description:
      "Make performance visible across marketing, enquiries and your sales operation.",
    includes: ["GA4, pixels & conversion events", "UTM and campaign attribution", "Sales dashboards & reports", "Workflow and API automation scoping"],
    icon: BarChart3,
  },
];

const priorities = [
  "Website & online enquiries",
  "CRM & lead routing",
  "Social media & campaigns",
  "Lead conversion",
  "Agent onboarding & training",
  "Client retention & reporting",
  "Custom broker technology",
];

const stack = [
  { id: "01", title: "Attract", detail: "Search · social · referral", icon: Megaphone },
  { id: "02", title: "Capture", detail: "Website · forms · WhatsApp", icon: ClipboardList },
  { id: "03", title: "Assign", detail: "CRM · owners · follow-up", icon: Network },
  { id: "04", title: "Improve", detail: "Insights · training · retention", icon: BarChart3 },
];


const serviceModels = [
  {
    id: "foundation",
    number: "01",
    term: "ONCE-OFF SETUP",
    title: "Digital Foundation",
    description: "Get a credible, conversion-ready digital presence without needing a full operational overhaul.",
    bestFor: "New brokerages and teams with an outdated online presence",
    includes: ["Brokerage website or rebuild", "SEO & local business visibility", "Quote and enquiry journeys", "Essential analytics & tracking"],
  },
  {
    id: "growth",
    number: "02",
    term: "SETUP + ONGOING SUPPORT",
    title: "Growth Engine",
    description: "Connect campaigns to lead handling so you can understand which activities create sales opportunities.",
    bestFor: "Brokerages ready to grow and improve lead conversion",
    includes: ["Digital marketing & creative", "CRM pipelines and lead routing", "Lead source and conversion reporting", "Campaign and funnel optimisation"],
  },
  {
    id: "operations",
    number: "03",
    term: "CUSTOM SCOPE + SUPPORT",
    title: "Broker Operations",
    description: "Give teams better processes, agent enablement and a clearer view of day-to-day performance.",
    bestFor: "Field-led teams and brokerages managing multiple agents",
    includes: ["Agent onboarding materials", "Sales process & coaching playbooks", "Follow-up and servicing workflows", "Management dashboards & reviews"],
  },
];

function ForBrokers() {
  const [selected, setSelected] = useState<string[]>([]);
  const [business, setBusiness] = useState("");
  const [contactName, setContactName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [currentCrm, setCurrentCrm] = useState("");
  const [primaryChallenge, setPrimaryChallenge] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const togglePriority = (value: string) => {
    setSelected((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  const message = buildBrokerEnquiryMessage({
    contactName,
    brokerage: business,
    teamSize,
    currentCrm,
    primaryChallenge,
    packageName: selectedPackage,
    priorities: selected,
  });
  const whatsappLink = whatsappEnquiryUrl(message);
  const emailLink = emailEnquiryUrl(
    "Broker services enquiry — " + (business.trim() || "New enquiry"),
    message,
  );

  return (
    <SiteLayout>
      <section className="partner-hero partner-hero--brokers broker-hero">
        <div className="wrap partner-hero-grid">
          <div>
            <p className="partner-hero-eyebrow"><span /> AA WEALTH / BROKER GROWTH SERVICES</p>
            <h1>Your brokerage deserves more than <em>another lead.</em></h1>
            <p className="partner-hero-copy">
              Websites, CRM systems, marketing, lead operations and agent enablement —
              designed around the way insurance brokers actually work.
            </p>
            <div className="partner-actions">
              <a href="#broker-enquiry" className="btn btn-gold">
                Discuss your brokerage <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a className="partner-text-link" href="#broker-services">Explore our services</a>
            </div>
            <div className="broker-hero-foot">
              <span><Check size={14} aria-hidden="true" /> Insurance-focused</span>
              <span><Check size={14} aria-hidden="true" /> Built around your workflow</span>
              <span><Check size={14} aria-hidden="true" /> Scoped to your business</span>
            </div>
          </div>
          <aside className="partner-hero-panel partner-hero-panel--brokers broker-stack" aria-label="Brokerage growth workflow">
            <div className="partner-panel-top">
              <Workflow size={27} strokeWidth={1.4} aria-hidden="true" />
              <span>AA / GROWTH OPERATIONS</span>
            </div>
            <p className="partner-panel-label">THE CONNECTED BROKERAGE</p>
            <h2>From first click<br />to lasting client.</h2>
            <div className="broker-stack-steps">
              {stack.map((step) => {
                const Icon = step.icon;
                return (
                  <div className="broker-stack-step" key={step.id}>
                    <div className="broker-stack-icon"><Icon size={17} aria-hidden="true" /></div>
                    <div><strong>{step.title}</strong><small>{step.detail}</small></div>
                    <span className="broker-stack-number">{step.id}</span>
                  </div>
                );
              })}
            </div>
            <p className="partner-panel-footnote">
              One connected journey. Designed to reveal where prospects drop off
              and where your team can improve.
            </p>
          </aside>
        </div>
      </section>

      <section className="broker-pillar-strip" aria-label="Core broker services">
        <div className="wrap broker-pillar-inner">
          <span>01 / WEBSITES & FUNNELS</span>
          <span>02 / CRM & LEAD OPERATIONS</span>
          <span>03 / DIGITAL MARKETING</span>
          <span>04 / PEOPLE & PERFORMANCE</span>
        </div>
      </section>

      <section className="sec white" id="broker-services">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow">Built for the business of insurance</p>
              <h2>The services behind a stronger brokerage.</h2>
            </div>
            <p>
              From your first impression online to the last follow-up in the CRM:
              practical services that make your distribution operation easier to run.
            </p>
          </div>

          <div className="broker-service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="broker-service-card" key={service.number}>
                  <div className="broker-service-card-top">
                    <span>{service.number} / {service.category}</span>
                    <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}><Check size={14} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="partner-disclaimer">
            Services are scoped to each brokerage and may be delivered directly or through an
            agreed technology and marketing delivery arrangement. Platform subscriptions,
            advertising spend and third-party licences are quoted separately where applicable.
          </p>
        </div>
      </section>

      <section className="sec ivory broker-approach-section">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow">Choose your starting point</p>
              <h2>Choose the right kind of support.</h2>
            </div>
            <p>Three practical engagement models. No generic packages or unrealistic performance promises.</p>
          </div>
          <div className="broker-engagement-grid broker-package-grid">
            {serviceModels.map((model) => (
              <article
                className={"broker-package-card" + (selectedPackage === model.title ? " is-selected" : "")}
                key={model.id}
              >
                <div className="broker-package-topline">
                  <span>{model.number} / {model.term}</span>
                  <span aria-hidden="true">{model.number}</span>
                </div>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <p className="broker-package-best"><strong>Best for</strong> {model.bestFor}</p>
                <ul>
                  {model.includes.map((item) => (
                    <li key={item}><Check size={14} aria-hidden="true" /> {item}</li>
                  ))}
                </ul>
                <a
                  href="#broker-enquiry"
                  onClick={() => setSelectedPackage(model.title)}
                  className="broker-package-cta"
                >
                  {selectedPackage === model.title ? "Selected — discuss this scope" : "Discuss this approach"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <p className="broker-packages-footnote">
            Each engagement is quoted to scope. Advertising spend, CRM subscriptions and third-party
            tools are not automatically included. Choose an approach, or tell us what needs fixing.
          </p>
        </div>
      </section>

      <section className="sec navy broker-outcomes-section">
        <div className="wrap partner-split">
          <div>
            <p className="eyebrow" style={{ color: "var(--gold-l)" }}>Beyond clicks and impressions</p>
            <h2>Measure the journey that matters.</h2>
            <p className="broker-outcome-copy">
              A strong brokerage should be able to see not just how many enquiries arrived,
              but what happened to them. We can help scope a reporting view around your real pipeline.
            </p>
            <a href="#broker-enquiry" className="partner-text-link">
              Talk through your growth priorities <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="broker-metric-panel" aria-label="Example brokerage reporting dimensions">
            {[
              ["ACQUISITION", "Leads by campaign and source"],
              ["RESPONSE", "Time to first contact"],
              ["CONVERSION", "Enquiry-to-quote and submission"],
              ["OPERATIONS", "Follow-up and agent activity"],
              ["RETENTION", "Policy review and service touchpoints"],
            ].map(([tag, detail], index) => (
              <div key={tag}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><small>{tag}</small><strong>{detail}</strong></div>
                <ArrowUpRight size={15} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec white broker-software-section">
        <div className="wrap broker-software">
          <div>
            <p className="eyebrow">AA Software / bespoke engagements</p>
            <h2>Need something more specialised?</h2>
            <p>
              We can scope custom broker-facing portals, dashboards, integrations and workflow
              tools when off-the-shelf solutions do not fit. Future policy administration
              integrations and white-label products remain exploratory, not launched offerings.
            </p>
            <a href="#broker-enquiry" className="broker-inline-link">
              Discuss a custom project <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="broker-software-grid" aria-label="Custom broker technology concepts">
            <div><Code2 size={23} aria-hidden="true" /><span>Broker portals</span></div>
            <div><Network size={23} aria-hidden="true" /><span>System integrations</span></div>
            <div><MessageCircle size={23} aria-hidden="true" /><span>WhatsApp journeys</span></div>
            <div><BarChart3 size={23} aria-hidden="true" /><span>Business dashboards</span></div>
          </div>
        </div>
      </section>

      <section className="sec ivory broker-engagement-section">
        <div className="wrap">
          <div className="partner-section-heading">
            <div>
              <p className="eyebrow">A practical starting process</p>
              <h2>We learn your operation before proposing a solution.</h2>
            </div>
          </div>
          <div className="broker-engagement-steps">
            <div><span>01 / DISCOVER</span><h3>Understand</h3><p>What you sell, where enquiries come from and where your team spends its time.</p></div>
            <div><span>02 / PRIORITISE</span><h3>Diagnose</h3><p>Identify the highest-impact gaps across acquisition, follow-up, sales and servicing.</p></div>
            <div><span>03 / SCOPE</span><h3>Propose</h3><p>Agree a defined scope, delivery model, responsibilities and measurable outcomes.</p></div>
          </div>
        </div>
      </section>

      <section className="sec white broker-faq-section" aria-labelledby="broker-faq-heading">
        <div className="wrap partner-faq-grid">
          <div>
            <p className="eyebrow">Before we work together</p>
            <h2 id="broker-faq-heading">Good questions.<br />Straight answers.</h2>
            <p>Every brokerage runs differently. Here are a few practical starting points.</p>
          </div>
          <div className="partner-faq-items">
            <details>
              <summary>Do we have to move to Zoho CRM?</summary>
              <p>No. We can review your existing CRM or brokerage platform first. A migration or integration would be separately scoped based on what your current system supports.</p>
            </details>
            <details>
              <summary>Do your marketing services include advertising spend?</summary>
              <p>Not automatically. Creative production, campaign management, ad budgets and platform subscriptions should be itemised in your proposal.</p>
            </details>
            <details>
              <summary>Can you help train our sales agents?</summary>
              <p>We can scope sales-process materials, product-journey enablement and operational coaching. Accredited FAIS training, regulatory examinations, CPD and statutory supervision are separate regulated responsibilities.</p>
            </details>
            <details>
              <summary>Will this guarantee more policies or a specific number of leads?</summary>
              <p>No. We focus on clear objectives, measurable work and practical improvements, but outcomes depend on your market, proposition, spend, compliance approvals and execution.</p>
            </details>
            <details>
              <summary>Can we start with just one service?</summary>
              <p>Yes. A website, CRM cleanup, lead routing redesign or campaign audit can be scoped independently. A wider engagement is only useful when the business needs it.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="sec white broker-contact-section" id="broker-enquiry">
        <div className="wrap broker-contact-grid">
          <div className="broker-contact-copy">
            <p className="eyebrow">Let's talk brokerage growth</p>
            <h2>Tell us what needs to work <em>better.</em></h2>
            <p>
              Tell us about your brokerage and select the work you need. We’ll prepare a clearly
              structured enquiry for WhatsApp or email without requiring an account.
            </p>
            <div className="broker-contact-meta">
              <span><Handshake size={18} aria-hidden="true" /> Independent brokers & FSP teams</span>
              <span><Globe2 size={18} aria-hidden="true" /> Durban-based · South Africa</span>
              <span><Check size={18} aria-hidden="true" /> AA Wealth · FSP 50739</span>
            </div>
          </div>
          <div className="broker-enquiry-card">
            <div className="broker-enquiry-heading">
              <span>AA / BROKER SERVICES</span>
              <h3>Start a conversation.</h3>
              <p>Choose a package and your priorities to prepare a useful first conversation.</p>
            </div>
            <label htmlFor="broker-contact-name">Your name <small>(optional)</small></label>
            <input
              id="broker-contact-name"
              type="text"
              autoComplete="name"
              maxLength={100}
              placeholder="Your name and surname"
              value={contactName}
              onChange={(event) => setContactName(event.target.value)}
            />
            <label htmlFor="broker-company">Brokerage name <small>(optional)</small></label>
            <input
              id="broker-company"
              type="text"
              autoComplete="organization"
              maxLength={100}
              placeholder="Your brokerage or business"
              value={business}
              onChange={(event) => setBusiness(event.target.value)}
            />
            <div className="broker-enquiry-field-row">
              <div>
                <label htmlFor="broker-team-size">Team size <small>(optional)</small></label>
                <select
                  id="broker-team-size"
                  value={teamSize}
                  onChange={(event) => setTeamSize(event.target.value)}
                >
                  <option value="">Select size</option>
                  <option>Just me</option>
                  <option>2–5 representatives</option>
                  <option>6–20 representatives</option>
                  <option>More than 20 representatives</option>
                </select>
              </div>
              <div>
                <label htmlFor="broker-crm">Current CRM <small>(optional)</small></label>
                <select
                  id="broker-crm"
                  value={currentCrm}
                  onChange={(event) => setCurrentCrm(event.target.value)}
                >
                  <option value="">Select setup</option>
                  <option>No CRM yet</option>
                  <option>Spreadsheets / manual</option>
                  <option>Zoho CRM</option>
                  <option>Other CRM or broker system</option>
                </select>
              </div>
            </div>
            <p className="broker-enquiry-label">Preferred engagement</p>
            <div className="broker-package-picks" role="group" aria-label="Select a preferred service package">
              {serviceModels.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  className={selectedPackage === model.title ? "selected" : ""}
                  aria-pressed={selectedPackage === model.title}
                  onClick={() => setSelectedPackage(selectedPackage === model.title ? "" : model.title)}
                >
                  {model.title}
                </button>
              ))}
              <button
                type="button"
                className={selectedPackage === "Bespoke / AA Software" ? "selected" : ""}
                aria-pressed={selectedPackage === "Bespoke / AA Software"}
                onClick={() => setSelectedPackage(selectedPackage === "Bespoke / AA Software" ? "" : "Bespoke / AA Software")}
              >
                Bespoke / AA Software
              </button>
            </div>
            <p className="broker-enquiry-label" id="broker-priorities-label">What would you like help with?</p>
            <div className="broker-priority-list" role="group" aria-labelledby="broker-priorities-label">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  aria-pressed={selected.includes(priority)}
                  className={selected.includes(priority) ? "selected" : ""}
                  onClick={() => togglePriority(priority)}
                >
                  <span>{priority}</span><Check size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
            <label htmlFor="broker-challenge" className="broker-challenge-label">
              Biggest challenge <small>(optional)</small>
            </label>
            <textarea
              id="broker-challenge"
              rows={3}
              maxLength={280}
              placeholder="e.g. Our agents get leads, but follow-up is inconsistent."
              value={primaryChallenge}
              onChange={(event) => setPrimaryChallenge(event.target.value)}
            />
            <div className="broker-enquiry-actions">
              <a href={whatsappLink} className="btn btn-green" target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href={emailLink} className="btn btn-ghost">
                Send an email <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="broker-enquiry-note">
              This creates a message in your chosen app. Nothing is submitted or stored on this page.
            </p>
          </div>
        </div>
        <div className="wrap">
          <p className="partner-compliance-note">
            Services involving regulated financial advice, policy administration, insurer binder
            functions, claims decisions, representative supervision or accredited regulatory training
            require appropriate authorisation and contractual arrangements. Agent training described
            here refers to sales-process and operational enablement, not accredited FAIS or CPD training.
            All direct marketing, lead handling and client communications must comply with POPIA,
            applicable FAIS obligations and insurer requirements. No lead or sales outcomes are guaranteed.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
