import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import InsightBody from "@/components/InsightBody";
import { getInsight, prettyInsightDate } from "@/lib/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = getInsight(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "AA Wealth Insights" }] };
    const article = loaderData;
    const url = "https://aawealthmanagement.co.za/insights/" + article.slug;
    return {
      meta: [
        { title: article.title + " | AA Wealth Insights" },
        { name: "description", content: article.excerpt },
        { name: "author", content: article.author },
        { property: "article:published_time", content: article.date },
        { property: "og:type", content: "article" },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://aawealthmanagement.co.za/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { "@type": "Person", name: article.author },
            publisher: {
              "@type": "Organization",
              name: "AA Wealth Management",
              url: "https://aawealthmanagement.co.za",
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: InsightArticle,
});

function InsightArticle() {
  const article = Route.useLoaderData();
  return (
    <SiteLayout>
      <article className="insight-article">
        <header className="insight-article-hero">
          <div className="wrap insight-article-hero-wrap">
            <Link to="/insights" className="insight-back"><ArrowLeft size={15} aria-hidden="true" /> All insights</Link>
            <p className="insights-eyebrow"><span /> {article.category.toUpperCase()} / AA WEALTH</p>
            <h1>{article.title}</h1>
            <p className="insight-article-lead">{article.excerpt}</p>
            <div className="insight-byline">
              <span className="insight-author-mark" aria-hidden="true">BN</span>
              <div><strong>{article.author}</strong><span>AA Wealth Management · {prettyInsightDate(article.date)}</span></div>
              <BookOpen size={21} aria-hidden="true" />
            </div>
          </div>
        </header>
        <div className="wrap insight-article-grid">
          <aside className="insight-article-side">
            <span>AA / EDITORIAL</span>
            <p>Consumer protection and responsible insurance distribution.</p>
            <div className="insight-article-rule"/>
            <Link to="/insights">More perspectives <ArrowRight size={15} aria-hidden="true" /></Link>
          </aside>
          <div>
            <InsightBody content={article.body} />
            <div className="insight-editorial-disclaimer">
              <ShieldCheck size={21} aria-hidden="true" />
              <p>AA Wealth Management · FSP 50739. Information is general in nature and is not personal financial or legal advice. For a suspected unauthorised deduction, contact SASSA and the insurer directly.</p>
            </div>
            <div className="insight-article-end">
              <Link to="/insights" className="insight-end-link"><ArrowLeft size={16} aria-hidden="true" /> Back to Insights</Link>
              <a href="mailto:support@aawealthmanagement.co.za?subject=Policy%20servicing%20enquiry" className="insight-end-link">Contact our support team <ArrowRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
