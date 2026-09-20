# STKA Pvt Ltd — Complete Website SEO & Indexing Architecture Audit

**Document Path**: `docs/SEO-AUDIT.md`  
**Date**: September 20, 2026  
**Auditor**: Antigravity Technical Architecture Team  
**Scope**: Entire Public Website (`stkapvt.com`) — Homepage, Catalog, Dynamic Products, Categories, Static Corporate Pages, Legal Stubs, SSR Rendering, Dynamic XML Sitemap, Robots Directives, Schema Structured Data, and Google Search Console Onboarding.

---

## 1. Executive Summary

This document establishes the comprehensive SEO, crawling, indexing, and structured data architecture implemented across the public web application of **STKA Pvt Ltd**. 

The system enforces a **Static-First → Backend-Authoritative Cascading Architecture**. It guarantees that search engine crawlers (Googlebot, Bingbot, etc.) receive complete, server-rendered HTML for every page, category, and formulation across both backend database records and static fallback datasets, with automatic zero-code support for future additions.

---

## 2. Public Routes Inventory & Coverage

| Route Path | Type | Title | Canonical URL | Indexing Directive | Schema Type |
|---|---|---|---|---|---|
| `/` | Homepage | `STKA Pvt Ltd \| Quality Pharmaceutical Manufacturing & Healthcare Solutions` | `https://stkapvt.com` | `index, follow` | `Organization`, `WebSite` |
| `/products` | Catalog Listing | `Pharmaceutical Products & Portfolio \| STKA Pvt Ltd` | `https://stkapvt.com/products` | `index, follow` | `CollectionPage` |
| `/products/{slug}` | Dynamic Formulation | `{productName} \| STKA Pvt Ltd` | `https://stkapvt.com/products/{slug}` | `index, follow` (404: `noindex, nofollow`) | `Product`, `BreadcrumbList` |
| `/categories` | Category Listing | `Pharmaceutical Product Categories \| STKA Pvt Ltd` | `https://stkapvt.com/categories` | `index, follow` | `CollectionPage` |
| `/categories/{slug}` | Dynamic Category | `{categoryName} \| Pharmaceutical Products \| STKA Pvt Ltd` | `https://stkapvt.com/categories/{slug}` | `index, follow` (404: `noindex, nofollow`) | `Category` / `CollectionPage`, `BreadcrumbList` |
| `/about` | Corporate Overview | `About Us \| STKA Pvt Ltd - Pharmaceutical Manufacturing Overview` | `https://stkapvt.com/about` | `index, follow` | `AboutPage` |
| `/manufacturing` | Infrastructure | `Manufacturing Capabilities & Infrastructure \| STKA Pvt Ltd` | `https://stkapvt.com/manufacturing` | `index, follow` | `BreadcrumbList` |
| `/quality` | Compliance & Certs | `Quality Assurance & Certifications \| STKA Pvt Ltd` | `https://stkapvt.com/quality` | `index, follow` | `BreadcrumbList` |
| `/contact` | Corporate Inquiries | `Contact Us \| STKA Pvt Ltd - Enquiries & Corporate Support` | `https://stkapvt.com/contact` | `index, follow` | `ContactPage` |
| `/careers` | Job Openings | `Careers at STKA Pvt Ltd \| Open Positions & Opportunities` | `https://stkapvt.com/careers` | `index, follow` | `BreadcrumbList` |
| `/privacy-policy` | Legal Policy | `Privacy Policy \| STKA Pvt Ltd` | `https://stkapvt.com/privacy-policy` | `noindex, follow` | None (Legal) |
| `/terms-and-conditions` | Legal Terms | `Terms & Conditions \| STKA Pvt Ltd` | `https://stkapvt.com/terms-and-conditions` | `noindex, follow` | None (Legal) |
| `/privacy` | 301 Redirect Stub | N/A (Redirects to `/privacy-policy`) | N/A | Disallowed in `robots.txt` | None |
| `/terms` | 301 Redirect Stub | N/A (Redirects to `/terms-and-conditions`) | N/A | Disallowed in `robots.txt` | None |

