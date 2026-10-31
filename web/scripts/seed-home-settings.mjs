/**
 * The Luma - Anasayfa Ayarları ve Hero Görseli Yükleyici Script
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "..");

config({ path: path.resolve(webDir, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r5fc2yyx";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ SANITY_API_WRITE_TOKEN bulunamadı!");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-09",
  token,
  useCdn: false,
});

async function seedHomeSettings() {
  console.log(`\n🚀 Anasayfa Ayarları ve Hero Görseli Sanity'ye aktarılıyor...\n`);

  // 1. Hero ana görselini yükle
  const heroImgPath = path.join(
    webDir,
    "public/images/products/luma-warm-hug-lifestyle.jpg"
  );
  let heroImageAsset = null;

  if (fs.existsSync(heroImgPath)) {
    console.log(`   📸 Hero Görseli Yükleniyor: luma-warm-hug-lifestyle.jpg...`);
    heroImageAsset = await client.assets.upload(
      "image",
      fs.createReadStream(heroImgPath),
      { filename: "luma-warm-hug-lifestyle.jpg" }
    );
    console.log(`   ✅ Hero Görseli Asset olarak yüklendi! ID: ${heroImageAsset._id}`);
  }

  // 2. homeSettings dökümanını oluştur
  const doc = {
    _id: "homeSettings",
    _type: "homeSettings",
    heroBadge: "DOĞAL ISI TERAPİSİ",
    heroTitle: "Doğanın Sıcaklığını Bedeninize Taşıyın",
    heroTitleHighlight: "Bedeninize",
    heroDescription:
      "Geleneksel kiraz çekirdeği termoterapisi ve organik keten kumaşlarla bedeninizi dinlendirin. Her ürün özenle el yapımı.",
    heroFloatingCardTitle: "Doğal Kiraz Çekirdeği",
    heroFloatingCardSubtitle: "Geleneksel Isıl Terapi",
    heroPrimaryButtonText: "Ürünleri İncele",
    heroPrimaryButtonLink: "/urunler",
    heroSecondaryButtonText: "Hikayemizi Oku",
    heroSecondaryButtonLink: "/hakkimizda",

    whyLumaBadge: "NEDEN LUMA?",
    whyLumaTitle: "Doğallık, El Emeği, Şifa",
    whyLumaItems: [
      {
        _key: "item-1",
        icon: "eco",
        title: "%100 Doğal İçerik",
        desc: "Sentetik madde, katkı veya kimyasal içermez. Sadece doğanın saf ürünleri.",
      },
      {
        _key: "item-2",
        icon: "handyman",
        title: "El Yapımı Üretim",
        desc: "Her ürün, Türkiye'de usta eller tarafından tek tek özenle hazırlanır.",
      },
      {
        _key: "item-3",
        icon: "thermostat",
        title: "Isı & Soğuk Terapi",
        desc: "Hem sıcak hem soğuk uygulamalara uygun, çift yönlü terapi imkânı.",
      },
      {
        _key: "item-4",
        icon: "favorite",
        title: "İyileştirici Etki",
        desc: "Kas gevşemesi, ağrı giderimi ve derin rahatlama için bilimsel temelli tasarım.",
      },
    ],

    quoteText: "Sıcaklık iyileştirir, doğa dengeler.",
    quoteSubtext:
      "Her ürünümüz, yoğun günlerin ardından bedeninize ve zihninize hak ettiği molayı vermek için özenle elde üretilir.",
    quoteButtonText: "Hikayemizi Keşfet",
    quoteButtonLink: "/hakkimizda",
  };

  if (heroImageAsset) {
    doc.heroImage = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: heroImageAsset._id,
      },
    };
  }

  await client.createOrReplace(doc);
  console.log(`\n🎉 Anasayfa Ayarları Sanity Studio'ya başarıyla aktarıldı!`);
}

seedHomeSettings().catch(console.error);
