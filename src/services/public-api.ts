import { apiClient } from "@/lib/api-client";
import type {
  ProductResponse,
  CategoryResponse,
  CertificationResponse,
  CompanyInformationResponse,
  BannerResponse,
  ManufacturingResponse,
  JobResponse,
  EnquiryRequest,
  EnquiryResponse,
  PageResponse,
  PaginationParams,
} from "@/types/api";

export const publicApi = {
  // PRODUCTS
  getProducts: (params?: PaginationParams) =>
    apiClient.get<PageResponse<ProductResponse>>("/api/v1/public/products", params as Record<string, string | number | boolean | undefined>),

  getProductsByCategory: (categoryId: string, params?: PaginationParams) =>
    apiClient.get<PageResponse<ProductResponse>>(`/api/v1/public/products/category/${categoryId}`, params as Record<string, string | number | boolean | undefined>),

  searchProducts: (keyword: string, params?: PaginationParams) =>
    apiClient.get<PageResponse<ProductResponse>>("/api/v1/public/products/search", {
      keyword,
      ...params,
    }),

  getProductBySlug: (slug: string) =>
    apiClient.get<ProductResponse>(`/api/v1/public/products/${slug}`),

  // CATEGORIES
  getCategories: (params?: PaginationParams) =>
    apiClient.get<PageResponse<CategoryResponse>>("/api/v1/public/categories", params as Record<string, string | number | boolean | undefined>),

  getCategoryBySlug: (slug: string) =>
    apiClient.get<CategoryResponse>(`/api/v1/public/categories/${slug}`),

  // CERTIFICATIONS
  getCertifications: (params?: PaginationParams) =>
    apiClient.get<PageResponse<CertificationResponse>>("/api/v1/public/certifications", params as Record<string, string | number | boolean | undefined>),

  // COMPANY
  getCompanyInfo: () =>
    apiClient.get<CompanyInformationResponse>("/api/v1/public/company"),

  // BANNERS
  getBanners: () =>
    apiClient.get<BannerResponse[]>("/api/v1/public/banners"),

  // MANUFACTURING
  getManufacturing: () =>
    apiClient.get<ManufacturingResponse[]>("/api/v1/public/manufacturing"),

  // JOBS / CAREERS
  getJobs: () =>
    apiClient.get<JobResponse[]>("/api/v1/public/jobs"),

  // ENQUIRIES
  submitEnquiry: (data: EnquiryRequest | FormData) =>
    apiClient.post<EnquiryResponse>("/api/v1/public/enquiries", data),
};
