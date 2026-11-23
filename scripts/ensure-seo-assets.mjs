import { copyFileSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Cloudflare's wrangler.jsonc serves static assets from dist/client.
// Make sitemap and robots delivery explicit rather than relying on the
// framework's public-folder copying behavior.
const outputDir = resolve("dist/client");
if (!existsSync(outputDir) || !statSync(outputDir).isDirectory()) {
  throw new Error("Missing dist/client after build; cannot publish SEO assets.");
}

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const expectedUrls = [
  "https://aawealthmanagement.co.za/",
  "https://aawealthmanagement.co.za/services",
  "https://aawealthmanagement.co.za/about",
  "https://aawealthmanagement.co.za/faq",
  "https://aawealthmanagement.co.za/contact",
  "https://aawealthmanagement.co.za/for-agents",
  "https://aawealthmanagement.co.za/for-brokers",
  "https://aawealthmanagement.co.za/insights",
];
if (!sitemap.startsWith('<?xml version="1.0"') ||
    !sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') ||
    !sitemap.includes("</urlset>") ||
    expectedUrls.some(url => !sitemap.includes("<loc>" + url + "</loc>"))) {
  throw new Error("Sitemap validation failed: expected XML and all five public routes.");
}

const robots = readFileSync("public/robots.txt", "utf8");
if (!robots.includes("Sitemap: https://aawealthmanagement.co.za/sitemap.xml")) {
  throw new Error("robots.txt must declare the canonical sitemap URL.");
}

// Every new published CMS article gets a discoverable sitemap URL on the next build.
const contentDir = resolve("content/insights");
const articleUrls = existsSync(contentDir)
  ? readdirSync(contentDir)
      .filter(name => /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name))
      .filter(name => {
        const source = readFileSync(resolve(contentDir, name), "utf8");
        return /^published:\s*true\s*$/m.test(source.split(/\n---\s*\n/, 1)[0] || source);
      })
      .map(name => "https://aawealthmanagement.co.za/insights/" + name.slice(0, -3))
  : [];
const articleEntries = articleUrls.map(url => "  <url><loc>" + url + "</loc></url>").join("\n");
const compiledSitemap = sitemap.replace("</urlset>", (articleEntries ? articleEntries + "\n" : "") + "</urlset>");
writeFileSync(resolve(outputDir, "sitemap.xml"), compiledSitemap, "utf8");
copyFileSync(resolve("public/robots.txt"), resolve(outputDir, "robots.txt"));
console.log("Published sitemap.xml with " + articleUrls.length + " insight URLs and robots.txt");

