/**
 * The Luma - Master Bulk Data Importer & NDJSON Generator
 * 
 * Bu script; Blog, Workshop ve Instagram verilerini:
 * 1. Excel/CSV veya JSON dosyalarından okur,
 * 2. Sanity uyumlu 'all-data.ndjson', 'blog.ndjson', 'workshops.ndjson' üretir,
 * 3. Token varsa doğrudan Sanity Cloud'a basar. Token yoksa 'npx sanity dataset import' komutunu hazırlar.
 * 
 * Çalıştırma:
 *   npm run seed:all
 *   veya doğrudan token ile:
 *   SANITY_API_TOKEN=sk... npm run seed:all
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "..");
const dataDir = path.resolve(webDir, "data");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5fc2yyx";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

function slugify(text) {
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

function parseCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
    const values = [];
    let match;
    while ((match = regex.exec(line)) !== null && values.length < headers.length) {
      let val = match[1] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      values.push(val.trim());
      if (regex.lastIndex >= line.length) break;
    }

    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || "";
    });
    records.push(obj);
  }
  return records;
}

function readJsonOrCsv(jsonPath, csvPath) {
  if (fs.existsSync(jsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // fallback to csv
    }
  }
  return parseCsv(csvPath);
}

export async function runMasterSeed() {
  console.log("🌟 THE LUMA - MASTER TOPLU VERİ YÖNETİMİ 🌟");
  console.log(`📁 Kaynak Dizin: ${dataDir}`);
  console.log(`🎯 Sanity Project: ${projectId} (Dataset: ${dataset})\n`);

  const allDocuments = [];

  // ==========================================
  // 1. INSTAGRAM GÖNDERİLERİ
  // ==========================================
  const rawInsta = readJsonOrCsv(
    path.join(dataDir, "instagram-posts.json"),
    path.join(dataDir, "instagram-posts.csv")
  );

  const instaDocs = rawInsta.map((item, idx) => {
    const i = idx + 1;
    return {
      _id: `instagramPost-${i}`,
      _type: "instagramPost",
      title: item.title || `Instagram Gönderisi ${i}`,
      type: item.type === "post" ? "post" : "reel",
      mediaUrl: item.mediaUrl || item.url || "https://instagram.com/thelumaa_",
      imageUrl: item.imageUrl || item.img || "",
      views: item.views || "",
      order: Number(item.order) || i,
      isActive: item.isActive !== false && item.isActive !== "false",
    };
  });

  fs.writeFileSync(
    path.join(dataDir, "instagram-posts.ndjson"),
    instaDocs.map((d) => JSON.stringify(d)).join("\n") + "\n"
  );
  allDocuments.push(...instaDocs);
  console.log(`✅ [Instagram] ${instaDocs.length} adet gönderi hazırlandı.`);

  // ==========================================
  // 2. WORKSHOPS / ATÖLYELER
  // ==========================================
  const rawWorkshops = readJsonOrCsv(
    path.join(dataDir, "workshops.json"),
    path.join(dataDir, "workshops.csv")
  );

  const workshopDocs = rawWorkshops.map((w, idx) => {
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

  fs.writeFileSync(
    path.join(dataDir, "workshops.ndjson"),
    workshopDocs.map((d) => JSON.stringify(d)).join("\n") + "\n"
  );
  allDocuments.push(...workshopDocs);
  console.log(`✅ [Workshops] ${workshopDocs.length} adet atölye hazırlandı.`);

  // ==========================================
  // 3. KATEGORİLER & BLOG YAZILARI
  // ==========================================
  const rawBlog = readJsonOrCsv(
    path.join(dataDir, "blog.json"),
    path.join(dataDir, "blog.csv")
  );

  // Benzersiz kategorileri bul ve döküman oluştur
  const categoryMap = new Map();
  rawBlog.forEach((p) => {
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
  allDocuments.push(...categoryDocs);
  console.log(`✅ [Kategoriler] ${categoryDocs.length} adet blog kategorisi hazırlandı.`);

  const blogDocs = rawBlog.map((p, idx) => {
    const slug = p.slug || slugify(p.title) || `post-${idx + 1}`;
    const catSlug = slugify(p.category || "Genel");

    let faqs = [];
    if (Array.isArray(p.faqs)) {
      faqs = p.faqs.map((f, fIdx) => ({
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

  fs.writeFileSync(
    path.join(dataDir, "blog.ndjson"),
    [...categoryDocs, ...blogDocs].map((d) => JSON.stringify(d)).join("\n") + "\n"
  );
  allDocuments.push(...blogDocs);
  console.log(`✅ [Blog] ${blogDocs.length} adet blog yazısı hazırlandı.`);

  // ==========================================
  // 4. MASTER TEK DOSYA: all-data.ndjson
  // ==========================================
  const allNdjsonPath = path.join(dataDir, "all-data.ndjson");
  fs.writeFileSync(
    allNdjsonPath,
    allDocuments.map((d) => JSON.stringify(d)).join("\n") + "\n"
  );
  console.log(`\n📦 [MASTER DATASET] Toplam ${allDocuments.length} döküman tek dosyada birleştirildi:`);
  console.log(`   -> ${allNdjsonPath}`);

  // ==========================================
  // 5. SANITY AKTARIMI (TOKEN VARSA DOĞRUDAN, YOKSA CLI)
  // ==========================================
  if (token) {
    console.log(`\n🔑 Sanity API Token tespit edildi! Buluta aktarılıyor...`);
    const client = createClient({
      projectId,
      dataset,
      token,
      apiVersion: "2024-10-09",
      useCdn: false,
    });

    try {
      console.log(`🚀 Sanity transaction başlatılıyor (${allDocuments.length} kayıt)...`);
      const transaction = client.transaction();
      allDocuments.forEach((doc) => {
        transaction.createOrReplace(doc);
      });
      await transaction.commit();
      console.log("🎉 TEBRİKLER! Tüm veriler başarıyla Sanity bulutuna aktarıldı!");
    } catch (err) {
      console.error("❌ Sanity aktarım hatası:", err.message);
      console.log("💡 Alternatif olarak Sanity CLI ile tek komutta basabilirsiniz:");
      console.log(`   npx sanity dataset import ./data/all-data.ndjson ${dataset} --replace`);
    }
  } else {
    console.log("\n💡 TOPLU AKTARIM İÇİN İKİ BASİT YOL:");
    console.log("-------------------------------------------------------------------");
    console.log("A) CLI İLE TEK KOMUTTA BASMA (Önerilen - Sıfır Token Gerekir):");
    console.log(`   npx sanity dataset import ./data/all-data.ndjson ${dataset} --replace\n`);
    console.log("B) DOĞRUDAN SCRIPT İLE BASMA:");
    console.log("   .env.local dosyasına SANITY_API_TOKEN ekleyip tekrar 'npm run seed:all' deyin.");
    console.log("-------------------------------------------------------------------");
  }

  return { total: allDocuments.length };
}

// Doğrudan çağrıldıysa çalıştır
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMasterSeed().catch(console.error);
}
