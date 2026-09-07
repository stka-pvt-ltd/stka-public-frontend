---
name: seo-accessibility
description: Implement production-quality SEO, semantic HTML, accessibility, crawlability, metadata, structured data, and public/admin UX standards for the separate STKA website applications.
---

# STKA SEO & Accessibility Skill

## Purpose

Use this skill whenever creating, modifying, reviewing, or optimizing public website pages or admin interfaces.

SEO primarily applies to the PUBLIC WEBSITE.

The ADMIN PANEL should generally NOT be indexed by search engines.

---

# 1. Application Separation

STKA has:

Public Website:
www.stka.com

Admin:
admin.stka.com

API:
api.stka.com

The public website is SEO-oriented.

The admin panel is private and should be protected from indexing.

---

# 2. Public Website SEO

Important public pages include:

/

 /about

/products

/products/{slug}

/manufacturing

/quality-certifications

/careers

/contact

Each important public page must have:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph metadata
- Appropriate heading hierarchy

---

# 3. Homepage SEO

Suggested title:

STKA Pvt Ltd | Pharmaceutical Manufacturing Company

Suggested description:

STKA Pvt Ltd is a pharmaceutical manufacturing company focused on quality, reliable manufacturing, scientific excellence, and healthcare partnerships.

Do not keyword stuff.

Use actual company-approved content when available.

---

# 4. Product SEO

Every public product should have a crawlable URL.

Preferred:

/products/{slug}

Example:

/products/example-product

Avoid:

/product?id=123

or:

/products?productId=123

Product pages should have:

- Unique title
- Unique description
- Canonical URL
- Product name
- Relevant product information
- Meaningful images
- Breadcrumbs where appropriate

---

# 5. Dynamic SEO

Because products, categories, certifications, banners, company information, and manufacturing content come from the backend, metadata should be generated from actual API data where appropriate.

Do not use one generic title for every product page.

---

# 6. Admin SEO

The admin panel should NOT be indexed.

Implement appropriate protection such as:

robots directives
noindex
authentication
non-public routing

Do not expose admin content to search engines.

The exact implementation should follow the frontend framework.

---

# 7. API SEO

The backend API is not a public website.

Do not attempt to index API endpoints.

API responses should not be treated as SEO pages.

---

# 8. Semantic HTML

Use:

<header>
<nav>
<main>
<section>
<article>
<footer>

Use semantic elements according to meaning.

Avoid using div for every element.

---

# 9. Heading Hierarchy

Each public page should have one primary H1.

Example:

H1:
Advancing Healthcare Through Quality & Innovation

H2:
About STKA

H2:
Our Pharmaceutical Portfolio

H2:
Quality & Compliance

H2:
Manufacturing

H2:
Why STKA

Do not choose heading levels based only on visual size.

---

# 10. Image Accessibility

Every meaningful image needs meaningful alt text.

Example:

alt="STKA pharmaceutical manufacturing facility"

Example:

alt="Pharmaceutical product packaging"

Avoid:

alt="image"

alt="photo"

Do not stuff keywords into alt text.

Decorative images may use:

alt=""

where appropriate.

---

# 11. Product Images

Product images should have meaningful alt text.

Example:

alt="STKA [Product Name] pharmaceutical product"

Use actual product names from backend data.

Do not fabricate product descriptions.

---

# 12. Certification Images

Certification images should have meaningful accessible descriptions.

Example:

alt="STKA certification issued by [Authority]"

Use actual certification information.

Never fabricate certification data.

---

# 13. Navigation

Public navigation must use crawlable links.

Use meaningful labels:

About STKA

Explore Products

Manufacturing

Quality & Certifications

Contact STKA

Avoid generic:

Click Here

Learn More

when more descriptive text is possible.

---

# 14. Internal Linking

Create logical internal links.

Examples:

Home
→ About

Home
→ Products

Products
→ Category

Products
→ Product Details

Product
→ Related Products

Quality
→ Certifications

Manufacturing
→ Contact

Contact
→ Enquiry

---

# 15. Breadcrumbs

Use breadcrumbs where useful.

Example:

Home
/
Products
/
Category
/
Product Name

Breadcrumbs should represent real page hierarchy.

---

# 16. Structured Data

Use structured data where appropriate.

Possible schemas:

Organization

WebSite

BreadcrumbList

Product

Only use schemas supported by actual page content.

Never fabricate:

- Ratings
- Reviews
- Prices
- Awards
- Certifications

