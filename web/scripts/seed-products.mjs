/**
 * The Luma - Ürünleri ve Görselleri Sanity'ye Aktaran Script (Dual Schema Uyumlu)
 * 
 * Bu script hem eski hem yeni Sanity Studio şemalarını %100 destekleyecek şekilde
 * dökümanları doldurur:
 * - name & title (Ürün İsmi / Başlık)
 * - shortDescription & shortDesc (Kısa Açıklama)
 * - hepsiburadaUrl & hbUrl (Hepsiburada Satın Al Linki)
 * - trendyolUrl (Trendyol Satın Al Linki)
 * - features & contents (Özellikler ve Kutu İçeriği)
 * - details & longDesc (Detaylı Açıklama / LUMA Dokunuşu)
 * - instructions & usageHot/usageCold (Kullanım Talimatları)
 * - mainImage & gallery (Sanity Medya Assetleri)
 */

import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webDir = path.resolve(__dirname, "..");

// .env.local'den token'i oku
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

const TRENDYOL_STORE_URL =
  "https://www.trendyol.com/magaza/the-luma-m-1190716?sst=0&channelId=1&event=0";
const HEPSIBURADA_STORE_URL = "https://www.hepsiburada.com/magaza/the-luma";

function toBlockText(text) {
  if (!text) return [];
  return [
    {
      _key: "block-1",
      _type: "block",
      children: [
        {
          _key: "span-1",
          _type: "span",
          marks: [],
          text: String(text),
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ];
}

const products = [
  {
    _id: "product-luma-ritual-box",
    _type: "product",
    title: "LUMA Ritual Box",
    slug: { _type: "slug", current: "luma-ritual-box" },
    subtitle: "Günün yükünü bırak, kendine nazikçe dön.",
    price: "",
    badge: "RİTÜEL KUTUSU",
    badgeBg: "bg-[#4A3F35]",
    category: "Ritüel Kutuları",
    categories: ["Ritüel Kutuları", "Göz Maskeleri", "Mumlar"],
    mainImageLocal: "/images/products/luma-ritual-box.jpg",
    galleryLocals: [
      "/images/products/luma-ritual-box.jpg",
      "/images/products/luma-ritual-box-2.jpg",
      "/images/products/luma-ritual-box-3.jpg",
      "/images/products/luma-ritual-box-4.jpg",
      "/images/products/luma-ritual-box-5.jpg",
    ],
    shortDesc:
      "Kiraz çekirdekli göz maskesi, lavantalı mum, bitki çayı ve özel Spotify listesi ile rahatlama ritüeli.",
    longDesc:
      "LUMA Ritual Box, yorucu bir günün ardından kendine sığındığın o sessiz anı yaratmak için tasarlandı. İçeriğindeki LUMA Touch Cherry ile gözlerini dinlendirirken, LUMA Calm mumunun ışığında zihnini yavaşlat. LUMA Breath çayının hafifliği ve LUMA Sound müzik listesiyle bütünsel bir arınma yaşa.",
    contents: [
      "1 Adet LUMA Touch Cherry (Kiraz-vişne çekirdekli Göz Maskesi)",
      "1 Adet LUMA Calm (Lavantalı Soya Mumu)",
      "1 Adet LUMA Breath (Organik Bitki Çayı)",
      "1 Adet LUMA Sound (QR Kodlu Spotify Müzik Notu)",
      "🎁 HEDİYE: LUMA Skin (Lavantalı El Yapımı Sabun)",
    ],
    usageAreas: [
      "Göz yorgunluğu ve şişliklerde rahatlatıcı etki",
      "Migren ve baş ağrılarında destekleyici kullanım",
      "Uyku öncesi sakinleştirici etki",
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usageHot:
      "Göz bandınızın temiz ve kuru olduğundan emin olun. Mikrodalgada 500-600W düşük ayarda, 20-30 sn ısıtın. Yeterince ısınmamışsa 10'ar saniyelik ek süreler verin. Mumu niyetinle yak ve çayını 5 dk demle.",
    usageCold:
      "Göz maskesini hava almayan bir poşete koyarak 30-60 dakika boyunca buzdolabında veya derin dondurucuda bekletin. Poşetten çıkarıp doğrudan göz çevresine uygulayın.",
    message: "Gözlerini kapat, dünyanın sesini susturalım.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true,
    order: 1,
    isFeatured: true,
  },
  {
    _id: "product-luma-balance-box",
    _type: "product",
    title: "LUMA Balance Box",
    slug: { _type: "slug", current: "luma-balance-box" },
    subtitle: "Balance Serisi - Bir Anlık Denge",
    price: "",
    badge: "YENİ SERİ",
    badgeBg: "bg-[#B95B32]",
    category: "Ritüel Kutuları",
    categories: ["Ritüel Kutuları", "Denge Yastıkları", "Mumlar"],
    mainImageLocal: "/images/products/luma-balance-box.jpg",
    galleryLocals: [
      "/images/products/luma-balance-box.jpg",
      "/images/products/luma-balance-box-cherry.jpg",
      "/images/products/luma-balance-usage-model.jpg",
      "/images/products/luma-usage-guide-diagram.jpg",
      "/images/products/luma-warm-hug-collection.jpg",
      "/images/products/luma-warm-hug-lifestyle.jpg",
    ],
    shortDesc:
      "Bedenin dursun, ruhun denge bulsun. Hormonal geçişleri hafifletmek ve bedeni dengelemek için özel terapi kutusu.",
    longDesc:
      "LUMA Balance Box, bedensel ve ruhsal dengeyi yeniden kurmak için tasarlandı. LUMA Balance Pillow ile sıcak veya soğuk terapi uygularken, LUMA Warm Light mumuyla içsel ışığını yak. Adaçayı, melisa ve lavanta karışımlı LUMA Flow çayıyla duygusal iniş çıkışlarını hafiflet.",
    contents: [
      "1 Adet LUMA Balance Pillow (Kiraz çekirdeği + lavanta dolgulu ergonomik yastık)",
      "1 Adet LUMA Warm Light (Lavantalı Doğal Mum)",
      "1 Adet LUMA Flow (Adaçayı, melisa, lavanta karışımlı Bitki Çayı)",
    ],
    usageAreas: [
      "Boyun ve omuz kaslarını gevşetmek",
      "Diz ağrılarında destek",
      "Menopoz döneminde sıcak basmalarını hafifletici etki",
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usageHot:
      "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Daha sıcak istenirse 15'er saniye ek süre verin.",
    usageCold:
      "Hava almayan poşetle birlikte 1-2 saat dondurucuda bekletin. Boyun, omuz, diz veya karın bölgesine doğrudan uygulayın.",
    message: "Ritüelin başlasın, ışığın LUMA olsun.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true,
    order: 2,
    isFeatured: true,
  },
  {
    _id: "product-luma-touch-cherry",
    _type: "product",
    title: "LUMA Touch Cherry",
    slug: { _type: "slug", current: "luma-touch-cherry" },
    subtitle: "Isıtılabilir/Soğutulabilir Göz Maskesi (80 gr)",
    price: "",
    category: "Göz Maskeleri",
    categories: ["Göz Maskeleri"],
    mainImageLocal: "/images/products/luma-touch-cherry.jpg",
    galleryLocals: [
      "/images/products/luma-touch-cherry.jpg",
      "/images/products/luma-touch-cherry-2.jpg",
      "/images/products/luma-touch-cherry-3.jpg",
    ],
    shortDesc:
      "LUMA Touch Cherry, içeriğindeki doğal kiraz-vişne çekirdekleri ile göz çevrene sıcak ya da serin bir dokunuş sunar.",
    longDesc:
      "Gözlerini kapat, iç sesini duy… Çekirdeklerinin eşsiz yapısı, ısıyı uzun süre tutar ve nazikçe yayar. İçine eklenen lavanta çiçeği ise aromaterapi desteğiyle zihni yatıştırır, ruhu sakinleştirir. Bu maske sadece bir ürün değil, her kullanımda kendine döndüğün bir ritüel.",
    contents: [
      "Doğal kiraz-vişne çekirdekleri – Isı ve soğuk tutma özelliği ile uzun süreli etki",
      "Kurutulmuş lavanta çiçeği – Hafif aromaterapik etkiyle stresi yatıştırır",
      "Organik pamuk ve müslin kumaş – Cildine dost, nefes alabilir doğal yapı",
    ],
    usageAreas: [
      "Göz yorgunluğu ve şişliklerde rahatlatıcı etki",
      "Migren ve baş ağrılarında destekleyici kullanım",
      "Uyku öncesi sakinleştirici etki",
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usageHot:
      "Göz bandınızın temiz ve kuru olduğundan emin olun. Mikrodalgada 500-600W düşük ayarda, 20-30 sn ısıtın. Yeterince ısınmamışsa 10'ar saniyelik ek süreler verin.",
    usageCold:
      "Hava almayan bir poşete koyarak 30-60 dakika boyunca buzdolabında veya derin dondurucuda bekletin. Poşetten çıkarıp doğrudan göz çevresine uygulayın.",
    message: "Doğadan Gelen Şefkatle Gözlerini Dinlendir.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true,
    order: 3,
    isFeatured: true,
  },
  {
    _id: "product-luma-balance-pillow",
    _type: "product",
    title: "LUMA Balance Pillow",
    slug: { _type: "slug", current: "luma-balance-pillow" },
    subtitle: "Isıtılabilir/Soğutulabilir Rahatlama ve Denge Yastığı (480 gr)",
    price: "",
    category: "Denge Yastıkları",
    categories: ["Denge Yastıkları"],
    mainImageLocal: "/images/products/luma-balance-pillow.jpg",
    galleryLocals: [
      "/images/products/luma-balance-pillow.jpg",
      "/images/products/luma-balance-specs-diagram.jpg",
      "/images/products/luma-balance-usage-model.jpg",
      "/images/products/luma-usage-guide-diagram.jpg",
      "/images/products/luma-balance-pillow-4.jpg",
      "/images/products/luma-balance-pillow-5.jpg",
    ],
    shortDesc:
      "Özellikle menopoz döneminde kadın bedeni yeni bir dengeye geçer. Bu yastık ani sıcak basmaları ve stres anlarında bedene şefkatle dokunur.",
    longDesc:
      "Özellikle menopoz döneminde kadın bedeni, yılların bilgeliğiyle yeni bir dengeye geçer. LUMA Balance Pillow, bu dönemde yaşanan ani sıcak basmaları, huzursuzluk ve stres anlarında bedene ve ruha şefkatle dokunur.",
    contents: [
      "Organik kiraz çekirdeği – Isı ve soğuğu uzun süre tutar",
      "Lavanta çiçeği – Sakinleştirici doğal aromaterapi etkisi",
      "Organik pamuklu ve keten kumaş – Cilde dost, doğal nefes alabilir dokuda",
    ],
    usageAreas: [
      "Boyun ve omuz kaslarını gevşetmek",
      "Diz ağrılarında destek",
      "Menopoz döneminde sıcak basmalarını hafifletici etki",
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usageHot:
      "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Daha sıcak istenirse 15'er saniye ek süre verin.",
    usageCold:
      "Hava almayan poşetle birlikte 1-2 saat dondurucuda bekletin. Boyun, omuz, diz veya karın bölgesine doğrudan uygulayın.",
    message: "Dengenin Şefkatle Buluştuğu Anlar.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true,
    order: 4,
    isFeatured: false,
  },
  {
    _id: "product-luma-warm-hug",
    _type: "product",
    title: "LUMA Warm Hug",
    slug: { _type: "slug", current: "luma-warm-hug" },
    subtitle: "Isıtılabilir Sıcak Ağrı Yastığı (450 gr)",
    price: "",
    category: "Ağrı Yastıkları",
    categories: ["Ağrı Yastıkları"],
    mainImageLocal: "/images/products/luma-warm-hug.jpg",
    galleryLocals: [
      "/images/products/luma-warm-hug.jpg",
      "/images/products/luma-warm-hug-2.jpg",
      "/images/products/luma-warm-hug-3.jpg",
      "/images/products/luma-warm-hug-4.jpg",
      "/images/products/luma-warm-hug-5.jpg",
      "/images/products/luma-warm-hug-6.jpg",
    ],
    shortDesc:
      "Ağrılı, sancılı, dalgalı geçen regl günlerinde kendini yalnız hissetme. Bedenine yumuşacık bir sarılma sunar.",
    longDesc:
      "LUMA Warm Hug, doğal kiraz çekirdeklerinin içten gelen sıcaklığıyla bedenine yumuşacık bir sarılma sunar. Karın bölgesine, bele veya rahim çevresine yerleştirildiğinde kasları gevşetir, sancıları hafifletir. Lavanta ile zenginleştirilmiş içeriği sadece bedeni değil, zihni de rahatlatır.",
    contents: [
      "Kiraz çekirdeği – Uzun süreli ve dengeli ısı yayılımı",
      "Lavanta çiçeği – Aromaterapik sakinlik",
      "Organik pamuk ve keten kumaş – Ciltle uyumlu, nefes alabilir, sıcaklığı güvenle tutar",
    ],
    usageAreas: [
      "Regl döneminde karın bölgesindeki krampları hafifletmek",
      "Bel ağrısı ve kas gerginliğini azaltmak",
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usageHot:
      "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Aşırı ısınmayı önlemek için süreyi geçmeyin.",
    usageCold:
      "Serinlik gerektiren durumlarda hava almayan poşetle buzdolabında soğutarak kullanabilirsiniz.",
    message: "Her Ay Aynı Döngü, Bu Kez Yanında LUMA Var.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true,
    order: 5,
    isFeatured: false,
  },
];

const uploadedAssetsCache = new Map();

async function uploadImageAsset(relativeImagePath) {
  if (uploadedAssetsCache.has(relativeImagePath)) {
    return uploadedAssetsCache.get(relativeImagePath);
  }

  const absolutePath = path.join(webDir, "public", relativeImagePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`   ⚠️ Görsel bulunamadı: ${absolutePath}`);
    return null;
  }

  try {
    const filename = path.basename(absolutePath);
    console.log(`   📸 Sanity Medya Yükleniyor: ${filename}...`);
    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(absolutePath),
      { filename }
    );
    uploadedAssetsCache.set(relativeImagePath, asset);
    return asset;
  } catch (err) {
    console.warn(`   ⚠️ Görsel yükleme hatası (${relativeImagePath}):`, err.message);
    return null;
  }
}

async function seedProducts() {
  console.log(`\n🚀 ${products.length} ürün Dual-Schema desteğiyle Sanity'ye aktarılıyor...\n`);
  console.log(`   Proje: ${projectId}`);
  console.log(`   Dataset: ${dataset}\n`);

  let success = 0;
  let errors = 0;

  for (const product of products) {
    try {
      console.log(`\n📦 [${product.order}/5] İşleniyor: ${product.title}`);

      // 1. Ana görseli yükle
      let mainImageAsset = null;
      if (product.mainImageLocal) {
        mainImageAsset = await uploadImageAsset(product.mainImageLocal);
      }

      // 2. Galeri görsellerini yükle
      const galleryAssets = [];
      if (Array.isArray(product.galleryLocals)) {
        for (let i = 0; i < product.galleryLocals.length; i++) {
          const gPath = product.galleryLocals[i];
          const asset = await uploadImageAsset(gPath);
          if (asset) {
            galleryAssets.push({
              _key: `gallery-img-${i + 1}`,
              _type: "image",
              asset: {
                _type: "reference",
                _ref: asset._id,
              },
            });
          }
        }
      }

      // 3. Sanity dokümanını OLUŞTUR (HEM ESKİ HEM YENİ ALAN ADLARINI DOLDUR)
      const doc = {
        _id: product._id,
        _type: product._type,

        // === BAŞLIK (name: Eski şema / title: Yeni şema) ===
        name: product.title,
        title: product.title,

        // === SLUG ===
        slug: product.slug,

        // === ALT BAŞLIK & FİYAT & ROZET ===
        subtitle: product.subtitle,
        price: product.price || undefined,
        badge: product.badge || undefined,
        badgeBg: product.badgeBg || undefined,

        // === KATEGORİ ===
        category: product.category,
        categories: product.categories,
        order: product.order,
        isFeatured: product.isFeatured,

        // === KISA AÇIKLAMA (shortDescription: Eski şema / shortDesc: Yeni şema) ===
        shortDescription: product.shortDesc,
        shortDesc: product.shortDesc,

        // === DETAYLI AÇIKLAMA / HİKAYE (details: Eski şema / longDesc: Yeni şema) ===
        details: toBlockText(product.longDesc),
        longDesc: product.longDesc,

        // === ÖZELLİKLER & KUTU İÇERİĞİ (features: Eski şema / contents: Yeni şema) ===
        features: product.contents,
        contents: product.contents,

        // === KULLANIM TALİMATLARI (instructions: Eski şema / usageHot+Cold: Yeni şema) ===
        instructions: toBlockText(
          `Sıcak Terapi:\n${product.usageHot}\n\nSoğuk Terapi:\n${product.usageCold}`
        ),
        usageHot: product.usageHot,
        usageCold: product.usageCold,

        // === SATIŞ & BUTON LİNKLERİ (hepsiburadaUrl: Eski şema / hbUrl: Yeni şema) ===
        trendyolUrl: product.trendyolUrl,
        hepsiburadaUrl: product.hbUrl,
        hbUrl: product.hbUrl,

        // === DİĞER ALANLAR ===
        message: product.message,
        isHeated: product.isHeated,
        usageAreas: product.usageAreas,
        care: product.care,
        mainImageUrl: product.mainImageLocal,
        galleryUrls: product.galleryLocals,
      };

      if (mainImageAsset) {
        doc.mainImage = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: mainImageAsset._id,
          },
        };
      }

      if (galleryAssets.length > 0) {
        doc.gallery = galleryAssets;
      }

      await client.createOrReplace(doc);
      console.log(`   ✅ Başarıyla yüklendi ve bağlandı: [name="${doc.name}"] [title="${doc.title}"]`);
      success++;
    } catch (err) {
      console.error(`   ❌ Hata (${product.title}):`, err.message);
      errors++;
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  if (errors === 0) {
    console.log(`\n🎉 Tüm ürünler hem eski (name/shortDescription/hepsiburadaUrl/features/instructions/details)`);
    console.log(`   hem yeni şema ile %100 uyumlu olarak yüklendi!`);
    console.log(`   Sanity Studio'yu yenileyin (F5 / Command+R).\n`);
  } else {
    console.log(`\n⚠️  ${success} başarılı, ${errors} hatalı.\n`);
  }
}

seedProducts().catch(console.error);
