import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { WhoWeAre, WhyStka } from "@/components/company";
import { PortfolioSection } from "@/components/categories";
import { ProductsPreview } from "@/components/products";
import { QualitySection } from "@/components/quality";
import { ManufacturingSection } from "@/components/manufacturing";
import { FinalCta } from "@/components/common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STKA Pvt Ltd | Quality Pharmaceutical Manufacturing & Healthcare Solutions" },
      {
        name: "description",
        content:
          "Discover STKA Pvt Ltd, a pharmaceutical manufacturing company focused on quality, precision, compliance, and long-term healthcare partnerships.",
      },
      { property: "og:title", content: "STKA Pvt Ltd | Quality Pharmaceutical Manufacturing" },
      {
        property: "og:description",
        content:
          "A quality-focused pharmaceutical manufacturing company built around reliable production and scientific standards.",
      },
      { property: "og:url", content: "https://stkapvt.com" },
      { property: "og:site_name", content: "STKA Pvt Ltd" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "STKA Pvt Ltd | Quality Pharmaceutical Manufacturing" },
      {
        name: "twitter:description",
        content: "Pharmaceutical manufacturing company focused on quality, precision, and compliance.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "STKA Pvt Ltd",
          legalName: "STKA PVT LTD",
          url: "https://stkapvt.com",
          logo: "https://stkapvt.com/favicon.svg",
          description:
            "STKA Pvt Ltd is a pharmaceutical manufacturing company focused on high quality standards, regulatory compliance, and reliable formulation supply.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No. 1 Hussain House, Tektar",
            addressLocality: "Darbhanga",
            addressRegion: "Bihar",
            postalCode: "847306",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Support",
            email: "info@stkapvt.com",
            telephone: "+91-9625979342",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "STKA Pvt Ltd",
          url: "https://stkapvt.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://stkapvt.com/products?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SiteLayout><Hero /><WhoWeAre /><PortfolioSection /><ProductsPreview /><QualitySection /><ManufacturingSection /><WhyStka /><FinalCta /></SiteLayout>;
}
