import { redirect } from "next/navigation";
import { getCategories } from "@/app/admin/data-layer/category";
import { auth } from "@/utils/auth";
import ProductForm from "../_components/ProductForm";
import { submitNewProduct } from "./actions";
import Page from "../../_components/Page";

export default async function AddProduct() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const categories = await getCategories(1); // TODO: Change to a dynamic shopId

  return (
    <Page
      breadcrumb={{
        currentPage: "Add product",
        tree: [{ title: "Products", href: "/admin/products" }],
      }}
    >
      <ProductForm
        type={"add"}
        action={submitNewProduct}
        categories={categories}
      />
    </Page>
  );
}
