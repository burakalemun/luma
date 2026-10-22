import type { MetadataRoute } from "next";
import { productsDb } from "@/data/products";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/urunler", priority: 0.9, freq: "weekly" },
    { path: "/workshop", priority: 0.7, freq: "weekly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/hakkimizda", priority: 0.6, freq: "monthly" },
    { path: "/iletisim", priority: 0.6, freq: "monthly" },
    { path: "/sss", priority: 0.6, freq: "monthly" },
    { path: "/gizlilik", priority: 0.2, freq: "yearly" },
    { path: "/kvkk", priority: 0.2, freq: "yearly" },
    { path: "/sartlar", priority: 0.2, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  productsDb.forEach((p) =>
    entries.push({
      url: `${SITE_URL}/urunler/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  try {
    const posts = await getBlogPosts();
    posts.forEach((post) =>
      entries.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      })
    );
  } catch {
    // Sanity erişilemezse statik sayfalar yine de yayınlanır
  }

  return entries;
}
