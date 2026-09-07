import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  GraduationCap,
  MapPin,
  RefreshCw,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useJobs } from "@/hooks/use-public-api";
import { PageIntro, SiteLayout } from "@/components/layout";
import { PublicEmptyState, PublicErrorState } from "@/components/common";
import type { JobResponse } from "@/types/api";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at STKA Pvt Ltd | Open Positions & Opportunities" },
      {
        name: "description",
        content:
          "Explore career opportunities with STKA Pvt Ltd across pharmaceutical manufacturing, quality assurance, regulatory compliance, and operations.",
      },
      { property: "og:title", content: "Careers at STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "Join STKA Pvt Ltd and build a career in quality pharmaceutical manufacturing.",
      },
      { property: "og:url", content: "https://stkapvt.com/careers" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Careers at STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Explore career opportunities in pharmaceutical manufacturing at STKA Pvt Ltd.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/careers" }],
  }),
  component: CareersPage,
});

const CAREER_PRINCIPLES = [
  {
    number: "01",
    title: "Scientific Curiosity",
    description:
      "Approaching production processes with analytical rigor, detailed observation, and a commitment to scientific standards.",
  },
  {
    number: "02",
    title: "Respect for Quality",
    description:
      "Maintaining procedural discipline, standard operating protocols, and batch record accuracy across every operational phase.",
  },
  {
    number: "03",
    title: "Clear Ownership",
    description:
      "Taking personal responsibility for task precision, environmental safety compliance, and formulation integrity.",
  },
  {
    number: "04",
    title: "Long-term Thinking",
    description:
      "Building sustainable operational practices, dependable team communication, and long-term professional capabilities.",
  },
];

function CareersPage() {
  const { data: apiJobs, isLoading, isError, refetch } = useJobs();
  const activeJobs: JobResponse[] = apiJobs ? apiJobs.filter((j) => j.active) : [];

  return (
    <SiteLayout>
      {/* 1. PAGE INTRO WITH LEFT ALIGNED SUBHEADING LAYOUT */}
      <PageIntro
        eyebrow="Careers"
        title="Do precise work with people who care about the details."
        description="Explore current opportunities and learn more about working with STKA Pvt Ltd across pharmaceutical operations, quality, and technical roles."
        align="left"
      />

      {/* 2. CULTURE & WORKING ENVIRONMENT SECTION */}
      <section className="container-wide py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Careers at STKA / 01</p>
            <h2 className="display-title mt-5 text-4xl text-primary leading-tight">
              A culture built for responsibility.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Working at STKA means operating with accountability, respecting procedural quality standards, and contributing to dependable pharmaceutical production.
            </p>
          </div>

          <div className="grid gap-4">
            {CAREER_PRINCIPLES.map((item) => (
              <div key={item.number} className="border border-border bg-[#F5F7F5] p-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[#5F9472] font-bold text-sm">{item.number}</span>
                  <h3 className="font-display text-xl text-primary">{item.title}</h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS SECTION (DYNAMIC BACKEND DATA & ZERO-OPENING STATE) */}
      <section className="bg-secondary py-20 sm:py-28 border-t border-border">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="eyebrow">Open Positions / 02</p>
              <h2 className="display-title mt-2 text-3xl text-primary sm:text-4xl">
                Current Opportunities
              </h2>
            </div>
            {!isLoading && !isError && (
              <span className="text-xs font-semibold text-muted-foreground bg-background px-3 py-1.5 border border-border">
                {activeJobs.length} {activeJobs.length === 1 ? "Active Opening" : "Active Openings"}
              </span>
            )}
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="mt-8 grid gap-4">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="animate-pulse border border-border bg-background p-6">
                  <div className="h-4 w-24 bg-muted" />
                  <div className="mt-3 h-6 w-1/2 bg-muted" />
                  <div className="mt-2 h-4 w-1/3 bg-muted/60" />
                </div>
              ))}
            </div>
          ) : isError ? (
            /* ERROR STATE */
            <div className="mt-8">
              <PublicErrorState
                icon={BriefcaseBusiness}
                title="Career opportunities temporarily unavailable"
                description="We're unable to load current opportunities right now."
                onRetry={() => refetch()}
              />
            </div>
          ) : activeJobs.length === 0 ? (
            /* ZERO OPENINGS STATE */
            <div className="mt-8">
              <PublicEmptyState
                icon={BriefcaseBusiness}
                title="No current openings"
                description="We don't have any open positions at the moment. Please check back for future opportunities."
                action={{
                  label: "Submit General Inquiry",
                  href: "/contact",
                }}
              />
            </div>
          ) : (
            /* DYNAMIC ACTIVE JOBS LIST */
            <div className="mt-8 grid gap-6">
              {activeJobs.map((job) => {
                const formattedType = job.employmentType
                  ? job.employmentType.replace(/_/g, " ")
                  : "Full Time";

                return (
                  <div
                    key={job.id}
                    className="group border border-border bg-background p-6 sm:p-8 transition-all hover:border-[#5F9472]/60 shadow-sm"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#5F9472] bg-[#E8ECE9] px-2.5 py-1 border border-border">
                            {job.department || "Operations"}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground capitalize">
                            · {formattedType.toLowerCase()}
                          </span>
                        </div>

                        <h3 className="mt-3 font-display text-2xl text-primary sm:text-3xl">
                          {job.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                              <MapPin className="size-3.5 text-[#5F9472]" /> {job.location}
                            </span>
                          )}
                          {job.qualification && (
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <GraduationCap className="size-3.5 text-[#5F9472]" /> {job.qualification}
                            </span>
                          )}
                          {job.experience && (
                            <span className="inline-flex items-center gap-1.5 font-medium">
                              <UserCheck className="size-3.5 text-[#5F9472]" /> Experience: {job.experience}
                            </span>
                          )}
                          {job.applicationDeadline && (
                            <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                              <Calendar className="size-3.5 text-[#5F9472]" /> Apply by {job.applicationDeadline}
                            </span>
                          )}
                        </div>

                        {job.description && (
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            {job.description}
                          </p>
                        )}

                        {job.responsibilities && (
                          <div className="mt-4 border-t border-border pt-3">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
                              Key Responsibilities:
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                              {job.responsibilities}
                            </p>
                          </div>
                        )}

                        {job.requirements && (
                          <div className="mt-3">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
                              Requirements:
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                              {job.requirements}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="lg:pt-2">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-3 bg-[#5F9472] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#4e7d5f]"
                        >
                          Apply / Enquire <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. FUTURE OPPORTUNITIES & TALENT INQUIRY SECTION */}
      <section className="container-wide py-16 sm:py-24">
        <div className="border border-border bg-[#F5F7F5] p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="eyebrow text-[#5F9472]">Talent &amp; Career Inquiries</p>
              <h3 className="display-title mt-2 text-2xl sm:text-3xl text-primary">
                Future Opportunities
              </h3>
              <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                If your technical background aligns with pharmaceutical manufacturing, quality control, or regulatory operations, submit your general inquiry through our contact team.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-input bg-card px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent"
            >
              Contact Careers Team <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}