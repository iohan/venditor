import ProductList from "@/app/(front)/_components/product-list/ProductList";
import { getProductsInCategory } from "@/app/(front)/data-layer/product";

export default async function Category({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const categorySlug = (await params).categorySlug;

  const products = await getProductsInCategory({ shopId: 1, categorySlug });

  return (
    <div className="container flex flex-col">
      <div className="mt-10 text-3xl">Kategori</div>
      <ProductList products={products} />
    </div>
  );
}
