import type { Metadata } from "next";

const deploymentUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecc-ks.com/";
export const SITE_URL = `${deploymentUrl.replace(/^http:/, "https:").replace(/\/+$/, "")}/`;

export const BUSINESS = {
  name: "Eco Clean",
  phone: "+383 43 771 991",
  telephone: "+38343771991",
  street: "Magjistralja Prishtinë–Gjilan",
  locality: "Hajvali, Prishtinë",
};

export const HOME_TITLE = "Eco Clean | Industrial Laundry & Textile Care in Kosovo";
export const HOME_DESCRIPTION = "Industrial laundry and textile supply in Kosovo for hotels, restaurants, hospitals and workwear. Discover Eco Clean's linen care and stock management services.";
export const CATALOG_TITLE = "Company Catalog in English & Shqip | Eco Clean";
export const CATALOG_DESCRIPTION = "Explore Eco Clean's company catalog in English and Shqip. Discover hotel linen, restaurant textiles, hospital laundry, uniforms and the Streamline system.";

export function siteUrl(path = "/"): string {
  return new URL(path.replace(/^\//, ""), SITE_URL).toString();
}

export function pageMetadata({ title, description, path, image }: {
  title: string;
  description: string;
  path: string;
  image: string;
}): Metadata {
  const preview = {
    url: siteUrl(image), width: 1200, height: 630, type: "image/jpeg",
    alt: path === "/" ? "Eco Clean — The standard of clean. Industrial laundry and textile care in Kosovo." : "Eco Clean company catalog — English and Shqip editions.",
  };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: siteUrl(path) },
    openGraph: {
      type: "website", siteName: BUSINESS.name, locale: "en_US",
      url: siteUrl(path), title, description, images: [preview],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: preview.url, alt: preview.alt }] },
  };
}

const businessId = siteUrl("/#business");
const websiteId = siteUrl("/#website");

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DryCleaningOrLaundry", "@id": businessId,
      name: BUSINESS.name, alternateName: "EcoClean", url: siteUrl(),
      description: HOME_DESCRIPTION,
      telephone: BUSINESS.telephone,
      logo: { "@type": "ImageObject", url: siteUrl("/icons/eco-clean-logo.png"), width: 512, height: 512 },
      image: siteUrl("/social/eco-clean-share.jpg"),
      address: {
        "@type": "PostalAddress", streetAddress: BUSINESS.street,
        addressLocality: BUSINESS.locality, addressCountry: "XK",
      },
      areaServed: { "@type": "Country", name: "Kosovo" },
      hasOfferCatalog: {
        "@type": "OfferCatalog", name: "Textile supply and laundry services",
        itemListElement: [
          ["Hotel linen and laundry", "Bed linen, towels, textile supply, collection, cleaning and return."],
          ["Restaurant textile care", "Tablecloths, napkins, towels and restaurant textile cleaning."],
          ["Hospital linen and uniforms", "Textile supply and laundry services for healthcare linen and uniforms."],
          ["Workwear and uniforms", "Barcoded uniforms, inspection, repairs and thermal disinfection."],
        ].map(([name, description]) => ({
          "@type": "Offer", itemOffered: {
            "@type": "Service", name, description,
            provider: { "@id": businessId }, url: siteUrl("/#services"),
            areaServed: { "@type": "Country", name: "Kosovo" },
          },
        })),
      },
    },
    {
      "@type": "WebSite", "@id": websiteId, url: siteUrl(),
      name: BUSINESS.name, alternateName: "EcoClean", inLanguage: "en",
      publisher: { "@id": businessId },
    },
    {
      "@type": "WebPage", "@id": siteUrl("/#webpage"), url: siteUrl(),
      name: HOME_TITLE, description: HOME_DESCRIPTION, inLanguage: "en",
      isPartOf: { "@id": websiteId }, about: { "@id": businessId },
      primaryImageOfPage: { "@type": "ImageObject", url: siteUrl("/social/eco-clean-share.jpg"), width: 1200, height: 630 },
    },
  ],
};

export const catalogStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage", "@id": siteUrl("/catalog/#webpage"), url: siteUrl("/catalog/"),
      name: CATALOG_TITLE, description: CATALOG_DESCRIPTION, inLanguage: "en",
      isPartOf: { "@id": websiteId }, about: { "@id": businessId },
      breadcrumb: { "@id": siteUrl("/catalog/#breadcrumbs") },
      hasPart: [
        { "@type": "DigitalDocument", name: "Eco Clean company catalog — English", inLanguage: "en", fileFormat: "application/pdf", url: siteUrl("/catalog/ecoclean-catalog-english.pdf"), publisher: { "@id": businessId } },
        { "@type": "DigitalDocument", name: "Eco Clean company catalog — Shqip", inLanguage: "sq", fileFormat: "application/pdf", url: siteUrl("/catalog/ecoclean-catalog-shqip.pdf"), publisher: { "@id": businessId } },
      ],
    },
    {
      "@type": "BreadcrumbList", "@id": siteUrl("/catalog/#breadcrumbs"),
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Eco Clean", item: siteUrl() },
        { "@type": "ListItem", position: 2, name: "Company catalog", item: siteUrl("/catalog/") },
      ],
    },
  ],
};
