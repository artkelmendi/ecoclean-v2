# Search and share previews

## Implemented

- Unique English titles, descriptions, HTTPS canonical URLs and Open Graph/Twitter metadata for the home page and catalog.
- Separate 1200 × 630 JPEG share cards (approximately 43 KB each) using the original vector logo and the website's Poppins typography. Outlined SVG sources are preserved under `public/social/`; re-render with `node scripts/generate-brand-images.mjs`.
- A genuine Eco Clean multi-size ICO, square SVG, stable 96-pixel PNG favicon, 180-pixel Apple touch icon and 512-pixel organization logo.
- A static robots.txt that allows crawling and points to the sitemap; a sitemap containing the two canonical HTML pages. No invented modification dates or nonexistent translated page URLs.
- Home page JSON-LD for the laundry business, its visible address, current phone, services, website and page. Catalog JSON-LD for both supplied PDF editions and breadcrumbs. No invented opening hours, prices, ratings, coordinates or certifications.
- Direct server-rendered links to both original PDFs, with English and Albanian language hints.
- Current contact information shared between visible contact sections and structured data. See CONTENT-SOURCES.md.

All metadata, structured data and indexing files are present in the static export. Messaging crawlers do not have to run JavaScript. PDF content and the existing page animations are preserved.

## Validation and deployment

Run `npm run lint`, `npm run build`, then `npm run check:seo` using the same NEXT_PUBLIC_BASE_PATH and NEXT_PUBLIC_SITE_URL as the deployment. The GitHub Pages workflow checks the exported SEO before publishing. Checks cover distinct metadata and canonical URLs, sharing images, structured data, current contact details, crawlable PDF links, icons, sitemap, robots and noindex on the 404 page.

Google Search Console domain verification and sitemap submission are account-level actions separate from the deployed files. A crawlable sitemap is available at https://ecc-ks.com/sitemap.xml; listing it in robots.txt supports discovery even before manual submission. Search Console submission status must be verified in the account before reporting it complete.

Search placement, favicon appearance and social-app cache refreshes are controlled by the respective services. Metadata improvements do not guarantee a particular ranking or immediate preview refresh.
