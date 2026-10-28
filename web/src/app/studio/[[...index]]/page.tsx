import { connection } from "next/server";
import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Studio } from "./Studio";

export const metadata: Metadata = {
  title: "Sanity Studio | The Luma",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.svg?v=20261028", type: "image/svg+xml" },
      { url: "/icon-32x32.png?v=20261028", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico?v=20261028", sizes: "any" },
    ],
    shortcut: ["/favicon.ico?v=20261028"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return [{ index: [] }];
}

async function StudioMarker() {
  await connection();
  return <Studio />;
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#101112] flex items-center justify-center text-white/60">Sanity Studio Yükleniyor...</div>}>
      <StudioMarker />
    </Suspense>
  );
}
