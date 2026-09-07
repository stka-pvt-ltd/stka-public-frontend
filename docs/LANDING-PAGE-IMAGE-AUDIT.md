# Landing Page Image & Data Source Audit — STKA Pvt Ltd

This document details the image source audit and dynamic data inventory for the STKA Pvt Ltd landing page (`/`).

---

## 1. Landing Page Image Source Audit

| Section | Component | Image / Asset | Source Type | Actual Source | Backend/API? | Static? | Notes |
|---|---|---|---|---|---|---|---|
| Header & Footer | `Logo` | Brand Badge (`ST`) | Static | CSS / Inline SVG | No | Yes | Permanent corporate brand graphic |
| Hero | `Hero` | Hero Banner Background | Backend | `GET /api/v1/public/banners` (`banner.image.imageUrl`) | Yes | No | Dynamic R2/Cloudinary banner managed via Admin API |
| Hero Fallback | `Hero` | `stka-hero.jpg` | Static Fallback | `@/assets/stka-hero.jpg` | No | Yes | Neutral fallback if backend banner is empty or image fails to load |
| Who We Are | `WhoWeAre` | Laboratory Environment | Static | `@/assets/stka-laboratory.jpg` | No | Yes | Permanent editorial corporate marketing asset |
| Portfolio | `PortfolioSection` $\rightarrow$ `CategoryFeature` | Category Image | Backend | `GET /api/v1/public/categories` (`category.categoryImage.imageUrl`) | Yes | No | Dynamic category showcase image |
| Portfolio Fallback | `CategoryFeature` | `stka-product-tablets.jpg` | Static Fallback | `@/assets/stka-product-tablets.jpg` | No | Yes | Neutral fallback if category image fails or is null |
| Products | `ProductsPreview` $\rightarrow$ `ProductCard` | Product Image | Backend | `GET /api/v1/public/products` (`product.productImages[0].imageUrl`) | Yes | No | Dynamic formulation image from backend catalog |
| Products Fallback | `ProductCard` | `stka-product-tablets.jpg` | Static Fallback | `@/assets/stka-product-tablets.jpg` | No | Yes | Neutral fallback if product has no images or image breaks |
| Quality | `QualitySection` | Laboratory Instruments | Static | `@/assets/stka-laboratory.jpg` | No | Yes | Quality control laboratory environment photo |
| Manufacturing | `ManufacturingSection` | Facility Unit | Static / Backend | `@/assets/stka-manufacturing.jpg` / `GET /api/v1/public/manufacturing` | Yes | Yes | Plant showcase image supporting live backend facility images |
| Why STKA | `WhyStka` | UI Arrow Icons | Static | `lucide-react` | No | Yes | Vector icons |
| Final CTA | `FinalCta` | Background styling | Static | CSS Tailwind `#29352F` | No | Yes | Decorative background styling |
| Footer | `SiteFooter` | Social & Mail Icons | Static | `lucide-react` | No | Yes | UI icons |

---

## 2. Landing Page Data Classification Audit

| Section | Data Item | Classification | Source | Endpoint / Source | Notes |
|---|---|---|---|---|---|
| Hero | Hero Title, Subtitle, Description, CTA Button | **REAL BACKEND DATA** | API | `GET /api/v1/public/banners` | Active banner loaded from local Spring Boot backend |
| Portfolio | Category Cards & Names | **REAL BACKEND DATA** | API | `GET /api/v1/public/categories` | Categories loaded dynamically from backend |
| Products | Featured Product Cards | **REAL BACKEND DATA** | API | `GET /api/v1/public/products` | Real formulations loaded from backend |
| Who We Are | Company Description & Stats | **INTENTIONAL STATIC CONTENT** | Static | Approved Corporate Messaging | Corporate brand intro text |
| Quality | Quality Philosophy Points | **INTENTIONAL STATIC CONTENT** | Static | Corporate Quality Philosophy | Standards overview |
| Manufacturing | Manufacturing Process Steps | **INTENTIONAL STATIC CONTENT / BACKEND** | Hybrid | `GET /api/v1/public/manufacturing` | Backend manufacturing units if available, fallback static overview |
| Why STKA | Value Proposition List | **INTENTIONAL STATIC CONTENT** | Static | Approved Corporate Messaging | Corporate principles |
| Reviews | Product Reviews / Testimonials | **NO BACKEND API** | N/A | None | Product review API does not exist in backend; no fake reviews displayed |

---

## 3. Backend API Verification Matrix

| Section | API Endpoint | Method | Data Source | Required Fields | Status |
|---|---|---|---|---|---|
| Hero | `/api/v1/public/banners` | `GET` | Spring Boot API | `title`, `subtitle`, `description`, `buttonText`, `buttonUrl`, `image` | **WORKING (200 OK)** |
| Categories | `/api/v1/public/categories` | `GET` | Spring Boot API | `categoryName`, `slug`, `description`, `categoryImage` | **WORKING (200 OK)** |
| Products | `/api/v1/public/products` | `GET` | Spring Boot API | `productName`, `slug`, `genericName`, `brand`, `strength`, `dosageForm`, `productImages` | **WORKING (200 OK)** |
| Company | `/api/v1/public/company` | `GET` | Spring Boot API | `companyName`, `legalName`, `email`, `address`, `city`, `companyLogo` | **WORKING (200 OK)** |
| Certifications | `/api/v1/public/certifications` | `GET` | Spring Boot API | `title`, `issuingAuthority`, `certificateNumber`, `issuedAt`, `expireAt`, `certificateImages` | **WORKING (200 OK)** |
| Manufacturing | `/api/v1/public/manufacturing` | `GET` | Spring Boot API | `title`, `description`, `displayOrder`, `active`, `images` | **WORKING (200 OK)** |
