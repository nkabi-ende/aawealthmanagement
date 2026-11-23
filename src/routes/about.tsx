import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AA Wealth | Licensed Durban Insurance Broker (FSP 50739)" },
      {
        name: "description",
        content:
          "Meet AA Wealth: 20+ years of insurance industry experience, led by Thami Nkabinde, former Liberty Life, with Brandon Nkabinde heading operations and innovation. FSP 50739.",
      },
    ],
    links: [{ rel: "canonical", href: "https://aawealthmanagement.co.za/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--gold-l)" }}>
            About AA Wealth
          </p>
          <h1>Local advisors. Complete protection. Built for KZN families.</h1>
          <p>
            We're a licensed Durban brokerage on a mission to close the cover gap most South African
            families don't even know they have.
          </p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="lead" style={{ fontSize: "1.1rem" }}>
            Most South Africans have a funeral plan — but very little else. If a breadwinner gets
            sick, injured, or passes away, the bond, the car, the school fees and the groceries
            don't pause. That's the gap AA Wealth was built to close.
          </p>
          <p className="lead" style={{ marginTop: 18 }}>
            We start with what you've got — usually funeral cover — and build outward into a plan
            that actually protects your life: your income, your health, your loved ones, and your
            future. One advisor. One plan. Reviewed with you as life changes.
          </p>
        </div>
      </section>

      <section className="sec ivory about-leadership" aria-labelledby="about-leadership-heading">
        <div className="wrap">
          <div className="about-leadership-intro">
            <p className="eyebrow">A people-led brokerage</p>
            <h2 id="about-leadership-heading">Insurance experience, grounded in community.</h2>
            <p>
              AA Wealth draws on more than 20 years of insurance industry experience within its
              leadership. Our approach combines established product understanding with local field
              relationships and digital client service.
            </p>
          </div>
          <div className="home-leaders">
            <article className="home-leader home-leader--principal">
              <div className="home-leader-top"><span>MANAGING DIRECTOR &amp; BROKER PRINCIPAL</span><BadgeCheck size={24} aria-hidden="true" /></div>
              <div className="home-leader-monogram" aria-hidden="true">TN</div>
              <div className="home-leader-copy">
                <p className="home-leader-role">Brokerage leadership</p>
                <h3>Thami Nkabinde</h3>
                <p>
                  With previous experience at Liberty Life, Thami brings an insurance background
                  to AA Wealth's leadership, client approach and brokerage direction.
                </p>
                <span className="home-leader-detail">Former Liberty Life professional · AA Wealth Managing Director</span>
              </div>
            </article>
            <article className="home-leader home-leader--operations">
              <div className="home-leader-top"><span>FIELD &amp; DIGITAL OPERATIONS</span><MonitorSmartphone size={24} aria-hidden="true" /></div>
              <div className="home-leader-monogram" aria-hidden="true">BN</div>
              <div className="home-leader-copy">
                <p className="home-leader-role">Operations &amp; innovation</p>
                <h3>Brandon Nkabinde</h3>
                <p>
                  Brandon leads day-to-day brokerage operations, the field and digital teams,
                  and the systems and innovation supporting service delivery.
                </p>
                <span className="home-leader-detail">Field distribution · Digital client journeys · Innovation</span>
              </div>
            </article>
          </div>
          <div className="home-authority-bar">
            <div>
              <BadgeCheck size={24} aria-hidden="true" />
              <p><strong>Experience supported by accountability</strong><span>AA Wealth · FSP No. 50739</span></p>
            </div>
            <Link to="/contact">Contact our team <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="sec navy">
        <div className="wrap">
          <div className="head-c">
            <p className="eyebrow" style={{ color: "var(--gold-l)" }}>
              Simple & pressure-free
            </p>
            <h2>How to get covered with AA Wealth</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Chat to us</h3>
              <p>WhatsApp, call or book online. No pressure, no obligation.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Get your free review</h3>
              <p>In about 15 minutes we map exactly what your family has — and what's missing.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Get covered</h3>
              <p>
                We guide your application and explain when cover starts. Speak to us for policy
                reviews and claims support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap">
          <div className="head-c">
            <p className="eyebrow">Why AA Wealth</p>
            <h2>Why families across KZN choose us</h2>
          </div>
          <div className="feat">
            {[
              {
                t: "Local & personal",
                d: "A real Durban advisor who knows you by name. Not a 0860 number.",
                i: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
              {
                t: "Complete protection",
                d: "We cover the whole family's life — not just the funeral.",
                i: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
                  </svg>
                ),
              },
              {
                t: "Fast & digital",
                d: "Quotes and service on WhatsApp. Help with the claims process.",
                i: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
                  </svg>
                ),
              },
              {
                t: "Licensed & backed",
                d: "Authorised FSP 50739, placing cover with SA's most trusted insurers.",
                i: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c0 5-3.5 8-9 10-5.5-2-9-5-9-10V5l9-3 9 3z" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.t} className="f">
                <div className="ic">{f.i}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
