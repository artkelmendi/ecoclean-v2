# EcoClean

Industrial laundry and textile care website built with Next.js 15, React 19, Tailwind CSS 4 and GSAP.

## Run

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Development runs at localhost:3000. The production export is in `out/`; preview is http://localhost:4175/ecoclean-v2/. The catalog is at `/ecoclean-v2/catalog/`. The preview server supports PDF/video byte ranges. The existing GitHub Actions workflow deploys pushes to main.

## Content

The owner-supplied Albanian and English catalogs are the factual sources. See `CONTENT-SOURCES.md` for page mappings. Both original PDFs are preserved under `public/catalog/`; lightweight WebP pages let visitors browse without downloading a full PDF. Extracted selectable text lives in `src/data/`.

## Motion and accessibility

Each home section has its own restrained scroll treatment in `PageMotion.tsx`. The four-stage Streamline diagram follows native scrolling. Reduced motion removes these effects and stops automatic video playback. Video also pauses offscreen and in hidden tabs, with explicit play/pause controls.

The hero uses pre-encoded forward/reverse desktop and mobile films for continuous playback without browser reverse-seeking. The brief intro appears once per session, supports Skip and Escape, and is bypassed for deep links and reduced motion. The mobile menu supports keyboard focus containment/restoration. The catalog supports chapter buttons, page selection, arrow keys, original PDF access and selectable Albanian text.

See `DESIGN.md` and `QA.md` for design and verification notes.
