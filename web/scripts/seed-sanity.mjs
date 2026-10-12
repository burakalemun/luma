/**
 * The Luma - Sanity Bulk Data Importer & CSV/JSON Converter
 * 
 * Kullanım:
 * 1. CLI ile doğrudan import (En kolay):
 *    npx sanity datasets import ./data/instagram-posts.ndjson production --replace
 * 
 * 2. Token ile script çalıştırma:
 *    SANITY_API_TOKEN=your_token node scripts/seed-sanity.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5fc2yyx";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

// 1. CSV'den NDJSON oluşturucu fonksiyon
export function convertCsvToNdjson(csvFilePath, ndjsonOutputPath) {
  const content = fs.readFileSync(csvFilePath, "utf-8");
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const docs = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Basit CSV parser
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

    const doc = {
      _id: `instagramPost-${i}`,
      _type: "instagramPost",
      title: values[0] || `Instagram Gönderisi ${i}`,
      type: values[1] === "post" ? "post" : "reel",
      mediaUrl: values[2] || "https://instagram.com/thelumaa_",
      imageUrl: values[3] || "",
      views: values[4] || "",
      order: Number(values[5]) || i,
      isActive: values[6] === "true" || values[6] === "1" || values[6] === undefined,
    };
    docs.push(doc);
  }

  const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
  fs.writeFileSync(ndjsonOutputPath, ndjson);
  console.log(`✓ CSV başarıyla NDJSON formatına dönüştürüldü: ${ndjsonOutputPath} (${docs.length} adet doküman)`);
  return docs;
}

// 2. Doğrudan API ile Sanity'ye basma (Token varsa)
async function uploadToSanity(docs) {
  if (!token) {
    console.log("\n⚠️ SANITY_API_TOKEN bulunamadı.");
    console.log("Verileri terminalden tek komutla basmak için şu komutu çalıştırabilirsiniz:\n");
    console.log("👉 npx sanity datasets import ./data/instagram-posts.ndjson production --replace\n");
    return;
  }

  console.log(`\n🚀 Sanity API ile ${docs.length} adet doküman yükleniyor...`);
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-10-09",
    token,
    useCdn: false,
  });

  for (const doc of docs) {
    try {
      await client.createOrReplace(doc);
      console.log(`✓ Yüklendi: [${doc.order}] ${doc.title}`);
    } catch (err) {
      console.error(`✗ Hata (${doc.title}):`, err.message);
    }
  }

  console.log("\n🎉 Tüm veriler Sanity Studio'ya başarıyla aktarıldı!");
}

// Çalıştırma
const csvFile = path.resolve(__dirname, "../data/instagram-posts.csv");
const ndjsonFile = path.resolve(__dirname, "../data/instagram-posts.ndjson");

const docs = convertCsvToNdjson(csvFile, ndjsonFile);
uploadToSanity(docs);
