import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const dataDir = path.resolve(process.cwd(), "data");

    // 1. Instagram
    const instaRaw = JSON.parse(
      fs.readFileSync(path.join(dataDir, "instagram-posts.json"), "utf-8")
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instaDocs = instaRaw.map((item: any, idx: number) => ({
      _id: `instagramPost-${idx + 1}`,
      _type: "instagramPost",
      title: item.title || `Instagram Gönderisi ${idx + 1}`,
      type: item.type === "post" ? "post" : "reel",
      mediaUrl: item.mediaUrl || item.url || "https://instagram.com/thelumaa_",
      imageUrl: item.imageUrl || item.img || "",
      views: item.views || "",
      order: Number(item.order) || idx + 1,
      isActive: item.isActive !== false && item.isActive !== "false",
    }));

    // 2. Workshops
    const workshopsRaw = JSON.parse(
      fs.readFileSync(path.join(dataDir, "workshops.json"), "utf-8")
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const workshopDocs = workshopsRaw.map((w: any, idx: number) => {
      const slug = w.slug || slugify(w.title) || `workshop-${idx + 1}`;
      const priceNum = typeof w.price === "number" ? w.price : Number(String(w.price).replace(/[^0-9]/g, "")) || 0;
      return {
        _id: `workshop-${slug}`,
        _type: "workshop",
        title: w.title,
        slug: { _type: "slug", current: slug },
        date: w.date || new Date().toISOString(),
        dateStr: w.dateStr || w.date || "Yakında",
        time: w.time || "14:00 - 17:00",
        location: w.location || "LUMA Stüdyo, İstanbul",
        type: w.type === "Online" || w.type === "online" ? "Online" : "Fiziksel",
        price: priceNum,
        priceStr: w.priceStr || (priceNum ? `₺${priceNum.toLocaleString("tr-TR")}` : "₺0"),
        capacity: Number(w.capacity) || 15,
        spotsLeft: typeof w.spotsLeft !== "undefined" ? Number(w.spotsLeft) : (Number(w.capacity) || 15),
        imageUrl: w.imageUrl || w.image || "",
        description: w.description || "",
      };
    });

    // 3. Blog & Categories
    const blogRaw = JSON.parse(
      fs.readFileSync(path.join(dataDir, "blog.json"), "utf-8")
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categoryMap = new Map<string, any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogRaw.forEach((p: any) => {
      const catName = p.category || "Genel";
      const catSlug = slugify(catName);
      if (!categoryMap.has(catSlug)) {
        categoryMap.set(catSlug, {
          _id: `category-${catSlug}`,
          _type: "category",
          name: catName,
          slug: { _type: "slug", current: catSlug },
          description: `${catName} kategorisine ait yazılar ve rehberler.`,
        });
      }
    });

    const categoryDocs = Array.from(categoryMap.values());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogDocs = blogRaw.map((p: any, idx: number) => {
      const slug = p.slug || slugify(p.title) || `post-${idx + 1}`;
      const catSlug = slugify(p.category || "Genel");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let faqs: any[] = [];
      if (Array.isArray(p.faqs)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        faqs = p.faqs.map((f: any, fIdx: number) => ({
          _key: `faq-${fIdx + 1}`,
          _type: "faqItem",
          q: f.q || "",
          a: f.a || "",
        }));
      }

      return {
        _id: `post-${slug}`,
        _type: "post",
        title: p.title,
        slug: { _type: "slug", current: slug },
        category: {
          _type: "reference",
          _ref: `category-${catSlug}`,
        },
        categoryName: p.category || "Genel",
        imageUrl: p.imageUrl || p.image || "",
        excerpt: p.excerpt || "",
        content: p.content || "",
        faqs: faqs,
        publishedAt: p.publishedAt || new Date().toISOString(),
        author: p.author || "The Luma Ekibi",
      };
    });

    const allDocuments = [
      ...categoryDocs,
      ...blogDocs,
      ...workshopDocs,
      ...instaDocs,
    ];

    return NextResponse.json({
      success: true,
      stats: {
        categories: categoryDocs.length,
        blogPosts: blogDocs.length,
        workshops: workshopDocs.length,
        instagramPosts: instaDocs.length,
        total: allDocuments.length,
      },
      documents: allDocuments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
