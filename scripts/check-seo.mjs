import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import sharp from "sharp";

const site = `${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecc-ks.com").replace(/^http:/, "https:").replace(/\/+$/, "")}/`;
const absolute = path => new URL(path.replace(/^\//, ""), site).href;
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2].replaceAll("&amp;", "&")]));
const fileFor = url => {
  assert.ok(url.startsWith(site), `Asset is outside the canonical site: ${url}`);
  return `out/${url.slice(site.length)}`;
};
const previews = new Set();
const titles = new Set();
const descriptions = new Set();

for (const [file, route] of [["index.html", "/"], ["catalog/index.html", "/catalog/"]]) {
  const html = await readFile(`out/${file}`, "utf8");
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attrs(m[0]));
  const value = key => meta.filter(m => m.name === key || m.property === key);
  const one = key => { const entries = value(key); assert.equal(entries.length, 1, `${route}: expected one ${key}`); return entries[0].content; };
  const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(title.length, 1, `${route}: duplicate or missing title`);
  assert.ok(title[0][1].includes("Eco Clean"), `${route}: missing brand in title`);
  titles.add(title[0][1]);
  const description = one("description");
  assert.ok(description.length > 100 && description.length < 180, `${route}: description is missing or poorly sized`);
  descriptions.add(description);
  const canonicals = links.filter(l => l.rel === "canonical");
  assert.equal(canonicals.length, 1, `${route}: duplicate or missing canonical`);
  assert.equal(canonicals[0].href, absolute(route));
  assert.equal(one("og:url"), absolute(route));
  assert.equal(one("og:type"), "website");
  assert.equal(one("og:site_name"), "Eco Clean");
  assert.ok(one("og:image:alt").length > 15);
  assert.equal(one("og:image:width"), "1200");
  assert.equal(one("og:image:height"), "630");
  const image = one("og:image");
  assert.equal(one("twitter:card"), "summary_large_image");
  assert.equal(one("twitter:image"), image);
  previews.add(image);
  assert.ok(!one("robots").includes("noindex"), `${route}: accidentally blocked indexing`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route}: expected one main heading`);
  assert.ok(links.some(l => l.rel === "icon" && l.sizes === "96x96"));
  assert.ok(links.some(l => l.rel === "apple-touch-icon" && l.sizes === "180x180"));
  assert.ok(html.includes("tel:+38343771991"), `${route}: current phone missing`);
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${route}: missing or duplicated structured data`);
  const data = JSON.parse(scripts[0][1]);
  assert.equal(data["@context"], "https://schema.org");
  const types = data["@graph"].map(node => node["@type"]);
  for (const type of route === "/" ? ["DryCleaningOrLaundry", "WebSite", "WebPage"] : ["CollectionPage", "BreadcrumbList"]) {
    assert.ok(types.includes(type), `${route}: missing ${type}`);
  }
  if (route === "/") {
    const business = data["@graph"].find(node => node["@type"] === "DryCleaningOrLaundry");
    assert.equal(business.telephone, "+38343771991");
    assert.ok(html.includes(business.address.streetAddress), "Business address must match visible content");
    await stat(fileFor(business.logo.url));
  } else {
    for (const language of ["english", "shqip"]) {
      assert.ok(links.length > 0 && html.includes(`href="${new URL(site).pathname}catalog/ecoclean-catalog-${language}.pdf"`), `Missing crawlable ${language} PDF link`);
    }
  }
  console.log(`${route}: canonical, search metadata, social cards, icons, structured data and visible contact details verified`);
}
assert.equal(titles.size, 2, "Page titles must be distinct");
assert.equal(descriptions.size, 2, "Page descriptions must be distinct");
assert.equal(previews.size, 2, "Home and catalog should have distinct share artwork");
for (const url of previews) {
  const file = fileFor(url);
  const image = await sharp(file).metadata();
  assert.equal(image.width, 1200); assert.equal(image.height, 630);
  assert.equal(image.format, "jpeg");
  assert.ok((await stat(file)).size < 300000, "Social artwork should stay lightweight");
}
for (const [file, size] of [["icon-96", 96], ["apple-touch-icon", 180], ["eco-clean-logo", 512]]) {
  const image = await sharp(`out/icons/${file}.png`).metadata();
  assert.equal(image.width, size); assert.equal(image.height, size);
}
const sitemap = await readFile("out/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls.sort(), [absolute("/"), absolute("/catalog/")].sort());
const robots = await readFile("out/robots.txt", "utf8");
assert.ok(robots.includes("Allow: /"));
assert.ok(robots.includes(`Sitemap: ${absolute("/sitemap.xml")}`));
assert.ok((await readFile("out/404.html", "utf8")).includes('content="noindex"'), "The error page should not be indexed");
console.log("Indexing files, 404 handling, social image sizes and icon dimensions verified.");