---

## 3. Data Sources & Resolution Priority

The web application connects two complementary layers of pharmaceutical catalog data:

### Authoritative Backend API
- **Local Dev**: `http://localhost:8080/api/v1`
- **Production**: `https://api.stkapvt.com/api/v1`
- **Endpoints**:
  - `GET /public/products` & `GET /public/products/{slug}`
  - `GET /public/categories` & `GET /public/categories/{slug}`
  - `GET /public/company`, `/public/manufacturing`, `/public/certifications`, `/public/banners`
- **Model**: `com.backend.stka.model.Product` / `ProductResponse`

### Static / Fallback Catalog
- **Products**: `src/data/products.ts` (`STATIC_PRODUCTS`)
- **Categories**: `src/data/categories.ts` (`STATIC_CATEGORIES`)
- **Images**: `src/assets/*.{jpg,png}`

### Resolution Order (`src/services/catalog-resolver.ts`)
1. **Try Authoritative Backend**: Query backend endpoint by normalized slug. If found, use backend data.
2. **Fallback to Static Dataset**: If backend is offline, times out, returns 5xx or 404, query static fallback arrays.
3. **Handle Not Found**: If slug does not exist in either layer, return `null` without redirects or fake data.
4. **Precedence**: When an entity exists in both sources, backend data strictly overrides fallback data.

---

## 4. Generic Future Product & Category Architecture

A critical architectural requirement is that future products or categories created in the backend require **zero frontend modifications**:

### Future Backend Formulation Workflow
1. Admin creates a new formulation (e.g. `productName: "ABC Softgel Capsules"`, `slug: "abc-softgel-capsules"`) via the STKA Admin portal or backend API.
2. When Googlebot or a visitor requests `https://stkapvt.com/products/abc-softgel-capsules`:
   - TanStack Start server `loader` runs `resolveProductBySlug("abc-softgel-capsules")`.
   - The backend API responds with the new record.
   - Server-side `head` dynamically synthesizes title (`ABC Softgel Capsules | STKA Pvt Ltd`), formulation meta description, Open Graph tags, canonical link, and JSON-LD schemas.
   - The server HTML body renders the formulation name in `<h1>`, dosage form, composition, and specs.
3. When `/sitemap.xml` is requested:
   - Dynamic sitemap generator (`generateSitemapXml`) queries `/api/v1/public/products?pageSize=500`.
   - The URL `https://stkapvt.com/products/abc-softgel-capsules` is automatically included in the XML feed with `priority 0.8`.

*No developer intervention, no hardcoding, and no frontend redeployment is required.*

---

## 5. Metadata & Canonical Strategy

### Title Architecture
- **Homepage**: `STKA Pvt Ltd | Quality Pharmaceutical Manufacturing & Healthcare Solutions`
- **Product**: `{Product Name} | STKA Pvt Ltd`
- **Category**: `{Category Name} | Pharmaceutical Products | STKA Pvt Ltd`
- **Static Page**: `{Page Name} | STKA Pvt Ltd` (e.g. `Manufacturing Capabilities & Infrastructure | STKA Pvt Ltd`)

### Meta Description Architecture
- Formulated exclusively from authentic data fields (`productName`, `genericName`, `composition`, `strength`, `dosageForm`, `categoryName`, `description`).
- Strictly avoids unsupported medical claims (no "cures", "treats", "clinically proven", or "guaranteed").
- Maximum length capped at 160 characters for SERP snippet optimization.

### Canonical URLs
- **Root Domain**: `https://stkapvt.com`
- **Strict Single-URL Policy**:
  - Exactly one canonical URL per product (`https://stkapvt.com/products/{slug}`).
  - Exactly one canonical URL per category (`https://stkapvt.com/categories/{slug}`).
  - Strips all tracking, pagination, or filter query parameters from canonical tags.
  - Zero database UUIDs or internal IDs exposed in canonical URLs.
  - Consistent non-trailing-slash convention.

