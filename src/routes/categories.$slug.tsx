import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Layers, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useCategoryBySlug, useProductsByCategory } from "@/hooks/use-public-api";
import { getCategoryBySlug } from "@/data/categories";
import { STATIC_PRODUCTS } from "@/data/products";
import { SiteLayout } from "@/components/layout";
import { ProductCard } from "@/components/products/ProductCard";
import { PublicEmptyState } from "@/components/common";
import { buildBreadcrumbJsonLd, buildCategoryJsonLd, updateDocumentMetadata, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => {
    const staticCategory = getCategoryBySlug(params.slug);
    const formattedName = staticCategory
      ? staticCategory.categoryName
      : params.slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

    const description = staticCategory
      ? staticCategory.description
      : `Explore pharmaceutical formulations and products under ${formattedName} manufactured by STKA Pvt Ltd.`;

    return {
      meta: [
        { title: `${formattedName} | STKA Pvt Ltd` },
        { name: "description", content: description },
        { property: "og:title", content: `${formattedName} | STKA Pvt Ltd` },
        { property: "og:description", content: description },
        { property: "og:url", content: `https://stkapvt.com/categories/${params.slug}` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${formattedName} | STKA Pvt Ltd` },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `https://stkapvt.com/categories/${params.slug}` }],
    };
  },
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const { slug } = Route.useParams();
  const [pageNumber, setPageNumber] = useState(0);

  // Static fallback category for immediate rendering
  const staticCategory = getCategoryBySlug(slug);

  // Authoritative backend category lookup
  const {
    data: backendCategory,
    isSuccess: isCategorySuccess,
    isLoading: isCategoryLoading,
  } = useCategoryBySlug(slug);

  // Before backend responds: static fallback
  // After backend responds: backend category completely replaces static fallback
  const category = isCategorySuccess && backendCategory ? backendCategory : staticCategory;

  // Synchronize document <head> metadata when authoritative backend category data loads
  useEffect(() => {
    if (isCategorySuccess && backendCategory) {
      const title = `${backendCategory.categoryName} | STKA Pvt Ltd`;
      const description = backendCategory.description
        ? backendCategory.description
        : `Explore pharmaceutical formulations and products under ${backendCategory.categoryName} manufactured by STKA Pvt Ltd.`;
      const firstImage = backendCategory.categoryImage?.imageUrl;

      updateDocumentMetadata({
        title,
        description,
        path: `/categories/${slug}`,
        ogType: "website",
        ogImage: firstImage,
      });
    }
  }, [isCategorySuccess, backendCategory, slug]);

  const categoryId = category?.id || "";

  // Fetch category products by category UUID
  const {
    data: productsData,
    isSuccess: isProductsSuccess,
  } = useProductsByCategory(categoryId, {
    pageNumber,
    pageSize: 12,
  });

  const staticCategoryProducts = STATIC_PRODUCTS.filter(
    (p) => p.categoryId === categoryId
  );

  const isBackendProductsActive = isProductsSuccess && Boolean(productsData);

  const displayedProducts = isBackendProductsActive
    ? (productsData?.content || [])
    : staticCategoryProducts;

  const totalPages = isBackendProductsActive
    ? (productsData?.totalPage || 1)
    : Math.max(1, Math.ceil(staticCategoryProducts.length / 12));

  const totalElements = isBackendProductsActive
    ? (productsData?.totalElement ?? displayedProducts.length)
    : staticCategoryProducts.length;

  const isLastPage = isBackendProductsActive
    ? (productsData?.lastPage || pageNumber >= totalPages - 1)
    : pageNumber >= totalPages - 1;

  // Category not found (neither static nor backend)
  if (!category && !isCategoryLoading) {
    return (
      <SiteLayout>
        <div className="container-wide py-28 sm:py-36">
          <PublicEmptyState
            icon={Layers}
            title="Category Not Found"
            description={`The category record for "${slug}" could not be loaded or does not exist.`}
            action={{
              label: "All Categories",
              to: "/categories",
              icon: ArrowLeft,
            }}
            secondaryAction={{
              label: "View All Products",
              to: "/products",
            }}
          />
        </div>
      </SiteLayout>
    );
  }

  // ── JSON-LD for this category page ──────────────────────────────────────
  // Computed from React state: automatically uses backend data once it loads
  // (replacing static fallback), preserving Static-First → Backend-Authoritative.
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/categories` },
    { name: category?.categoryName ?? slug, url: `${SITE_URL}/categories/${slug}` },
  ]);

  const categoryJsonLd = category
    ? buildCategoryJsonLd({
        categoryName: category.categoryName,
        slug,
        description: category.description,
      })
    : null;

  return (
    <SiteLayout>
      {/* JSON-LD structured data — rendered in component body so React re-renders
          it when backend data replaces static fallback (static-first → backend-authoritative) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {categoryJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
        />
      )}
      {/* Category Header Banner */}
      <section className="bg-primary pb-16 pt-36 text-primary-foreground">
        <div className="container-wide">
          <div className="flex items-center gap-4">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="size-4" /> Categories
            </Link>
            <span className="text-xs text-primary-foreground/40">/</span>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/65 hover:text-primary-foreground transition-colors"
            >
              Products
            </Link>
          </div>
          <p className="eyebrow mt-10 text-pharma-soft">Category Catalogue</p>
          <h1 className="display-title mt-3 max-w-3xl text-5xl sm:text-6xl">
            {category.categoryName}
          </h1>
          {category.description && (
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Category Formulations Grid */}
      <section className="container-wide py-20 sm:py-28">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <p className="eyebrow">Formulation Products</p>
          <span className="text-xs text-muted-foreground">{totalElements} products in category</span>
        </div>

        <div className="mt-10">
          {displayedProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {displayedProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  align={idx % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              icon={Package}
              title="No products in this category yet"
              description="This category currently has no published products. Please check back shortly."
              action={{
                label: "View All Products",
                to: "/products",
              }}
            />
          )}
        </div>

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
      </section>
    </SiteLayout>
  );
}
