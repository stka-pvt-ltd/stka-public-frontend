---
name: pharma-ui-design
description: Design and implement the premium STKA pharmaceutical public website and separate admin panel using a sophisticated, rich, minimal, scientific, corporate, and editorial design system.
---

# STKA Pharmaceutical UI Design Skill

## Purpose

Use this skill whenever designing, implementing, redesigning, or reviewing the UI of the STKA project.

STKA has TWO completely separate frontend applications:

1. Public Website
2. Admin Panel

They must have different UX goals while sharing the same underlying brand identity.

The public website represents STKA to customers, distributors, partners, and visitors.

The admin panel is an internal business management application used by authorized administrators to manage website content.

---

# 1. STKA Architecture

The system consists of:

Frontend 1:
Public Website

Example domain:

https://www.stka.com

Frontend 2:
Admin Panel

Example subdomain:

https://admin.stka.com

Backend:

Spring Boot REST API

Example:

https://api.stka.com

Database:

PostgreSQL

The frontends are separate applications and should be deployable independently.

DO NOT combine the public website and admin panel into one frontend application unless explicitly requested.

---

# 2. Public Website Design

The public website must feel:

- Premium
- Rich
- Modern
- Scientific
- Corporate
- Trustworthy
- Sophisticated
- Professional
- International

The website should look like a pharmaceutical manufacturing company.

It must NOT look like:

- Hospital website
- Medical clinic
- Online pharmacy
- Generic healthcare template
- SaaS dashboard
- Basic Bootstrap website

---

# 3. Public Website Brand

Use:

Deep Navy:
#0B1F3A

Royal Blue:
#1557A6

Pharmaceutical Blue:
#2B78C5

Light Blue:
#EAF4FB

Pharmaceutical Green:
#2A9D78

White:
#FFFFFF

Dark Text:
#17202A

Use navy as the primary corporate identity.

Use blue for interactive elements and important visual accents.

Use green sparingly.

Do not make every section blue.

---

# 4. Typography

Primary heading font:

Space Grotesk

Body font:

DM Sans

Typography should feel:

- Premium
- Modern
- Scientific
- Corporate

Use strong editorial headings.

Use small uppercase labels for section introductions.

Example:

PHARMACEUTICAL MANUFACTURING

ADVANCING HEALTHCARE
THROUGH QUALITY & INNOVATION

Avoid excessively large typography.

---

# 5. Public Website Layout

Use an:

ASYMMETRIC EDITORIAL

layout style.

Do NOT repeatedly create:

Heading
Paragraph
Three cards
Button

Instead use:

- Asymmetric grids
- Large photography
- Editorial layouts
- Overlapping elements
- Large typography
- Full-width visual sections
- Dark/light transitions
- Image mosaics
- Numbered sections
- Layered content
- Strong whitespace

Every section should feel intentionally designed.

---

# 6. Homepage

The homepage should contain:

Hero
Company Introduction
Company Highlights
Product Categories
Featured Products
Quality & Certifications
Manufacturing
Why STKA
Final CTA
Footer

The homepage must immediately communicate:

"STKA is a serious pharmaceutical manufacturer."

---

# 7. Hero

Never create:

Simple text-left + empty image-right.

Use:

- Large pharmaceutical imagery
- Strong typography
- Layered composition
- Primary CTA
- Secondary CTA
- Small eyebrow
- Subtle floating information

Suggested heading:

Advancing Healthcare
Through Quality & Innovation

Suggested eyebrow:

PHARMACEUTICAL MANUFACTURING

Primary CTA:

Explore Products

Secondary CTA:

Discover STKA

---

# 8. Public Content Must Be Dynamic

The public frontend must not hard-code company content unnecessarily.

Content should eventually come from backend APIs.

Dynamic content includes:

- Company Information
- Banners
- Categories
- Products
- Product Images
- Certifications
- Certificate Images
- Manufacturing Information
- Manufacturing Images
- Careers
- Enquiries

The UI must be designed so mock data can easily be replaced with API responses.

---

# 9. Banner Design

The Banner entity will control homepage/banner content.

A banner may contain:

- Title
- Subtitle
- Description
- Image
- CTA
- Link
- Display order
- Active status

