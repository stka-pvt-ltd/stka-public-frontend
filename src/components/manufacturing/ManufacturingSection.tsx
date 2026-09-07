import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import manufacturingImage from "@/assets/stka-manufacturing.jpg";

export function ManufacturingSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="container-wide">
        {/* Asymmetric right-shifted sharp manufacturing showcase frame on mobile */}
        <div className="w-[94%] ml-auto mr-0 border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3.5">
          <div className="relative image-frame overflow-hidden bg-primary border border-border/60">
            <img
              src={manufacturingImage}
              alt="Modern pharmaceutical manufacturing facility"
              loading="lazy"
              className="h-[32rem] w-full object-cover opacity-75 sm:h-[42rem]"
            />
            <div className="absolute inset-0 bg-primary/45" />
            <div className="absolute inset-0 flex items-end p-5 sm:p-12">
              <div className="grid w-full gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="eyebrow text-pharma-soft">Manufacturing / 05</p>
                  <h2 className="display-title mt-4 max-w-xl text-3xl text-primary-foreground sm:text-5xl">
                    Built on Quality. Driven by Precision.
                  </h2>
                  <Link
                    to="/manufacturing"
                    className="mt-7 inline-flex items-center gap-3 border border-primary-foreground/35 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Explore Manufacturing <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 border-l border-primary-foreground/25 sm:grid-cols-4">
                  {[
                    ["01", "Manufacturing"],
                    ["02", "Quality Control"],
                    ["03", "Quality Assurance"],
                    ["04", "Compliance"],
                  ].map(([number, label]) => (
                    <div key={number} className="border-b border-r border-primary-foreground/20 p-3.5 sm:p-5">
                      <span className="font-display text-xl text-pharma-soft sm:text-2xl">{number}</span>
                      <p className="mt-2.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-primary-foreground/75 sm:text-[0.68rem]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
