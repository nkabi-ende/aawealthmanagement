import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AA Wealth | Licensed Durban Insurance Broker (FSP 50739)" },
      { name: "description", content: "Meet AA Wealth Management — a Durban-based licensed brokerage helping KZN families build complete protection plans. FSP 50739." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--gold-l)" }}>About AA Wealth</p>
          <h1>Local advisors. Complete protection. Built for KZN families.</h1>
          <p>We're a licensed Durban brokerage on a mission to close the cover gap most South African families don't even know they have.</p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="lead" style={{ fontSize: "1.1rem" }}>
            Most South Africans have a funeral plan — but very little else. If a breadwinner gets sick,
            injured, or passes away, the bond, the car, the school fees and the groceries don't pause.
            That's the gap AA Wealth was built to close.
          </p>
          <p className="lead" style={{ marginTop: 18 }}>
            We start with what you've got — usually funeral cover — and build outward into a plan that
            actually protects your life: your income, your health, your loved ones, and your future.
            One advisor. One plan. Reviewed with you as life changes.
          </p>
        </div>
      </section>

      <section className="sec navy">
        <div className="wrap">
          <div className="head-c"><p className="eyebrow" style={{ color: "var(--gold-l)" }}>Simple & pressure-free</p><h2>How to get covered with AA Wealth</h2></div>
          <div className="steps">
            <div className="step"><div className="num">1</div><h3>Chat to us</h3><p>WhatsApp, call or book online. No pressure, no obligation.</p></div>
            <div className="step"><div className="num">2</div><h3>Get your free review</h3><p>In about 15 minutes we map exactly what your family has — and what's missing.</p></div>
            <div className="step"><div className="num">3</div><h3>Get covered</h3><p>Sign digitally, covered fast. Then we stay with you for life — reviews, claims, the lot.</p></div>
          </div>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap">
          <div className="head-c"><p className="eyebrow">Why AA Wealth</p><h2>Why families across KZN choose us</h2></div>
          <div className="feat">
            {[
              { t: "Local & personal", d: "A real Durban advisor who knows you by name. Not a 0860 number.", i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
              { t: "Complete protection", d: "We cover the whole family's life — not just the funeral.", i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg> },
              { t: "Fast & digital", d: "Quotes and service on WhatsApp. Claims paid in hours.", i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h7l-1 8 10-12h-7z"/></svg> },
              { t: "Licensed & backed", d: "Authorised FSP 50739, placing cover with SA's most trusted insurers.", i: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 5-3.5 8-9 10-5.5-2-9-5-9-10V5l9-3 9 3z"/></svg> },
            ].map((f) => (
              <div key={f.t} className="f"><div className="ic">{f.i}</div><h3>{f.t}</h3><p>{f.d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
