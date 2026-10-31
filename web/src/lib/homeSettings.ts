import { client, urlFor } from "@/lib/sanity";
import { getLocalProductImage } from "@/lib/images";

export interface WhyLumaItem {
  icon: string;
  title: string;
  desc: string;
}

export interface HomeSettings {
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroImageUrl: string;
  heroFloatingCardTitle: string;
  heroFloatingCardSubtitle: string;
  heroPrimaryButtonText: string;
  heroPrimaryButtonLink: string;
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;

  whyLumaBadge: string;
  whyLumaTitle: string;
  whyLumaItems: WhyLumaItem[];

  quoteText: string;
  quoteSubtext: string;
  quoteButtonText: string;
  quoteButtonLink: string;
}

export const defaultHomeSettings: HomeSettings = {
  heroBadge: "DOĞAL ISI TERAPİSİ",
  heroTitle: "Doğanın Sıcaklığını Bedeninize Taşıyın",
  heroTitleHighlight: "Bedeninize",
  heroDescription:
    "Geleneksel kiraz çekirdeği termoterapisi ve organik keten kumaşlarla bedeninizi dinlendirin. Her ürün özenle el yapımı.",
  heroImageUrl: getLocalProductImage(
    "luma-warm-hug-lifestyle",
    "/images/products/luma-warm-hug-lifestyle.jpg"
  ),
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
      icon: "eco",
      title: "%100 Doğal İçerik",
      desc: "Sentetik madde, katkı veya kimyasal içermez. Sadece doğanın saf ürünleri.",
    },
    {
      icon: "handyman",
      title: "El Yapımı Üretim",
      desc: "Her ürün, Türkiye'de usta eller tarafından tek tek özenle hazırlanır.",
    },
    {
      icon: "thermostat",
      title: "Isı & Soğuk Terapi",
      desc: "Hem sıcak hem soğuk uygulamalara uygun, çift yönlü terapi imkânı.",
    },
    {
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

export async function getHomeSettings(): Promise<HomeSettings> {
  try {
    const query = `*[_type == "homeSettings" && !(_id in path("drafts.**"))][0] {
      heroBadge,
      heroTitle,
      heroTitleHighlight,
      heroDescription,
      heroImage,
      heroFloatingCardTitle,
      heroFloatingCardSubtitle,
      heroPrimaryButtonText,
      heroPrimaryButtonLink,
      heroSecondaryButtonText,
      heroSecondaryButtonLink,
      whyLumaBadge,
      whyLumaTitle,
      whyLumaItems,
      quoteText,
      quoteSubtext,
      quoteButtonText,
      quoteButtonLink
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = await client.fetch(query, {}, { cache: "no-store" });

    if (!doc) {
      return defaultHomeSettings;
    }

    let heroImageUrl = defaultHomeSettings.heroImageUrl;
    if (doc.heroImage?.asset) {
      try {
        heroImageUrl = urlFor(doc.heroImage).width(1200).quality(90).url();
      } catch {
        // fallback
      }
    }

    return {
      heroBadge: doc.heroBadge || defaultHomeSettings.heroBadge,
      heroTitle: doc.heroTitle || defaultHomeSettings.heroTitle,
      heroTitleHighlight:
        doc.heroTitleHighlight || defaultHomeSettings.heroTitleHighlight,
      heroDescription:
        doc.heroDescription || defaultHomeSettings.heroDescription,
      heroImageUrl,
      heroFloatingCardTitle:
        doc.heroFloatingCardTitle || defaultHomeSettings.heroFloatingCardTitle,
      heroFloatingCardSubtitle:
        doc.heroFloatingCardSubtitle ||
        defaultHomeSettings.heroFloatingCardSubtitle,
      heroPrimaryButtonText:
        doc.heroPrimaryButtonText || defaultHomeSettings.heroPrimaryButtonText,
      heroPrimaryButtonLink:
        doc.heroPrimaryButtonLink || defaultHomeSettings.heroPrimaryButtonLink,
      heroSecondaryButtonText:
        doc.heroSecondaryButtonText ||
        defaultHomeSettings.heroSecondaryButtonText,
      heroSecondaryButtonLink:
        doc.heroSecondaryButtonLink ||
        defaultHomeSettings.heroSecondaryButtonLink,

      whyLumaBadge: doc.whyLumaBadge || defaultHomeSettings.whyLumaBadge,
      whyLumaTitle: doc.whyLumaTitle || defaultHomeSettings.whyLumaTitle,
      whyLumaItems:
        Array.isArray(doc.whyLumaItems) && doc.whyLumaItems.length > 0
          ? doc.whyLumaItems
          : defaultHomeSettings.whyLumaItems,

      quoteText: doc.quoteText || defaultHomeSettings.quoteText,
      quoteSubtext: doc.quoteSubtext || defaultHomeSettings.quoteSubtext,
      quoteButtonText:
        doc.quoteButtonText || defaultHomeSettings.quoteButtonText,
      quoteButtonLink:
        doc.quoteButtonLink || defaultHomeSettings.quoteButtonLink,
    };
  } catch (error) {
    console.warn("HomeSettings fetch error:", error);
    return defaultHomeSettings;
  }
}
