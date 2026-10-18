import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Heart, Wallet, Users, Check, ArrowRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import LeadForm from "@/components/LeadForm";
import CoverGrid from "@/components/CoverGrid";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AA Wealth Management | Life Insurance & Family Protection, Durban" },
      {
        name: "description",
        content:
          "Protect the people and life you’re building. Explore life cover, funeral cover and income protection with a Durban advisor. Start your free AA Wealth review.",
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
  const [interest, setInterest] = useState("Life cover");
  function choose(value: string) {
    setInterest(value);
    document.getElementById("review")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <SiteLayout>
      <section className="wealth-hero" aria-labelledby="home-title">
        <div className="wrap wealth-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Durban roots. Your future in focus.</p>
            <h1 id="home-title">
              For the life
              <br />
              you’re building.
              <br />
              <em>And everyone in it.</em>
            </h1>
            <p className="hero-intro">
              The people you love. The income you rely on. The future you imagine. Let’s build a
              protection plan around what matters to you.
            </p>
            <div className="hero-actions">
              <a href="#review" className="btn btn-gold">
                Start my free review <ArrowUpRight size={19} />
              </a>
              <Link to="/services" className="text-link">
                Explore cover <ArrowRight size={17} />
              </Link>
            </div>
            <p className="hero-assurance">
              <ShieldCheck size={17} /> FSP 50739 <span>·</span> No obligation <span>·</span>{" "}
              Personal advice
            </p>
          </div>
          <div className="future-panel" aria-label="A protection plan built around your family">
            <div className="future-top">
              <span>YOUR NEXT CHAPTER</span>
              <ArrowUpRight size={22} />
            </div>
            <div className="future-orbit" aria-hidden="true">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />
              <span className="orbit-word">
                Life.
                <br />
                <i>Well protected.</i>
              </span>
            </div>
            <div className="future-note">
              <span className="note-icon">
                <ShieldCheck size={25} />
              </span>
              <div>
                <strong>A plan that grows with you</strong>
                <p>Family. Income. Health. Tomorrow.</p>
              </div>
            </div>
            <div className="future-bottom">
              <span>AA WEALTH MANAGEMENT</span>
              <span>EST. IN KZN</span>
            </div>
          </div>
        </div>
      </section>
      <div className="confidence-strip">
        <div className="wrap">
          <span>
            <Check size={17} /> A real Durban advisor
          </span>
          <span>
            <Check size={17} /> Cover explained clearly
          </span>
          <span>
            <Check size={17} /> WhatsApp support
          </span>
          <span>
            <Check size={17} /> Your budget comes first
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
          <LeadForm defaultInterest={interest} />
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
                "Your message goes to AA Wealth on WhatsApp when you press Send in WhatsApp. An advisor can then discuss your needs and the next steps during business hours.",
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
    </SiteLayout>
  );
}
