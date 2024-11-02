import ProductDetails from "@/app/(front)/_components/product-details/ProductDetails";
import { getProductFromSlug } from "@/app/(front)/data-layer/product";

export default async function Product({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const productSlug = (await params).productSlug;
  const product = await getProductFromSlug({ shopId: 1, productSlug });

  return (
    <div className="mt-10 container">
      <ProductDetails product={product} />
    </div>
  );
}
