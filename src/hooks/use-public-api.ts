import { useQuery, useMutation } from "@tanstack/react-query";
import { publicApi } from "@/services/public-api";
import type { EnquiryRequest, PaginationParams } from "@/types/api";

export const QUERY_KEYS = {
  products: ["products"] as const,
  productsByCategory: (categoryId: string) => ["products", "category", categoryId] as const,
  productSearch: (keyword: string) => ["products", "search", keyword] as const,
  productDetail: (slug: string) => ["products", "detail", slug] as const,
  categories: ["categories"] as const,
  categoryDetail: (slug: string) => ["categories", "detail", slug] as const,
  certifications: ["certifications"] as const,
  companyInfo: ["companyInfo"] as const,
  banners: ["banners"] as const,
  manufacturing: ["manufacturing"] as const,
  jobs: ["jobs"] as const,
};

export function useProducts(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, params],
    queryFn: () => publicApi.getProducts(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductsByCategory(categoryId: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.productsByCategory(categoryId), params],
    queryFn: () => publicApi.getProductsByCategory(categoryId, params),
    enabled: Boolean(categoryId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductSearch(keyword: string, params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.productSearch(keyword), params],
    queryFn: () => publicApi.searchProducts(keyword, params),
    enabled: Boolean(keyword && keyword.trim().length > 0),
    staleTime: 1000 * 30,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.productDetail(slug),
    queryFn: () => publicApi.getProductBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCategories(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.categories, params],
    queryFn: () => publicApi.getCategories(params),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.categoryDetail(slug),
    queryFn: () => publicApi.getCategoryBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCertifications(params?: PaginationParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.certifications, params],
    queryFn: () => publicApi.getCertifications(params),
    staleTime: 1000 * 60 * 10,
  });
}

export const DEFAULT_COMPANY_FALLBACK = {
  companyName: "STKA Pharmaceutical",
  legalName: "STKA PVT LTD.",
  description: "STKA Pvt Ltd is a pharmaceutical company focused on the development, manufacturing, and supply of quality pharmaceutical products",
  vision: "To become a trusted pharmaceutical company delivering quality, reliable, and accessible healthcare solutions.",
  mission: "To provide high-quality pharmaceutical products while maintaining strong standards of quality, integrity, and customer satisfaction.",
  email: "info@stkapvt.com",
  phone: "9625979342",
  address: "Shop No. 1 Hussain House, Tektar",
  city: "Darbhanga",
  state: "Bihar",
  country: "India",
  pinCode: "847306",
  location: "Sh75, Tektar, Bihar 847306, India",
  latitude: 26.278879,
  longitude: 85.850139,
} as const;

export function resolveCompanyInfo(data?: Partial<CompanyInformationResponse> | null) {
  const getField = <K extends keyof typeof DEFAULT_COMPANY_FALLBACK>(field: K): (typeof DEFAULT_COMPANY_FALLBACK)[K] => {
    const val = data?.[field];
    if (val !== undefined && val !== null && val !== "") {
      return val as (typeof DEFAULT_COMPANY_FALLBACK)[K];
    }
    return DEFAULT_COMPANY_FALLBACK[field];
  };

  return {
    companyName: getField("companyName"),
    legalName: getField("legalName"),
    description: getField("description"),
    vision: getField("vision"),
    mission: getField("mission"),
    email: getField("email"),
    phone: getField("phone"),
    address: getField("address"),
    city: getField("city"),
    state: getField("state"),
    country: getField("country"),
    pinCode: getField("pinCode"),
    location: getField("location"),
    latitude: Number(getField("latitude")),
    longitude: Number(getField("longitude")),
    companyLogo: data?.companyLogo ?? null,
  };
}

export function useCompanyInfo() {
  return useQuery({
    queryKey: QUERY_KEYS.companyInfo,
    queryFn: () => publicApi.getCompanyInfo(),
    staleTime: 1000 * 60 * 15,
  });
}

export function useResolvedCompanyInfo() {
  const query = useCompanyInfo();
  return {
    ...query,
    company: resolveCompanyInfo(query.data),
  };
}

export function useBanners() {
  return useQuery({
    queryKey: QUERY_KEYS.banners,
    queryFn: () => publicApi.getBanners(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useManufacturing() {
  return useQuery({
    queryKey: QUERY_KEYS.manufacturing,
    queryFn: () => publicApi.getManufacturing(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useJobs() {
  return useQuery({
    queryKey: QUERY_KEYS.jobs,
    queryFn: () => publicApi.getJobs(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (data: EnquiryRequest | FormData) => publicApi.submitEnquiry(data),
  });
}
