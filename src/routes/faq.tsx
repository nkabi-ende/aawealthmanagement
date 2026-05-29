import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | AA Wealth — Insurance Broker Durban, KZN" },
      { name: "description", content: "Answers about FSP 50739, claim times, costs, WhatsApp service, and which areas AA Wealth serves." },
    ],
  }),
  component: Faq,
});

const QAS = [
  { q: "Is AA Wealth a registered insurance broker?", a: "Yes. AA Wealth Management is an authorised Financial Services Provider, FSP No. 50739, licensed for long-term insurance — including funeral, life, income protection, critical illness and savings." },
  { q: "How fast are insurance claims paid?", a: "Valid funeral claims can be paid in as little as 4 hours once the required documents are received, depending on the product and insurer." },
  { q: "Do I have to cancel my current cover?", a: "No. We review what you have first and only recommend changes that genuinely benefit you and your family." },
  { q: "How much does cover cost?", a: "Funeral cover starts from around R65 per month. Your protection review is completely free and carries no obligation." },
  { q: "Can I get insured on WhatsApp?", a: "Yes — quotes, applications and claims support, all from your phone." },
  { q: "Which areas does AA Wealth serve?", a: "All of KwaZulu-Natal, with a personal touch in greater Durban — and remote service nationwide across South Africa." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--gold-l)" }}>Good to know</p>
          <h1>Frequently asked questions</h1>
          <p>Quick answers about how AA Wealth works, what we cover, and how to get started.</p>
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap">
          <div className="faq">
            {QAS.map((qa, i) => (
              <div key={qa.q} className={`qa${open === i ? " open" : ""}`}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                  {qa.q}<span className="pm" aria-hidden="true">+</span>
                </button>
                <div className="ans"><p>{qa.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
