import { Metadata } from "next";
import { getProducts, getProductCategories } from "@/lib/products";
import ProductListClient from "@/components/product/ProductListClient";

export const instant = false;

export const metadata: Metadata = {
  alternates: { canonical: "/urunler" },
  title: "Doğal Isı Terapisi Ürünleri | LUMA",
  description:
    "Organik kiraz çekirdeği göz maskeleri, boyun ve sırt ısı yastıkları, doğal ritüel ve denge kutuları. El emeği ve sürdürülebilir wellness koleksiyonu.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <ProductListClient
      products={products}
      categories={categories}
    />
  );
}