---

## 6. Structured Data (Schema.org JSON-LD)

Implemented with authentic, verified fields only:

1. **Organization** (Homepage):
   - `@type: Organization`
   - `name`: "STKA Pvt Ltd"
   - `legalName`: "STKA PVT LTD"
   - `url`: "https://stkapvt.com"
   - `logo`: "https://stkapvt.com/favicon.svg"
   - `address`: Street, Darbhanga, Bihar, India
   - `contactPoint`: Customer Support (+91-9625979342, info@stkapvt.com)
2. **WebSite** (Homepage):
   - `@type: WebSite`
   - `name`: "STKA Pvt Ltd"
   - `url`: "https://stkapvt.com"
3. **Product** (`/products/$slug`):
   - `@type: Product`
   - `name`: Actual product formulation name
   - `url`: Self-referencing canonical URL
   - `brand`: Real brand name
   - `category`: Real therapeutic category
   - `description`: Verified specification overview
   - `image`: Real packaging image URL
   - *Excludes fabricated prices, ratings, reviews, or GTINs.*
4. **BreadcrumbList** (Products, Categories, Subpages):
   - Hierarchy: `Home → Products → [Category] → Product`
5. **CollectionPage** (`/products`, `/categories`):
   - Structured collection taxonomy for catalog listings.
6. **AboutPage** & **ContactPage**:
   - Standard Schema.org descriptors for corporate credibility.

---

## 7. Server-Side Rendering (SSR) & Crawler Discovery

Using TanStack Start with Vite & Nitro:
- Dynamic product (`src/routes/products.$slug.tsx`) and category (`src/routes/categories.$slug.tsx`) routes implement asynchronous route `loader` functions.
- The loader resolves the entity on the server before emitting the initial HTML.
- **Verification of Server Output**:
  - Crawlers without JavaScript support immediately receive the complete `<head>` (`<title>`, meta tags, canonical link, OG tags, JSON-LD scripts) and `<body>` (`<h1>`, spec tables, breadcrumbs).
  - Search engines do not experience empty initial shells or layout shifts.

---

## 8. Dynamic XML Sitemap & Robots.txt

