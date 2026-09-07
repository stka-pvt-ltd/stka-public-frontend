import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useResolvedCompanyInfo } from "@/hooks/use-public-api";
import laboratoryImage from "@/assets/stka-laboratory.jpg";

export function WhoWeAre() {
  const { company } = useResolvedCompanyInfo();

  const companyName = company.companyName;
  const description = company.description;
  const mission = company.mission;

  return (
    <section className="soft-grid bg-background py-24 sm:py-32">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative">
          {/* Asymmetric left-shifted image container on mobile */}
          <div className="w-[92%] ml-0 mr-auto border border-border bg-secondary p-2 sm:w-full sm:p-3">
            <div className="image-frame aspect-[1.05/1] border border-border/60">
              <img
                src={laboratoryImage}
                alt={`${companyName} quality-control laboratory environment`}
                width={1104}
                height={912}
                loading="lazy"
                className="image-zoom h-full w-full object-cover"
              />
            </div>
          </div>
          {/* Asymmetric right-shifted editorial badge on mobile & desktop */}
          <div className="relative mt-4 ml-auto w-[82%] border border-border bg-background p-4 sm:absolute sm:-bottom-7 sm:right-0 sm:mt-0 sm:w-auto sm:p-5">
            <p className="eyebrow">01 / Who we are</p>
            <p className="mt-2 max-w-[13rem] font-display text-lg leading-tight text-primary sm:text-xl">
              A measured approach to better healthcare.
            </p>
          </div>
        </div>
        <div className="lg:pl-8">
          <p className="eyebrow">Who We Are</p>
          <h2 className="display-title mt-5 max-w-xl text-4xl text-primary sm:text-5xl">
            Building Trust Through Quality Pharmaceuticals
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {mission}
          </p>
          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-primary"
          >
            About STKA{" "}
            <span className="grid size-7 place-items-center border border-primary/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
