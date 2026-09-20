import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, ShieldCheck, FileCheck, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useCategories } from "@/hooks/use-public-api";
import { STATIC_CATEGORIES } from "@/data/categories";
import { PageIntro, SiteLayout } from "@/components/layout";
import { CategoryFeature } from "@/components/categories/CategoryFeature";
import { PublicEmptyState } from "@/components/common";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Pharmaceutical Product Categories | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Browse pharmaceutical product categories including oral solids, sterile formulations, topical preparations, and specialized therapeutics.",
      },
      { property: "og:title", content: "Product Categories | STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "Explore structured STKA pharmaceutical product categories and therapeutic classifications.",
      },
      { property: "og:url", content: "https://stkapvt.com/categories" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Product Categories | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Browse structured pharmaceutical categories from STKA Pvt Ltd.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/categories" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "STKA Pharmaceutical Product Categories",
          url: "https://stkapvt.com/categories",
          description: "Browse pharmaceutical product classifications and therapeutic categories.",
          publisher: {
            "@type": "Organization",
            name: "STKA Pvt Ltd",
            url: "https://stkapvt.com",
          },
          hasPart: STATIC_CATEGORIES.map((cat) => ({
            "@type": "WebPage",
            name: cat.categoryName,
            description: cat.description,
            url: `https://stkapvt.com/categories/${cat.slug}`,
          })),
        }),
      },
    ],
  }),
  component: CategoriesListingPage,
});

function CategoriesListingPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 6;

  const { data, isSuccess } = useCategories({
    pageNumber,
    pageSize,
  });

  // BEFORE BACKEND SUCCESS: static fallback is active
  // AFTER BACKEND SUCCESS: backend data completely replaces static fallback
  const isBackendActive = isSuccess && Boolean(data);

  const displayedCategories = isBackendActive
    ? (data?.content || [])
    : STATIC_CATEGORIES.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

  const totalElements = isBackendActive
    ? (data?.totalElement ?? displayedCategories.length)
    : STATIC_CATEGORIES.length;

  const totalPages = isBackendActive
    ? (data?.totalPage || 1)
    : Math.max(1, Math.ceil(STATIC_CATEGORIES.length / pageSize));

  const isLastPage = isBackendActive
    ? (data?.lastPage || pageNumber >= totalPages - 1)
    : pageNumber >= totalPages - 1;

  return (
    <SiteLayout>
      {/* 1. PAGE INTRO WITH LEFT ALIGNED SUBHEADING LAYOUT */}
      <PageIntro
        eyebrow="Categories"
        title="Structured pharmaceutical categories."
        description="Explore our therapeutic and formulation categories, built to simplify navigation across our product catalogue."
        align="left"
      />

      {/* 2. RICH EDITORIAL OVERVIEW SECTION */}
      <section className="border-b border-border bg-[#F5F7F5] py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#5F9472]">Catalogue Architecture</p>
              <h2 className="display-title mt-3 text-3xl text-primary sm:text-4xl">
                Formulation &amp; Therapeutic Classifications
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                STKA Pvt Ltd organizes its pharmaceutical catalogue across standardized formulation types and therapeutic categories. This classification enables commercial distributors, hospital networks, and procurement partners to efficiently evaluate active formulations, dosage forms, and technical specifications.
              </p>
            </div>

            {/* Factual Specification Highlights (No Unverified Claims) */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="border border-border bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  <ShieldCheck className="size-4 text-[#5F9472]" /> Standardized Classification
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Products indexed strictly by active ingredient, dosage form, and therapeutic category.
                </p>
              </div>

              <div className="border border-border bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  <FileCheck className="size-4 text-[#5F9472]" /> Specification Accessibility
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Direct access to formulation records, composition, strength, and packaging options.
                </p>
              </div>

              <div className="border border-border bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  <Search className="size-4 text-[#5F9472]" /> Efficient Product Discovery
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Streamlined portfolio navigation built for commercial B2B inquiries and supply review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY CATALOGUE LISTING */}
      <section className="container-wide py-20 sm:py-28">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <p className="eyebrow">Therapeutic Classifications</p>
            <h3 className="font-display text-xl text-primary mt-1">Available Product Categories</h3>
          </div>
          <span className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 border border-border">
            {`${totalElements} ${totalElements === 1 ? "Category" : "Categories"} Listed`}
          </span>
        </div>

        {/* CATEGORIES CONTENT: Static renders immediately, replaced by backend data upon success */}
        {displayedCategories.length === 0 ? (
          <div className="mt-12">
            <PublicEmptyState
              icon={Layers}
              title="No categories available yet"
              description="Product categories will appear here as they are published."
              action={{
                label: "Browse All Products",
                to: "/products",
              }}
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedCategories.map((cat, idx) => (
              <CategoryFeature key={cat.id} category={cat} align={idx % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
            <button
              onClick={() => setPageNumber((p) => Math.max(0, p - 1))}
              disabled={pageNumber === 0}
              className="inline-flex items-center gap-2 border border-input bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary disabled:opacity-40"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <span className="text-xs font-medium text-muted-foreground">
              Page {pageNumber + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPageNumber((p) => Math.min(totalPages - 1, p + 1))}
              disabled={isLastPage || pageNumber >= totalPages - 1}
              className="inline-flex items-center gap-2 border border-input bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary disabled:opacity-40"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* 4. CATALOGUE CTA SECTION */}
        <div className="mt-20 border border-border bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow text-pharma-soft">Full Portfolio Access</p>
              <h3 className="display-title mt-2 text-2xl sm:text-3xl text-primary-foreground">
                Explore Complete Product Catalogue
              </h3>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-primary-foreground/75 leading-relaxed font-sans">
                Browse our full range of active pharmaceutical formulations, dosage forms, composition details, and technical specification records.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-[#5F9472] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#4e7d5f]"
            >
              Browse All Products <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
