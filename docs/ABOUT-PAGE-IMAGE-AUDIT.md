# STKA Pvt Ltd — About Page Image Audit

## Image Source Classification & Status

| Section | Image | Source | Static/Backend | Actual File | Status |
|---|---|---|---|---|---|
| Section 01: Company Overview | Laboratory Environment | Project Asset | Static | `src/assets/stka-laboratory.jpg` | Verified & Loaded |
| Section 02: Our Approach | Scientific / Formulation Visual | Project Asset | Static | `src/assets/stka-hero.jpg` | Verified & Loaded |
| Section 04: Quality Commitment | Manufacturing Facility | Project Asset | Static | `src/assets/stka-manufacturing.jpg` | Verified & Loaded |

## Architectural Rules Enforced
1. **Static Visual Imagery**: All About page visual photographs are statically imported from `src/assets/`.
2. **No Backend Image Coupling**: About page imagery does NOT attempt to fetch `companyLogo` or backend banner API images.
3. **Broken Image Resolution**: Removed `companyInfo?.companyLogo?.imageUrl` fallback logic that previously attempted to load broken Cloudflare R2 bucket URLs.
4. **Distinct Image Assignment**: Each visual section renders a unique, high-resolution static asset without repetitive duplicate image usage.
