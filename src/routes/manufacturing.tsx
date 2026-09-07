import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Factory, ShieldCheck, Cpu, ClipboardCheck, Layers } from "lucide-react";
import { useManufacturing } from "@/hooks/use-public-api";
import manufacturingImage from "@/assets/stka-manufacturing.jpg";
import laboratoryImage from "@/assets/stka-laboratory.jpg";
import { PageIntro, SiteLayout } from "@/components/layout";
import { PublicEmptyState, PublicErrorState } from "@/components/common";

export const Route = createFileRoute("/manufacturing")({
  head: () => ({
    meta: [
      { title: "Manufacturing Capabilities & Infrastructure | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Explore STKA's manufacturing plant capabilities, sterile formulation units, environmental controls, and process validation.",
      },
      { property: "og:title", content: "Manufacturing Capabilities | STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "A detailed overview of the STKA manufacturing infrastructure, plant design, and sterile formulation capabilities.",
      },
      { property: "og:url", content: "https://stkapvt.com/manufacturing" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Manufacturing Capabilities | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Explore STKA's manufacturing plant infrastructure and sterile production capabilities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/manufacturing" }],
  }),
  component: ManufacturingPage,
});

function ManufacturingPage() {
  const { data: apiUnits, isLoading, isError, refetch } = useManufacturing();
  const activeUnits = apiUnits ? apiUnits.filter((u) => u.active) : [];

  const mainHeroSrc =
    activeUnits.length > 0 && activeUnits[0]?.images && activeUnits[0].images.length > 0
      ? activeUnits[0].images[0]?.imageUrl || manufacturingImage
      : manufacturingImage;

  return (
    <SiteLayout>
      {/* 1. PAGE INTRO WITH LEFT ALIGNED SUBHEADING LAYOUT */}
      <PageIntro
        eyebrow="Manufacturing"
        title="Built on quality. Driven by precision."
        description="STKA's manufacturing operations are designed around sterile production environments, stringent environmental controls, and process validation."
        align="left"
      />

      {/* 2. HERO MANUFACTURING SHOWCASE IMAGE */}
      <section className="container-wide py-12 sm:py-16">
        <div className="w-[96%] ml-auto mr-0 border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3.5">
          <div className="image-frame relative overflow-hidden bg-primary border border-border/60">
            <img
              src={mainHeroSrc}
              alt="STKA pharmaceutical manufacturing facility overview"
              onError={(e) => {
                (e.target as HTMLImageElement).src = manufacturingImage;
              }}
              className="h-[24rem] w-full object-cover opacity-85 sm:h-[34rem]"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-0 left-0 max-w-2xl p-6 sm:p-12">
              <p className="eyebrow text-pharma-soft">Manufacturing Overview</p>
              <p className="mt-3 font-display text-2xl text-primary-foreground sm:text-4xl lg:text-5xl leading-tight">
                Every stage should be clear, controlled, and accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL MANUFACTURING APPROACH */}
      <section className="border-y border-border bg-[#F5F7F5] py-16 sm:py-20">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#5F9472]">Controlled Environment &amp; Processing</p>
              <h2 className="display-title mt-3 text-3xl text-primary sm:text-4xl">
                Pharmaceutical Production Discipline
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                STKA Pvt Ltd structures its production workflows around rigorous environmental management, automated liquid and solid handling systems, and batch record traceability. All facility operations prioritize quality consistency and procedural control across production runs.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-border bg-white p-5">
                <ShieldCheck className="size-5 text-[#5F9472]" />
                <h4 className="mt-3 font-display text-lg text-primary">Environmental Control</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Filtered air supply, differential pressure gradients, and environmental monitoring.
                </p>
              </div>

              <div className="border border-border bg-white p-5">
                <Cpu className="size-5 text-[#5F9472]" />
                <h4 className="mt-3 font-display text-lg text-primary">Automated Lines</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Precision filling equipment and validated clean-in-place procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FACILITIES & PRODUCTION UNITS (DYNAMIC BACKEND DATA) */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="eyebrow">Facilities &amp; Units / 01</p>
              <h2 className="display-title mt-3 text-3xl text-primary sm:text-4xl">
                Active Manufacturing Facilities &amp; Production Units
              </h2>
            </div>
            {activeUnits.length > 0 && (
              <span className="text-xs font-semibold text-muted-foreground bg-background px-3 py-1.5 border border-border">
                {activeUnits.length} {activeUnits.length === 1 ? "Unit" : "Units"} Documented
              </span>
            )}
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse border border-border p-6 bg-background">
                    <div className="h-6 w-1/3 bg-muted" />
                    <div className="mt-4 h-6 w-3/4 bg-muted" />
                    <div className="mt-3 h-16 w-full bg-muted/60" />
                    <div className="mt-6 aspect-[16/9] w-full bg-muted/40" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <PublicErrorState
                icon={Factory}
                title="Manufacturing information temporarily unavailable"
                description="We're unable to display our manufacturing information right now. Please check back shortly."
                onRetry={() => refetch()}
              />
            ) : activeUnits.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {activeUnits.map((unit, index) => {
                  const unitImage =
                    unit.images && unit.images.length > 0
                      ? unit.images[0]?.imageUrl || manufacturingImage
                      : manufacturingImage;

                  return (
                    <div
                      key={unit.id}
                      className="group border border-border bg-background p-6 transition-all hover:border-[#5F9472]/60 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-3xl text-[#5F9472]">0{index + 1}</span>
                        <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground bg-secondary px-2.5 py-1 border border-border">
                          Facility Unit
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-2xl text-primary">{unit.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {unit.description}
                      </p>

                      {/* Stable Aspect Ratio Facility Image Container */}
                      <div className="mt-6 image-frame relative aspect-[16/9] w-full overflow-hidden border border-border bg-[#E8ECE9]">
                        <img
                          src={unitImage}
                          alt={`${unit.title} facility showcase`}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = manufacturingImage;
                          }}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <PublicEmptyState
                icon={Factory}
                title="Manufacturing information is being updated"
                description="Our manufacturing and facility information will appear here once available."
              />
            )}
          </div>
        </div>
      </section>

      {/* 5. QUALITY CONTROL & PROCESS SYSTEMS SHOWCASE */}
      <section className="container-wide grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="w-[96%] ml-0 mr-auto border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3.5">
          <div className="image-frame aspect-[1.1/1] border border-border/60">
            <img
              src={laboratoryImage}
              alt="Quality control laboratory and analytical equipment at STKA facility"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = manufacturingImage;
              }}
              className="image-zoom h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow">Quality Systems &amp; Analytical Control / 02</p>
          <h2 className="display-title mt-4 text-3xl text-primary sm:text-4xl">
            Documented Process Controls &amp; Testing
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Manufacturing at STKA is paired with analytical testing and quality control workflows. Every production batch is backed by comprehensive sampling, environmental data logs, and laboratory verification.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 border-t border-border pt-6">
            <div className="border-b border-border pb-3">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary flex items-center gap-1.5">
                <ClipboardCheck className="size-3.5 text-[#5F9472]" /> Batch Documentation
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground">
                Complete traceability across raw material lots and manufacturing steps.
              </dd>
            </div>

            <div className="border-b border-border pb-3">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-primary flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-[#5F9472]" /> Process Validation
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground">
                Standard operating procedures and analytical in-process testing controls.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 6. COMMERCIAL MANUFACTURING INQUIRY CTA */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 border-t border-border">
        <div className="container-wide flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-pharma-soft">Commercial Manufacturing Partnerships</p>
            <h3 className="display-title mt-2 text-3xl text-primary-foreground sm:text-4xl">
              Discuss a Manufacturing Requirement
            </h3>
            <p className="mt-3 max-w-xl text-xs sm:text-sm text-primary-foreground/75 leading-relaxed font-sans">
              Contact our technical and commercial teams to discuss formulation requirements, batch capabilities, or distribution inquiries.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#5F9472] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#4e7d5f]"
          >
            Send an Enquiry <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}