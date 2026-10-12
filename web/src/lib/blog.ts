import { client, urlFor } from "@/lib/sanity";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveBlogImage(doc: any): string {
  if (doc.imageUrl) return doc.imageUrl;
  if (doc.mainImage) {
    try {
      return urlFor(doc.mainImage).width(1200).url();
    } catch {
      // ignore
    }
  }
  return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatBlogDoc(doc: any): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.categoryName || doc.category?.name || "Doğal Yaşam & Sağlık",
    image: resolveBlogImage(doc),
    excerpt: doc.excerpt || "",
    content: doc.content || doc.excerpt || "",
    faqs: Array.isArray(doc.faqs) ? doc.faqs : [],
    publishedAt: doc.publishedAt,
    author: doc.author || "The Luma Ekibi",
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      categoryName,
      category->{ name },
      mainImage,
      imageUrl,
      excerpt,
      content,
      faqs,
      publishedAt,
      author
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityData: any[] = await client.fetch(query, {}, {
      cache: "no-store",
    });

    if (sanityData && sanityData.length > 0) {
      return sanityData.map(formatBlogDoc);
    }
  } catch (error) {
    console.warn("Sanity blog posts fetch error:", error);
  }

  // Yalnızca Sanity CMS'ten okur, mock data yok
  return [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      categoryName,
      category->{ name },
      mainImage,
      imageUrl,
      excerpt,
      content,
      faqs,
      publishedAt,
      author
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const post: any = await client.fetch(query, { slug }, {
      next: { revalidate: 30 }
    });

    if (post) {
      return formatBlogDoc(post);
    }
  } catch (error) {
    console.warn(`Sanity blog post by slug (${slug}) fetch error:`, error);
  }

  return null;
}

export async function getBlogCategories(): Promise<string[]> {
  try {
    const query = `*[_type == "category"] { name }`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cats: any[] = await client.fetch(query, {}, { next: { revalidate: 60 } });
    if (cats && cats.length > 0) {
      const names = cats.map((c) => c.name).filter(Boolean);
      if (names.length > 0) return names;
    }
  } catch {
    // ignore
  }

  return [];
}
