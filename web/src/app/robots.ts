import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// GEO: Yapay zekâ arama botlarının (ChatGPT, Claude, Perplexity, Gemini vb.)
// içeriğe erişmesine açıkça izin verilir. Studio ve API yolları kapalıdır.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/studio", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_BOTS, allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
