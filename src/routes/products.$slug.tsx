import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, PackageX, RefreshCw } from "lucide-react";
import { useProductBySlug } from "@/hooks/use-public-api";
import { SiteLayout } from "@/components/layout";
import { ProductDetails } from "@/components/products";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const formattedName = params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      meta: [
        { title: `${formattedName} | STKA Pharmaceutical Portfolio` },
        {
          name: "description",
          content: `Detailed composition, dosage form, strength, and technical specification record for ${formattedName} manufactured by STKA Pvt Ltd.`,
        },
        { property: "og:title", content: `${formattedName} | STKA Pvt Ltd` },
        {
          property: "og:description",
          content: `Pharmaceutical formulation specification record for ${formattedName}.`,
        },
        { property: "og:url", content: `https://stkapvt.com/products/${params.slug}` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${formattedName} | STKA Pvt Ltd` },
        {
          name: "twitter:description",
          content: `Specification record for ${formattedName} from STKA Pvt Ltd.`,
        },
      ],
      links: [{ rel: "canonical", href: `https://stkapvt.com/products/${params.slug}` }],
    };
  },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const { slug } = Route.useParams();
  const { data: product, isLoading, isError, refetch } = useProductBySlug(slug);

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <SiteLayout>
        <section className="bg-primary pb-16 pt-36 text-primary-foreground">
          <div className="container-wide animate-pulse space-y-4">
            <div className="h-4 w-32 bg-primary-foreground/20" />
            <div className="h-12 w-2/3 bg-primary-foreground/20" />
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

  // 2. ERROR / NOT FOUND STATE
  if (isError || !product) {
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

  // 3. SUCCESSFUL PRODUCT DETAIL DISPLAY
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description: product.description || `Pharmaceutical product formulation ${product.productName} by STKA Pvt Ltd.`,
    brand: {
      "@type": "Brand",
      name: "STKA Pvt Ltd",
    },
    category: product.categoryName || "Pharmaceuticals",
    ...(product.imageUrl ? { image: [product.imageUrl] } : {}),
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
      {
        "@type": "ListItem",
        position: 3,
        name: product.productName,
        item: `https://stkapvt.com/products/${slug}`,
      },
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