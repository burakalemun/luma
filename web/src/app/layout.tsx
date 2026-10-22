import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Luma | Doğal Wellness & Yaşam Tarzı",
  description: "Doğanın sıcaklığını bedeninize taşıyın. Geleneksel kiraz çekirdeği termoterapisi ve organik keten ürünler.",
  applicationName: SITE_NAME,
  keywords: [
    "kiraz çekirdeği göz maskesi",
    "lavantalı ısı yastığı",
    "doğal ısı terapisi",
    "regl ağrısı ısı yastığı",
    "menopoz sıcak basması yastığı",
    "ritüel kutusu",
    "wellness hediye",
    "The Luma",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "The Luma | Doğal Wellness & Yaşam Tarzı",
    description: "Kiraz çekirdeği göz maskeleri, lavantalı ısı yastıkları ve ritüel kutuları. El emeği, doğal ve sürdürülebilir wellness.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "The Luma doğal wellness ürünleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Luma | Doğal Wellness & Yaşam Tarzı",
    description: "Kiraz çekirdeği göz maskeleri, lavantalı ısı yastıkları ve ritüel kutuları.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  icons: {
    icon: [
      { url: "/images/logo-mark.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        {children}
      </body>
    </html>
  );
}
