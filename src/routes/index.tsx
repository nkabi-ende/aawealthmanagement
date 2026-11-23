import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Heart, Wallet, Users, Check, ArrowRight, BadgeCheck, ClipboardCheck, Headset, RefreshCw, BriefcaseBusiness, MonitorSmartphone, ExternalLink } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { ReviewButton, useReview } from "@/components/ReviewDialog";
import CoverGrid from "@/components/CoverGrid";
import { getFeaturedInsight, prettyInsightDate } from "@/lib/insights";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Funeral & Life Insurance Broker Durban | AA Wealth Management" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "AA Wealth Management | Protection, Built Around Your Life" },
      {
        property: "og:description",
        content: "20+ years of insurance industry experience. Personal funeral, life and income protection guidance from a Durban-based brokerage. FSP 50739.",
      },
      { property: "og:url", content: "https://aawealthmanagement.co.za/" },
      { property: "og:image", content: "https://aawealthmanagement.co.za/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AA Wealth Management | Insurance Broker Durban" },
      {
        name: "twitter:description",
        content: "Experience-led funeral, life and income protection guidance for Durban families and clients across South Africa.",
      },
      {
        name: "description",
        content:
          "Durban insurance brokerage with 20+ years of industry experience. Explore funeral, life and income protection with AA Wealth Management, FSP 50739.",
      },
    ],
    links: [{ rel: "canonical", href: "https://aawealthmanagement.co.za/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "InsuranceAgency",
              "@id": "https://aawealthmanagement.co.za/#organisation",
              name: "AA Wealth Management",
              legalName: "Amathintane Amahle Wealth Management (Pty) Ltd",
              url: "https://aawealthmanagement.co.za/",
              logo: "https://aawealthmanagement.co.za/favicon-512.png",
              image: "https://aawealthmanagement.co.za/og-image.png",
              description: "Durban-based insurance brokerage offering funeral, life and income protection reviews and support.",
              telephone: "+27765885126",
              email: "hello@aawealthmanagement.co.za",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Durban",
                addressRegion: "KwaZulu-Natal",
                addressCountry: "ZA",
              },
              areaServed: { "@type": "Country", name: "South Africa" },
              employee: [
                { "@type": "Person", name: "Thami Nkabinde", jobTitle: "Managing Director" },
                { "@type": "Person", name: "Brandon Nkabinde", jobTitle: "Operations, Field & Digital Distribution and Innovation" },
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://aawealthmanagement.co.za/#website",
              url: "https://aawealthmanagement.co.za/",
              name: "AA Wealth Management",
              publisher: { "@id": "https://aawealthmanagement.co.za/#organisation" },
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});
const goals = [
  {
    title: "Protect my family",
    interest: "Life cover",
    icon: Users,
    text: "Help with school fees, the home loan and everyday living costs.",
  },
  {
    title: "Protect my income",
    interest: "Income protection",
    icon: Wallet,
    text: "Explore support if illness or injury affects your ability to earn.",
  },
  {
    title: "Plan for a funeral",
    interest: "Funeral cover",
    icon: Heart,
    text: "Understand family cover, waiting periods and the claims process.",
  },
];
function Home() {
  const { openReview } = useReview();
  const featuredInsight = getFeaturedInsight();
  function choose(value: string) {
    openReview(value);
  }
  return (
    <SiteLayout>
      <section className="wealth-hero" aria-labelledby="home-title">
        <div className="wrap wealth-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Durban roots. Twenty-plus years of industry experience.</p>
            <h1 id="home-title">
              For the life
              <br />
              you’re building.
              <br />
              <em>And everyone in it.</em>
            </h1>
            <p className="hero-intro">
              From funeral cover to life and income protection, get clear guidance from a
              Durban brokerage with over 20 years of industry experience behind its leadership.
              We start with what matters to you.
            </p>
            <div className="hero-actions">
              <ReviewButton className="btn btn-gold">
                Start my free review <ArrowUpRight size={19} />
              </ReviewButton>
              <Link to="/services" className="text-link">
                Explore cover <ArrowRight size={17} />
              </Link>
            </div>
            <p className="hero-assurance">
              <ShieldCheck size={17} aria-hidden="true" /> Authorised FSP 50739
              <span>·</span> Free initial review <span>·</span> No obligation
            </p>
          </div>
          <figure className="family-hero-portrait">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/aa-family-640.webp 640w, /images/aa-family-1280.webp 1280w"
                sizes="(max-width: 650px) calc(100vw - 36px), 50vw"
              />
              <img
                src="/images/aa-family-1280.webp"
                alt="Illustrative portrait of smiling Black South African parents, grandparents, a son and a daughter together in a garden"
                width="1280"
                height="853"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <figcaption>
              <span className="family-caption-icon">
                <ShieldCheck size={22} />
              </span>
              <div>
                <strong>
                  Every generation.
                  <br />
                  <em>One shared future.</em>
                </strong>
                <span>Protection for the people you love.</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <div className="confidence-strip">
        <div className="wrap">
          <span>
            <Check size={17} aria-hidden="true" /> 20+ years in the industry
          </span>
          <span>
            <Check size={17} aria-hidden="true" /> Licensed FSP 50739
          </span>
          <span>
            <Check size={17} aria-hidden="true" /> Field & digital support
          </span>
          <span>
            <Check size={17} aria-hidden="true" /> Reviews and claims guidance
          </span>
        </div>
      </div>
      <section className="sec white" aria-labelledby="goals-title">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start with what matters</p>
              <h2 id="goals-title">What would you like to protect?</h2>
            </div>
            <p>
              No need to know every insurance term.
              <br />
              Start with your goal. We’ll help with the detail.
            </p>
          </div>
          <div className="goal-grid">
            {goals.map(({ title, interest, icon: Icon, text }, i) => (
              <button key={title} className="goal-card" onClick={() => choose(interest)}>
                <div className="goal-top">
                  <Icon size={26} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="goal-next">
                  Let’s explore <ArrowUpRight size={19} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="sec ivory">
        <div className="wrap advice-grid">
          <div>
            <p className="eyebrow">More than a policy</p>
            <h2>
              Good cover starts
              <br />
              with a conversation.
            </h2>
            <p className="lead">
              You shouldn’t have to work out your family’s protection alone. We help you understand
              what you have, what you need and what fits your budget.
            </p>
            <Link to="/about" className="text-link">
              Meet AA Wealth <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="advice-list">
            {[
              [
                "01",
                "Tell us about your life",
                "Your family, your priorities and your existing cover. We start by listening.",
              ],
              [
                "02",
                "Understand your options",
                "An advisor explains suitable options, premiums, exclusions and waiting periods.",
              ],
              [
                "03",
                "Decide with confidence",
                "Ask your questions before applying. Cover begins only once your insurer confirms acceptance and the policy start date.",
              ],
            ].map(([n, title, text]) => (
              <div className="advice-item" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec white home-leadership" aria-labelledby="home-leadership-title">
        <div className="wrap">
          <div className="home-leadership-top">
            <div>
              <p className="eyebrow">The people behind your protection</p>
              <h2 id="home-leadership-title">Experience at the helm.<br /><em>People on the ground.</em></h2>
            </div>
            <div className="home-leadership-context">
              <span className="home-tenure">20<span>+</span><small>YEARS</small></span>
              <p>
                More than two decades of insurance industry experience inform our approach.
                AA Wealth combines established insurance knowledge with hands-on, modern
                distribution and client service.
              </p>
            </div>
          </div>
          <div className="home-leaders">
            <article className="home-leader home-leader--principal">
              <div className="home-leader-top"><span>01 / BROKERAGE LEADERSHIP</span><BadgeCheck size={24} aria-hidden="true" /></div>
              <div className="home-leader-monogram" aria-hidden="true">TN</div>
              <div className="home-leader-copy">
                <p className="home-leader-role">Managing Director &amp; Broker Principal</p>
                <h3>Thami Nkabinde</h3>
                <p>
                  A former Liberty Life professional, Thami leads the brokerage's strategic
                  direction and commitment to careful, informed financial protection.
                </p>
                <span className="home-leader-detail">Insurance leadership · Former Liberty Life</span>
              </div>
            </article>
            <article className="home-leader home-leader--operations">
              <div className="home-leader-top"><span>02 / OPERATIONS &amp; INNOVATION</span><MonitorSmartphone size={24} aria-hidden="true" /></div>
              <div className="home-leader-monogram" aria-hidden="true">BN</div>
              <div className="home-leader-copy">
                <p className="home-leader-role">Operations · Field &amp; Digital Teams · Innovation</p>
                <h3>Brandon Nkabinde</h3>
                <p>
                  Brandon runs day-to-day operations, leading the field and digital teams
                  while developing better ways for clients and representatives to connect,
                  enquire and receive support.
                </p>
                <span className="home-leader-detail">Distribution operations · Digital service</span>
              </div>
            </article>
          </div>
          <div className="home-authority-bar">
            <div>
              <ShieldCheck size={24} aria-hidden="true" />
              <p><strong>Accountability is part of protection.</strong><span>AA Wealth Management · Authorised FSP 50739</span></p>
            </div>
            <a href="https://www.fsca.co.za/FSB-Search/" target="_blank" rel="noopener noreferrer">
              Verify our FSP on the FSCA register <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your protection, connected</p>
              <h2>Different needs. One place to start.</h2>
            </div>
            <Link to="/services" className="text-link">
              All cover options <ArrowUpRight size={18} />
            </Link>
          </div>
          <CoverGrid />
        </div>
      </section>
      <section className="sec ivory home-service" aria-labelledby="home-service-title">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Beyond the first application</p>
              <h2 id="home-service-title">We're here for the questions that come after.</h2>
            </div>
            <p>
              Protection should make sense before you sign, while your cover is in place,
              and when your circumstances change.
            </p>
          </div>
          <div className="home-service-grid">
            <article>
              <span className="home-service-index">01 / UNDERSTAND</span>
              <ClipboardCheck size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>Review what you already have.</h3>
              <p>We'll help you examine existing policies, premiums, benefits and waiting periods before considering any changes.</p>
            </article>
            <article>
              <span className="home-service-index">02 / CHOOSE</span>
              <RefreshCw size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>Know what you're signing up for.</h3>
              <p>Ask about cover amounts, exclusions and policy conditions. An appropriately authorised advisor can explain suitable options.</p>
            </article>
            <article>
              <span className="home-service-index">03 / SUPPORT</span>
              <Headset size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>Know where to turn when life changes.</h3>
              <p>Contact us for guidance with policy servicing, review requests and claims-related next steps. Insurers remain responsible for claim decisions.</p>
            </article>
          </div>
          <div className="home-service-action">
            <p>Already paying for cover? <strong>Review first. Decide with confidence.</strong></p>
            <ReviewButton cover="Review my existing cover" className="btn btn-green">Review my existing policy <ArrowRight size={17} aria-hidden="true" /></ReviewButton>
          </div>
        </div>
      </section>
      <section className="sec ivory" id="review">
        <div className="wrap formwrap">
          <div>
            <p className="eyebrow">Take the first step</p>
            <h2 className="review-title">
              A little clarity today.
              <br />
              <em>A more secure tomorrow.</em>
            </h2>
            <p className="lead">
              Tell us what’s on your mind. Prepare your enquiry, then send it directly to an AA
              Wealth advisor on WhatsApp.
            </p>
            <ul className="review-checks">
              <li>
                <Check size={18} /> Free initial protection review
              </li>
              <li>
                <Check size={18} /> No obligation to buy a policy
              </li>
              <li>
                <Check size={18} /> No ID or medical details needed here
              </li>
            </ul>
            <p className="small-note">
              Already have cover? Bring your policy details to your advisor. Review any changes
              before cancelling an existing policy.
            </p>
          </div>
          <div className="review-launch-card">
            <p className="eyebrow">A few simple steps</p>
            <h3>
              Tell us what matters.
              <br />
              We’ll take it from there.
            </h3>
            <p>
              Choose your cover, answer a few short questions and review your details. No paperwork
              to get started.
            </p>
            <ReviewButton className="btn btn-gold">
              Start my free review <ArrowUpRight size={18} />
            </ReviewButton>
            <span>Free initial review · No obligation</span>
          </div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap question-grid">
          <div>
            <p className="eyebrow">A few helpful answers</p>
            <h2>Before we talk.</h2>
            <Link to="/faq" className="text-link">
              More questions <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="home-questions">
            {[
              [
                "Is life cover the same as funeral cover?",
                "They serve different needs. Funeral cover generally helps with funeral costs; life cover can help dependants with longer-term financial needs. Benefits and conditions depend on the policy.",
              ],
              [
                "Will I get an instant premium here?",
                "No. This guided intake helps your advisor prepare a personalised quote. Premiums depend on the product, your needs and the insurer’s assessment.",
              ],
              [
                "What happens after I send my enquiry?",
                "When online intake is available, your enquiry is saved for advisor follow-up after confirmation. Otherwise, you can open WhatsApp and press Send. We discuss next steps during business hours.",
              ],
              [
                "Should I cancel my existing funeral or life policy first?",
                "Not before comparing the benefits, costs, waiting periods and exclusions. An advisor can review the current policy with you so you understand the consequences of any change.",
              ],
              [
                "Can AA Wealth help when I need policy or claims guidance?",
                "We can explain the process, help with appropriate servicing enquiries and guide you on claims-related steps. Decisions on claims and cover remain subject to the insurer and your policy terms.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {featuredInsight && <section className="sec white home-insights" aria-labelledby="home-insights-title">
        <div className="wrap home-insights-grid">
          <div>
            <p className="eyebrow">AA Wealth / Insights</p>
            <h2 id="home-insights-title">The right information can be <em>powerful protection.</em></h2>
            <p>
              Read our latest consumer-protection perspective on disputed funeral-policy
              deductions, food-voucher promises and why meaningful consent matters.
            </p>
            <Link to="/insights" className="home-insights-link">Explore all insights <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <article className="home-insights-feature">
            <div className="home-insights-feature-top"><span>CONSUMER PROTECTION</span><span>AA / EDITORIAL</span></div>
            <h3>
              <Link
                to="/insights/$slug"
                params={{ slug: featuredInsight.slug }}
              >
                {featuredInsight.title}
              </Link>
            </h3>
            <p>{featuredInsight.excerpt}</p>
            <div><span>{featuredInsight.author} · {prettyInsightDate(featuredInsight.date)}</span><Link
              to="/insights/$slug"
              params={{ slug: featuredInsight.slug }}
              aria-label={"Read " + featuredInsight.title}
            ><ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          </article>
        </div>
      </section>}
      <section className="sec ivory home-work" aria-labelledby="home-work-title">
        <div className="wrap home-work-grid">
          <div>
            <p className="eyebrow">Grow with AA Wealth</p>
            <h2 id="home-work-title">More ways to <em>work with us.</em></h2>
            <p>
              Alongside client protection, our field distribution and digital capabilities
              create opportunities for representatives and fellow insurance brokers.
            </p>
          </div>
          <div className="home-work-links">
            <Link to="/for-agents">
              <span><Users size={21} aria-hidden="true" /> FOR AGENTS</span>
              <strong>Explore field sales opportunities</strong>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <Link to="/for-brokers">
              <span><BriefcaseBusiness size={21} aria-hidden="true" /> FOR BROKERS</span>
              <strong>Brokerage growth, CRM &amp; distribution services</strong>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
