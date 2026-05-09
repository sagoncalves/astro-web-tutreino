// src/utils/meta.ts

export const SITE_CONFIG = {
  name: "MasSocios",
  url: "https://www.massocios.com",
  appRegistrationUrl: "https://app.massocios.com/registro",
  social: {
    instagramUrl: "https://www.instagram.com/massocios/",
    twitterSite: "@massocios",
  },
  defaultDescription:
    "Automatización WhatsApp para gimnasios: consultas, pagos y reservas sin contratar más staff.",
  defaultImage: "/og-images/index-og-image.jpg",
  locale: "es_ES",
} as const;

export interface PageMeta {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  canonical?: string;
  noindex?: boolean;
}

export function createPageMeta(path: string, meta: PageMeta, staticOgImagePath?: string) {
  const fullUrl = `${SITE_CONFIG.url}${path}`;

  const ogImagePath = meta.ogImage || staticOgImagePath || SITE_CONFIG.defaultImage;

  const ogImage = ogImagePath.startsWith("http") ? ogImagePath : `${SITE_CONFIG.url}${ogImagePath}`;

  return {
    title: meta.title,
    description: meta.description || SITE_CONFIG.defaultDescription,
    ogTitle: meta.ogTitle || meta.title,
    ogDescription: meta.ogDescription || meta.description || SITE_CONFIG.defaultDescription,
    ogImage,
    ogType: meta.ogType || "website",
    ogUrl: fullUrl,
    ogSiteName: SITE_CONFIG.name,
    ogLocale: SITE_CONFIG.locale,
    ogImageWidth: "1200",
    ogImageHeight: "630",
    ogImageType: "image/jpeg",
    ogImageAlt: `${SITE_CONFIG.name} - ${meta.title}`,
    twitterCard: "summary_large_image",
    twitterTitle: meta.ogTitle || meta.title,
    twitterDescription: meta.ogDescription || meta.description || SITE_CONFIG.defaultDescription,
    twitterImage: ogImage,
    twitterImageAlt: `${SITE_CONFIG.name} - ${meta.title}`,
    canonical: meta.canonical || fullUrl,
    robots: meta.noindex ? "noindex, nofollow" : "index, follow",
  };
}

export const PAGE_META = {
  home: {
    title: `${SITE_CONFIG.name} — WhatsApp para gimnasios`,
    description: SITE_CONFIG.defaultDescription,
    ogImage: "/og-images/index-og-image.jpg",
    canonical: SITE_CONFIG.url,
  },
} as const;
