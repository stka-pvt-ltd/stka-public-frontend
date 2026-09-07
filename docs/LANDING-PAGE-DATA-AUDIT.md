# STKA Pvt Ltd — Landing Page Data Audit

## API & Data Source Overview

| Section | Source | Endpoint | Dynamic/Static | Status |
|---|---|---|---|---|
| Navigation | Frontend Router / Static | N/A | Static | Functional |
| Hero Section | Frontend & Backend | N/A | Static Visual / Copy | Functional (Faded STKA removed) |
| Trust / Highlights | Static / Business Values | N/A | Static | Functional |
| Company Section | Backend API | `/api/v1/public/company` | Dynamic | Functional (200 OK) |
| Category Section | Backend API | `/api/v1/public/categories?pageSize=6` | Dynamic | Functional (200 OK) |
| Product Catalogue | Backend API | `/api/v1/public/products?pageSize=8` | Dynamic | Functional (200 OK) |
| Certifications | Backend API | `/api/v1/public/certifications` | Dynamic | Functional (200 OK) |
| Banners | Backend API | `/api/v1/public/banners` | Dynamic | Functional (200 OK) |
| Manufacturing | Backend API / Static fallback | `/api/v1/public/manufacturing` | Dynamic (fallback to static) | Functional (200 OK) |
| Why STKA / Values | Static / Business Values | N/A | Static | Functional |
| Closing CTA | Static / UI | N/A | Static | Functional |
| Footer | Backend API & Navigation | `/api/v1/public/company` | Hybrid (Backend Info + Static Nav) | Functional (200 OK) |

## Data Flow & Failover Rules
1. **Local API Host**: `http://localhost:8080` (configured via `VITE_API_URL` / `APP_ALLOWED_ORIGINS`).
2. **Production API Host**: `https://api.stkapvt.com`.
3. **Failover**: Dynamic sections render appropriate error/empty UI states when endpoints return empty data or fail. No dummy/mock business data is inserted.
