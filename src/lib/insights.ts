/** Git-backed editorial content. Pages CMS edits Markdown, this site publishes static pages. */
export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  published: boolean;
  featured: boolean;
  body: string;
};

const files = import.meta.glob("../../content/insights/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const unquote = (value: string): string => {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed) as string;
    } catch {
      return trimmed.slice(1, -1);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
};

export function parseInsight(slug: string, raw: string): Insight | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const normalised = raw.replace(/\r\n/g, "\n");
  const match = normalised.match(/^---\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return null;
  const fields: Record<string, string> = {};
  // The CMS uses simple top-level scalar fields. Article body holds the rich text.
  for (const line of match[1].split("\n")) {
    const found = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (found) fields[found[1]] = unquote(found[2]);
  }
  if (!fields.title || !fields.excerpt || !fields.date || !fields.author) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) return null;
  return {
    slug,
    title: fields.title,
    excerpt: fields.excerpt,
    author: fields.author,
    date: fields.date,
    category: fields.category || "Insights",
    published: fields.published === "true",
    featured: fields.featured === "true",
    body: match[2].trim(),
  };
}

const allInsights = Object.entries(files)
  .map(([path, raw]) => parseInsight(path.split("/").pop()!.replace(/\.md$/, ""), raw))
  .filter((entry): entry is Insight => Boolean(entry?.published))
  .sort((a, b) => b.date.localeCompare(a.date));

export const getInsights = (): Insight[] => allInsights;
export const getInsight = (slug: string): Insight | undefined =>
  allInsights.find((entry) => entry.slug === slug);
export const getFeaturedInsight = (): Insight | undefined =>
  allInsights.find((entry) => entry.featured) || allInsights[0];
export const prettyInsightDate = (date: string): string =>
  new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(new Date(date + "T12:00:00Z"));
