import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  Send,
  ShieldCheck,
  Building2,
  Phone,
  User,
} from "lucide-react";
import { useSubmitEnquiry } from "@/hooks/use-public-api";
import type { ProductResponse, ImageResponse } from "@/types/api";
import tabletsImage from "@/assets/stka-product-tablets.jpg";

interface ProductDetailsProps {
  product: ProductResponse;
}

function ProductImageGallery({
  images,
  productName,
}: {
  images: ImageResponse[];
  productName: string;
}) {
  const imageUrls: string[] =
    images && images.length > 0
      ? images.map((img) => img.imageUrl).filter(Boolean)
      : [tabletsImage];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeSrc, setActiveSrc] = useState<string>(imageUrls[0] || tabletsImage);

  // Sync active src if selectedIndex or images change
  useEffect(() => {
    const current = imageUrls[selectedIndex] || imageUrls[0] || tabletsImage;
    setActiveSrc(current);
  }, [selectedIndex, images]);

  return (
    <div className="w-full border border-border bg-[#E8ECE9] p-3 sm:p-5">
      {/* Prominent Main Image Display with Stable Aspect Ratio Container */}
      <div className="image-frame relative aspect-[4/3] w-full border border-border/60 bg-white flex items-center justify-center overflow-hidden">
        <img
          src={activeSrc}
          alt={`${productName} product presentation`}
          onError={() => setActiveSrc(tabletsImage)}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Thumbnail Selector Bar for Multiple Images */}
      {imageUrls.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2.5">
          {imageUrls.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative size-16 overflow-hidden border bg-white p-1 transition-all ${
                selectedIndex === idx
                  ? "border-[#5F9472] ring-2 ring-[#5F9472]/40 scale-105"
                  : "border-border/70 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={url}
                alt={`${productName} thumbnail ${idx + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = tabletsImage;
                }}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const submitEnquiryMutation = useSubmitEnquiry();

  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    submitEnquiryMutation.mutate(
      {
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        company: inquiryData.company,
        subject: `Product Inquiry: ${product.productName} (${product.slug})`,
        message: inquiryData.message,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  const name = product.productName;
  const brand = product.brand || "STKA Portfolio";
  const genericName = product.genericName || "Specification Record";
  const composition = product.composition || "Formulation details available upon request.";
  const strength = product.strength || "Standard Formulation";
  const dosageForm = product.dosageForm || "Pharmaceutical Form";
  const category = product.categoryName || "Pharmaceuticals";
  const description =
    product.description ||
    "High-grade pharmaceutical formulation produced under rigorous batch quality controls and scientific standards.";
  const images = product.productImages || [];

  return (
    <div className="w-full">
      {/* HEADER / HERO BANNER */}
      <section className="bg-primary pb-16 pt-36 text-primary-foreground">
        <div className="container-wide">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-foreground/60">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight className="size-3.5" />
            <Link to="/products" className="hover:text-primary-foreground transition-colors">Products</Link>
            <ChevronRight className="size-3.5" />
            <span className="text-primary-foreground font-semibold truncate max-w-xs">{name}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="eyebrow text-pharma-soft">{category}</span>
            <span className="h-3 w-px bg-primary-foreground/20" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/70">{brand}</span>
          </div>

          <h1 className="display-title mt-3 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-primary-foreground/80 leading-relaxed font-sans">
            {genericName}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="container-wide grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:py-24">
        {/* LEFT COLUMN: GALLERY & QUALITY NOTES */}
        <div>
          <ProductImageGallery images={images} productName={name} />

          <div className="mt-6 border border-border bg-[#F5F7F5] p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <ShieldCheck className="size-4 text-[#5F9472]" /> Quality Standard & Control
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Formulated under strict batch documentation protocols, scientific analytical controls, and standard operating procedures.
            </p>
          </div>

          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-input bg-card px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent"
            >
              <ArrowLeft className="size-4" /> Back to Products Catalogue
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: OVERVIEW & SPECIFICATIONS */}
        <div>
          <div>
            <p className="eyebrow">{brand}</p>
            <h2 className="display-title mt-2 text-3xl text-primary sm:text-4xl">{name}</h2>
            <p className="mt-2 text-sm font-semibold text-[#5F9472]">{genericName}</p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{description}</p>
          </div>

          {/* SPECIFICATIONS GRID TABLE */}
          <div className="mt-10 border-t border-border">
            <h3 className="pt-5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Product Specifications
            </h3>
            <dl className="mt-4 grid border-t border-border sm:grid-cols-2">
              {[
                ["Generic Name", genericName],
                ["Brand Name", brand],
                ["Composition", composition],
                ["Strength", strength],
                ["Dosage Form", dosageForm],
                ["Category", category],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-border py-4 pr-4">
                  <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* COMPOSITION & FORMULATION DETAILS */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              <FileText className="size-4 text-[#5F9472]" /> Formulation Record & Composition
            </div>
            <div className="mt-3 border border-border bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Active Ingredients / Composition:</p>
              <p className="text-foreground/90 font-mono text-xs">{composition}</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              This entry represents an active formulation record in the STKA pharmaceutical portfolio. For commercial inquiries, bulk batch packaging, or regulatory documentation support, please use the inquiry form below.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT INQUIRY SECTION */}
      <section id="inquiry" className="bg-secondary py-16 lg:py-24 border-t border-border">
        <div className="container-wide max-w-4xl">
          <div className="text-center">
            <p className="eyebrow text-[#5F9472]">Commercial Support</p>
            <h2 className="display-title mt-3 text-3xl text-primary sm:text-4xl">
              Enquire About {name}
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-muted-foreground">
              Submit your B2B supply, distribution, or manufacturing inquiry directly for this product. Our commercial team will respond with full technical specifications.
            </p>
          </div>

          <div className="mt-10 border border-border bg-card p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto size-14 text-[#5F9472]" />
                <h3 className="display-title mt-4 text-2xl text-primary">Inquiry Submitted Successfully</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for contacting STKA Pvt Ltd. Your inquiry regarding <span className="font-semibold text-foreground">{name}</span> has been received. Our team will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 border border-input bg-card px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-accent"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2 flex items-center gap-1.5">
                    <User className="size-3.5 text-[#5F9472]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="h-11 w-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2 flex items-center gap-1.5">
                    <Mail className="size-3.5 text-[#5F9472]" /> Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="h-11 w-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2 flex items-center gap-1.5">
                    <Phone className="size-3.5 text-[#5F9472]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="h-11 w-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2 flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-[#5F9472]" /> Company / Organization
                  </label>
                  <input
                    type="text"
                    value={inquiryData.company}
                    onChange={(e) => setInquiryData({ ...inquiryData, company: e.target.value })}
                    placeholder="Company name"
                    className="h-11 w-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2">
                    Inquiry Details / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder={`Specify your commercial requirement or quantity for ${name}...`}
                    className="w-full border border-input bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/60">
                  <p className="text-xs text-muted-foreground">
                    Product Reference: <span className="font-semibold text-foreground">{name} ({product.slug})</span>
                  </p>
                  <button
                    type="submit"
                    disabled={submitEnquiryMutation.isPending}
                    className="inline-flex items-center gap-3 bg-[#5F9472] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#4e7d5f] disabled:opacity-50"
                  >
                    {submitEnquiryMutation.isPending ? "Submitting..." : "Submit Inquiry"}{" "}
                    <Send className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
