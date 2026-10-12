import { getLocalProductImage } from "@/lib/images";

export const TRENDYOL_STORE_URL = "https://www.trendyol.com/magaza/the-luma-m-1190716?sst=0&channelId=1&event=0";
export const HEPSIBURADA_STORE_URL = "https://www.hepsiburada.com/magaza/the-luma";

export const productsDb = [
  {
    slug: "luma-ritual-box",
    title: "LUMA Ritual Box",
    subtitle: "Günün yükünü bırak, kendine nazikçe dön.",
    price: "₺950",
    badge: "RİTÜEL KUTUSU",
    badgeBg: "bg-[#4A3F35]",
    images: [
      getLocalProductImage("luma-ritual-box", "/images/products/luma-ritual-box.jpg"),
      getLocalProductImage("luma-ritual-box-2", "/images/products/luma-ritual-box-2.jpg"),
      getLocalProductImage("luma-ritual-box-3", "/images/products/luma-ritual-box-3.jpg"),
      getLocalProductImage("luma-ritual-box-4", "/images/products/luma-ritual-box-4.jpg"),
      getLocalProductImage("luma-ritual-box-5", "/images/products/luma-ritual-box-5.jpg"),
    ],
    shortDesc: "Kiraz çekirdekli göz maskesi, lavantalı mum, bitki çayı ve özel Spotify listesi ile rahatlama ritüeli.",
    longDesc: "LUMA Ritual Box, yorucu bir günün ardından kendine sığındığın o sessiz anı yaratmak için tasarlandı. İçeriğindeki LUMA Touch Cherry ile gözlerini dinlendirirken, LUMA Calm mumunun ışığında zihnini yavaşlat. LUMA Breath çayının hafifliği ve LUMA Sound müzik listesiyle bütünsel bir arınma yaşa.",
    contents: [
      "1 Adet LUMA Touch Cherry (Kiraz-vişne çekirdekli Göz Maskesi)",
      "1 Adet LUMA Calm (Lavantalı Soya Mumu)",
      "1 Adet LUMA Breath (Organik Bitki Çayı)",
      "1 Adet LUMA Sound (QR Kodlu Spotify Müzik Notu)",
      "🎁 HEDİYE: LUMA Skin (Lavantalı El Yapımı Sabun)"
    ],
    usageAreas: [
      "Göz yorgunluğu ve şişliklerde rahatlatıcı etki",
      "Migren ve baş ağrılarında destekleyici kullanım",
      "Uyku öncesi sakinleştirici etki"
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usage: {
      hot: "Göz bandınızın temiz ve kuru olduğundan emin olun. Mikrodalgada 500-600W düşük ayarda, 20-30 sn ısıtın. Yeterince ısınmamışsa 10’ar saniyelik ek süreler verin. Mumu niyetinle yak ve çayını 5 dk demle.",
      cold: "Göz maskesini hava almayan bir poşete koyarak 30-60 dakika boyunca buzdolabında veya derin dondurucuda bekletin. Poşetten çıkarıp doğrudan göz çevresine uygulayın."
    },
    message: "Gözlerini kapat, dünyanın sesini susturalım.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true
  },
  {
    slug: "luma-balance-box",
    title: "LUMA Balance Box",
    subtitle: "Balance Serisi - Bir Anlık Denge",
    price: "₺1100",
    badge: "YENİ SERİ",
    badgeBg: "bg-[#B95B32]",
    images: [
      getLocalProductImage("luma-balance-box", "/images/products/luma-balance-box.jpg"),
      getLocalProductImage("luma-balance-box-cherry", "/images/products/luma-balance-box-cherry.png"),
      getLocalProductImage("luma-balance-usage-model", "/images/products/luma-balance-usage-model.png"),
      getLocalProductImage("luma-usage-guide-diagram", "/images/products/luma-usage-guide-diagram.png"),
      getLocalProductImage("luma-warm-hug-collection", "/images/products/luma-warm-hug-collection.jpg"),
      getLocalProductImage("luma-warm-hug-lifestyle", "/images/products/luma-warm-hug-lifestyle.jpg")
    ],
    shortDesc: "Bedenin dursun, ruhun denge bulsun. Hormonal geçişleri hafifletmek ve bedeni dengelemek için özel terapi kutusu.",
    longDesc: "LUMA Balance Box, bedensel ve ruhsal dengeyi yeniden kurmak için tasarlandı. LUMA Balance Pillow ile sıcak veya soğuk terapi uygularken, LUMA Warm Light mumuyla içsel ışığını yak. Adaçayı, melisa ve lavanta karışımlı LUMA Flow çayıyla duygusal iniş çıkışlarını hafiflet.",
    contents: [
      "1 Adet LUMA Balance Pillow (Kiraz çekirdeği + lavanta dolgulu ergonomik yastık)",
      "1 Adet LUMA Warm Light (Lavantalı Doğal Mum)",
      "1 Adet LUMA Flow (Adaçayı, melisa, lavanta karışımlı Bitki Çayı)"
    ],
    usageAreas: [
      "Boyun ve omuz kaslarını gevşetmek",
      "Diz ağrılarında destek",
      "Menopoz döneminde sıcak basmalarını hafifletici etki"
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usage: {
      hot: "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Daha sıcak istenirse 15’er saniye ek süre verin.",
      cold: "Hava almayan poşetle birlikte 1-2 saat dondurucuda bekletin. Boyun, omuz, diz veya karın bölgesine doğrudan uygulayın."
    },
    message: "Ritüelin başlasın, ışığın LUMA olsun.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true
  },
  {
    slug: "luma-touch-cherry",
    title: "LUMA Touch Cherry",
    subtitle: "Isıtılabilir/Soğutulabilir Göz Maskesi (80 gr)",
    price: "₺350",
    badge: null,
    badgeBg: "",
    images: [
      getLocalProductImage("luma-touch-cherry", "/images/products/luma-touch-cherry.jpg"),
      getLocalProductImage("luma-touch-cherry-2", "/images/products/luma-touch-cherry-2.jpg"),
      getLocalProductImage("luma-touch-cherry-3", "/images/products/luma-touch-cherry-3.jpg")
    ],
    shortDesc: "LUMA Touch Cherry, içeriğindeki doğal kiraz-vişne çekirdekleri ile göz çevrene sıcak ya da serin bir dokunuş sunar.",
    longDesc: "Gözlerini kapat, iç sesini duy… Çekirdeklerinin eşsiz yapısı, ısıyı uzun süre tutar ve nazikçe yayar. İçine eklenen lavanta çiçeği ise aromaterapi desteğiyle zihni yatıştırır, ruhu sakinleştirir. Bu maske sadece bir ürün değil, her kullanımda kendine döndüğün bir ritüel.",
    contents: [
      "Doğal kiraz-vişne çekirdekleri – Isı ve soğuk tutma özelliği ile uzun süreli etki",
      "Kurutulmuş lavanta çiçeği – Hafif aromaterapik etkiyle stresi yatıştırır",
      "Organik pamuk ve müslin kumaş – Cildine dost, nefes alabilir doğal yapı"
    ],
    usageAreas: [
      "Göz yorgunluğu ve şişliklerde rahatlatıcı etki",
      "Migren ve baş ağrılarında destekleyici kullanım",
      "Uyku öncesi sakinleştirici etki"
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usage: {
      hot: "Göz bandınızın temiz ve kuru olduğundan emin olun. Mikrodalgada 500-600W düşük ayarda, 20-30 sn ısıtın. Yeterince ısınmamışsa 10’ar saniyelik ek süreler verin.",
      cold: "Hava almayan bir poşete koyarak 30-60 dakika boyunca buzdolabında veya derin dondurucuda bekletin. Poşetten çıkarıp doğrudan göz çevresine uygulayın."
    },
    message: "Doğadan Gelen Şefkatle Gözlerini Dinlendir.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true
  },
  {
    slug: "luma-balance-pillow",
    title: "LUMA Balance Pillow",
    subtitle: "Isıtılabilir/Soğutulabilir Rahatlama ve Denge Yastığı (480 gr)",
    price: "₺550",
    badge: null,
    badgeBg: "",
    images: [
      getLocalProductImage("luma-balance-pillow", "/images/products/luma-balance-pillow.png"),
      getLocalProductImage("luma-balance-specs-diagram", "/images/products/luma-balance-specs-diagram.png"),
      getLocalProductImage("luma-balance-usage-model", "/images/products/luma-balance-usage-model.png"),
      getLocalProductImage("luma-usage-guide-diagram", "/images/products/luma-usage-guide-diagram.png"),
      getLocalProductImage("luma-balance-pillow-4", "/images/products/luma-balance-pillow-4.png"),
      getLocalProductImage("luma-balance-pillow-5", "/images/products/luma-balance-pillow-5.png")
    ],
    shortDesc: "Özellikle menopoz döneminde kadın bedeni yeni bir dengeye geçer. Bu yastık ani sıcak basmaları ve stres anlarında bedene şefkatle dokunur.",
    longDesc: "Özellikle menopoz döneminde kadın bedeni, yılların bilgeliğiyle yeni bir dengeye geçer. LUMA Balance Pillow, bu dönemde yaşanan ani sıcak basmaları, huzursuzluk ve stres anlarında bedene ve ruha şefkatle dokunur.",
    contents: [
      "Organik kiraz çekirdeği – Isı ve soğuğu uzun süre tutar",
      "Lavanta çiçeği – Sakinleştirici doğal aromaterapi etkisi",
      "Organik pamuklu ve keten kumaş – Cilde dost, doğal nefes alabilir dokuda"
    ],
    usageAreas: [
      "Boyun ve omuz kaslarını gevşetmek",
      "Diz ağrılarında destek",
      "Menopoz döneminde sıcak basmalarını hafifletici etki"
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usage: {
      hot: "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Daha sıcak istenirse 15’er saniye ek süre verin.",
      cold: "Hava almayan poşetle birlikte 1-2 saat dondurucuda bekletin. Boyun, omuz, diz veya karın bölgesine doğrudan uygulayın."
    },
    message: "Dengenin Şefkatle Buluştuğu Anlar.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true
  },
  {
    slug: "luma-warm-hug",
    title: "LUMA Warm Hug",
    subtitle: "Isıtılabilir Sıcak Ağrı Yastığı (450 gr)",
    price: "₺490",
    badge: null,
    badgeBg: "",
    images: [
      getLocalProductImage("luma-warm-hug", "/images/products/luma-warm-hug.png"),
      getLocalProductImage("luma-warm-hug-2", "/images/products/luma-warm-hug-2.jpg"),
      getLocalProductImage("luma-warm-hug-3", "/images/products/luma-warm-hug-3.jpg"),
      getLocalProductImage("luma-warm-hug-4", "/images/products/luma-warm-hug-4.png"),
      getLocalProductImage("luma-warm-hug-5", "/images/products/luma-warm-hug-5.png"),
      getLocalProductImage("luma-warm-hug-6", "/images/products/luma-warm-hug-6.png")
    ],
    shortDesc: "Ağrılı, sancılı, dalgalı geçen regl günlerinde kendini yalnız hissetme. Bedenine yumuşacık bir sarılma sunar.",
    longDesc: "LUMA Warm Hug, doğal kiraz çekirdeklerinin içten gelen sıcaklığıyla bedenine yumuşacık bir sarılma sunar. Karın bölgesine, bele veya rahim çevresine yerleştirildiğinde kasları gevşetir, sancıları hafifletir. Lavanta ile zenginleştirilmiş içeriği sadece bedeni değil, zihni de rahatlatır.",
    contents: [
      "Kiraz çekirdeği – Uzun süreli ve dengeli ısı yayılımı",
      "Lavanta çiçeği – Aromaterapik sakinlik",
      "Organik pamuk ve keten kumaş – Ciltle uyumlu, nefes alabilir, sıcaklığı güvenle tutar"
    ],
    usageAreas: [
      "Regl döneminde karın bölgesindeki krampları hafifletmek",
      "Bel ağrısı ve kas gerginliğini azaltmak"
    ],
    care: "Çıkarılabilir dış kılıfı elde yıkayabilirsiniz, dolgulu olan iç kısmı kullanımdan sonra havalandırın, yıkamayın. Serin ve kuru ortamda saklayın. Çocukların erişemeyeceği yerde muhafaza edin.",
    usage: {
      hot: "Mikrodalgada 1-1,5 dakika (500-600W) ısıtın. Aşırı ısınmayı önlemek için süreyi geçmeyin.",
      cold: "Serinlik gerektiren durumlarda hava almayan poşetle buzdolabında soğutarak kullanabilirsiniz."
    },
    message: "Her Ay Aynı Döngü, Bu Kez Yanında LUMA Var.",
    trendyolUrl: TRENDYOL_STORE_URL,
    hbUrl: HEPSIBURADA_STORE_URL,
    isHeated: true
  }
];
