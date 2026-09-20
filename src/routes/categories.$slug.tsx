import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Layers, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useCategoryBySlug, useProductsByCategory } from "@/hooks/use-public-api";
import { getCategoryBySlug, LOCAL_CATEGORY_IMAGES } from "@/data/categories";
import { STATIC_PRODUCTS } from "@/data/products";
import { SiteLayout } from "@/components/layout";
import { ProductCard } from "@/components/products/ProductCard";
import { PublicEmptyState } from "@/components/common";
import { buildBreadcrumbJsonLd, buildCategoryJsonLd, updateDocumentMetadata } from "@/lib/seo";
import { resolveCategoryBySlug } from "@/services/catalog-resolver";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params }) => {
    return await resolveCategoryBySlug(params.slug);
  },
  head: ({ loaderData, params }) => {
    const category = loaderData ?? getCategoryBySlug(params.slug);

    if (!category) {
      return {
        meta: [
          { title: "Category Not Found | STKA Pvt Ltd" },
          {
            name: "description",
            content: "The requested pharmaceutical category is not listed in our catalogue.",
          },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    const categoryName = category.categoryName;
    const title = `${categoryName} | Pharmaceutical Products | STKA Pvt Ltd`;
    const description =
      category.description ||
      `Explore high quality pharmaceutical formulations, therapeutic classifications, and dosage forms under ${categoryName} manufactured by STKA Pvt Ltd.`;

    const categoryImg =
      category.categoryImage?.imageUrl ||
      (category.slug ? LOCAL_CATEGORY_IMAGES[category.slug] : null);
    const canonicalUrl = `${SITE_URL}/categories/${category.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "website" },
        ...(categoryImg ? [{ property: "og:image", content: categoryImg }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(categoryImg ? [{ name: "twitter:image", content: categoryImg }] : []),
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const { slug } = Route.useParams();
  const loaderCategory = Route.useLoaderData();
  const staticCategory = getCategoryBySlug(slug);
  const [pageNumber, setPageNumber] = useState(0);

  // Authoritative backend category lookup
  const {
    data: backendCategory,
    isSuccess: isCategorySuccess,
    isLoading: isCategoryLoading,
  } = useCategoryBySlug(slug);

  // Authoritative resolution priority:
  // 1. Live backend query response (if client-fetched)
  // 2. Initial SSR resolved category (from loader)
  // 3. Static fallback category
  const category = isCategorySuccess && backendCategory ? backendCategory : (loaderCategory ?? staticCategory);

  // Synchronize document <head> metadata when client data updates
  useEffect(() => {
    if (category) {
      const title = `${category.categoryName} | Pharmaceutical Products | STKA Pvt Ltd`;
      const description =
        category.description ||
        `Explore pharmaceutical formulations and products under ${category.categoryName} manufactured by STKA Pvt Ltd.`;
      const firstImage =
        category.categoryImage?.imageUrl ||
        (category.slug ? LOCAL_CATEGORY_IMAGES[category.slug] : undefined);

      updateDocumentMetadata({
        title,
        description,
        path: `/categories/${category.slug}`,
        ogType: "website",
        ogImage: firstImage,
      });
    }
  }, [category]);

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

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Categories", url: `${SITE_URL}/categories` },
    { name: category?.categoryName ?? slug, url: `${SITE_URL}/categories/${category?.slug ?? slug}` },
  ]);

  const categoryJsonLd = category
    ? buildCategoryJsonLd({
        categoryName: category.categoryName,
        slug: category.slug,
        description: category.description,
      })
    : null;

  return (
    <SiteLayout>
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
            {category!.categoryName}
          </h1>
          {category!.description && (
            <p className="mt-4 max-w-xl text-base text-primary-foreground/80">
              {category!.description}
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
