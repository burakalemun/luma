/**
 * The Luma - Blog & FAQ Veri Modeli
 * 
 * NOT: Mock veriler kaldırılmıştır. Tüm blog yazıları, kategoriler ve atölyeler
 * doğrudan Sanity Studio (/studio) paneli üzerinden yönetilmektedir.
 */

export interface BlogPostFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  faqs?: BlogPostFAQ[];
  publishedAt?: string;
  author?: string;
}

// Canlı içerikler Sanity Studio üzerinden çekilir.
export const blogPosts: BlogPost[] = [];
export const faqCategories: string[] = [];
