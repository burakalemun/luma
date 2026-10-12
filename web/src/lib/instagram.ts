import { client, urlFor } from "@/lib/sanity";

export interface InstagramPost {
  id: string;
  type: "reel" | "post";
  title: string;
  views?: string | null;
  img: string;
  url: string;
  hiddenOnTablet?: boolean;
}

interface SanityInstagramDoc {
  _id: string;
  title: string;
  type?: "reel" | "post";
  mediaUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  imageUrl?: string;
  views?: string;
  order?: number;
}

export async function getInstagramPosts(): Promise<{
  posts: InstagramPost[];
  isLive: boolean;
  source: "sanity" | "meta" | "none";
}> {
  // 1. ÖNCELİK: Sanity Studio CMS
  try {
    const sanityQuery = `*[_type == "instagramPost" && (isActive == true || !defined(isActive))] | order(order asc, _createdAt desc)[0...5] {
      _id,
      title,
      type,
      mediaUrl,
      image,
      imageUrl,
      views,
      order
    }`;

    const sanityDocs = await client.fetch<SanityInstagramDoc[]>(
      sanityQuery,
      {},
      { cache: "no-store" }
    );

    if (Array.isArray(sanityDocs) && sanityDocs.length > 0) {
      const formattedPosts: InstagramPost[] = sanityDocs.map((doc, idx) => {
        let imageUrl = doc.imageUrl;
        if (doc.image) {
          try {
            imageUrl = urlFor(doc.image).width(600).height(750).quality(85).url();
          } catch {
            // fallback
          }
        }
        if (!imageUrl) {
          imageUrl = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop";
        }

        const isReel = doc.type === "reel";

        return {
          id: doc._id,
          type: isReel ? "reel" : "post",
          title: doc.title,
          views: doc.views || (isReel ? "Reel" : null),
          img: imageUrl,
          url: doc.mediaUrl || "https://instagram.com/thelumaa_",
          hiddenOnTablet: idx === 4,
        };
      });

      return {
        posts: formattedPosts,
        isLive: true,
        source: "sanity",
      };
    }
  } catch (sanityError) {
    console.warn("Sanity Instagram sorgulama hatası:", sanityError);
  }

  // 2. ÖNCELİK: Meta Instagram Graph API (Eğer Access Token varsa)
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=5&access_token=${token}`,
        { next: { revalidate: 3600 } }
      );

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const livePosts: InstagramPost[] = json.data.slice(0, 5).map((item: any, idx: number) => {
            const isVideo = item.media_type === "VIDEO";
            const cleanTitle = item.caption
              ? item.caption.split("\n")[0].slice(0, 90)
              : "The Luma Instagram";

            return {
              id: item.id,
              type: isVideo ? "reel" : "post",
              title: cleanTitle,
              views: isVideo ? "Reel" : null,
              img: item.thumbnail_url || item.media_url,
              url: item.permalink || "https://instagram.com/thelumaa_",
              hiddenOnTablet: idx === 4,
            };
          });

          return { posts: livePosts, isLive: true, source: "meta" };
        }
      }
    } catch (metaError) {
      console.warn("Meta API hatası:", metaError);
    }
  }

  // Panelde veya Meta'da kayıt yoksa boş döner (Mock veri gösterilmez)
  return { posts: [], isLive: false, source: "none" };
}
