import { MapPin, ExternalLink, AlertCircle } from "lucide-react";
import type { CompanyInformationResponse } from "@/types/api";

interface CompanyMapProps {
  companyInfo?: CompanyInformationResponse | null | undefined;
}

export function CompanyMap({ companyInfo }: CompanyMapProps) {
  const rawLat = companyInfo?.latitude != null ? Number(companyInfo.latitude) : null;
  const rawLng = companyInfo?.longitude != null ? Number(companyInfo.longitude) : null;

  const isValidRaw =
    rawLat !== null &&
    rawLng !== null &&
    !isNaN(rawLat) &&
    !isNaN(rawLng) &&
    rawLat >= -90 &&
    rawLat <= 90 &&
    rawLng >= -180 &&
    rawLng <= 180;

  const latitude = isValidRaw ? rawLat : 26.278879;
  const longitude = isValidRaw ? rawLng : 85.850139;

  const locationName = companyInfo?.location || companyInfo?.companyName || "STKA Pharmaceutical Facility";
  const address = companyInfo?.address
    ? `${companyInfo.address}, ${companyInfo.city}, ${companyInfo.state}, ${companyInfo.country} - ${companyInfo.pinCode}`
    : "Shop No. 1 Hussain House, Tektar, Darbhanga, Bihar - 847306";

  // OpenStreetMap embed bbox calculation around coordinates
  const delta = 0.01;
  const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="border border-border bg-card overflow-hidden">
      {/* MAP HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary px-5 py-3.5">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-pharma" />
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
            {locationName}
          </span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-pharma transition-colors hover:text-primary"
        >
          Get Directions <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* INTERACTIVE MAP CONTAINER */}
      <div className="relative aspect-[16/9] w-full min-h-[300px] bg-muted">
        <iframe
          title={`Location map for ${locationName}`}
          src={embedUrl}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>

      {/* LOCATION CONTEXT FOOTER */}
      <div className="border-t border-border p-4 bg-background">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Coordinates</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {latitude.toFixed(6)}° N, {longitude.toFixed(6)}° E
        </p>
        {address && (
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            {address}
          </p>
        )}
      </div>
    </div>
  );
}
