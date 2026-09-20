import { publicApi } from "@/services/public-api";
import { STATIC_PRODUCTS, getProductBySlug } from "@/data/products";
import { STATIC_CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { SITE_URL } from "@/lib/config";
import type { ProductResponse, CategoryResponse } from "@/types/api";

/**
 * Resolves a product by slug according to the authoritative priority order:
 * 1. Try authoritative backend product query.
 * 2. If backend product is unavailable, network fails, or backend returns error/404,
 *    resolve from fallback static catalog.
 * 3. If product does not exist in either source, return null.
 */
export async function resolveProductBySlug(slug: string): Promise<ProductResponse | null> {
  if (!slug) return null;
  const normalizedSlug = slug.trim().toLowerCase();

  // 1. Try real backend API
  try {
    const backendProduct = await publicApi.getProductBySlug(normalizedSlug);
    if (backendProduct && backendProduct.slug) {
      return backendProduct;
    }
  } catch {
    // Backend unavailable or 404 — proceed safely to fallback
  }

  // 2. Resolve from fallback catalog
  const staticProduct = getProductBySlug(normalizedSlug);
  if (staticProduct) {
    return staticProduct;
  }

  // 3. Product not found in either source
  return null;
}

/**
 * Resolves a category by slug according to authoritative priority order:
 * 1. Try backend category query.
 * 2. If backend category is unavailable, resolve from fallback static catalog.
 * 3. Return null if not found.
 */
export async function resolveCategoryBySlug(slug: string): Promise<CategoryResponse | null> {
  if (!slug) return null;
  const normalizedSlug = slug.trim().toLowerCase();

  try {
    const backendCategory = await publicApi.getCategoryBySlug(normalizedSlug);
    if (backendCategory && backendCategory.slug) {
      return backendCategory;
    }
  } catch {
    // Backend unavailable or 404 — proceed to fallback
  }

  const staticCategory = getCategoryBySlug(normalizedSlug);
  if (staticCategory) {
    return staticCategory;
  }

  return null;
}

/**
 * Fetches the entire combined product catalog:
 * - Backend products take precedence when available.
 * - Deduplicates on slug so each product has exactly ONE canonical record and URL.
 * - Retains fallback products not present in backend.
 */
export async function getAllCatalogProducts(): Promise<ProductResponse[]> {
  const productMap = new Map<string, ProductResponse>();

  // 1. Initialize with fallback catalog
  for (const product of STATIC_PRODUCTS) {
    if (product.slug) {
      productMap.set(product.slug.toLowerCase(), product);
    }
  }

  // 2. Fetch backend products and override/extend
  try {
    const response = await publicApi.getProducts({ pageSize: 500 });
    if (response && Array.isArray(response.content)) {
      for (const backendProduct of response.content) {
        if (backendProduct.slug) {
          // Authoritative backend record takes priority
          productMap.set(backendProduct.slug.toLowerCase(), backendProduct);
        }
      }
    }
  } catch {
    // Backend offline or error — fallback remains active
  }

  return Array.from(productMap.values());
}

/**
 * Fetches the entire combined category catalog:
 * - Backend categories take precedence.
 * - Deduplicates on slug.
 */
export async function getAllCatalogCategories(): Promise<CategoryResponse[]> {
  const categoryMap = new Map<string, CategoryResponse>();

  for (const cat of STATIC_CATEGORIES) {
    if (cat.slug) {
      categoryMap.set(cat.slug.toLowerCase(), cat);
    }
  }

  try {
    const response = await publicApi.getCategories({ pageSize: 100 });
    if (response && Array.isArray(response.content)) {
      for (const backendCat of response.content) {
        if (backendCat.slug) {
          categoryMap.set(backendCat.slug.toLowerCase(), backendCat);
        }
      }
    }
  } catch {
    // Backend offline — fallback remains active
  }

  return Array.from(categoryMap.values());
}

/**
 * Generates an XML sitemap covering the entire public catalog:
 * - Core static pages
 * - Catalog index routes (/products, /categories)
 * - All unique product pages (/products/{slug}) from backend + fallback
 * - All unique category pages (/categories/{slug}) from backend + fallback
 * - Excludes private, admin, and noindexed legal stub routes
 */
export async function generateSitemapXml(): Promise<string> {
  const [products, categories] = await Promise.all([
    getAllCatalogProducts(),
    getAllCatalogCategories(),
  ]);

  const currentDate = new Date().toISOString().split("T")[0];

  const coreRoutes = [
    { path: "", priority: "1.0", changefreq: "weekly" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/manufacturing", priority: "0.7", changefreq: "monthly" },
    { path: "/quality", priority: "0.7", changefreq: "monthly" },
    { path: "/contact", priority: "0.7", changefreq: "monthly" },
    { path: "/careers", priority: "0.6", changefreq: "weekly" },
    { path: "/products", priority: "0.9", changefreq: "daily" },
    { path: "/categories", priority: "0.8", changefreq: "weekly" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Core pages
  for (const route of coreRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. All public products
  for (const product of products) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/products/${product.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  // 3. All public categories
  for (const category of categories) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/categories/${category.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}
