import { createFileRoute, Link } from "@tanstack/react-router";
import SiteLayout from "@/components/SiteLayout";
import CoverGrid from "@/components/CoverGrid";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Cover & Services | AA Wealth — Funeral, Life, Income, Critical Illness" },
      {
        name: "description",
        content:
          "Explore complete family protection: funeral, life, income protection, critical illness, disability, savings, and group/stokvel cover from AA Wealth.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow" style={{ color: "var(--gold-l)" }}>
            What we cover
          </p>
          <h1>Complete protection for the whole family</h1>
          <p>
            Explore funeral, life and income protection with an advisor. Understand the benefits,
            exclusions, waiting periods and premiums before choosing cover.
          </p>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <CoverGrid />
        </div>
      </section>

      <section className="sec ivory">
        <div className="wrap">
          <div className="groups">
            <div style={{ position: "relative", zIndex: 2, flex: 1, minWidth: 280 }}>
              <p className="eyebrow" style={{ color: "rgba(255,255,255,.85)" }}>
                Stokvels · Societies · Employers
              </p>
              <h2>Cover your stokvel, society or staff — together</h2>
              <p>
                Bring your group and we'll set up cover at scheme rates, with one simple monthly
                arrangement and individual top-ups for members who want more. Ideal for burial
                societies, stokvels, churches and small businesses across KZN.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn btn-gold"
              style={{ position: "relative", zIndex: 2 }}
            >
              Set up group cover
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
