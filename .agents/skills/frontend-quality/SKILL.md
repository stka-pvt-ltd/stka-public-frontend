---
name: frontend-quality
description: Maintain production-quality architecture, reusable components, API integration, responsive behavior, performance, security boundaries, and clean code for the separate STKA public website and admin panel.
---

# STKA Frontend Quality Skill

## Purpose

Use this skill whenever implementing, modifying, refactoring, reviewing, or debugging frontend code for STKA.

The STKA frontend system contains TWO independent applications:

1. Public Website
2. Admin Panel

They must remain logically and operationally separated.

---

# 1. Frontend Architecture

Recommended structure:

stka/
├── public-website/
└── admin-panel/

Each application should have:

- Independent build
- Independent deployment
- Independent environment configuration
- Independent routing
- Independent UI
- Independent authentication requirements

They communicate with the Spring Boot backend through REST APIs.

---

# 2. Domain Architecture

Expected deployment:

Public:

www.stka.com

Admin:

admin.stka.com

API:

api.stka.com

The exact domains may change.

Do not hard-code domains throughout the application.

Use environment configuration.

---

# 3. Public Website Rules

Public website should:

- Be accessible without authentication
- Consume public APIs
- Never expose admin controls
- Never expose admin routes
- Never contain admin credentials
- Never contain backend secrets

Public users should only receive data intended for public consumption.

---

# 4. Admin Rules

Admin panel should:

- Require authentication
- Use protected backend APIs
- Respect user roles
- Handle token/session state securely
- Redirect unauthenticated users to login
- Handle expired sessions
- Prevent unauthorized UI actions

Frontend authorization is NOT sufficient.

The backend must enforce authorization.

---

# 5. Backend API Structure

The backend is Spring Boot + PostgreSQL.

Expected public resources:

GET /api/v1/company-information

GET /api/v1/banners

GET /api/v1/categories

GET /api/v1/products

GET /api/v1/products/{id}

GET /api/v1/products/slug/{slug}

GET /api/v1/certifications

GET /api/v1/certifications/{id}

GET /api/v1/manufacturing

POST /api/v1/enquiries

Admin APIs may include:

POST /api/v1/admin/company-information

PUT /api/v1/admin/company-information

POST /api/v1/admin/banners

PUT /api/v1/admin/banners/{id}

DELETE /api/v1/admin/banners/{id}

POST /api/v1/admin/categories

PUT /api/v1/admin/categories/{id}

DELETE /api/v1/admin/categories/{id}

POST /api/v1/admin/products

PUT /api/v1/admin/products/{id}

DELETE /api/v1/admin/products/{id}

POST /api/v1/admin/certifications

PUT /api/v1/admin/certifications/{id}

DELETE /api/v1/admin/certifications/{id}

POST /api/v1/admin/manufacturing

PUT /api/v1/admin/manufacturing/{id}

DELETE /api/v1/admin/manufacturing/{id}

The exact endpoints must follow the actual backend implementation.

Never assume an endpoint exists.

---

# 6. API Separation

Keep API services separated.

Example:

services/
├── public/
│   ├── companyService
│   ├── bannerService
│   ├── categoryService
│   ├── productService
│   ├── certificationService
│   └── manufacturingService
│
└── admin/
    ├── companyService
    ├── bannerService
    ├── categoryService
    ├── productService
    ├── certificationService
    └── manufacturingService

Do not mix public and admin API logic unnecessarily.

---

# 7. TypeScript

Use strict TypeScript.

Avoid:

any

unless genuinely necessary.

Create types for:

CompanyInformation
Banner
Category
Product
Certification
Manufacturing
Enquiry
User
Role

Keep request and response types separate when appropriate.

Example:

ProductRequest

ProductResponse

---

# 8. Component Architecture

Avoid giant components.

Use reusable components.

Public example:

components/
├── layout/
├── hero/
├── products/
├── categories/
├── certifications/
├── manufacturing/
├── company/
└── common/

Admin example:

components/
├── layout/
├── sidebar/
├── tables/
├── forms/
├── uploads/
├── dashboard/
└── common/

---

# 9. Admin CRUD

Admin CRUD screens should consistently provide:

- List
- Search
- Filter
- Pagination
- Create
- Edit
- Delete
- Loading state
- Empty state
- Error state
- Success notification

Avoid inconsistent CRUD behavior between modules.

---

