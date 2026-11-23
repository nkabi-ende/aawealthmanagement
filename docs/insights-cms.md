# AA Wealth Insights — free GitHub-backed CMS

## Authoring

The website reads Markdown in \`content/insights/*.md\` at build time. The repository-root
\`.pages.yml\` config enables the free, open-source Pages CMS editor. No new database,
CMS API keys or client-side authoring endpoints were introduced.

**User account connection needed:** Open https://app.pagescms.org/, sign in with GitHub,
install/authorise Pages CMS for \`nkabi-ende/aawealthmanagement\`, and select the repository.
The repository owner must grant that app access. ChatGPT cannot complete account-level
authorisation on the owner's behalf. Use the **AA Wealth Insights** collection.

1. Create a post. Choose a unique lowercase slug, headline, short summary, author,
   publication date, category and article body.
2. Keep \`published: false\` while editing. On publish set it to \`true\`; set
   \`featured: true\` for homepage promotion.
3. Save in Pages CMS. It commits the Markdown to GitHub. Once the changed branch is
   deployed by the existing site pipeline, the listing and post URL are regenerated.
4. Confirm the production route, metadata and article links after deployment. The build
   script automatically adds all **published** article slugs to the generated sitemap.
5. Changes published via GitHub can trigger production deploys. Protect the default branch,
   restrict editor permissions and use a review/preview branch when legal or compliance
   review is required.

## Article routing

- Listing: \`/insights\`
- Individual: \`/insights/{filename-without-.md}\`
- Unpublished posts: excluded from the listing, route-loader lookup and generated sitemap.
- The homepage automatically selects the newest featured post (or newest public post).
- Category and byline are edited through the CMS. Dates use \`yyyy-MM-dd\`.

## Technical notes

- The Markdown parser handles headings, paragraphs, bold, lists, blockquotes and HTTP(S)
  source links, rendering safe React elements without executing embedded HTML.
- Avoid raw HTML, complex tables and inline images; the initial CMS rich-text field has
  image insertion disabled. Use plain Markdown and source hyperlinks.
- CMS frontmatter fields must remain single-line scalar values; the editor's excerpt field
  uses a string, not multiline text. If adding structured metadata later, use a YAML
  library rather than extending the small parser with ad hoc special cases.
- JSON-LD Article, canonical and social metadata derive from post frontmatter.
- The public sitemap source is \`public/sitemap.xml\`; \`scripts/ensure-seo-assets.mjs\`
  appends published article URLs when writing \`dist/client/sitemap.xml\`.
- A successful build proves pages were emitted, but it does not prove a CMS GitHub App
  connection or email mailbox provisioning.

## Editorial standards

- Verify factual and legal claims from official announcements, identifiable reporting,
  independent evidence or records before publishing.
- Separate reported allegations from findings; do not attribute conduct to named
  political parties, brokers or insurers without specific credible evidence.
- Do not invent source citations, commissions, statistics or legal conclusions.
- Review financial advice, policy and regulatory claims with the FSP principal.
- Never request grant PINs, ID scans or banking credentials through a blog comment form.
  This implementation deliberately has no comment or public upload system.

## Email addresses

- \`hello@aawealthmanagement.co.za\` — general enquiries and new cover.
- \`support@aawealthmanagement.co.za\` — policy-servicing questions, general complaints
  routing and support.
- **Mailbox/alias delivery has to be provisioned with the domain's email provider.**
  A \`mailto:\` link does not create the mailbox or guarantee it receives messages.
