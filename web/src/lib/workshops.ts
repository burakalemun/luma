import { client, urlFor } from "@/lib/sanity";

export interface Workshop {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  price: string;
  capacity: number;
  spotsLeft: number;
  image: string;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveWorkshopImage(doc: any): string {
  if (doc.imageUrl) return doc.imageUrl;
  if (doc.image) {
    try {
      return urlFor(doc.image).width(1200).url();
    } catch {
      // ignore
    }
  }
  return "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPrice(val: any, strVal?: string): string {
  if (strVal) return strVal;
  if (typeof val === "number") return `₺${val.toLocaleString("tr-TR")}`;
  if (typeof val === "string") return val.startsWith("₺") ? val : `₺${val}`;
  return "₺0";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatWorkshopDate(doc: any): string {
  if (doc.dateStr) return doc.dateStr;
  if (doc.date) {
    try {
      const d = new Date(doc.date);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
      }
    } catch {
      // ignore
    }
  }
  return "Tarih Yakında";
}

export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const query = `*[_type == "workshop"] | order(date asc) {
      _id,
      title,
      "slug": slug.current,
      date,
      dateStr,
      time,
      location,
      type,
      price,
      priceStr,
      capacity,
      spotsLeft,
      image,
      imageUrl,
      description
    }`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanityData: any[] = await client.fetch(query, {}, {
      cache: "no-store",
    });

    if (sanityData && sanityData.length > 0) {
      return sanityData.map((doc, idx) => ({
        slug: doc.slug || `workshop-${idx + 1}`,
        title: doc.title,
        date: formatWorkshopDate(doc),
        time: doc.time || "14:00 - 17:00",
        location: doc.location || "LUMA Stüdyo, İstanbul",
        type: doc.type === "online" || doc.type === "Online" ? "Online" : "Fiziksel",
        price: formatPrice(doc.price, doc.priceStr),
        capacity: Number(doc.capacity) || 12,
        spotsLeft: typeof doc.spotsLeft === "number" ? doc.spotsLeft : (Number(doc.capacity) || 12),
        image: resolveWorkshopImage(doc),
        description: doc.description || "",
      }));
    }
  } catch (error) {
    console.warn("Sanity workshop fetch error:", error);
  }

  // Yalnızca Sanity CMS'ten okur, mock data yok
  return [];
}
