import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PackageX, RefreshCw } from "lucide-react";
import { useProductBySlug, useCategories } from "@/hooks/use-public-api";
import { getProductBySlug } from "@/data/products";
import { STATIC_CATEGORIES } from "@/data/categories";
import { SiteLayout } from "@/components/layout";
import { ProductDetails } from "@/components/products";
import { updateDocumentMetadata } from "@/lib/seo";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const staticProduct = getProductBySlug(params.slug);
    const productName = staticProduct
      ? staticProduct.productName
      : params.slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

    const title = `${productName} | STKA Pvt Ltd`;
    const description = staticProduct?.description
      ? staticProduct.description.slice(0, 160)
      : `Detailed composition, dosage form, strength, and technical specification record for ${productName} manufactured by STKA Pvt Ltd.`;

    const firstImage = staticProduct?.productImages?.[0]?.imageUrl;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `https://stkapvt.com/products/${params.slug}` },
        { property: "og:type", content: "product" },
        ...(firstImage ? [{ property: "og:image", content: firstImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(firstImage ? [{ name: "twitter:image", content: firstImage }] : []),
      ],
      links: [{ rel: "canonical", href: `https://stkapvt.com/products/${params.slug}` }],
    };
  },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { slug } = Route.useParams();

  // 1. Resolve immediate static fallback product
  const staticProduct = getProductBySlug(slug);

  // 2. Authoritative backend product query
  const { data: backendProduct, isSuccess, isLoading, isError, refetch } = useProductBySlug(slug);
  const { data: categoriesData, isSuccess: isCategoriesSuccess } = useCategories({ pageSize: 100 });

  // 3. Before backend success: static fallback is active
  // After backend success: backend product completely replaces static fallback
  const product = isSuccess && backendProduct ? backendProduct : staticProduct;

  // Synchronize document <head> metadata when authoritative backend product data loads
  useEffect(() => {
    if (isSuccess && backendProduct) {
      const title = `${backendProduct.productName} | STKA Pvt Ltd`;
      const description = backendProduct.description
        ? backendProduct.description.slice(0, 160)
        : `Detailed composition, dosage form, strength, and technical specification record for ${backendProduct.productName} manufactured by STKA Pvt Ltd.`;
      const firstImage = backendProduct.productImages?.[0]?.imageUrl;

      updateDocumentMetadata({
        title,
        description,
        path: `/products/${slug}`,
        ogType: "product",
        ogImage: firstImage,
      });
    }
  }, [isSuccess, backendProduct, slug]);

  // 4. If neither static nor backend product exists and backend has finished loading:
  if (!product && !isLoading) {
    return (
      <SiteLayout>
        <div className="container-wide py-36">
          <div className="max-w-xl">
            <PackageX className="size-12 text-[#5F9472]" />
            <h1 className="display-title mt-4 text-4xl text-primary sm:text-5xl">
              Product Not Found
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The product information for <span className="font-semibold text-foreground">"{slug}"</span> is currently unavailable or is no longer listed in our catalogue.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-navy-soft"
              >
                <RefreshCw className="size-4" /> Retry
              </button>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border border-input bg-card px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent"
              >
                <ArrowLeft className="size-4" /> Back to Products
              </Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // 5. If product is a new product not in static fallback and backend is still fetching:
  if (!product && isLoading) {
    return (
      <SiteLayout>
        <section className="bg-primary pb-16 pt-36 text-primary-foreground">
          <div className="container-wide animate-pulse space-y-4">
            <div className="h-4 w-32 bg-primary-foreground/20" />
            <div className="h-12 w-2/3 max-w-xl bg-primary-foreground/25" />
          </div>
        </section>
        <section className="container-wide grid gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="aspect-[4/3] w-full animate-pulse bg-[#E8ECE9] border border-border" />
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-24 bg-muted" />
            <div className="h-8 w-3/4 bg-muted" />
            <div className="h-20 w-full bg-muted/60" />
            <div className="h-36 w-full bg-muted/40" />
          </div>
        </section>
      </SiteLayout>
    );
  }

  // 6. Valid product found (either static fallback or authoritative backend)
  const validImages = product!.productImages?.map((img) => img.imageUrl).filter(Boolean) || [];
  const categoriesList = isCategoriesSuccess && categoriesData?.content?.length ? categoriesData.content : STATIC_CATEGORIES;
  const categoryRecord = categoriesList.find(
    (c) =>
      c.id === product!.categoryId ||
      c.categoryName.toLowerCase() === (product!.categoryName || "").toLowerCase()
  );
  const categorySlug = categoryRecord?.slug;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description:
      product.description ||
      `Pharmaceutical product formulation ${product.productName} by STKA Pvt Ltd.`,
    brand: {
      "@type": "Brand",
      name: product.brand || "STKA Pvt Ltd",
    },
    category: product.categoryName || "Pharmaceuticals",
    ...(validImages.length > 0 ? { image: validImages } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stkapvt.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://stkapvt.com/products",
      },
      ...(categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product.categoryName || "Category",
              item: `https://stkapvt.com/categories/${categorySlug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product.productName,
              item: `https://stkapvt.com/products/${slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: product.productName,
              item: `https://stkapvt.com/products/${slug}`,
            },
          ]),
    ],
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetails product={product} />
    </SiteLayout>
  );
}