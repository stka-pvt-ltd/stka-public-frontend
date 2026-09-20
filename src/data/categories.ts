import type { CategoryResponse } from "@/types/api";
import jointBoneImage from "@/assets/joint-bone-health.png";
import gastrointestinalImage from "@/assets/gastrointestina.png";
import womensHealthImage from "@/assets/womens-health.png";
import multivitaminsSupplementsImage from "@/assets/multivitamins-supplements.png";

/**
 * Local category image mapping matched strictly by slug
 */
export const LOCAL_CATEGORY_IMAGES: Record<string, string> = {
  "joint-bone-health": jointBoneImage,
  "gastrointestinal": gastrointestinalImage,
  "womens-health": womensHealthImage,
  "multivitamins-supplements": multivitaminsSupplementsImage,
};

export interface StaticCategory extends CategoryResponse {
  image: string;
}

export const STATIC_CATEGORIES: StaticCategory[] = [
  {
    id: "9985b7ff-5e09-4406-a224-27e74127537c",
    categoryName: "Joint & Bone Health",
    description:
      "Products formulated to support joint, cartilage and bone health, including nutritional supplements containing glucosamine, chondroitin, collagen, vitamins, minerals and botanical extracts.",
    slug: "joint-bone-health",
    image: jointBoneImage,
    categoryImage: {
      id: "img-joint-bone-health",
      imageUrl: jointBoneImage,
    },
  },
  {
    id: "9cece99e-c122-4990-aef5-b56df900016e",
    categoryName: "Gastrointestinal",
    description:
      "Medicines and pharmaceutical products for gastrointestinal conditions including acidity, acid reflux, GERD, gastritis, peptic disorders, nausea and related digestive conditions.",
    slug: "gastrointestinal",
    image: gastrointestinalImage,
    categoryImage: {
      id: "img-gastrointestinal",
      imageUrl: gastrointestinalImage,
    },
  },
  {
    id: "ed7a4933-93bf-4e1b-a684-2023dd44be54",
    categoryName: "Women's Health",
    description:
      "Pharmaceutical products intended for women's reproductive, hormonal and gynecological health needs.",
    slug: "womens-health",
    image: womensHealthImage,
    categoryImage: {
      id: "img-womens-health",
      imageUrl: womensHealthImage,
    },
  },
  {
    id: "f2f8f67c-1451-4969-90c9-1643a4ec8405",
    categoryName: "Multivitamins & Supplements",
    description:
      "Nutritional supplements containing vitamins, minerals, amino acids, essential fatty acids, antioxidants and other nutrients to support general health and nutritional well-being.",
    slug: "multivitamins-supplements",
    image: multivitaminsSupplementsImage,
    categoryImage: {
      id: "img-multivitamins-supplements",
      imageUrl: multivitaminsSupplementsImage,
    },
  },
];

export function getCategoryBySlug(slug: string): StaticCategory | undefined {
  return STATIC_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): StaticCategory | undefined {
  return STATIC_CATEGORIES.find((cat) => cat.id === id);
}

/**
 * Returns backend category if available, otherwise static fallback
 */
export function resolveCategory(backendCategory?: CategoryResponse | null, slug?: string): CategoryResponse | undefined {
  if (backendCategory) return backendCategory;
  if (slug) return getCategoryBySlug(slug);
  return undefined;
}
