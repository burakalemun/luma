/**
 * The Luma - Ürün Verilerini NDJSON'a Dönüştürme Scripti
 * 
 * Kullanım:
 *   node scripts/generate-products-ndjson.mjs
 * 
 * Çıktı dosyasını Sanity'e aktarmak için:
 *   cd web && npx sanity dataset import ./data/products.ndjson production --replace
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRENDYOL_STORE_URL =
  "https://www.trendyol.com/magaza/the-luma-m-1190716?sst=0&channelId=1&event=0";
const HEPSIBURADA_STORE_URL = "https://www.hepsiburada.com/magaza/the-luma";

// productsDb'nin tam kopyası - data/products.ts dosyasındaki verilerle senkronize
const productsDb = [
  {
    slug: "luma-ritual-box",
    title: "LUMA Ritual Box",
    subtitle: "Günün yükünü bırak, kendine nazikçe dön.",
    price: "",
    badge: "RİTÜEL KUTUSU",
    badgeBg: "bg-[#4A3F35]",
    category: "Ritüel Kutuları",
    categories: ["Ritüel Kutuları", "Göz Maskeleri", "Mumlar"],
    mainImageUrl: "/images/products/luma-ritual-box.jpg",
    galleryUrls: [
      "/images/products/luma-ritual-box.jpg",
      "/images/products/luma-ritual-box-2.jpg",
      "/images/products/luma-ritual-box-3.jpg",
      "/images/products/luma-ritual-box-4.jpg",
      "/images/products/luma-ritual-box-5.jpg",
    ],
    shortDesc:
      "Kiraz çekirdekli göz maskesi, lavantalı mum, bitki çayı ve özel Spotify listesi ile rahatlama ritüeli.",
    longDesc:
      "LUMA Ritual Box, yorucu bir günün ardından kendine sığındığın o sessiz anı yaratmak için tasarlandı. İçeriğindeki LUMA Touch Cherry ile gözlerini dinlendirirken, LUMA Calm munun ışığında zihnini yavaşlat. LUMA Breath çayının hafifliği ve LUMA Sound müzik listesiyle bütünsel bir arınma yaşa.",
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
    slug: "luma-balance-box",
    title: "LUMA Balance Box",
    subtitle: "Balance Serisi - Bir Anlık Denge",
    price: "",
    badge: "YENİ SERİ",
    badgeBg: "bg-[#B95B32]",
    category: "Ritüel Kutuları",
    categories: ["Ritüel Kutuları", "Denge Yastıkları", "Mumlar"],
    mainImageUrl: "/images/products/luma-balance-box.jpg",
    galleryUrls: [
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
    slug: "luma-touch-cherry",
    title: "LUMA Touch Cherry",
    subtitle: "Isıtılabilir/Soğutulabilir Göz Maskesi (80 gr)",
    price: "",
    badge: null,
    badgeBg: "",
    category: "Göz Maskeleri",
    categories: ["Göz Maskeleri"],
    mainImageUrl: "/images/products/luma-touch-cherry.jpg",
    galleryUrls: [
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
    slug: "luma-balance-pillow",
    title: "LUMA Balance Pillow",
    subtitle: "Isıtılabilir/Soğutulabilir Rahatlama ve Denge Yastığı (480 gr)",
    price: "",
    badge: null,
    badgeBg: "",
    category: "Denge Yastıkları",
    categories: ["Denge Yastıkları"],
    mainImageUrl: "/images/products/luma-balance-pillow.jpg",
    galleryUrls: [
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
    slug: "luma-warm-hug",
    title: "LUMA Warm Hug",
    subtitle: "Isıtılabilir Sıcak Ağrı Yastığı (450 gr)",
    price: "",
    badge: null,
    badgeBg: "",
    category: "Ağrı Yastıkları",
    categories: ["Ağrı Yastıkları"],
    mainImageUrl: "/images/products/luma-warm-hug.jpg",
    galleryUrls: [
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

// NDJSON formatına dönüştür
const docs = productsDb.map((p) => ({
  _id: `product-${p.slug}`,
  _type: "product",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  subtitle: p.subtitle,
  price: p.price || undefined,
  badge: p.badge || undefined,
  badgeBg: p.badgeBg || undefined,
  category: p.category,
  categories: p.categories,
  mainImageUrl: p.mainImageUrl,
  galleryUrls: p.galleryUrls,
  shortDesc: p.shortDesc,
  longDesc: p.longDesc,
  message: p.message,
  isHeated: p.isHeated,
  contents: p.contents,
  usageAreas: p.usageAreas,
  usageHot: p.usageHot,
  usageCold: p.usageCold,
  care: p.care,
  trendyolUrl: p.trendyolUrl,
  hbUrl: p.hbUrl,
  order: p.order,
  isFeatured: p.isFeatured,
}));

// data/ dizinini oluştur
const dataDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const outputPath = path.resolve(dataDir, "products.ndjson");
const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
fs.writeFileSync(outputPath, ndjson, "utf-8");

console.log(`✅ ${docs.length} ürün NDJSON formatına dönüştürüldü: ${outputPath}`);
console.log("\n📦 Sanity'ye aktarmak için şu komutu çalıştırın:\n");
console.log(
  "   cd /Users/burakkaya/Desktop/theluma/web && npx sanity dataset import ./data/products.ndjson production --replace\n"
);

