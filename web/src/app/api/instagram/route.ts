import { NextResponse } from "next/server";
import { getInstagramPosts } from "@/lib/instagram";

export async function GET() {
  try {
    const { posts, isLive, source } = await getInstagramPosts();
    return NextResponse.json({
      data: posts,
      isLive,
      source,
      success: true,
      message:
        source === "sanity"
          ? "Instagram vitrini Sanity Studio CMS üzerinden canlı olarak çekildi."
          : source === "meta"
          ? "Instagram vitrini Meta Graph API üzerinden canlı olarak çekildi."
          : "Henüz Sanity Studio'da Instagram kaydı veya Meta Token bulunmuyor.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 }
    );
  }
}
