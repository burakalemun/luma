import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Suspense } from "react";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-[80px] w-full border-b border-border/60 bg-background/90"></div>}>
        <Header />
      </Suspense>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
