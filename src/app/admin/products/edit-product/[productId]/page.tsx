import { redirect } from "next/navigation";
import { getCategories } from "@/data-layer/category";
import { auth } from "@/utils/auth";
import { getProduct } from "@/data-layer/product";
import ProductForm from "../../_components/ProductForm";
import { submitUpdateProduct } from "./actions";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const productId = (await params).productId;
  if (!productId) {
    throw new Error(`Missing product id`);
  }

  const categories = await getCategories(1); // TODO: Change to a dynamic shopId
  const product = await getProduct({
    shopId: 1,
    productId: Number(productId),
  });

  if (!product) {
    throw new Error(`Missing product with id: ${productId}`);
  }

  return (
    <ProductForm
      product={product}
      type={"edit"}
      action={submitUpdateProduct}
      categories={categories}
    />
  );
}
