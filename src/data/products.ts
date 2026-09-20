import type { ProductResponse } from "@/types/api";
import asMegaImg from "@/assets/as-mega.jpg";
import bekazymImg from "@/assets/bekazym.jpg";
import osJointFrontImg from "@/assets/os-joint-front.jpg";
import osJoint1Img from "@/assets/os-joint-1.jpg";
import osJoint2Img from "@/assets/os-joint-2.jpg";
import osJoint3Img from "@/assets/os-joint-3.jpg";
import pantikaDsrFrontImg from "@/assets/pantika-dsr-front.jpg";
import pantikaDsr1Img from "@/assets/pantika-dsr-1.jpg";
import pantikaDsr2Img from "@/assets/pantika-dsr-2.jpg";
import pantikaIvImg from "@/assets/pantika-iv.jpg";
import rabkaDsrImg from "@/assets/rabka-dsr.jpg";
import sGest300srImg from "@/assets/s-gest-300sr.jpg";

/**
 * Local product images mapping strictly keyed by product slug
 */
export const LOCAL_PRODUCT_IMAGES: Record<string, string[]> = {
  "bekazym-b-complex-l-lysine-syrup": [bekazymImg],
  "sgest-300-sr-tablets": [sGest300srImg],
  "pantika-iv": [pantikaIvImg],
  "as-mega-softgel-capsules": [asMegaImg],
  "pantika-dsr": [pantikaDsrFrontImg, pantikaDsr1Img, pantikaDsr2Img],
  "rabka-dsr": [rabkaDsrImg],
  "os-joint-tablets": [osJointFrontImg, osJoint1Img, osJoint2Img, osJoint3Img],
};

/**
 * Fallback static products representing the authoritative backend dataset
 */
