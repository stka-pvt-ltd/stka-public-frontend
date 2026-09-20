# STKA Pvt Ltd — Product Catalog SEO & Indexing Audit

**Document Location**: `docs/PRODUCT-CATALOG-SEO-AUDIT.md`  
**Audit Date**: September 20, 2026  
**Auditor**: Antigravity Technical Architecture Team  
**Scope**: Full catalog SEO readiness, dynamic routing, SSR crawler visibility, and sitemap coverage across both Backend and Static Fallback data sources.

---

## 1. Catalog Sources

### Authoritative Backend
- **Base URL (Local)**: `http://localhost:8080`
- **Base URL (Production)**: `https://api.stkapvt.com`
- **Catalog Endpoint**: `GET /api/v1/public/products` (supports pagination: `pageNumber`, `pageSize`, `sortBy`, `sortOrder`)
- **Single Product Endpoint**: `GET /api/v1/public/products/{slug}`
- **Category Filter Endpoint**: `GET /api/v1/public/products/category/{categoryId}`
- **Search Endpoint**: `GET /api/v1/public/products/search?keyword={query}`
- **Backend Models / DTOs**:
  - Entity: `com.backend.stka.model.Product`
  - DTO: `com.backend.stka.payload.product.ProductResponse` (fields: `id`, `productName`, `slug`, `genericName`, `brand`, `composition`, `strength`, `dosageForm`, `description`, `categoryId`, `categoryName`, `productImages`)

### Static / Fallback Catalog
- **Source File**: `src/data/products.ts` (`STATIC_PRODUCTS`)
- **Categories File**: `src/data/categories.ts` (`STATIC_CATEGORIES`)
- **Asset Images**: `src/assets/*.{jpg,png}`
- **Image Mapping**: `LOCAL_PRODUCT_IMAGES` strictly keyed by product `slug`
- **Purpose**: Provides instant client hydration, reliable fallback if the backend service or database connection is temporarily offline, and deterministic zero-downtime SEO indexing.

---

## 2. Product Coverage Matrix

The following table inventories every product formulation currently present across both sources, plus demonstrates architecture readiness for future backend entries:

| Product | Fallback Catalog | Backend API | Slug | Public URL | SEO Ready | Title | H1 | Canonical | Schema (JSON-LD) | Sitemap |
|---|---|---|---|---|---|---|---|---|---|---|
| **BEKAZYM** | `src/data/products.ts` | `/api/v1/public/products/bekazym-b-complex-l-lysine-syrup` | `bekazym-b-complex-l-lysine-syrup` | `https://stkapvt.com/products/bekazym-b-complex-l-lysine-syrup` | **YES** | `BEKAZYM \| STKA Pvt Ltd` | `BEKAZYM` | `https://stkapvt.com/products/bekazym-b-complex-l-lysine-syrup` | Product + BreadcrumbList | Included |
| **SGest 300 SR** | `src/data/products.ts` | `/api/v1/public/products/sgest-300-sr-tablets` | `sgest-300-sr-tablets` | `https://stkapvt.com/products/sgest-300-sr-tablets` | **YES** | `SGest 300 SR \| STKA Pvt Ltd` | `SGest 300 SR` | `https://stkapvt.com/products/sgest-300-sr-tablets` | Product + BreadcrumbList | Included |
| **Pantika IV** | `src/data/products.ts` | `/api/v1/public/products/pantika-iv` | `pantika-iv` | `https://stkapvt.com/products/pantika-iv` | **YES** | `Pantika IV \| STKA Pvt Ltd` | `Pantika IV` | `https://stkapvt.com/products/pantika-iv` | Product + BreadcrumbList | Included |
| **AS-MEGA** | `src/data/products.ts` | `/api/v1/public/products/as-mega-softgel-capsules` | `as-mega-softgel-capsules` | `https://stkapvt.com/products/as-mega-softgel-capsules` | **YES** | `AS-MEGA \| STKA Pvt Ltd` | `AS-MEGA` | `https://stkapvt.com/products/as-mega-softgel-capsules` | Product + BreadcrumbList | Included |
| **Pantika DSR** | `src/data/products.ts` | `/api/v1/public/products/pantika-dsr` | `pantika-dsr` | `https://stkapvt.com/products/pantika-dsr` | **YES** | `Pantika DSR \| STKA Pvt Ltd` | `Pantika DSR` | `https://stkapvt.com/products/pantika-dsr` | Product + BreadcrumbList | Included |
| **Rabka DSR** | `src/data/products.ts` | `/api/v1/public/products/rabka-dsr` | `rabka-dsr` | `https://stkapvt.com/products/rabka-dsr` | **YES** | `Rabka DSR \| STKA Pvt Ltd` | `Rabka DSR` | `https://stkapvt.com/products/rabka-dsr` | Product + BreadcrumbList | Included |
| **OS JOINT** | `src/data/products.ts` | `/api/v1/public/products/os-joint-tablets` | `os-joint-tablets` | `https://stkapvt.com/products/os-joint-tablets` | **YES** | `OS JOINT \| STKA Pvt Ltd` | `OS JOINT` | `https://stkapvt.com/products/os-joint-tablets` | Product + BreadcrumbList | Included |
| *[Future Backend Product Example: "ABC Softgel Capsules"]* | *None required* | `/api/v1/public/products/abc-softgel-capsules` | `abc-softgel-capsules` | `https://stkapvt.com/products/abc-softgel-capsules` | **YES (Auto)** | `ABC Softgel Capsules \| STKA Pvt Ltd` | `ABC Softgel Capsules` | `https://stkapvt.com/products/abc-softgel-capsules` | Product + BreadcrumbList | Dynamically Included |

