import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useResolvedCompanyInfo } from "@/hooks/use-public-api";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";

function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.393A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.63 0-3.14-.44-4.44-1.21l-.32-.19-2.95.83.84-2.88-.21-.33A7.957 7.957 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  );
}

function getWhatsAppUrl(phone?: string): string | null {
  if (!phone) return null;
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  if (!cleanPhone) return null;
  const message = encodeURIComponent(
    "Hello STKA, I would like to know more about your pharmaceutical products."
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

export function SiteFooter() {
  const { company } = useResolvedCompanyInfo();

  const email = company.email;
  const phone = company.phone;
  const legalName = company.legalName;
  const description = company.description;

  const addressLine1 = company.address;
  const addressLine2 = `${company.city}, ${company.state}${company.pinCode ? ` - ${company.pinCode}` : ""}`;
  const fullAddress = `${addressLine1}, ${addressLine2}`;

  const whatsAppUrl = getWhatsAppUrl(phone);

  return (
    <footer className="border-t border-[#3d4e46] bg-[#29352F] text-[#F5F7F5]">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-20">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#F5F7F5]/55">
            {description}
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={`mailto:${email}`}
              aria-label="Email STKA"
              title="Email STKA"
              className="grid size-9 place-items-center rounded-lg border border-[#F5F7F5]/15 text-[#F5F7F5]/60 hover:border-[#5F9472] hover:text-[#C8DACD] transition-colors"
            >
              <Mail className="size-4" />
            </a>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                aria-label="Call STKA"
                title="Call STKA"
                className="grid size-9 place-items-center rounded-lg border border-[#F5F7F5]/15 text-[#F5F7F5]/60 hover:border-[#5F9472] hover:text-[#C8DACD] transition-colors"
              >
                <Phone className="size-4" />
              </a>
            )}
            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with STKA on WhatsApp"
                title="Chat with STKA on WhatsApp"
                className="grid size-9 place-items-center rounded-lg border border-[#F5F7F5]/15 text-[#F5F7F5]/60 hover:border-[#5F9472] hover:text-[#C8DACD] transition-colors"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            )}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#F5F7F5]/40">Quick Links</p>
          <div className="mt-5 grid gap-3 text-sm text-[#F5F7F5]/60">
            {navItems.map(([label, to]) => (
              <Link key={to} to={to} className="hover:text-[#C8DACD] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#F5F7F5]/40">Contact</p>
          <div className="mt-5 grid gap-3 text-sm text-[#F5F7F5]/60">
            <span className="font-semibold text-[#F5F7F5]/80 break-words">{legalName}</span>
            <a
              href={`mailto:${email}`}
              className="inline-flex max-w-full items-center gap-2 hover:text-[#C8DACD] transition-colors break-all"
            >
              <Mail className="size-3.5 text-[#5F9472] shrink-0" />
              <span className="break-all">{email}</span>
            </a>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex max-w-full items-center gap-2 text-[#F5F7F5]/80 hover:text-[#C8DACD] transition-colors break-words"
              >
                <Phone className="size-3.5 text-[#5F9472] shrink-0" />
                <span>{phone}</span>
              </a>
            )}
            <span className="inline-flex max-w-full items-start gap-2 break-words">
              <MapPin className="size-3.5 shrink-0 text-[#5F9472] mt-0.5" />
              <span className="break-words">{fullAddress}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="container-wide flex flex-wrap items-center justify-between gap-4 border-t border-[#3d4e46] py-5 text-[0.68rem] text-[#F5F7F5]/40">
        <p>© {legalName}. All Rights Reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-[#F5F7F5] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-[#F5F7F5] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