export const STATIC_PRODUCTS: ProductResponse[] = [
  {
    id: "0284abad-909b-4298-89a1-4ba6fcc70ae6",
    productName: "BEKAZYM",
    slug: "bekazym-b-complex-l-lysine-syrup",
    brand: "BEKAZYM",
    categoryId: "f2f8f67c-1451-4969-90c9-1643a4ec8405",
    categoryName: "Multivitamins & Supplements",
    genericName: "B-Complex + L-Lysine",
    composition: "B-Complex and L-Lysine",
    strength: "As per formulation",
    dosageForm: "Syrup",
    description:
      "BEKAZYM B-Complex and L-Lysine Syrup is a nutritional supplement formulated to support appetite, digestion, healthy growth and development, energy metabolism and overall nutritional well-being.",
    productImages: [
      {
        id: "local-bekazym-1",
        imageUrl: bekazymImg,
      },
    ],
  },
  {
    id: "16cd2539-d97b-4897-8516-f9707d1d6ced",
    productName: "SGest 300 SR",
    slug: "sgest-300-sr-tablets",
    brand: "SGest",
    categoryId: "ed7a4933-93bf-4e1b-a684-2023dd44be54",
    categoryName: "Women's Health",
    genericName: "Natural Micronized Progesterone",
    composition: "Natural Micronized Progesterone",
    strength: "300mg",
    dosageForm: "Sustained Release Tablet",
    description:
      "SGest 300 SR is a sustained-release progesterone formulation designed for gynecological and reproductive health management.",
    productImages: [
      {
        id: "local-sgest-1",
        imageUrl: sGest300srImg,
      },
    ],
  },
  {
    id: "25cb38d9-2eb2-43bb-8a48-a832e70e9eb2",
    productName: "Pantika IV",
    slug: "pantika-iv",
    brand: "Pantika",
    categoryId: "9cece99e-c122-4990-aef5-b56df900016e",
    categoryName: "Gastrointestinal",
    genericName: "Pantoprazole for Injection",
    composition: "Pantoprazole Sodium 40mg",
    strength: "40mg",
    dosageForm: "Lyophilized Powder for Injection",
    description:
      "Pantika IV is a lyophilized pantoprazole formulation indicated for intravenous administration in severe acid-peptic disorders and acute gastric bleeding.",
    productImages: [
      {
        id: "local-pantika-iv-1",
        imageUrl: pantikaIvImg,
      },
    ],
  },
  {
    id: "6e2687c1-bf6a-4ae4-8e1a-ff8aa65ec896",
    productName: "AS-MEGA",
    slug: "as-mega-softgel-capsules",
    brand: "AS-MEGA",
    categoryId: "f2f8f67c-1451-4969-90c9-1643a4ec8405",
    categoryName: "Multivitamins & Supplements",
    genericName: "Omega-3 Fatty Acids + Antioxidants",
    composition: "Omega-3 Fatty Acids, Methylcobalamin, Calcitriol, Boron & Calcium Carbonate",
    strength: "Multi-nutrient standard",
    dosageForm: "Softgel Capsule",
    description:
      "AS-MEGA provides an advanced combination of Omega-3 fatty acids and essential micronutrients supporting cardiovascular, neurological, and bone health.",
    productImages: [
      {
        id: "local-as-mega-1",
        imageUrl: asMegaImg,
      },
    ],
  },
  {
    id: "b21eefb3-1fcf-49b0-9db0-5e589803130d",
    productName: "Pantika DSR",
    slug: "pantika-dsr",
    brand: "Pantika",
    categoryId: "9cece99e-c122-4990-aef5-b56df900016e",
    categoryName: "Gastrointestinal",
    genericName: "Pantoprazole + Domperidone SR",
    composition: "Pantoprazole 40mg + Domperidone 30mg SR",
    strength: "40mg / 30mg",
    dosageForm: "Capsule",
    description:
      "Pantika DSR combines an acid inhibitor with a prokinetic agent for effective relief from gastroesophageal reflux disease, dyspepsia, and related conditions.",
    productImages: [
      {
        id: "local-pantika-dsr-front",
        imageUrl: pantikaDsrFrontImg,
      },
      {
        id: "local-pantika-dsr-1",
        imageUrl: pantikaDsr1Img,
      },
      {
        id: "local-pantika-dsr-2",
        imageUrl: pantikaDsr2Img,
      },
    ],
  },
  {
    id: "cfd5162a-bf07-42aa-b80c-7bfe59c1e7a5",
    productName: "Rabka DSR",
    slug: "rabka-dsr",
    brand: "Rabka",
    categoryId: "9cece99e-c122-4990-aef5-b56df900016e",
    categoryName: "Gastrointestinal",
    genericName: "Rabeprazole Sodium + Domperidone SR",
    composition: "Rabeprazole Sodium 20mg + Domperidone 30mg SR",
    strength: "20mg / 30mg",
    dosageForm: "Capsule",
    description:
      "Rabka DSR offers targeted acid suppression and motility regulation for persistent gastric hyperacidity and reflux esophagitis.",
    productImages: [
      {
        id: "local-rabka-dsr-1",
        imageUrl: rabkaDsrImg,
      },
    ],
  },
  {
    id: "f3796f60-93ad-4e3e-aeaa-ee5b5003554e",
    productName: "OS JOINT",
    slug: "os-joint-tablets",
    brand: "OS JOINT",
    categoryId: "9985b7ff-5e09-4406-a224-27e74127537c",
    categoryName: "Joint & Bone Health",
    genericName: "Glucosamine + Diacerein + MSM",
    composition: "Glucosamine Sulfate Potassium Chloride, Diacerein & Methyl Sulfonyl Methane",
    strength: "Therapeutic ratio",
    dosageForm: "Tablet",
    description:
      "OS JOINT is a specialized joint health formulation combining cartilage-supportive nutrients with anti-inflammatory constituents to promote mobility and comfort.",
    productImages: [
      {
        id: "local-os-joint-front",
        imageUrl: osJointFrontImg,
      },
      {
        id: "local-os-joint-1",
        imageUrl: osJoint1Img,
      },
      {
        id: "local-os-joint-2",
        imageUrl: osJoint2Img,
      },
      {
        id: "local-os-joint-3",
        imageUrl: osJoint3Img,
      },
    ],
  },
];

export function getProductBySlug(slug: string): ProductResponse | undefined {
  return STATIC_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): ProductResponse | undefined {
  return STATIC_PRODUCTS.find((p) => p.id === id);
}
