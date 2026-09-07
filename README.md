# STKA Public Website (`stka-pharma-craft`)

Public corporate pharmaceutical web application for STKA Pvt Ltd. Built with React 19, TanStack Start, TanStack Router, TanStack Query, and Tailwind CSS v4.

---

## 1. Overview & Business Purpose

`stka-pharma-craft` is the official public website for STKA Pvt Ltd, a quality-focused pharmaceutical manufacturing company.

### Key Business Goals
- Present STKA Pvt Ltd's scientific standards, manufacturing plant capabilities, and quality assurances.
- Display a structured, searchable pharmaceutical product portfolio across formulations, active composition, dosage forms, and therapeutic categories.
- Provide clear communication channels for commercial B2B enquiries, distribution inquiries, and career applications.
- Deliver SEO-optimized, accessible pages with fast load times and structured data schema.

---

## 2. Public Route Tree

The public application includes the following static and dynamic routes:

- **`/`**: Homepage featuring corporate overview, hero section, trust indicators, featured products, quality commitments, manufacturing process, and final CTA.
- **`/products`**: Filterable pharmaceutical catalogue with composition, dosage form, strength, and search.
- **`/products/$slug`**: Dynamic product detail page with formulation specifications, gallery, and JSON-LD `Product` & `BreadcrumbList` schemas.
- **`/categories`**: Therapeutic category directory outlining formulation architecture.
- **`/categories/$slug`**: Dynamic category detail page listing products belonging to a specific category.
- **`/about`**: Corporate overview page detailing company vision, mission, quality philosophy, and values.
- **`/manufacturing`**: Manufacturing infrastructure page displaying sterile units, quality control labs, and environmental standards.
- **`/quality`**: Dedicated quality assurance and certification page with certificate details.
- **`/careers`**: Careers page with job vacancy requisitions and employment application process.
- **`/contact`**: Contact and enquiry page with interactive form, PDF resume attachment support, and map coordinates fallback.
- **`/privacy-policy`**: Data privacy statement and submitted information handling rules (alias `/privacy` redirects here).
- **`/terms-and-conditions`**: Website terms of use and commercial disclaimer (alias `/terms` redirects here).
- **`404`**: Custom Not Found fallback page.

---

## 3. Key Features & Architectural Highlights

- **Server-Side Rendering & Nitro Engine**: TanStack Start SSR built on Vite 8 and Nitro server engine (`defaultPreset: "vercel"`).
- **Dynamic SEO & Metadata**:
  - Open Graph and Twitter cards on all pages.
  - Absolute production canonical links (`https://stkapvt.com/...`).
  - Google-indexed `sitemap.xml` and `robots.txt`.
  - JSON-LD structured data schemas for `Organization`, `WebSite`, `Product`, `CollectionPage`, `AboutPage`, `ContactPage`, and `BreadcrumbList`.
- **API Caching & Refetch UX**: React Query caching (`staleTime` tuned from 5 to 15 minutes) with graceful error fallbacks.
- **Client-Side Form Validation**: Contact and enquiry form with PDF document attachment validation (PDF only, max 5 MB limit).
- **Accessibility & Layout Stability**: High-contrast typography, focus rings, semantic landmark tags (`<main>`, `<nav>`, `<footer>`), and CLS prevention.

---

## 4. Technology Stack

- **React**: 19.2.0
- **Routing**: TanStack Router `1.170.18`
- **SSR Engine**: TanStack Start `1.168.32` with Nitro `3.0.260603-beta`
- **Data Fetching & Cache**: TanStack React Query `5.101.1`
- **Styling**: Tailwind CSS `4.2.1` with `@tailwindcss/vite`
- **Icons & Typography**: Lucide React `0.575.0`, DM Sans, Space Grotesk
- **Form Management & Validation**: React Hook Form `7.71.2`, Zod `3.24.2`
- **Build Tooling**: Vite `8.1.5`, TypeScript `5.8.3`

---

## 5. Local Setup & Commands

### Prerequisites
- Node.js `20.x` or higher
- `npm` package manager

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
# Local Development API Endpoint
VITE_API_URL=http://localhost:8080
```

### Installation & Development Server

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will start locally at **`http://localhost:5173`**.

### Production Build & Preview

```bash
# Build production bundle
npm run build

# Preview built production output
npm run preview
```

---

## 6. Vercel Deployment Guide

To deploy `stka-pharma-craft` as an independent Vercel project:

1. Import the repository in Vercel.
2. Set **Root Directory** to `stka-pharma-craft`.
3. Set **Framework Preset** to `Vite` or `Other`.
4. Configure Environment Variable:
   - `VITE_API_URL` = `https://api.stkapvt.com`
5. Click **Deploy**.
6. Attach custom production domains: `stkapvt.com` and `www.stkapvt.com`.

---

## 7. Link Back to Monorepo Root

- ⬅️ [Return to Root README](../README.md)
