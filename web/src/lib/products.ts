import { client, urlFor } from "@/lib/sanity";
import { productsDb, PRODUCT_CATEGORIES, type ProductItem } from "@/data/products";

export type { ProductItem };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveProductImage(item: any): string {
  if (typeof item === "string") return item;
  if (item?.asset) {
    try {
      return urlFor(item).width(1200).url();
    } catch {
      // ignore
    }
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveImages(doc: any, fallbackSlug: string): string[] {
  const images: string[] = [];

  // 1. Ana Görsel
  if (doc.mainImage) {
    const url = resolveProductImage(doc.mainImage);
    if (url && !images.includes(url)) images.push(url);
  }
  if (doc.mainImageUrl && !images.includes(doc.mainImageUrl)) {
    images.push(doc.mainImageUrl);
  }

  // 2. Galeri (Sanity Görsel dizisi)
  if (Array.isArray(doc.gallery)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc.gallery.forEach((g: any) => {
      const url = resolveProductImage(g);
      if (url && !images.includes(url)) images.push(url);
    });
  }

  // 3. Harici Galeri URL'leri
  if (Array.isArray(doc.galleryUrls)) {
    doc.galleryUrls.forEach((url: string) => {
      if (url && !images.includes(url)) images.push(url);
    });
  }

  // 4. Eski images dizisi
  if (Array.isArray(doc.images)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doc.images.forEach((img: any) => {
      const url = resolveProductImage(img);
      if (url && !images.includes(url)) images.push(url);
    });
  }

  // 5. Görsel yoksa fallback
  if (images.length === 0) {
    const fallback = productsDb.find((p) => p.slug === fallbackSlug);
    if (fallback && fallback.images.length > 0) {
      return fallback.images;
    }
    return ["/images/products/luma-ritual-box.jpg"];
  }

  return images;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatProductDoc(doc: any): ProductItem {
  const slug = typeof doc.slug === "string" ? doc.slug : doc.slug?.current || "";
  const fallback = productsDb.find((p) => p.slug === slug);

  const images = resolveImages(doc, slug);

  const category = doc.category || fallback?.category || "Ritüel Kutuları";
  const categories =
    Array.isArray(doc.categories) && doc.categories.length > 0
      ? doc.categories
      : fallback?.categories || [category];

  return {
    slug,
    title: doc.title || doc.name || fallback?.title || "LUMA Ürünü",
    subtitle: doc.subtitle ?? fallback?.subtitle ?? "",
    price: doc.price ?? fallback?.price ?? "",
    badge: doc.badge !== undefined ? doc.badge : (fallback?.badge ?? null),
    badgeBg: doc.badgeBg || fallback?.badgeBg || "bg-[#4A3F35]",
    images,
    shortDesc: doc.shortDesc || doc.shortDescription || fallback?.shortDesc || "",
    longDesc: doc.longDesc || fallback?.longDesc || "",
    contents:
      Array.isArray(doc.contents) && doc.contents.length > 0
        ? doc.contents
        : Array.isArray(doc.features) && doc.features.length > 0
        ? doc.features
        : fallback?.contents || [],
    usageAreas:
      Array.isArray(doc.usageAreas) && doc.usageAreas.length > 0
        ? doc.usageAreas
        : fallback?.usageAreas || [],
    care: doc.care || fallback?.care || "",
    usage: {
      hot: doc.usageHot || doc.usage?.hot || fallback?.usage.hot || "",
      cold: doc.usageCold || doc.usage?.cold || fallback?.usage.cold || "",
    },
    message: doc.message || fallback?.message || "Gözlerini kapat, dünyanın sesini susturalım.",
    trendyolUrl:
      doc.trendyolUrl ||
      fallback?.trendyolUrl ||
      "https://www.trendyol.com/magaza/the-luma-m-1190716?sst=0&channelId=1&event=0",
    hbUrl:
      doc.hbUrl ||
      doc.hepsiburadaUrl ||
      fallback?.hbUrl ||
      "https://www.hepsiburada.com/magaza/the-luma",
    isHeated: typeof doc.isHeated === "boolean" ? doc.isHeated : (fallback?.isHeated ?? true),
    category,
    categories,
  };
}

/**
 * Tüm ürünleri Sanity CMS'ten çeker.
 * Sanity'de henüz ürün yoksa güvenli şekilde data/products.ts'teki ürünleri döndürür.
 */
export async function getProducts(): Promise<ProductItem[]> {
  try {
    const query = `*[_type == "product" && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
      _id,
      title,
      name,
      "slug": slug.current,
      subtitle,
      price,
      badge,
      badgeBg,
      order,
      isFeatured,
      mainImage,
      mainImageUrl,
      gallery,
      galleryUrls,
      images,
      shortDesc,
      shortDescription,
      longDesc,
      message,
      isHeated,
      contents,
      features,
      usageAreas,
      usageHot,
      usageCold,
      care,
      trendyolUrl,
      hbUrl,
      hepsiburadaUrl,
      category,
      categories
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityData: any[] = await client.fetch(
      query,
      {},
      { cache: "no-store" }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map(formatProductDoc);
    }
  } catch (error) {
    console.warn("Sanity products fetch error:", error);
  }

  // Fallback: Henüz Sanity'e yüklenmemişse statik ürün listesi
  return productsDb;
}

/**
 * Belirli bir slug'a göre tekil ürünü Sanity CMS'ten çeker.
 */
export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    const query = `*[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      name,
      "slug": slug.current,
      subtitle,
      price,
      badge,
      badgeBg,
      order,
      isFeatured,
      mainImage,
      mainImageUrl,
      gallery,
      galleryUrls,
      images,
      shortDesc,
      shortDescription,
      longDesc,
      message,
      isHeated,
      contents,
      features,
      usageAreas,
      usageHot,
      usageCold,
      care,
      trendyolUrl,
      hbUrl,
      hepsiburadaUrl,
      category,
      categories
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = await client.fetch(
      query,
      { slug },
      { cache: "no-store" }
    );

    if (doc) {
      return formatProductDoc(doc);
    }
  } catch (error) {
    console.warn(`Sanity product fetch by slug (${slug}) error:`, error);
  }

  // Fallback: Statik veritabanında ara
  const fallback = productsDb.find((p) => p.slug === slug);
  return fallback || null;
}

/**
 * Anasayfa vitrini için öne çıkarılan ürünleri çeker.
 */
export async function getFeaturedProducts(limit = 3): Promise<ProductItem[]> {
  try {
    const query = `*[_type == "product" && isFeatured != false && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc)[0...$limit] {
      _id,
      title,
      name,
      "slug": slug.current,
      subtitle,
      price,
      badge,
      badgeBg,
      order,
      isFeatured,
      mainImage,
      mainImageUrl,
      gallery,
      galleryUrls,
      images,
      shortDesc,
      shortDescription,
      longDesc,
      message,
      isHeated,
      contents,
      features,
      usageAreas,
      usageHot,
      usageCold,
      care,
      trendyolUrl,
      hbUrl,
      hepsiburadaUrl,
      category,
      categories
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityData: any[] = await client.fetch(
      query,
      { limit },
      { cache: "no-store" }
    );

    if (sanityData && sanityData.length > 0) {
      return sanityData.map(formatProductDoc);
    }
  } catch (error) {
    console.warn("Sanity featured products fetch error:", error);
  }

  // Fallback
  return productsDb.slice(0, limit);
}

/**
 * Ürün filtreleme için mevcut kategorileri dinamik olarak döner.
 */
export async function getProductCategories(): Promise<string[]> {
  try {
    const products = await getProducts();
    const categoriesSet = new Set<string>();
    categoriesSet.add("Tümü");

    products.forEach((p) => {
      if (p.category) categoriesSet.add(p.category);
      if (Array.isArray(p.categories)) {
        p.categories.forEach((c) => {
          if (c) categoriesSet.add(c);
        });
      }
    });

    const list = Array.from(categoriesSet);
    if (list.length > 1) return list;
  } catch {
    // ignore
  }

  return [...PRODUCT_CATEGORIES];
}
