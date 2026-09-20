import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PackageX, RefreshCw } from "lucide-react";
import { useProductBySlug, useCategories } from "@/hooks/use-public-api";
import { getProductBySlug } from "@/data/products";
import { STATIC_CATEGORIES } from "@/data/categories";
import { SiteLayout } from "@/components/layout";
import { ProductDetails } from "@/components/products";
import { updateDocumentMetadata } from "@/lib/seo";
import { resolveProductBySlug } from "@/services/catalog-resolver";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    return await resolveProductBySlug(params.slug);
  },
  head: ({ loaderData, params }) => {
    const product = loaderData ?? getProductBySlug(params.slug);

    if (!product) {
      return {
        meta: [
          { title: "Product Not Found | STKA Pvt Ltd" },
          {
            name: "description",
            content: "The requested pharmaceutical product formulation is not listed in our catalogue.",
          },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }

    const productName = product.productName;
    const title = `${productName} | STKA Pvt Ltd`;
    const description = product.description
      ? product.description.slice(0, 160)
      : `Detailed composition, dosage form, strength, and technical specification record for ${productName} manufactured by STKA Pvt Ltd.`;

    const firstImage = product.productImages?.[0]?.imageUrl;
    const canonicalUrl = `${SITE_URL}/products/${product.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "product" },
        ...(firstImage ? [{ property: "og:image", content: firstImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(firstImage ? [{ name: "twitter:image", content: firstImage }] : []),
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { slug } = Route.useParams();
  const loaderProduct = Route.useLoaderData();
  const staticProduct = getProductBySlug(slug);

  // Initial SSR product resolved from loaderData (trying backend first, fallback second)
  const initialProduct = loaderProduct ?? staticProduct;

  // Authoritative live client query (enables background refetching and client cache invalidation)
  const { data: backendProduct, isSuccess, isLoading, isError, refetch } = useProductBySlug(slug);
  const { data: categoriesData, isSuccess: isCategoriesSuccess } = useCategories({ pageSize: 100 });

  // Authoritative resolution priority:
  // 1. Live backend query response (if successfully fetched by client)
  // 2. Initial SSR resolved product (from loader)
  // 3. Immediate static fallback product
  const product = isSuccess && backendProduct ? backendProduct : initialProduct;

  // Synchronize document <head> metadata when client-side data updates
  useEffect(() => {
    if (product) {
      const title = `${product.productName} | STKA Pvt Ltd`;
      const description = product.description
        ? product.description.slice(0, 160)
        : `Detailed composition, dosage form, strength, and technical specification record for ${product.productName} manufactured by STKA Pvt Ltd.`;
      const firstImage = product.productImages?.[0]?.imageUrl;

      updateDocumentMetadata({
        title,
        description,
        path: `/products/${product.slug}`,
        ogType: "product",
        ogImage: firstImage,
      });
    }
  }, [product]);

  // 4. Product not found in either backend or fallback after query attempts
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

  // 5. Loading skeleton state (only if product is truly pending and has no SSR/fallback data)
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

  // 6. Valid product found (either backend authoritative or static fallback)
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
    name: product!.productName,
    url: `${SITE_URL}/products/${product!.slug}`,
    description:
      product!.description ||
      `Pharmaceutical product formulation ${product!.productName} by STKA Pvt Ltd.`,
    brand: {
      "@type": "Brand",
      name: product!.brand || "STKA Pvt Ltd",
    },
    category: product!.categoryName || "Pharmaceuticals",
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
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      ...(categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: product!.categoryName || "Category",
              item: `${SITE_URL}/categories/${categorySlug}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: product!.productName,
              item: `${SITE_URL}/products/${product!.slug}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 3,
              name: product!.productName,
              item: `${SITE_URL}/products/${product!.slug}`,
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
      <ProductDetails product={product!} />
    </SiteLayout>
  );
}