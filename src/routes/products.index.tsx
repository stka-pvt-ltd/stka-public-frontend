import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteLayout } from "@/components/layout";
import { ProductFilters } from "@/components/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Pharmaceutical Products & Portfolio | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Explore the STKA pharmaceutical portfolio with clear information across product composition, strength, dosage form, and category.",
      },
      { property: "og:title", content: "Pharmaceutical Products | STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "STKA pharmaceutical catalogue with structured formulation records and technical specifications.",
      },
      { property: "og:url", content: "https://stkapvt.com/products" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pharmaceutical Products | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Browse STKA's pharmaceutical product catalogue and dosage specifications.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/products" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "STKA Pharmaceutical Catalogue",
          url: "https://stkapvt.com/products",
          description: "Browse STKA's pharmaceutical product portfolio by formulation, category, and dosage form.",
          publisher: {
            "@type": "Organization",
            name: "STKA Pvt Ltd",
            url: "https://stkapvt.com",
          },
        }),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="Products"
        title="A clear, structured view of the STKA portfolio."
        description="Explore the STKA pharmaceutical portfolio with clear information across product composition, strength, dosage form, and category."
        align="left"
      />
      <section className="container-wide py-20 sm:py-28">
        <ProductFilters />
      </section>
    </SiteLayout>
  );
}
