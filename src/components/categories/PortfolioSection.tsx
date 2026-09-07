import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/use-public-api";
import { CategoryFeature } from "./CategoryFeature";

export function PortfolioSection() {
  const { data } = useCategories({ pageSize: 3 });
  const items = data?.content || [];

  const primaryCategory = items[0];
  const secondaryCategory = items[1];
  const tertiaryCategory = items[2];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Portfolio / 02</p>
            <h2 className="display-title mt-4 text-4xl text-primary sm:text-5xl">
              Our Pharmaceutical Portfolio
            </h2>
          </div>
          <Link
            to="/categories"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            View Catalogue <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {primaryCategory && <CategoryFeature category={primaryCategory} large align="left" />}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {secondaryCategory && <CategoryFeature category={secondaryCategory} align="right" />}
            {tertiaryCategory && <CategoryFeature category={tertiaryCategory} align="left" />}
          </div>
        </div>
      </div>
    </section>
  );
}
