import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, ShieldCheck } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { getInsights, prettyInsightDate } from "@/lib/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights & Consumer Protection | AA Wealth Management" },
      {
        name: "description",
        content: "Insurance news, consumer protection guidance and field and digital distribution insights from AA Wealth Management, Durban. FSP 50739.",
      },
      { property: "og:title", content: "AA Wealth Insights | Insurance & Consumer Protection" },
      { property: "og:description", content: "Useful insurance industry analysis, consumer alerts and practical guidance from the AA Wealth team." },
      { property: "og:url", content: "https://aawealthmanagement.co.za/insights" },
      { property: "og:image", content: "https://aawealthmanagement.co.za/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://aawealthmanagement.co.za/insights" }],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const articles = getInsights();
  return (
    <SiteLayout>
      <section className="insights-hero">
        <div className="wrap insights-hero-grid">
          <div>
            <p className="insights-eyebrow"><span /> AA WEALTH / PERSPECTIVES</p>
            <h1>Clear thinking for <em>better protection.</em></h1>
            <p>
              Industry perspectives, consumer protection alerts and practical thinking
              from the people building AA Wealth's field and digital service.
            </p>
          </div>
          <div className="insights-hero-mark" aria-hidden="true">
            <BookOpen size={31} strokeWidth={1.3} />
            <strong>INSIGHTS<span>/</span>AA</strong>
            <span>EXPERIENCE. SERVICE. ACCOUNTABILITY.</span>
          </div>
        </div>
      </section>
      <section className="sec white" aria-label="Published AA Wealth articles">
        <div className="wrap">
          <div className="insights-list-heading">
            <div><p className="eyebrow">From our team</p><h2>Latest articles.</h2></div>
            <span>{articles.length} {articles.length === 1 ? "ARTICLE" : "ARTICLES"} PUBLISHED</span>
          </div>
          {articles.length === 0 ? (
            <div className="insights-empty">
              <ShieldCheck size={34} aria-hidden="true"/>
              <h3>Our first insight is being prepared.</h3>
              <p>Visit again for practical guidance and industry updates.</p>
            </div>
          ) : (
            <div className="insights-article-list">
              {articles.map((article, index) => (
                <article key={article.slug} className={"insights-card" + (index === 0 ? " insights-card--featured" : "")}>
                  <div className="insights-card-marker"><span>AA</span><BookOpen size={23} aria-hidden="true"/></div>
                  <div className="insights-card-copy">
                    <p className="insights-card-meta">{article.category} <span>·</span> {prettyInsightDate(article.date)}</p>
                    <h3><Link to="/insights/$slug" params={{ slug: article.slug }}>{article.title}</Link></h3>
                    <p>{article.excerpt}</p>
                    <div className="insights-card-bottom">
                      <span>By {article.author}</span>
                      <Link to="/insights/$slug" params={{ slug: article.slug }}>Read article <ArrowUpRight size={17} aria-hidden="true" /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="sec ivory">
        <div className="wrap insights-bottom-note">
          <div>
            <p className="eyebrow">Need to speak to someone?</p>
            <h2>Questions about your cover or a policy deduction?</h2>
            <p>For policy-servicing and general complaint-route guidance, reach our support team. Do not include ID documents or sensitive grant credentials in an initial email.</p>
          </div>
          <a className="btn btn-green" href="mailto:support@aawealthmanagement.co.za">Contact support <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </section>
    </SiteLayout>
  );
}
