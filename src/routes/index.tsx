import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import CoverGrid from "@/components/CoverGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AA Wealth | Insurance Broker in Durban, KZN — Funeral, Life & Income Cover" },
      { name: "description", content: "Licensed Durban broker (FSP 50739) building complete family protection — funeral, life, income, illness & savings. Free WhatsApp review." },
    ],
  }),
  component: Home,
});

const WA = "https://wa.me/27765885126?text=Sawubona%20AA%20Wealth%2C%20I%27d%20like%20a%20free%20review";

function Home() {
  return (
    <SiteLayout>
      <section className="hero" id="top" aria-labelledby="h1">
        <div className="wrap hero-grid">
          <div>
            <span className="hero-pill"><span className="pulse-dot" /> Free 15-min review · No obligation</span>
            <h1 id="h1">Cover for life — <em>not just a funeral.</em></h1>
            <p className="sub">Get a free WhatsApp review with a licensed Durban advisor. See exactly where your family is exposed — and fix it in minutes.</p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-gold">Get my free review →</Link>
              <a href={WA} className="btn btn-ghost on-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" /></svg>
                WhatsApp us
              </a>
            </div>
            <p className="trustline">
              <strong>FSP 50739</strong><span className="dot" />
              <span>Claims in hours</span><span className="dot" />
              <span>Sanlam · Metropolitan · Emerald Life</span>
            </p>
          </div>
          <div className="hero-art">
            <svg className="shield" viewBox="0 0 240 280" fill="none" aria-label="Protection shield">
              <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#143866" /><stop offset="1" stopColor="#0B2545" /></linearGradient></defs>
              <path d="M120 8 L222 44 V150 C222 214 176 256 120 272 C64 256 18 214 18 150 V44 Z" fill="url(#sg)" stroke="rgba(200,160,74,.4)" strokeWidth="2" />
              <path d="M58 168 L120 92 L182 168" stroke="#C8A04A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M82 184 L120 138 L158 184" stroke="#0F7B5A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <text x="120" y="232" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="20" fill="rgba(255,255,255,.55)" letterSpacing="3">PROTECTED</text>
            </svg>
            <div className="badge b1"><span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></span>Claims in 4 hours</div>
            <div className="badge b2"><span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /></svg></span>Whole-family plans</div>
          </div>
        </div>
      </section>

      <div className="uw" aria-label="Underwriting partners">
        <div className="wrap">
          <div className="uw-inner">
            <p className="uw-label">Cover placed with South Africa's most trusted insurers</p>
            <div className="uw-logos">
              <span className="logo sanlam"><svg className="lm" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#003a70" /><path d="M16 6 L20 14 L28 14 L21.5 19 L24 27 L16 22 L8 27 L10.5 19 L4 14 L12 14 Z" fill="#fdb913" /></svg>Sanlam</span>
              <span className="logo metro"><svg className="lm" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#005baa" /><path d="M7 22 V10 L12 18 L17 10 V22 M21 10 V22 H26" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>Metropolitan</span>
              <span className="logo emerald"><svg className="lm" viewBox="0 0 32 32"><path d="M16 3 L28 16 L16 29 L4 16 Z" fill="#0F7B5A" /><path d="M16 9 L23 16 L16 23 L9 16 Z" fill="#13a079" /></svg>Emerald Life</span>
            </div>
          </div>
        </div>
      </div>

      <section className="sec white">
        <div className="wrap gap-grid">
          <div><div className="bignum">R1.6m<span>The average cover shortfall facing a young South African family today.</span></div></div>
          <div className="gap-card">
            <p className="eyebrow" style={{ color: "var(--gold-l)" }}>The gap nobody talks about</p>
            <h2 style={{ color: "#fff", fontSize: "1.85rem", margin: "12px 0 14px" }}>Funeral cover protects the goodbye. What protects everything before it?</h2>
            <p style={{ color: "rgba(255,255,255,.84)" }}>Take funeral cover out of the picture and fewer than 1 in 5 South Africans have any life cover at all — and more than 8 in 10 working people have nothing to protect them if illness or injury stops their income. <strong style={{ color: "#fff" }}>That's the gap we close.</strong></p>
          </div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap head-c">
          <p className="eyebrow">The AA Wealth way</p>
          <h2>One advisor. One complete plan. Built around your family.</h2>
          <p className="lead center">We start where you are — usually funeral cover — and build outward into a plan that actually protects your life: your income, your health, your loved ones, and your future. No jargon, no pressure, no call-centre script.</p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="head-c"><p className="eyebrow">What we cover</p><h2>Everything your family needs, in one place</h2></div>
          <CoverGrid />
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <div className="head-c"><p className="eyebrow">Peace of mind</p><h2>Real families. Real peace of mind.</h2></div>
          <div className="tcards">
            {[
              { q: "AA Wealth showed me my work cover left a huge gap. Sorted in a day, all on WhatsApp.", who: "Nomvula · Umlazi" },
              { q: "They paid my mother's funeral claim in hours. I'll never go anywhere else.", who: "Sipho · Pinetown" },
              { q: "More than insurance — they actually built me a plan for my family's future.", who: "Reshma · Durban North" },
            ].map((t) => (
              <figure key={t.who} className="t">
                <div className="q" aria-hidden="true">“</div>
                <div className="stars">★★★★★</div>
                <blockquote><p>{t.q}</p></blockquote>
                <figcaption className="who">{t.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
