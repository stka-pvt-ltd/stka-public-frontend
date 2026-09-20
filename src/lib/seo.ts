/**
 * STKA Pvt Ltd — Centralized SEO Utilities
 *
 * Architecture: Static-First → Backend-Authoritative
 *
 * These utilities are DATA-AGNOSTIC — they accept parameters rather than
 * importing static data directly. This ensures the same functions work
 * whether called with static fallback data (initial SSR) or backend data
 * (after the backend becomes authoritative).
 *
 * Usage pattern:
 *   head()  → called with static fallback data  → SSR metadata (good for crawlers)
 *   component body → called with React state → updates when backend data loads
 */

import { SITE_URL } from "./config";

export { SITE_URL };

export const SITE_NAME = "STKA Pvt Ltd";

export const DEFAULT_DESCRIPTION =
  "STKA Pvt Ltd is a quality-focused pharmaceutical manufacturing company built around reliable production and scientific standards.";

/** Robots content for indexable public pages */
export const ROBOTS_INDEX = "index, follow";

/** Robots content for non-indexable utility/legal pages */
export const ROBOTS_NOINDEX = "noindex, follow";

// ─────────────────────────────────────────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Build a canonical URL from a site-relative path */
export function buildCanonical(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalised}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared meta builders
// ─────────────────────────────────────────────────────────────────────────────

type MetaItem = Record<string, string>;
type LinkItem = Record<string, string>;

interface PageMetaOptions {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/products/pantika-dsr" */
  path: string;
  ogType?: string;
  /** Stable public image URL (CDN/backend). Vite-hashed local assets are NOT suitable here. */
  ogImage?: string;
  robots?: string;
}

/**
 * Build standard meta array (title, description, OG, Twitter, robots).
 * Works for any page regardless of data source.
 */
export function buildPageMeta(options: PageMetaOptions): MetaItem[] {
  const {
    title,
    description,
    path,
    ogType = "website",
    ogImage,
    robots = ROBOTS_INDEX,
  } = options;
  const canonical = buildCanonical(path);

  const meta: MetaItem[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical },
    { property: "og:type", content: ogType },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }

  return meta;
}

/** Build canonical link array */
export function buildCanonicalLinks(path: string): LinkItem[] {
  return [{ rel: "canonical", href: buildCanonical(path) }];
}

/**
 * Dynamically synchronizes document <head> metadata (title, description, canonical,
 * OpenGraph, Twitter) in the browser when authoritative backend data arrives.
 * Preserves Static-First → Backend-Authoritative.
 */
export function updateDocumentMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  ogImage?: string;
}): void {
  if (typeof document === "undefined") return;

  // 1. Update document title
  document.title = options.title;

  // Helper to find or create a meta tag
  const setMeta = (attributeName: string, attributeValue: string, content: string) => {
    let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attributeName, attributeValue);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const canonicalUrl = buildCanonical(options.path);

  // 2. Meta description
  setMeta("name", "description", options.description);

  // 3. OpenGraph tags
  setMeta("property", "og:title", options.title);
  setMeta("property", "og:description", options.description);
  setMeta("property", "og:url", canonicalUrl);
  if (options.ogType) {
    setMeta("property", "og:type", options.ogType);
  }
  if (options.ogImage) {
    setMeta("property", "og:image", options.ogImage);
  }

  // 4. Twitter tags
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", options.title);
  setMeta("name", "twitter:description", options.description);
  if (options.ogImage) {
    setMeta("name", "twitter:image", options.ogImage);
  }

  // 5. Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", canonicalUrl);
}

// ─────────────────────────────────────────────────────────────────────────────
// Product SEO helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build head() meta for a product page.
 * Call with static fallback data in head() for SSR.
 * The same function can be called with backend data if head() is re-evaluated.
 *
 * NOTE: ogImage should only be passed when the URL is a stable public CDN/
 * backend URL. Vite-hashed local asset URLs are build-specific and work only
 * in SSR context; they are not suitable as social og:image values.
 */
export function buildProductPageHead(params: {
  slug: string;
  productName: string;
  description?: string | null;
  /** Stable image URL (backend CDN). Pass undefined for local fallback assets. */
  ogImageUrl?: string;
}): { meta: MetaItem[]; links: LinkItem[] } {
  const { slug, productName, description, ogImageUrl } = params;
  const path = `/products/${slug}`;
  const title = `${productName} | ${SITE_NAME}`;
  const desc = description
    ? description.slice(0, 160)
    : `Pharmaceutical formulation record for ${productName} — composition, dosage form, and specifications by ${SITE_NAME}.`;

  return {
    meta: buildPageMeta({ title, description: desc, path, ogType: "product", ogImage: ogImageUrl }),
    links: buildCanonicalLinks(path),
  };
}

/**
 * Build Product JSON-LD structured data.
 * Use in component body (not head()) so it re-renders when backend data loads.
 * Only includes factual fields — no price, ratings, reviews, or availability.
 */
export function buildProductJsonLd(product: {
  productName: string;
  description?: string | null;
  brand?: string | null;
  categoryName?: string | null;
  /** All resolved image URLs (backend CDN or local Vite assets — both work in JSON-LD body) */
  imageUrls?: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description:
      product.description ||
      `Pharmaceutical formulation ${product.productName} manufactured by ${SITE_NAME}.`,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    category: product.categoryName || "Pharmaceuticals",
    ...(product.imageUrls && product.imageUrls.length > 0
      ? { image: product.imageUrls }
      : {}),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Category SEO helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build head() meta for a category page.
 * Call with static fallback data in head() for SSR.
 */
export function buildCategoryPageHead(params: {
  slug: string;
  categoryName: string;
  description?: string | null;
  ogImageUrl?: string;
}): { meta: MetaItem[]; links: LinkItem[] } {
  const { slug, categoryName, description, ogImageUrl } = params;
  const path = `/categories/${slug}`;
  const title = `${categoryName} | ${SITE_NAME}`;
  const desc =
    description ||
    `Explore pharmaceutical formulations under ${categoryName} manufactured by ${SITE_NAME}.`;

  return {
    meta: buildPageMeta({ title, description: desc, path, ogType: "website", ogImage: ogImageUrl }),
    links: buildCanonicalLinks(path),
  };
}

/**
 * Build Category CollectionPage JSON-LD.
 * Use in component body so it updates when backend data loads.
 */
export function buildCategoryJsonLd(params: {
  categoryName: string;
  slug: string;
  description?: string | null;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.categoryName,
    url: buildCanonical(`/categories/${params.slug}`),
    description:
      params.description ||
      `Pharmaceutical products under ${params.categoryName} by ${SITE_NAME}.`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Breadcrumb JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL. Omit for the last (current) item. */
  url?: string;
}

/**
 * Build BreadcrumbList JSON-LD.
 * Use in component body for dynamic pages so it updates when data changes.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
