// API Environment Configuration
export const API_BASE_URL = (
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_URL"]
    ? import.meta.env["VITE_API_URL"]
    : "https://api.stkapvt.com"
).replace(/\/$/, "");

// Public website URL for canonical links, OG metadata, and structured data
export const SITE_URL = (
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_SITE_URL"]
    ? import.meta.env["VITE_SITE_URL"]
    : "https://stkapvt.com"
).replace(/\/$/, "");

