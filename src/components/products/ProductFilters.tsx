import { useState } from "react";
import { ChevronDown, Search, RefreshCw, ChevronLeft, ChevronRight, Package, PackageSearch } from "lucide-react";
import { useCategories, useProducts, useProductsByCategory, useProductSearch } from "@/hooks/use-public-api";
import { useDebounce } from "@/hooks/use-debounce";
import { STATIC_PRODUCTS } from "@/data/products";
import { STATIC_CATEGORIES } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { PublicEmptyState } from "@/components/common";
import type { CategoryResponse, ProductResponse } from "@/types/api";

export function ProductFilters() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 12;

  // Search query debounced by 400ms to avoid requests on every keystroke
  const debouncedQuery = useDebounce(query, 400);

  // Categories query: static fallback initially, backend authoritative upon success
  const { data: categoriesData, isSuccess: isCategoriesSuccess } = useCategories({ pageSize: 100 });
  const apiCategories: CategoryResponse[] =
    isCategoriesSuccess && categoriesData?.content && categoriesData.content.length > 0
      ? categoriesData.content
      : STATIC_CATEGORIES;

  // Determine active query mode: Search vs Category Filter vs All Products
  const isSearching = debouncedQuery.trim().length > 0;
  const isFilteringCategory = Boolean(selectedCategory && selectedCategory.id !== "ALL");

  const searchResult = useProductSearch(debouncedQuery, { pageNumber, pageSize });
  const categoryResult = useProductsByCategory(selectedCategory?.id || "", { pageNumber, pageSize });
  const allProductsResult = useProducts({ pageNumber, pageSize });

  // Select active query based on user filter input
  const activeQuery = isSearching
    ? searchResult
    : isFilteringCategory
      ? categoryResult
      : allProductsResult;

  const { data, isSuccess, isError, refetch } = activeQuery;

  // 1. Static fallback calculation for immediate rendering & backend loading / error states
  let staticFiltered = STATIC_PRODUCTS;
  if (isSearching) {
    const q = debouncedQuery.toLowerCase();
    staticFiltered = staticFiltered.filter(
      (p) =>
        p.productName.toLowerCase().includes(q) ||
        (p.genericName && p.genericName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.composition && p.composition.toLowerCase().includes(q))
    );
  } else if (isFilteringCategory) {
    staticFiltered = staticFiltered.filter(
      (p) => p.categoryId === selectedCategory?.id
    );
  }

  const staticTotalElements = staticFiltered.length;
  const staticTotalPages = Math.max(1, Math.ceil(staticTotalElements / pageSize));
  const staticDisplayed = staticFiltered.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);

  // 2. Active products: Backend completely replaces static fallback once loaded
  const isBackendActive = isSuccess && Boolean(data);

  const displayedProducts: ProductResponse[] = isBackendActive
    ? (data?.content || [])
    : staticDisplayed;

  const totalPages = isBackendActive
    ? (data?.totalPage || 1)
    : staticTotalPages;

  const totalElements = isBackendActive
    ? (data?.totalElement ?? displayedProducts.length)
    : staticTotalElements;

  const isLastPage = isBackendActive
    ? (data?.lastPage || pageNumber >= totalPages - 1)
    : pageNumber >= totalPages - 1;

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
            className="h-12 w-full appearance-none border border-input bg-card px-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-ring"
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
        <p>
          Showing <span className="font-semibold text-foreground">{displayedProducts.length}</span> of{" "}
          <span className="font-semibold text-foreground">{totalElements}</span> pharmaceutical records.
        </p>

        {isError && (
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
          >
            <RefreshCw className="size-3.5" /> Try Again
          </button>
        )}
      </div>

      {/* Grid Content: Fallback products render immediately, backend products replace upon success */}
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
            disabled={isLastPage}
            className="inline-flex items-center gap-2 border border-input bg-card px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary disabled:opacity-40"
          >
            Next Page <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
