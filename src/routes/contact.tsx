import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, Phone, Building, FileCheck2, Handshake, Truck, Layers } from "lucide-react";
import { useResolvedCompanyInfo } from "@/hooks/use-public-api";
import { PageIntro, SiteLayout } from "@/components/layout";
import { EnquiryForm } from "@/components/enquiry";
import { CompanyMap } from "@/components/company/CompanyMap";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | STKA Pvt Ltd - Enquiries & Corporate Support" },
      {
        name: "description",
        content:
          "Contact STKA Pvt Ltd for product enquiries, formulation partnerships, distribution opportunities, and corporate conversations.",
      },
      { property: "og:title", content: "Contact Us | STKA Pvt Ltd" },
      {
        property: "og:description",
        content: "Connect with STKA for product enquiries, business partnerships, and corporate conversations.",
      },
      { property: "og:url", content: "https://stkapvt.com/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us | STKA Pvt Ltd" },
      {
        name: "twitter:description",
        content: "Contact STKA Pvt Ltd for product inquiries and commercial partnerships.",
      },
    ],
    links: [{ rel: "canonical", href: "https://stkapvt.com/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact STKA Pvt Ltd",
          url: "https://stkapvt.com/contact",
          description: "Get in touch with STKA Pvt Ltd for pharmaceutical inquiries.",
          publisher: {
            "@type": "Organization",
            name: "STKA Pvt Ltd",
            url: "https://stkapvt.com",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

const SUPPORTED_ENQUIRY_TYPES = [
  {
    icon: Layers,
    title: "Product Enquiries",
    description: "Detailed active pharmaceutical ingredient specifications, generic dosage forms, and batch quantities.",
  },
  {
    icon: Building,
    title: "Business Enquiries",
    description: "Corporate discussions, institutional supply agreements, and commercial collaboration opportunities.",
  },
  {
    icon: Truck,
    title: "Distribution Enquiries",
    description: "Regional distribution channels, logistics partner onboarding, and market expansion proposals.",
  },
  {
    icon: Handshake,
    title: "Partnership Enquiries",
    description: "Contract manufacturing arrangements, formulation co-development, and technology transfer.",
  },
  {
    icon: FileCheck2,
    title: "General Corporate Enquiries",
    description: "Administrative communication, career candidate resumes, and general stakeholder requests.",
  },
];

function ContactPage() {
  const { data: rawCompany, company } = useResolvedCompanyInfo();

  const companyName = company.companyName;
  const legalName = company.legalName;
  const email = company.email;
  const phone = company.phone;
  const address = company.address;
  const city = company.city;
  const state = company.state;
  const country = company.country;
  const pinCode = company.pinCode;

  const fullFormattedAddress = `${address}, ${city}, ${state}, ${country} - ${pinCode}`;

  return (
    <SiteLayout>
      {/* 1. KEEP MAIN HEADING EXACTLY + FIX SUBHEADING LAYOUT (LEFT STACKED) */}
      <PageIntro
        dark
        align="left"
        eyebrow="Contact"
        title="Let's start a considered conversation."
        description="Use the enquiry form for product enquiries, formulation partnerships, business opportunities, and corporate conversations."
      />

      {/* 2. CONNECT WITH STKA SECTION */}
      <section className="container-wide py-16 sm:py-20 border-b border-border">
        <div>
          <p className="eyebrow">Connect with STKA / 01</p>
          <h2 className="display-title mt-4 text-3xl text-primary sm:text-4xl">
            Structured communication channels.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Visitors, healthcare distributors, and corporate partners can contact STKA Pvt Ltd for relevant commercial, product, and manufacturing conversations. Select the appropriate enquiry category when submitting your request.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTED_ENQUIRY_TYPES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border border-border bg-card p-6 shadow-sm">
                <div className="grid size-10 place-items-center border border-pharma/40 bg-pharma-soft/30 text-pharma">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-display text-xl text-primary mt-4">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT INFORMATION & LOCATION & ENQUIRY FORM GRID */}
      <section className="container-wide grid gap-14 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-12">
          {/* CONTACT INFORMATION (USES BACKEND COMPANY INFORMATION DATA) */}
          <div>
            <p className="eyebrow">Contact Information / 02</p>
            <h2 className="display-title mt-4 text-3xl text-primary">Corporate Details</h2>

            <div className="mt-8 border border-border bg-card p-6 shadow-sm space-y-5">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Company Name</p>
                <p className="mt-1 text-sm font-bold text-primary">{companyName}</p>
                <p className="text-xs text-muted-foreground">Legal Name: {legalName}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Official Email</p>
                <a href={`mailto:${email}`} className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-pharma hover:underline">
                  <Mail className="size-4" /> {email}
                </a>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Telephone Contact</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <Phone className="size-4 text-pharma" /> {phone}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Facility &amp; Postal Address</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground font-medium flex items-start gap-2">
                  <MapPin className="size-4 text-pharma shrink-0 mt-0.5" />
                  {fullFormattedAddress}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">Operating Schedule</p>
                <p className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 className="size-4 text-pharma" /> Mon - Sat: 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* OUR LOCATION SECTION (INTERACTIVE MAP WITH BACKEND COORDINATES) */}
          <div>
            <p className="eyebrow">Our Location / 03</p>
            <h2 className="display-title mt-4 text-2xl text-primary">Facility Map</h2>
            <div className="mt-6">
              <CompanyMap companyInfo={rawCompany} />
            </div>
          </div>
        </div>

        {/* SEND AN ENQUIRY FORM */}
        <div className="border border-border bg-secondary p-6 sm:p-10 shadow-sm">
          <p className="eyebrow">Send an enquiry / 04</p>
          <h2 className="display-title mt-4 text-3xl text-primary">Tell us where to begin.</h2>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            Fill out the fields below. You can optionally attach a PDF document (e.g. resume or technical specification sheet up to 5 MB).
          </p>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}