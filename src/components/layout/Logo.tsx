import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useResolvedCompanyInfo } from "@/hooks/use-public-api";
import staticLogo from "@/assets/logo.png";

/**
 * Logo component with hybrid logo & company name architecture:
 * 1. Preferred Logo: Backend company logo (companyLogo.imageUrl via GET /api/v1/public/company)
 * 2. Static Fallback Logo: Official logo asset imported from src/assets/logo.png
 * 3. Company Name: Resolved from company.companyName with approved fallback
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  const { data: rawCompany, company } = useResolvedCompanyInfo();
  const [imageError, setImageError] = useState(false);

  const backendLogoUrl = rawCompany?.companyLogo?.imageUrl;
  const displayLogo = !imageError && backendLogoUrl ? backendLogoUrl : staticLogo;
  const companyName = company.companyName;

  const parts = companyName.trim().split(" ");
  const firstWord = parts[0] || "STKA";
  const restWords = parts.slice(1).join(" ") || "Pvt Ltd";

  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-95"
      aria-label={`${companyName} home`}
    >
      <img
        src={displayLogo}
        alt={companyName}
        className={`h-8 sm:h-9 w-auto object-contain transition-opacity ${
          inverse ? "brightness-105" : ""
        }`}
        onError={() => setImageError(true)}
      />
      <span
        className={`font-display text-[0.92rem] font-semibold tracking-[-0.03em] ${
          inverse ? "text-[#F5F7F5]" : "text-[#29352F]"
        }`}
      >
        {firstWord}{" "}
        <span className={inverse ? "text-[#C8DACD]" : "text-[#5F9472]"}>
          {restWords}
        </span>
      </span>
    </Link>
  );
}
