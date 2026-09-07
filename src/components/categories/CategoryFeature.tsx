import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { CategoryResponse } from "@/types/api";
import tabletsImage from "@/assets/stka-product-tablets.jpg";

export function CategoryFeature({
  category,
  large = false,
  align = "full",
}: {
  category: CategoryResponse;
  large?: boolean;
  align?: "left" | "right" | "full";
}) {
  const name = category.categoryName;
  const description = category.description;
  const imageUrl = category.categoryImage?.imageUrl || tabletsImage;

  const alignClass =
    align === "left"
      ? "w-[94%] ml-0 mr-auto sm:w-full"
      : align === "right"
        ? "w-[94%] ml-auto mr-0 sm:w-full"
        : "w-full";

  return (
    <div className={`border border-border/80 bg-[#E8ECE9] p-2 sm:p-3.5 ${alignClass}`}>
      <Link
        to="/categories/$slug"
        params={{ slug: category.slug }}
        className={`group relative image-frame block border border-border/40 ${
          large ? "min-h-[26rem] lg:min-h-[36rem]" : "min-h-[15rem]"
        }`}
      >
        <img
          src={imageUrl}
          alt={`${name} pharmaceutical category`}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = tabletsImage;
          }}
          className="image-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60 transition-colors group-hover:bg-primary/48" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="eyebrow text-pharma-soft">Product category</p>
          <h3 className={`mt-2 font-display text-primary-foreground ${large ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
            {name}
          </h3>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-primary-foreground/75 sm:text-sm line-clamp-2">
            {description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-pharma-soft">
            View Products <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}
