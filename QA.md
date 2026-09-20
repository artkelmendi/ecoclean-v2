# Verification — 20 September 2026

## Production checks

- ESLint and Next.js production build passed; static export includes home and catalog routes under `/ecoclean-v2/`.
- Original catalog copy matches the supplied PDF by SHA-256. Preview returns PDF MIME and HTTP 206 for byte ranges.
- Browser console: no application errors or warnings observed during this pass.

## Browser checks

Chromium via Codex in-app browser against the production export. Browser zoom was accounted for when setting viewport overrides.

- No horizontal document overflow at CSS viewport widths 1920, 1440, 1366, 1024, 768, 430, 390 and 375.
- Visually inspected desktop process/textile sections, intro, and catalog; narrow-screen hero, menu and catalog reader.
- Catalog chapter selection, native page selector, disabled last-page control, arrow-key paging and Albanian text disclosure worked. Blank page 2 is preserved and explained.
- Mobile navigation opens/closes and catalog links reach the new page.
- Intro renders and clears; reduced-motion switching removes GSAP inline transforms, stops video and restores automatic anchor scrolling.
- Forward/reverse film verified by comparing decoded frames from its return leg with matching forward frames. Final encode normalizes timestamps to a constant 25 fps.
- English and Shqip editions both load in the catalog reader, including original-PDF links, page 7 chapter selection and the page-turn transition.
- Catalog opening sequence and intro-to-hero sequence were rendered in the production preview. No browser console errors or warnings were observed.

## Limits

Latest motion refinement: verified hidden hero title during the intro and full opacity afterward, repeat visits on a 390px viewport, centered edition labels, language/chapter switching, settled service transforms across additional scrolling, and dynamic reduced-motion cleanup. Production lint/build passed without warnings and browser console was clean. The mechanical detector remains unavailable.

No Safari, Firefox or physical-device performance testing. The PDF is deliberately preserved at its original 88.2 MB; the reader loads lightweight previews instead. Catalog statements are owner-provided, not independently certified. The previously attempted Impeccable detector was unavailable; rendered inspection and build checks were used.