---

## 3. Missing Products Analysis

- **Are any existing catalog products missing a public SEO URL?**  
  **No.** All 7 verified pharmaceutical formulation products have dedicated, crawlable URLs under `https://stkapvt.com/products/{slug}`.
- **Are any future products blocked?**  
  **No.** The dynamic TanStack Start route `/products/$slug` utilizes an asynchronous loader backed by `resolveProductBySlug(slug)`. When a new formulation is created in the backend (e.g. via `POST /api/v1/admin/products`), it is automatically indexable without altering a single line of frontend code.

---

## 4. Conflicts & Deduplication Strategy

- **Slug Conflicts / Duplicates**:
  - Neither source contains duplicate slugs within itself.
  - Where a product exists in both the backend database and the static fallback array (sharing the same slug, e.g. `as-mega-softgel-capsules`), the unified catalog resolver (`src/services/catalog-resolver.ts`) enforces **strict backend priority**.
  - Deduplication prevents duplicate URLs or dual canonical references: exactly one public URL (`https://stkapvt.com/products/{slug}`) exists for each product.
- **Slug Normalization**:
  - All slugs are normalized (lowercased, trimmed) during lookup and deduplication.
  - Hyphenated slug structure is human-readable and SEO-friendly.

---

## 5. Architectural Guarantees & Real Product Fields

### Real Product Fields Only (No Hallucinations / Unsupported Claims)
Every dynamically generated SEO tag, structured data item, and visible DOM element draws exclusively from authentic fields:
- `productName` → `<title>`, `<h1>`, `schema.org/Product.name`
- `genericName` → Subtitle, specification grid, meta description context
- `brand` → Eyebrow label, `schema.org/Brand.name`
- `composition` → Product specification table
- `strength` → Product specification table
- `dosageForm` → Product specification table
- `categoryName` → Category badge, breadcrumb trail, `schema.org/Product.category`
- `productImages` → Main hero presentation image, Open Graph image, `schema.org/Product.image`

*No invented medical benefits, unapproved indications, fabricated efficacy claims, or artificial ratings/reviews are generated.*

### Server-Side Rendering (SSR) & Crawler Discovery
- The route `/products/$slug` defines a TanStack Start `loader` that executes on the server during incoming crawler requests.
- The crawler receives fully rendered HTML containing:
  1. `<title>{productName} | STKA Pvt Ltd</title>`
  2. `<meta name="description" content="...">`
  3. `<link rel="canonical" href="https://stkapvt.com/products/{slug}" />`
  4. `<meta property="og:title" ... />`, `<meta property="og:image" ... />`
  5. `<script type="application/ld+json">` with Schema.org `Product` & `BreadcrumbList`
  6. `<h1 className="display-title ...">{productName}</h1>`
  7. Formulations specification `<dl>` with generic name, composition, dosage form, and strength.
- If a visitor or crawler visits `/products/invalid-slug`, the loader returns `null`, the route injects `<meta name="robots" content="noindex, nofollow" />`, sets `<title>Product Not Found | STKA Pvt Ltd</title>`, and renders a 404 UI without misrepresenting invalid slugs to Google.

### Dynamic XML Sitemap (`/sitemap.xml`)
- Served dynamically by `src/server.ts` via `generateSitemapXml()`.
- Automatically aggregates all core pages, categories, and products from both the live backend and fallback datasets.
- Cleanly excludes noindexed redirect/legal stubs (`/privacy`, `/terms`, etc.).
- Cached with `Cache-Control: public, max-age=3600, s-maxage=86400`.

---

## 6. Blockers & Mitigations

| Identified Risk / Constraint | Impact | Resolution / Mitigation |
|---|---|---|
| Local backend server not running during offline development | API requests to `http://localhost:8080` fail with connection refused | `resolveProductBySlug` catches network failure instantly and transparently falls back to `STATIC_PRODUCTS`. Zero crashes, 100% uptime. |
| Production API downtime or network partition | Crawler visiting product URL would encounter 500 error | Cascading resolution preserves 200 OK responses with complete static fallback specifications and metadata. |
| Admin introduces future product without frontend deployment | Frontend static array does not contain new product | TanStack Start SSR loader fetches directly from backend endpoint; metadata and sitemap update automatically without manual frontend code changes. |