---

# 17. Pharmaceutical Content

Never generate unsupported pharmaceutical claims.

Do not create:

"100% safe"

"Guaranteed cure"

"Best medicine"

"Treats all diseases"

"Clinically proven"

unless officially verified and approved company content exists.

Do not provide dosage recommendations.

The website is a corporate pharmaceutical website.

---

# 18. Certification Content

Certification information must come from backend data.

Supported:

- Title
- Issuing authority
- Certificate number
- Issue date
- Expiry date
- Images

Never invent certifications.

---

# 19. Forms

Public enquiry forms must have:

- Labels
- Required indicators
- Validation
- Error messages
- Accessible descriptions
- Keyboard support
- Success state
- Loading state

Example:

Email address is invalid.

Avoid:

Error 400.

---

# 20. Accessibility

Support:

- Keyboard navigation
- Screen readers
- Focus states
- Semantic HTML
- Accessible buttons
- Accessible forms
- Appropriate ARIA attributes
- Good color contrast

Do not use ARIA when native HTML already provides the required semantics.

---

# 21. Buttons vs Links

Use:

button

for actions.

Use:

a

for navigation.

Do not make div elements behave like buttons unnecessarily.

---

# 22. Focus States

Every interactive element should have a visible focus state.

Do not remove focus outlines unless an accessible alternative is provided.

---

# 23. Color Contrast

Ensure sufficient contrast for:

- Body text
- Headings
- Buttons
- Navigation
- Form labels
- Error messages
- Footer content

Do not communicate important information using color alone.

---

# 24. Reduced Motion

Respect:

prefers-reduced-motion

Non-essential animations should be reduced or disabled for users who request reduced motion.

---

# 25. Mobile Accessibility

Verify:

- Text readability
- Touch target sizes
- Navigation
- Forms
- Product browsing
- Image galleries
- Certificate viewers

No important information should become inaccessible on mobile.

---

# 26. Error Pages

Create a useful public 404 page.

Include:

Page Not Found

Useful links:

Home
Products
About
Contact

Do not expose technical errors.

---

# 27. Sitemap

The public website should have a sitemap containing indexable public pages.

Potential pages:

Home
About
Products
Product pages
Manufacturing
Quality
Certifications
Careers
Contact

Do NOT include:

Admin routes
Private routes
API endpoints
Authenticated pages

---

# 28. Robots

Public website robots configuration should allow legitimate public pages to be crawled.

Admin should be blocked from indexing.

API should not be treated as a crawlable website.

---

# 29. Canonical URLs

Use canonical URLs for important public pages.

This is especially important for:

- Product pages
- Category pages
- Filtered pages
- Pagination

Avoid duplicate URLs representing the same content.

---

# 30. Performance and SEO

Optimize:

- Images
- Fonts
- JavaScript
- CSS
- Rendering
- API requests

Avoid unnecessary client-side rendering when server-rendered content is more appropriate for SEO.

Use framework-native SEO capabilities where available.

---

# 31. SEO Content Integrity

Never generate filler content solely to increase page length.

Do not use:

- Keyword stuffing
- Fake claims
- Fake testimonials
- Fake company history
- Fake certifications
- Fake statistics

SEO content should provide genuine value.

---

# 32. Final Public Website Checklist

Before considering a public page complete:

[ ] One clear H1

[ ] Correct H2/H3 hierarchy

[ ] Unique title

[ ] Unique meta description

[ ] Canonical URL

[ ] Open Graph metadata

[ ] Clean URL

[ ] Meaningful alt text

[ ] Crawlable navigation

[ ] Internal links

[ ] Mobile responsive

[ ] Keyboard accessible

[ ] Visible focus states

[ ] Good contrast

[ ] Accessible forms

[ ] Structured data where appropriate

[ ] No fabricated claims

[ ] No fabricated certifications

[ ] No fake statistics

[ ] Sitemap-ready

[ ] Robots configuration considered

[ ] No horizontal overflow


# 33. Final Admin Checklist

Admin panel should:

[ ] Require authentication

[ ] Not be indexed

[ ] Have appropriate noindex/robots protection

[ ] Use semantic HTML

[ ] Have keyboard navigation

[ ] Have accessible forms

[ ] Have visible focus states

[ ] Have good contrast

[ ] Handle validation errors

[ ] Handle loading states

[ ] Handle API errors

[ ] Protect destructive actions

[ ] Never expose secrets