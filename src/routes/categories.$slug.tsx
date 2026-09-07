import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Layers, ChevronLeft, ChevronRight, Package } from "lucide-react";
import { useCategoryBySlug, useProductsByCategory } from "@/hooks/use-public-api";
import { SiteLayout } from "@/components/layout";
import { ProductCard, ProductCardSkeleton } from "@/components/products/ProductCard";
import { PublicEmptyState } from "@/components/common";

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => {
    const formattedName = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      meta: [
        { title: `${formattedName} | STKA Product Categories` },
        {
          name: "description",
          content: `Browse pharmaceutical product formulations under the ${formattedName} category manufactured by STKA Pvt Ltd.`,
        },
        { property: "og:title", content: `${formattedName} Category | STKA Pvt Ltd` },
        {
          property: "og:description",
          content: `Pharmaceutical formulations listed under ${formattedName}.`,
        },
        { property: "og:url", content: `https://stkapvt.com/categories/${params.slug}` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${formattedName} | STKA Categories` },
        {
          name: "twitter:description",
          content: `Explore ${formattedName} pharmaceutical formulations from STKA Pvt Ltd.`,
        },
      ],
      links: [{ rel: "canonical", href: `https://stkapvt.com/categories/${params.slug}` }],
    };
  },
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const { slug } = Route.useParams();
  const [pageNumber, setPageNumber] = useState(0);

  // Fetch category by slug
  const { data: category, isLoading: isCategoryLoading, isError: isCategoryError } = useCategoryBySlug(slug);

  // Fetch category products by category UUID if category is loaded
  const categoryId = category?.id || "";
  const { data: productsData, isLoading: isProductsLoading } = useProductsByCategory(categoryId, {
    pageNumber,
    pageSize: 12,
  });

  const displayedProducts = productsData?.content || [];
  const totalPages = productsData?.totalPage || 1;
  const totalElements = productsData?.totalElement || displayedProducts.length;

  const isLoading = isCategoryLoading || (Boolean(category) && isProductsLoading);

  if (!isCategoryLoading && (isCategoryError || !category)) {
    return (
      <SiteLayout>
        <div className="container-wide py-28 sm:py-36">
          <PublicEmptyState
            icon={Layers}
            title="Category Not Found"
            description={`The category record for "${slug}" is no longer available.`}
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

  return (
    <SiteLayout>
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
            {category ? category.categoryName : slug.replace(/-/g, " ")}
          </h1>
          {category?.description && (
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
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} align={idx % 2 === 0 ? "left" : "right"} />
              ))}
            </div>
          ) : displayedProducts.length > 0 ? (
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
              disabled={productsData?.lastPage || pageNumber >= totalPages - 1}
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
