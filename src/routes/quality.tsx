import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FileCheck,
  FileText,
  ShieldCheck,
  ClipboardList,
  Search,
} from "lucide-react";
import { useCertifications } from "@/hooks/use-public-api";
import { PageIntro, SiteLayout } from "@/components/layout";
import { PublicEmptyState, PublicErrorState } from "@/components/common";
import laboratoryImage from "@/assets/stka-laboratory.jpg";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Assurance & Certifications | STKA Pvt Ltd" },
      {
        name: "description",
        content:
          "Review STKA's quality philosophy, documented process controls, regulatory standards, and verified certification records.",
      },
      { property: "og:title", content: "Quality Assurance & Certifications | STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "Quality assurance, quality control, and verified certification records for STKA Pvt Ltd.",
      },
      { property: "og:url", content: "https://stkapvt.com/quality" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Quality Assurance & Certifications | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Quality assurance and verified certification standards at STKA Pvt Ltd.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/quality" }],
  }),
  component: QualityPage,
});

const QUALITY_PRINCIPLES = [
  {
    title: "Quality Assurance",
    description:
      "Documented procedures, standard operating protocols, and system validation designed to maintain operational consistency across facility workflows.",
  },
  {
    title: "Quality Control",
    description:
      "Analytical testing, raw material inspection, and finished formulation sampling conducted to verify material compliance before release.",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Operational practices aligned with applicable pharmaceutical regulatory standards, manufacturing guidelines, and audit documentation.",
  },
  {
    title: "Product Safety",
    description:
      "Controlled cleanroom environments, containment protocols, and risk mitigation strategies to safeguard product integrity throughout processing.",
  },
  {
    title: "Continuous Improvement",
    description:
      "Systematic review of batch records, environmental monitoring logs, and operational controls to optimize workflow reliability.",
  },
];

