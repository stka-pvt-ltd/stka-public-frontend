import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ProductResponse } from "@/types/api";
import tabletsImage from "@/assets/stka-product-tablets.jpg";

export function ProductCard({
  product,
  align = "full",
}: {
  product: ProductResponse;
  align?: "left" | "right" | "full";
}) {
  const imageUrl =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]?.imageUrl || tabletsImage
      : tabletsImage;

  const [imgSrc, setImgSrc] = useState<string>(imageUrl);

  const alignClass =
    align === "left"
      ? "w-[96%] ml-0 mr-auto sm:w-full"
      : align === "right"
        ? "w-[96%] ml-auto mr-0 sm:w-full"
        : "w-full";

  return (
    <div className={`border border-border bg-card transition-colors hover:border-pharma/50 ${alignClass}`}>
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group grid sm:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="image-frame relative aspect-[4/3] w-full border-b border-border bg-[#E8ECE9] p-2 sm:min-h-64 sm:border-b-0 sm:border-r overflow-hidden flex items-center justify-center">
          <img
            src={imgSrc}
            alt={`${product.productName} product presentation`}
            loading="lazy"
            onError={() => setImgSrc(tabletsImage)}
            className="h-full w-full border border-border/60 object-contain bg-white"
          />
          {product.categoryName && (
            <div className="absolute left-4 top-4 bg-primary px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-primary-foreground z-10">
              {product.categoryName}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-6 sm:p-7">
          <div>
            <p className="eyebrow">{product.brand || "STKA Portfolio"}</p>
            <h3 className="mt-3 font-display text-2xl text-primary">{product.productName}</h3>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Generic name</dt>
                <dd className="mt-1 font-semibold text-foreground truncate">{product.genericName || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Strength</dt>
                <dd className="mt-1 font-semibold text-foreground truncate">{product.strength || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Dosage form</dt>
                <dd className="mt-1 font-semibold text-foreground truncate">{product.dosageForm || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="mt-1 font-semibold text-foreground truncate">{product.categoryName || "—"}</dd>
              </div>
            </dl>
          </div>
          <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
            View Product <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </div>
  );
}

export function ProductCardSkeleton({ align = "full" }: { align?: "left" | "right" | "full" }) {
  const alignClass =
    align === "left"
      ? "w-[96%] ml-0 mr-auto sm:w-full"
      : align === "right"
        ? "w-[96%] ml-auto mr-0 sm:w-full"
        : "w-full";

  return (
    <div className={`animate-pulse border border-border bg-card ${alignClass}`}>
      <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
        <div className="min-h-56 bg-[#E8ECE9] sm:min-h-64 border-b border-border sm:border-b-0 sm:border-r" />
        <div className="flex flex-col justify-between p-6 sm:p-7">
          <div>
            <div className="h-3 w-20 bg-muted" />
            <div className="mt-3 h-6 w-3/4 bg-muted" />
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="h-8 bg-muted/60" />
              <div className="h-8 bg-muted/60" />
              <div className="h-8 bg-muted/60" />
              <div className="h-8 bg-muted/60" />
            </div>
          </div>
          <div className="mt-7 h-4 w-28 bg-muted" />
        </div>
      </div>
    </div>
  );
}
