import fs from "fs";
import path from "path";

/**
 * Ürünler için public/images/products/ klasörünü kontrol eder.
 * Kullanıcı kendi görselini (.jpg, .jpeg, .png, .webp) koyduysa onu kullanır,
 * aksi halde fallback görseli döndürür.
 */
export function getLocalProductImage(slug: string, fallback: string): string {
  try {
    const extensions = [".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), "public", "images", "products", `${slug}${ext}`);
      if (fs.existsSync(fullPath)) {
        return `/images/products/${slug}${ext}`;
      }
    }
  } catch {
    // ignore
  }
  return fallback;
}

/**
 * Hikayemiz sayfası için public/images/about/ klasörünü kontrol eder.
 * Kullanıcı 'story-hero.jpg' veya 'story-craft.jpg' eklediyse onu kullanır.
 */
export function getLocalAboutImage(name: string, fallback: string): string {
  try {
    const extensions = [".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), "public", "images", "about", `${name}${ext}`);
      if (fs.existsSync(fullPath)) {
        return `/images/about/${name}${ext}`;
      }
    }
  } catch {
    // ignore
  }
  return fallback;
}

/**
 * Genel public görselleri kontrol eder (örn: 'images/workshop-hero')
 */
export function getLocalImage(relativeBasePath: string, fallback: string): string {
  try {
    const extensions = [".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of extensions) {
      const fullPath = path.join(process.cwd(), "public", `${relativeBasePath}${ext}`);
      if (fs.existsSync(fullPath)) {
        return `/${relativeBasePath}${ext}`;
      }
    }
  } catch {
    // ignore
  }
  return fallback;
}

