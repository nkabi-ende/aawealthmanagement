import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import LeadForm from "@/components/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AA Wealth | Free Protection Review on WhatsApp" },
      { name: "description", content: "Get a free 15-minute protection review with a licensed Durban advisor. WhatsApp, call or book online — no obligation." },
    ],
  }),
  component: Contact,
});

const WA = "https://wa.me/27765885126?text=Sawubona%20AA%20Wealth%2C%20I%27d%20like%20a%20free%20review";

function Contact() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--gold-l)" }}>Free · No obligation</p>
          <h1>Get your free protection review</h1>
          <p>15 minutes with a licensed Durban advisor (FSP 50739). We'll show you exactly where your family's cover falls short — and how to close the gap affordably.</p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap formwrap">
          <div>
            <p className="eyebrow">Reach us directly</p>
            <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.4rem)", margin: "12px 0 14px" }}>Talk to a real Durban advisor</h2>
            <p className="lead">Prefer to chat now? WhatsApp is the fastest way to get a quote, ask a question, or start a claim.</p>
            <div className="form-checks">
              <p><span>✓</span> Reply within minutes on WhatsApp</p>
              <p><span>✓</span> Licensed advisor, FSP 50739</p>
              <p><span>✓</span> Keep your current cover — we only improve it</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
              <a href={WA} className="btn btn-green">WhatsApp us</a>
              <a href="tel:+27765885126" className="btn btn-ghost">076 588 5126</a>
            </div>
            <p style={{ marginTop: 22, color: "var(--slate)", fontSize: ".9rem" }}>
              <strong style={{ color: "var(--navy)" }}>Hours:</strong> Mon–Fri 8:00–17:00 · Sat 9:00–13:00<br />
              <strong style={{ color: "var(--navy)" }}>Email:</strong> <a href="mailto:hello@aawealth.co.za" style={{ color: "var(--emerald)" }}>hello@aawealth.co.za</a><br />
              <strong style={{ color: "var(--navy)" }}>Area:</strong> Durban, KwaZulu-Natal — serving all of South Africa remotely.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </SiteLayout>
  );
}
