import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, HeartHandshake, Microscope, ShieldCheck, Target } from "lucide-react";
import { useResolvedCompanyInfo } from "@/hooks/use-public-api";
import heroImage from "@/assets/stka-hero.jpg";
import laboratoryImage from "@/assets/stka-laboratory.jpg";
import manufacturingImage from "@/assets/stka-manufacturing.jpg";
import { PageIntro, SiteLayout } from "@/components/layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | STKA Pvt Ltd - Pharmaceutical Manufacturing Overview" },
      {
        name: "description",
        content:
          "Learn about STKA Pvt Ltd's corporate philosophy, manufacturing approach, quality commitments, vision, mission, and long-term healthcare partnerships.",
      },
      { property: "og:title", content: "About STKA Pvt Ltd | Corporate Overview" },
      {
        property: "og:description",
        content: "A corporate overview of STKA's pharmaceutical manufacturing approach and quality standards.",
      },
      { property: "og:url", content: "https://stkapvt.com/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About STKA Pvt Ltd | Corporate Overview" },
      {
        name: "twitter:description",
        content: "Learn about STKA Pvt Ltd's corporate philosophy, manufacturing approach, and quality standards.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About STKA Pvt Ltd",
          url: "https://stkapvt.com/about",
          description: "Corporate overview and quality philosophy of STKA Pvt Ltd.",
          publisher: {
            "@type": "Organization",
            name: "STKA Pvt Ltd",
            url: "https://stkapvt.com",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { company } = useResolvedCompanyInfo();

  const companyName = company.companyName;
  const description = company.description;
  const vision = company.vision;
  const mission = company.mission;

  return (
    <SiteLayout>
      <PageIntro
        eyebrow="About STKA"
        title="A pharmaceutical company built around trust, precision, and quality."
        description="Learn about our corporate philosophy, structured manufacturing processes, and long-term commitment to reliable healthcare supply."
        align="left"
      />

      {/* SECTION 01 — COMPANY OVERVIEW & STATIC LAB IMAGE */}
      <section className="container-wide grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="w-[94%] ml-0 mr-auto border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3.5">
          <div className="image-frame aspect-[1.1/1] border border-border/60 overflow-hidden">
            <img
              src={laboratoryImage}
              alt="STKA pharmaceutical laboratory environment"
              width={1104}
              height={912}
              className="image-zoom h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Company Overview / 01</p>
          <h2 className="display-title mt-4 text-4xl text-primary sm:text-5xl">
            {companyName}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="size-5 text-[#5F9472] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Controlled Quality</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Comprehensive testing protocols applied across raw materials and final packaging.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Microscope className="size-5 text-[#5F9472] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Scientific Precision</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Standardized formulation processes engineered for consistent batch reproducibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — OUR APPROACH & STATIC HERO IMAGE */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Our Approach / 02</p>
            <h2 className="display-title mt-5 text-4xl text-primary">Disciplined execution across every formulation.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We approach pharmaceutical manufacturing as a continuous discipline. From raw material intake to final dispatch, our facilities operate under systematic environmental controls and batch documentation to ensure product integrity.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Formulation manufacturing processes structured around rigorous quality standards",
                "Quality assurance protocols and batch documentation maintained across production",
                "Standardized operating procedures applied throughout formulation and handling",
                "Long-term partner relationships built on clarity, responsiveness, and trust",
              ].map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <CheckCircle2 className="size-5 text-[#5F9472] shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-primary leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[94%] ml-auto mr-0 border border-border bg-background p-2 sm:w-full sm:p-3.5">
            <div className="image-frame aspect-[1.15/1] border border-border/60 overflow-hidden">
              <img
                src={heroImage}
                alt="STKA scientific methodology and formulation visual"
                loading="lazy"
                className="image-zoom h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — VISION, MISSION & CORPORATE VALUES */}
      <section className="container-wide py-20 lg:py-28 border-b border-border/70">
        <div className="max-w-2xl">
          <p className="eyebrow">Corporate Principles / 03</p>
          <h2 className="display-title mt-4 text-4xl text-primary sm:text-5xl">
            Guided by purpose, measured by standards.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="border border-border bg-[#F5F7F5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#5F9472]">
                <Target className="size-4" /> Vision
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{vision}</p>
            </div>
          </div>

          <div className="border border-border bg-[#F5F7F5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#5F9472]">
                <HeartHandshake className="size-4" /> Mission
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mission}</p>
            </div>
          </div>

          <div className="border border-border bg-[#F5F7F5] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#5F9472]">
                <ShieldCheck className="size-4" /> Values
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#5F9472]" /> Quality First</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#5F9472]" /> Scientific Integrity</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#5F9472]" /> Operational Consistency</li>
                <li className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#5F9472]" /> Partner Responsibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — QUALITY COMMITMENT & STATIC MANUFACTURING IMAGE */}
      <section className="container-wide grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div className="order-2 lg:order-1 border-l border-primary/20 pl-7">
          <p className="eyebrow">Quality Commitment / 04</p>
          <h2 className="display-title mt-4 text-3xl text-primary sm:text-4xl">Evidence over assertion.</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Our quality management workflows emphasize systematic batch testing, raw material verification, and strict adherence to defined manufacturing specifications before product release.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            <span>Rigorous Analytical Control</span>
            <ArrowRight className="size-4 text-[#5F9472]" />
          </div>
        </div>
        <div className="order-1 lg:order-2 w-[94%] ml-auto mr-0 border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3.5">
          <div className="image-frame aspect-[1.15/1] border border-border/60 overflow-hidden">
            <img
              src={manufacturingImage}
              alt="STKA pharmaceutical manufacturing facility"
              loading="lazy"
              className="image-zoom h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}