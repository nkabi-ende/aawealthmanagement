import { copyFileSync, existsSync, readFileSync, statSync } from "node:fs";
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

for (const filename of ["sitemap.xml", "robots.txt"]) {
  copyFileSync(resolve("public", filename), resolve(outputDir, filename));
  console.log("Published " + filename + " to dist/client");
}
