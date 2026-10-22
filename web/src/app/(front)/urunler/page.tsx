import { Metadata } from "next";
import { productsDb, PRODUCT_CATEGORIES } from "@/data/products";
import ProductListClient from "@/components/product/ProductListClient";

export const metadata: Metadata = {
  alternates: { canonical: "/urunler" },
  title: "Doğal Isı Terapisi Ürünleri | LUMA",
  description:
    "Organik kiraz çekirdeği göz maskeleri, boyun ve sırt ısı yastıkları, doğal ritüel ve denge kutuları. El emeği ve sürdürülebilir wellness koleksiyonu.",
};

export default function ProductsPage() {
  return (
    <ProductListClient
      products={productsDb}
      categories={PRODUCT_CATEGORIES}
    />
  );
}
