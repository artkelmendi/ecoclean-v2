"use client";

import ArrowIcon from "@/components/ArrowIcon";

import { useEffect, useState } from "react";
import NextImage from "next/image";
import albanianPages from "@/data/catalog-pages.json";
import englishPages from "@/data/catalog-pages-en.json";
import { asset } from "@/lib/asset";

const CHAPTERS = [
  { page: 1, title: "Cover" }, { page: 4, title: "About Eco Clean" }, { page: 7, title: "Hotels" },
  { page: 9, title: "Restaurants & uniforms" }, { page: 11, title: "Hospitals" },
  { page: 13, title: "Streamline system" }, { page: 15, title: "Contact" },
];
const EDITIONS = {
  en: { label: "English", pages: englishPages, file: "/catalog/ecoclean-catalog-english.pdf", imagePrefix: "catalog-en-", language: "en" },
  sq: { label: "Shqip", pages: albanianPages, file: "/catalog/ecoclean-catalog-shqip.pdf", imagePrefix: "catalog-", language: "sq" },
} as const;
type Edition = keyof typeof EDITIONS;

export default function CatalogReader() {
  const [edition, setEdition] = useState<Edition>("en");
  const [current, setCurrent] = useState(1);
  const active = EDITIONS[edition];
  const pages = active.pages;
  useEffect(() => {
    const fromHash = () => {
      const match = location.hash.match(/^#page-(\d+)$/);
      if (match) setCurrent(Math.max(1, Math.min(pages.length, Number(match[1]))));
    };
    fromHash(); window.addEventListener("hashchange", fromHash); window.addEventListener("popstate", fromHash);
    return () => { window.removeEventListener("hashchange", fromHash); window.removeEventListener("popstate", fromHash); };
  }, [pages.length]);
  const go = (page: number) => { const next = Math.max(1, Math.min(pages.length, page)); setCurrent(next); history.replaceState(null, "", `#page-${next}`); };
  const page = pages[current - 1];
  const chapter = [...CHAPTERS].reverse().find(c => c.page <= current)?.page;
  return <section className="page-shell catalog-reader" aria-label="Catalog reader">
    <aside className="catalog-contents">
      <h2>Choose an edition</h2>
      <div className="catalog-editions" role="group" aria-label="Catalog edition">{(Object.keys(EDITIONS) as Edition[]).map(key => <button key={key} type="button" className="catalog-edition" aria-pressed={edition === key} onClick={() => setEdition(key)}>{EDITIONS[key].label}</button>)}</div>
      <nav aria-label="Catalog chapters">{CHAPTERS.map(c => <button key={c.page} type="button" onClick={() => go(c.page)} aria-current={chapter === c.page ? "location" : undefined}><span>{c.title}</span><span>{String(c.page).padStart(2, "0")}</span></button>)}</nav>
      <p>The original document is preserved in full, including its blank second page.</p><a className="text-link" href={asset(active.file)} target="_blank" rel="noopener noreferrer">Open {active.label} PDF <ArrowIcon /></a>
    </aside>
    <div className="catalog-reader-main" onKeyDown={e => { if ((e.target as HTMLElement).tagName === "SELECT") return; if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); } }}>
      <div className="reader-toolbar"><button type="button" aria-label="Previous page" onClick={() => go(current - 1)} disabled={current === 1}><ArrowIcon direction="left" /></button><label htmlFor="catalog-page-select">Page <select id="catalog-page-select" value={current} onChange={e => go(Number(e.target.value))}>{pages.map(p => <option key={p.page} value={p.page}>{p.page}</option>)}</select> of {pages.length}</label><button type="button" aria-label="Next page" onClick={() => go(current + 1)} disabled={current === pages.length}><ArrowIcon direction="right" /></button></div>
      <div className="catalog-paper" tabIndex={0} aria-label="Catalog page. Use left and right arrow keys to turn pages."><NextImage key={`${edition}-${current}`} onLoad={event => event.currentTarget.classList.add("page-ready")} src={asset(`/catalog/${active.imagePrefix}${String(current).padStart(2, "0")}.webp`)} width={776} height={1100} alt={`${active.label} catalog, page ${current}: ${page.title}`} lang={active.language} priority={current === 1} /></div>
      <p className="reader-status" role="status" aria-live="polite">{active.label} · Page {current} of {pages.length} · <span lang={active.language}>{page.title}</span></p>
      {page.text ? <details className="catalog-transcript" key={`${edition}-${current}`}><summary>Read page text</summary><p lang={active.language}>{page.text}</p></details> : <p className="reader-image-note">{current === 2 ? "This page is blank in the original catalog." : "This is an image page in the original catalog."}</p>}
    </div>
  </section>;
}
