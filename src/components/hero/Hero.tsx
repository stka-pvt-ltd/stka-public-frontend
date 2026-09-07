import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useBanners } from "@/hooks/use-public-api";
import heroImage from "@/assets/stka-hero.jpg";

function Highlight({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="px-4 py-5 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#29352F]">{title}</p>
      <p className="mt-2 text-sm text-[#5a6b62]">{detail}</p>
    </div>
  );
}

export function Hero() {
  const { data: banners } = useBanners();
  const activeBanner = banners && banners.length > 0 ? banners.find((b) => b.active) || banners[0] : null;

  const title = activeBanner?.title || "Advancing Healthcare Through Quality & Innovation";
  const subtitle = activeBanner?.subtitle || "Pharmaceutical Manufacturing";
  const description =
    activeBanner?.description ||
    "STKA Pvt Ltd is committed to delivering high-quality pharmaceutical products through reliable manufacturing, scientific excellence, and uncompromising quality standards.";
  const buttonText = activeBanner?.buttonText || "Explore Products";
  const buttonUrl = activeBanner?.buttonUrl || "/products";
  const bannerImageUrl = activeBanner?.image?.imageUrl || heroImage;

  return (
    <section className="relative overflow-hidden bg-[#F5F7F5] pt-28 text-[#29352F] sm:pt-32">
      <div className="container-wide relative grid min-h-[46rem] items-center gap-12 pb-16 lg:grid-cols-[0.88fr_1.12fr] lg:pb-24">
        {/* Text column */}
        <div className="relative z-10 max-w-xl py-10 reveal-up">
          <p className="eyebrow text-[#5F9472]">{subtitle}</p>
          <h1 className="display-title mt-6 text-5xl text-[#29352F] sm:text-6xl lg:text-[4.7rem] leading-tight">
            {title}
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-[#5a6b62] sm:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={buttonUrl.startsWith("/") ? buttonUrl : "/products"}
              className="inline-flex items-center gap-3 bg-[#5F9472] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#4e7d5f]"
            >
              {buttonText} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-[#DDE5DF] bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#29352F] transition-colors hover:bg-[#E8ECE9]"
            >
              Discover STKA <ArrowDownRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className="relative min-h-[26rem] lg:min-h-[40rem]">
          <div className="relative ml-auto mr-0 h-full min-h-[26rem] w-[94%] border border-[#DDE5DF] bg-[#E8ECE9] p-2 sm:w-full sm:p-3 lg:min-h-[40rem]">
            <div className="image-frame relative h-full min-h-[23rem] overflow-hidden border border-[#DDE5DF]/70 lg:min-h-[36rem]">
              <img
                src={bannerImageUrl}
                alt={title}
                width={1408}
                height={1008}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = heroImage;
                }}
                className="image-zoom h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#29352F]/5" />

              <div className="absolute bottom-4 left-4 border border-[#DDE5DF] bg-white/90 p-3.5 backdrop-blur-sm sm:bottom-8 sm:left-8 sm:p-4">
                <div className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#5F9472]">
                  <span className="size-1.5 bg-[#5F9472]" /> Quality Driven
                </div>
                <p className="mt-1.5 font-display text-base tracking-tight text-[#29352F] sm:text-lg">
                  Precision Manufacturing
                </p>
              </div>

              <div className="absolute right-4 top-4 flex size-16 flex-col items-center justify-center border border-[#DDE5DF] bg-white/90 text-center backdrop-blur-sm sm:right-8 sm:top-8 sm:size-20">
                <span className="font-display text-xl text-[#5F9472] sm:text-2xl">01</span>
                <span className="mt-0.5 text-[0.58rem] uppercase tracking-[0.15em] text-[#5a6b62]">
                  Signal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#DDE5DF]">
        <div className="container-wide grid divide-y divide-[#DDE5DF] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <Highlight title="Quality First" detail="Standards as a daily discipline" />
          <Highlight title="Precision Manufacturing" detail="Built for repeatable control" />
          <Highlight title="Regulatory Focus" detail="Compliance by design" />
          <Highlight title="Long-term Partnerships" detail="Clarity, trust, responsiveness" />
        </div>
      </div>
    </section>
  );
}
