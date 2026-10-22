import { getBlogPosts, getBlogCategories } from "@/lib/blog";
import BlogListClient from "@/components/blog/BlogListClient";

export const instant = false;

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog & Yayınlar | LUMA",
  description: "Doğal yaşam, ruh sağlığı, uyku hijyeni ve sürdürülebilirlik üzerine derinlemesine rehberler ve ilham veren ritüeller.",
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const allCategories = ["Tümü", ...categories.filter((c) => c !== "Tümü")];

  return <BlogListClient initialPosts={posts} categories={allCategories} />;
}