Design banners as premium editorial hero/feature sections.

Do not make every banner look identical.

Support responsive imagery.

---

# 10. Product Design

Products should appear as a pharmaceutical catalogue.

Product cards may contain:

- Product image
- Product name
- Brand
- Generic name
- Composition
- Strength
- Dosage form
- Category
- View Product

Never include:

- Price
- Shopping cart
- Checkout
- Buy Now

The website is not an online pharmacy.

---

# 11. Certification Design

Certification UI should communicate trust.

Display:

- Certification title
- Issuing authority
- Certificate number
- Issue date
- Expiry date
- Certificate images

Never fabricate certifications.

Certificate images should have a professional viewer/lightbox.

---

# 12. Manufacturing Design

Manufacturing must feel technically credible.

Manufacturing content may include:

- Overview
- Facilities
- Production
- Quality Control
- Quality Assurance
- Technology
- Safety
- Compliance
- Manufacturing Images

Use large industrial/pharmaceutical imagery.

Avoid generic healthcare imagery.

---

# 13. Admin Panel Design

The admin panel must NOT look like the public website.

It should be:

- Clean
- Professional
- Functional
- Fast
- Data-oriented
- Easy to operate
- Responsive

The admin panel is a management application.

Prioritize usability over decorative design.

---

# 14. Admin Navigation

The admin panel should have a sidebar.

Suggested structure:

Dashboard

Company
- Company Information

Website
- Banners

Products
- Categories
- Products

Quality
- Certifications

Manufacturing
- Manufacturing Information

Careers
- Jobs

Enquiries
- Enquiries

Users
- Users
- Roles

Settings
- Profile
- Security

Use clear icons and labels.

---

# 15. Admin CRUD Design

Admin interfaces should support:

Create
Read
Update
Delete

where appropriate.

Use:

- Data tables
- Search
- Filters
- Pagination
- Forms
- Modals where useful
- Confirmation dialogs
- Toast notifications
- Empty states
- Loading states
- Error states

Destructive actions must require confirmation.

---

# 16. Admin Forms

Forms must be clean and structured.

Group related fields.

Example Product:

Basic Information
- Product Name
- Generic Name
- Brand

Product Details
- Composition
- Strength
- Dosage Form
- Description

Category
- Category selection

Images
- Product image upload

Use validation.

Show clear errors.

Do not overwhelm the admin with one giant form.

---

# 17. Image Management

Images are managed through the backend FileUploadService.

The frontend should:

- Upload images
- Display previews
- Show upload progress where possible
- Allow removal
- Show existing images
- Handle upload errors
- Validate file type and size on the client

Backend validation remains authoritative.

Do not expose storage credentials.

---

# 18. Public vs Admin UX

Public website:

Focus on:

- Branding
- Storytelling
- Products
- Trust
- Manufacturing
- Quality
- Enquiries

Admin:

Focus on:

- Data management
- CRUD
- Search
- Filtering
- Uploading
- Editing
- Status management

Do not mix these UX patterns.

---

# 19. Responsive Design

Public website:

Mobile-first and visually rich.

Admin panel:

Responsive and functional.

Support:

Mobile
Tablet
Laptop
Desktop

No horizontal scrolling.

---

# 20. Animation

Public website:

Use subtle premium animations.

Admin:

Use minimal functional transitions.

Avoid unnecessary animation in dashboards and forms.

---

# 21. No AI-Generated Feel

Never repeatedly generate:

Heading
Paragraph
Three cards
Button

The public website should have visual storytelling.

The admin should avoid unnecessary decorative UI.

Every component must have a purpose.

---

# 22. Content Integrity

Never fabricate:

- Certifications
- Awards
- Statistics
- Regulatory approvals
- Customer logos
- Testimonials
- Manufacturing capabilities
- Medical claims
- Company history

Use placeholders until real STKA data exists.

---

# 23. Final Visual Standard

Public website:

PREMIUM
RICH
SCIENTIFIC
EDITORIAL
CORPORATE

Admin:

CLEAN
FAST
FUNCTIONAL
PROFESSIONAL
DATA-ORIENTED

Both must feel like products from the same company.