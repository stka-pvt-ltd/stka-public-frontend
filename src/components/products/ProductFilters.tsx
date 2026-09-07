import { useState } from "react";
import { ChevronDown, Search, RefreshCw, ChevronLeft, ChevronRight, Package, PackageSearch } from "lucide-react";
import { useCategories, useProducts, useProductsByCategory, useProductSearch } from "@/hooks/use-public-api";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { PublicEmptyState, PublicErrorState } from "@/components/common";
import type { CategoryResponse, ProductResponse } from "@/types/api";

export function ProductFilters() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [pageNumber, setPageNumber] = useState(0);

  // Search query debounced by 400ms to avoid requests on every keystroke
  const debouncedQuery = useDebounce(query, 400);

  // Categories query
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories({ pageSize: 100 });
  const apiCategories: CategoryResponse[] = categoriesData?.content || [];

  // Determine active query mode: Search vs Category Filter vs All Products
  const isSearching = debouncedQuery.trim().length > 0;
  const isFilteringCategory = Boolean(selectedCategory && selectedCategory.id !== "ALL");

  const searchResult = useProductSearch(debouncedQuery, { pageNumber, pageSize: 12 });
  const categoryResult = useProductsByCategory(selectedCategory?.id || "", { pageNumber, pageSize: 12 });
  const allProductsResult = useProducts({ pageNumber, pageSize: 12 });

  // Select active query based on user filter input
  const activeQuery = isSearching
    ? searchResult
    : isFilteringCategory
      ? categoryResult
      : allProductsResult;

  const { data, isLoading, isError, refetch } = activeQuery;

  const displayedProducts: ProductResponse[] = data?.content || [];
  const totalPages = data?.totalPage || 1;
  const totalElements = data?.totalElement || displayedProducts.length;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setPageNumber(0);
    if (val === "ALL") {
      setSelectedCategory({ id: "ALL", name: "All categories" });
    } else {
      const found = apiCategories.find((c) => c.id === val);
      if (found) {
        setSelectedCategory({ id: found.id, name: found.categoryName });
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPageNumber(0);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory({ id: "ALL", name: "All categories" });
    setPageNumber(0);
  };

  return (
    <div>
      {/* Search & Category Filter Control Bar */}
      <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={handleSearchChange}
            placeholder="Search products, generic names, or brands..."
            className="h-12 w-full border border-input bg-card pl-11 pr-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-4 top-3.5 size-4 text-muted-foreground" />
        </label>

        <label className="relative md:w-64">
          <span className="sr-only">Filter by category</span>
          <select
            value={selectedCategory?.id || "ALL"}
            onChange={handleCategoryChange}
            disabled={isCategoriesLoading}
            className="h-12 w-full appearance-none border border-input bg-card px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          >
            <option value="ALL">All categories</option>
            {apiCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-4 size-4 text-muted-foreground" />
        </label>
      </div>

      {/* Result Meta & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted-foreground">
        {isError ? (
          <p className="font-semibold text-foreground">Product catalogue temporarily unavailable</p>
        ) : (
          <p>
            Showing <span className="font-semibold text-foreground">{displayedProducts.length}</span> of{" "}
            <span className="font-semibold text-foreground">{totalElements}</span> pharmaceutical records.
          </p>
        )}

        {isError && (
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <RefreshCw className="size-3.5" /> Try Again
          </button>
        )}
      </div>

      {/* Grid Content / Loading Skeletons */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} align={idx % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      ) : isError ? (
        <PublicErrorState
          title="Product catalogue temporarily unavailable"
          description="We're unable to display our product catalogue right now. Please try again shortly."
          onRetry={() => refetch()}
        />
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
      ) : isSearching || isFilteringCategory ? (
        <PublicEmptyState
          icon={PackageSearch}
          title="No products found"
          description="No pharmaceutical formulations match your current search query or category filter."
          action={{
            label: "Clear Filters",
            onClick: clearFilters,
          }}
        />
      ) : (
        <PublicEmptyState
          icon={Package}
          title="Catalogue currently being updated"
          description="Our product catalogue is being updated with the latest formulation records. Please check back soon."
          action={{
            label: "Explore Categories",
            to: "/categories",
          }}
          secondaryAction={{
            label: "Contact Us",
            to: "/contact",
          }}
        />
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <button
            onClick={() => setPageNumber((p) => Math.max(0, p - 1))}
            disabled={pageNumber === 0}
            className="inline-flex items-center gap-2 border border-input bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary disabled:opacity-40"
          >
            <ChevronLeft className="size-4" /> Previous Page
          </button>
          <span className="text-xs font-medium text-muted-foreground">
            Page {pageNumber + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(totalPages - 1, p + 1))}
            disabled={data?.lastPage || pageNumber >= totalPages - 1}
            className="inline-flex items-center gap-2 border border-input bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary disabled:opacity-40"
          >
            Next Page <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