### Dynamic Sitemap (`/sitemap.xml`)
- Handled at the server entry point ([`src/server.ts`](file:///a:/stka%20pvt%20ltd/stka-pharma-craft/src/server.ts)).
- Intercepts requests for `/sitemap.xml` and dynamically executes `generateSitemapXml()`.
- Combines:
  - All 8 core static pages
  - All verified categories from backend + fallback
  - All verified products from backend + fallback
- Excludes:
  - Disallowed redirect stubs (`/privacy`, `/terms`)
  - Noindexed policy pages (`/privacy-policy`, `/terms-and-conditions`)
- Cache headers: `public, max-age=3600, s-maxage=86400`.
- Static mirror maintained at [`public/sitemap.xml`](file:///a:/stka%20pvt%20ltd/stka-pharma-craft/public/sitemap.xml) for offline or static hosting environments.

### Robots.txt ([`public/robots.txt`](file:///a:/stka%20pvt%20ltd/stka-pharma-craft/public/robots.txt))
- Permits unrestricted access to public content for all major search crawlers:
  - `User-agent: Googlebot`, `Allow: /`
  - `User-agent: Bingbot`, `Allow: /`
  - `User-agent: *`, `Allow: /`
- Explicitly disallows redirect stubs:
  - `Disallow: /privacy`
  - `Disallow: /terms`
- Declares canonical sitemap location:
  - `Sitemap: https://stkapvt.com/sitemap.xml`

---

## 9. Image SEO & Accessibility

All imagery utilizes contextually accurate, descriptive `alt` attributes:
- **Products**: `alt="{productName} product presentation"` and `alt="{productName} thumbnail {n}"`
- **Categories**: `alt="{categoryName} pharmaceutical category"`
- **Facilities**: Descriptive captions for cleanrooms, sterile liquid lines, and analytical laboratories
- **No Generic Fallbacks**: Avoids keyword-stuffed strings or low-value alt text such as "image" or "photo".

---

## 10. Internal Linking Architecture

Search engine crawlers can traverse the complete catalog via standard HTML hyperlinks:
```
Homepage (/)
  ├── Primary Navigation
  │     ├── Products (/products)
  │     │     └── Formulation Cards ──> /products/{slug}
  │     ├── Categories (/categories)
  │     │     └── Category Cards ────> /categories/{slug}
  │     │                                └── Formulation Cards ──> /products/{slug}
  │     ├── About (/about)
  │     ├── Manufacturing (/manufacturing)
  │     ├── Quality (/quality)
  │     ├── Careers (/careers)
  │     └── Contact (/contact)
  └── Featured Portfolio Sections
        ├── ProductsPreview ───────────> /products/{slug}
        └── PortfolioSection ──────────> /categories/{slug}
```
All links use descriptive anchor text and SEO-friendly slug parameters. No JavaScript-only `onClick` routing or URL fragments are used for primary navigation.

---

## 11. 404 & Soft-404 Prevention

When an invalid or deleted slug is requested (e.g. `/products/non-existent-formulation` or `/categories/invalid-category`):
- The loader returns `null`.
- The `head` function emits:
  - `<title>Product Not Found | STKA Pvt Ltd</title>`
  - `<meta name="robots" content="noindex, nofollow" />`
  - `<meta name="description" content="The requested pharmaceutical product formulation is not listed in our catalogue." />`
- The component renders a structured 404 notification with navigation back to `/products`.
- This ensures Googlebot never indexes soft 404s or misattributes non-existent formulations to the catalog.

---

## 12. Google Search Console Onboarding Guidelines

Once deployed to production (`https://stkapvt.com`), follow these standard operations:

1. **Verify Domain Ownership**:
   - Add property in Google Search Console using DNS TXT record or HTML tag verification.
2. **Submit Sitemap**:
   - Navigate to **Sitemaps** in the Search Console dashboard.
   - Enter `https://stkapvt.com/sitemap.xml` and click **Submit**.
   - Confirm status reports "Success" and total discovered URLs matches catalog count.
3. **URL Inspection & Priority Indexing**:
   - Use the **URL Inspection** tool on primary landing pages:
     - `https://stkapvt.com/`
     - `https://stkapvt.com/products`
     - `https://stkapvt.com/categories`
     - Key formulations (e.g. `https://stkapvt.com/products/as-mega-softgel-capsules`, `https://stkapvt.com/products/pantika-dsr`)
   - Click **Request Indexing** for immediate crawler queueing.
4. **Monitor Indexing Coverage**:
   - Review the **Pages** report weekly to verify pages transition from "Discovered - currently not indexed" to "Indexed".
   - Confirm zero "Soft 404" or "Duplicate without user-selected canonical" warnings.
5. **Monitor Core Web Vitals & Mobile Usability**:
   - Review mobile experience, Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS).

> [!IMPORTANT]
> **SEO Expectation Alignment**:
> Technical SEO readiness guarantees that the site is fully compliant, crawlable, and indexable. Google controls crawling schedules, indexation timelines, and SERP ranking algorithms independently. No implementation guarantees instant indexing or top rankings.

---

## 13. Identified Limitations & Future Recommendations

| Area | Current State | Recommendation for Future Phases |
|---|---|---|
| Image CDN Optimization | Local assets bundled via Vite; backend images served via Cloudflare R2 | Consider implementing an image transform proxy (e.g. Cloudflare Images or Next/Unpic) for auto WebP/AVIF generation if bandwidth scales. |
| Blog / News Section | Not present in existing company scope | If STKA begins publishing pharmaceutical research or press releases, establish `/news` and `/news/$slug` using the same dynamic loader architecture. |
| Multilingual SEO | Single language (English) | If expanding to international export markets, implement `hreflang` alternate links for target languages. |