# 10. Tables

Admin tables should be:

- Responsive
- Sortable where useful
- Paginated
- Searchable where useful

Do not force large desktop tables onto small screens.

For mobile, consider:

- Card representation
- Horizontal scrolling only when genuinely necessary
- Responsive row layouts

---

# 11. Forms

Admin forms must include:

- Validation
- Loading state
- Error state
- Success state
- Disabled submit during request
- Clear labels
- Helpful descriptions

Separate large forms into logical sections.

---

# 12. Image Uploads

Images are uploaded through backend APIs and FileUploadService.

Frontend responsibilities:

- File selection
- Client-side validation
- Preview
- Upload request
- Loading state
- Error handling
- Existing image display
- Image removal

Never store cloud storage credentials in the frontend.

---

# 13. Banner Management

Banner management should support the backend Banner entity.

Potential fields:

- Title
- Subtitle
- Description
- Image
- CTA text
- CTA URL
- Display order
- Active status

Admin should be able to:

- Create banner
- Edit banner
- Upload banner image
- Reorder banners if supported
- Activate/deactivate banner
- Delete banner

Public website should display only active banners.

---

# 14. Manufacturing Management

Manufacturing content should be managed through the admin panel.

Possible fields:

- Title
- Description
- Facility information
- Production information
- Quality information
- Technology
- Safety/compliance
- Images

Do not assume exact fields until the backend Manufacturing entity is finalized.

The frontend should adapt to the actual backend DTO.

---

# 15. Company Information

Company information is a singleton-style resource.

Admin should manage:

- Company name
- Legal name
- Description
- Vision
- Mission
- Email
- Address
- City
- State
- Country
- Pin code
- Company logo

Public website consumes the public company-information endpoint.

---

# 16. Certification Management

Admin should manage:

- Title
- Issuing authority
- Certificate number
- Issued date
- Expiry date
- Certificate images

Public website displays published/available certification data.

Never fabricate certifications.

---

# 17. Product Management

Admin should manage:

- Product name
- Slug
- Generic name
- Brand
- Composition
- Strength
- Dosage form
- Description
- Category
- Images

Public website displays product catalogue.

---

# 18. Category Management

Admin should manage:

- Category name
- Slug
- Description
- Category image

Do not delete a category if products depend on it unless the backend explicitly supports safe reassignment/deletion.

---

# 19. State Management

Use appropriate state management.

Avoid unnecessary global state.

Keep server state and UI state conceptually separate.

Handle:

- Loading
- Success
- Error
- Empty
- Refetch

---

# 20. Authentication

Admin authentication must be implemented according to the backend authentication architecture.

Never:

- Store passwords
- Log tokens
- Expose secrets
- Trust role information from an unverified client
- Bypass backend authorization

If JWT is used, follow the actual backend security contract.

---

# 21. Error Handling

Handle HTTP errors consistently.

Examples:

400:
Display validation message.

401:
Authentication required or session expired.

403:
Insufficient permissions.

404:
Resource not found.

409:
Conflict such as duplicate slug/name/certificate number.

500:
Friendly generic error.

Never expose backend stack traces.

---

# 22. Performance

Public website:

Prioritize maximum performance.

Admin:

Prioritize responsive interaction and efficient data loading.

Use:

- Lazy loading
- Image optimization
- Efficient rendering
- Pagination
- API caching where appropriate
- Code splitting

Avoid fetching thousands of records unnecessarily.

---

# 23. Responsive Design

Public:

Premium mobile experience.

Admin:

Functional mobile experience.

Check:

320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px

No obvious overflow.

---

# 24. Code Quality

Before completing a task:

Remove:

- Unused imports
- Unused variables
- Dead code
- Console debugging
- Duplicate components
- Broken links
- Temporary placeholders

Use clear naming.

---

# 25. Verification

After making changes:

1. Run the project.
2. Run build.
3. Fix TypeScript errors.
4. Fix lint errors.
5. Check browser console.
6. Check all affected routes.
7. Check API requests.
8. Check loading/error states.
9. Check responsive layouts.
10. Check authentication boundaries.
11. Check image uploads.
12. Check navigation.

Never stop with known compilation or runtime errors.

---

# 26. Separation Rule

Never accidentally import admin components into the public website.

Never expose admin services through public UI.

Never put admin authentication logic into public components unless required by the architecture.

Keep the two applications independently deployable.