function QualityPage() {
  const { data, isLoading, isError, refetch } = useCertifications({ pageSize: 50 });
  const certList = data?.content || [];

  return (
    <SiteLayout>
      {/* 1. PAGE INTRO WITH LEFT ALIGNED SUBHEADING LAYOUT */}
      <PageIntro
        dark
        eyebrow="Quality & Certifications"
        title="Quality is not a claim. It is a system."
        description="Quality at STKA is approached through documented processes, consistent controls, and a commitment to maintaining reliable standards across pharmaceutical operations."
        align="left"
      />

      {/* 2. QUALITY PHILOSOPHY SECTION */}
      <section className="container-wide py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Quality Philosophy / 01</p>
            <h2 className="display-title mt-5 text-4xl text-primary leading-tight">
              Evidence, consistency, continuous improvement.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Our operational framework relies on verifiable records, analytical controls, and procedural accountability at every phase of pharmaceutical manufacturing.
            </p>
          </div>

          <div className="grid gap-0 border-t border-border">
            {QUALITY_PRINCIPLES.map((item, index) => (
              <div key={item.title} className="flex items-start gap-5 border-b border-border py-6">
                <span className="grid size-9 shrink-0 place-items-center border border-[#5F9472] text-xs font-bold text-[#5F9472]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-primary">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RICH EDITORIAL: QUALITY APPROACH & DOCUMENTED SYSTEMS */}
      <section className="border-y border-border bg-[#F5F7F5] py-16 sm:py-24">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-[#5F9472]">Documented Controls &amp; Traceability</p>
              <h2 className="display-title mt-3 text-3xl text-primary sm:text-4xl">
                Process Validation &amp; Analytical Control
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                Pharmaceutical quality demands rigorous documentation and repeatable process control. At STKA, raw material testing, cleanroom environmental monitoring, and batch release analytical data are systematically logged to establish end-to-end traceability.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-border bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    <ClipboardList className="size-4 text-[#5F9472]" /> Batch Traceability
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Complete records for raw material lots, environmental parameters, and analytical test results.
                  </p>
                </div>

                <div className="border border-border bg-white p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                    <Search className="size-4 text-[#5F9472]" /> Analytical Verification
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    In-process sampling points established across critical processing steps prior to batch release.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[96%] ml-auto mr-0 border border-border bg-[#E8ECE9] p-2 sm:w-full sm:p-3">
              <div className="image-frame aspect-[1.15/1] border border-border/60">
                <img
                  src={laboratoryImage}
                  alt="Quality control laboratory and analytical equipment"
                  loading="lazy"
                  className="image-zoom h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CERTIFICATION LIBRARY SECTION (VERIFIED BACKEND DATA) */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-primary-foreground/20 pb-6">
            <div>
              <p className="eyebrow text-pharma-soft">Certification Library / 02</p>
              <h2 className="display-title mt-4 text-4xl sm:text-5xl">Verified Quality Credentials</h2>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-8 text-pharma-soft" />
              {!isError && certList.length > 0 && (
                <span className="text-xs font-semibold text-primary-foreground/75 bg-primary-foreground/10 px-3 py-1.5 border border-primary-foreground/20">
                  {certList.length} {certList.length === 1 ? "Record" : "Records"} Listed
                </span>
              )}
            </div>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="animate-pulse border border-primary-foreground/20 bg-primary-foreground/5 p-5">
                  <div className="aspect-[4/3] bg-primary-foreground/10" />
                  <div className="mt-4 h-6 w-3/4 bg-primary-foreground/20" />
                  <div className="mt-2 h-4 w-1/2 bg-primary-foreground/15" />
                  <div className="mt-4 h-12 w-full bg-primary-foreground/10" />
                </div>
              ))}
            </div>
          ) : isError ? (
            /* ERROR STATE */
            <div className="mt-12">
              <PublicErrorState
                dark
                title="Certification information temporarily unavailable"
                description="We're unable to display our certification information right now. Please check back shortly."
                onRetry={() => refetch()}
              />
            </div>
          ) : certList.length === 0 ? (
            /* EMPTY STATE */
            <div className="mt-12">
              <PublicEmptyState
                dark
                icon={FileText}
                title="Certification information is being updated"
                description="Our certification information will appear here once available."
                action={{
                  label: "Send an Enquiry",
                  to: "/contact",
                }}
              />
            </div>
          ) : (
            /* SUCCESS CERTIFICATION GALLERY */
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certList.map((cert) => {
                const title = cert.title;
                const authority = cert.issuingAuthority;
                const certNum = cert.certificateNumber;
                const description = cert.description;
                const issuedAt = cert.issuedAt;
                const expireAt = cert.expireAt;
                const images = cert.certificateImages || [];

                // Expiry status calculation if date exists
                const isCurrent = expireAt ? new Date(expireAt) > new Date() : null;

                return (
                  <CertificationCard
                    key={cert.id}
                    title={title}
                    authority={authority}
                    certNum={certNum}
                    description={description}
                    issuedAt={issuedAt}
                    expireAt={expireAt}
                    isCurrent={isCurrent}
                    images={images}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 5. QUALITY INFORMATION / COMMERCIAL CTA */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="container-wide flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-[#5F9472]">Technical Documentation &amp; Compliance</p>
            <h3 className="display-title mt-2 text-3xl text-primary sm:text-4xl">
              Request Quality Documentation
            </h3>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Contact STKA for technical specification sheets, analytical certificates of analysis (CoA), or quality compliance inquiries.
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

function CertificationCard({
  title,
  authority,
  certNum,
  description,
  issuedAt,
  expireAt,
  isCurrent,
  images,
}: {
  title: string;
  authority: string;
  certNum: string;
  description: string;
  issuedAt: string;
  expireAt: string;
  isCurrent: boolean | null;
  images: Array<{ id: string; imageUrl: string }>;
}) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  const currentImgSrc =
    images.length > 0 && images[selectedImgIndex]?.imageUrl
      ? images[selectedImgIndex].imageUrl
      : null;

  return (
    <div className="flex flex-col justify-between border border-primary-foreground/20 bg-primary-foreground/5 p-5 transition-all hover:border-pharma-soft/60">
      <div>
        {/* Certificate Status Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-pharma-soft bg-primary-foreground/10 px-2 py-0.5 border border-primary-foreground/15">
            Verified Record
          </span>
          {isCurrent !== null && (
            <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              {isCurrent ? "Current / Valid" : "Expired"}
            </span>
          )}
        </div>

        {/* Certificate Main Image Frame (Uncropped Contain Sizing) */}
        {currentImgSrc ? (
          <div className="image-frame relative aspect-[4/3] w-full border border-primary-foreground/20 bg-white p-2 flex items-center justify-center overflow-hidden">
            <img
              src={currentImgSrc}
              alt={`${title} official certificate document`}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full border border-dashed border-primary-foreground/20 bg-primary-foreground/10 p-6 flex flex-col items-center justify-center text-center">
            <Award className="size-10 text-pharma-soft mb-2" />
            <p className="text-xs font-semibold text-primary-foreground/80">{title}</p>
            <p className="text-[0.65rem] text-primary-foreground/60 mt-1">Official Document File</p>
          </div>
        )}

        {/* Multiple Certificate Images Thumbnail Switcher */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedImgIndex(idx)}
                className={`relative size-12 border bg-white p-0.5 transition-all ${
                  selectedImgIndex === idx
                    ? "border-[#5F9472] ring-2 ring-[#5F9472]/40"
                    : "border-primary-foreground/20 opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.imageUrl} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        )}

        {/* Certificate Information */}
        <h4 className="mt-5 font-display text-xl text-primary-foreground">{title}</h4>
        <p className="mt-1 text-xs font-medium text-pharma-soft">{authority}</p>

        {certNum && (
          <p className="mt-2 text-xs font-mono text-primary-foreground/75 bg-primary-foreground/10 px-2.5 py-1 border border-primary-foreground/15 inline-block">
            Cert No: {certNum}
          </p>
        )}

        {description && (
          <p className="mt-3 text-xs leading-relaxed text-primary-foreground/75 font-sans">
            {description}
          </p>
        )}
      </div>

      {/* Validity Dates */}
      {(issuedAt || expireAt) && (
        <div className="mt-5 border-t border-primary-foreground/15 pt-3.5 flex flex-wrap items-center justify-between gap-2 text-[0.68rem] text-primary-foreground/60 font-mono">
          {issuedAt && <span>Issued: {issuedAt}</span>}
          {expireAt && <span>Expires: {expireAt}</span>}
        </div>
      )}
    </div>
  );
}