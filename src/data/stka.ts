import tabletsImage from "@/assets/stka-product-tablets.jpg";
import vialsImage from "@/assets/stka-product-vials.jpg";

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  genericName: string;
  composition: string;
  strength: string;
  dosageForm: string;
  category: string;
  description: string;
  image: string;
}

export interface CertificationRecord {
  title: string;
  issuingAuthority: string;
  certificateNumber: string;
  issuedDate: string;
  expiryDate: string;
  image?: string;
}

export interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
}

export const categories: Category[] = [];

export const products: Product[] = [];

export const certifications: CertificationRecord[] = [];

export const jobOpenings: JobOpening[] = [];

export const apiResources = {
  company: "/api/v1/public/company",
  categories: "/api/v1/public/categories",
  products: "/api/v1/public/products",
  certifications: "/api/v1/public/certifications",
  enquiries: "/api/v1/public/enquiries",
};