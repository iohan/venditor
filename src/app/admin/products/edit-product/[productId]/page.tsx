import { redirect } from "next/navigation";
import { getCategories } from "@/app/admin/data-layer/category";
import { auth } from "@/utils/auth";
import { getProduct } from "@/app/admin/data-layer/product";
import ProductForm from "../../_components/ProductForm";
import { submitUpdateProduct } from "./actions";
import Page from "@/app/admin/_components/Page";

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
    <Page
      breadcrumb={{
        currentPage: "Edit product",
        tree: [{ title: "Products", href: "/admin/products" }],
      }}
    >
      <ProductForm
        product={product}
        type={"edit"}
        action={submitUpdateProduct}
        categories={categories}
      />
    </Page>
  );
}
