import { CONTACT_INFO } from "@/lib/contact";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thelumaa.com"
).replace(/\/$/, "");

export const SITE_NAME = "The Luma";

export const SITE_DESCRIPTION =
  "The Luma; kiraz çekirdeği göz maskeleri, lavantalı ısı yastıkları ve ritüel kutuları ile doğal ısı terapisi sunan, el emeği bir wellness markasıdır.";

export const DEFAULT_OG_IMAGE = "/hero.jpg";

/** Göreli yolu mutlak URL'ye çevirir. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** "₺1.100" / "₺950" -> "950" */
export function parsePrice(price: string): string {
  const digits = price.replace(/[^\d,]/g, "").replace(",", ".");
  return digits || "0";
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/images/logo.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: SITE_DESCRIPTION,
  email: CONTACT_INFO.email,
  telephone: CONTACT_INFO.phoneInternational,
  address: {
    "@type": "PostalAddress",
    addressLocality: "İstanbul",
    addressCountry: "TR",
  },
  areaServed: "TR",
  sameAs: [
    CONTACT_INFO.instagramUrl,
    "https://www.trendyol.com/magaza/the-luma-m-1190716",
    "https://www.hepsiburada.com/magaza/the-luma",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: CONTACT_INFO.phoneInternational,
    email: CONTACT_INFO.email,
    availableLanguage: ["Turkish"],
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "tr-TR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
