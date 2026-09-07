import { Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { useProducts } from "@/hooks/use-public-api";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { PublicEmptyState } from "@/components/common";

export function ProductsPreview() {
  const { data, isLoading } = useProducts({ pageSize: 2 });
  const products = data?.content || [];

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow">Selected records / 02</p>
          <h2 className="display-title mt-4 text-4xl text-primary sm:text-5xl">
            A Catalogue Built for Clarity
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Product data is presented as structured, compliance-ready formulation records. Explore our growing range of high quality pharmaceuticals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {isLoading ? (
            <>
              <ProductCardSkeleton align="left" />
              <ProductCardSkeleton align="right" />
            </>
          ) : products.length > 0 ? (
            products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                align={idx % 2 === 0 ? "left" : "right"}
              />
            ))
          ) : (
            <div className="col-span-2">
              <PublicEmptyState
                compact
                icon={Package}
                title="Catalogue currently being updated"
                description="Our product catalogue is being updated with the latest formulation records."
                action={{
                  label: "Explore All Products",
                  to: "/products",
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-8">
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 border-b border-primary pb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            Explore all products{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
