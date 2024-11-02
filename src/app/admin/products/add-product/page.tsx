import { redirect } from "next/navigation";
import { getCategories } from "@/data-layer/category";
import { auth } from "@/utils/auth";
import ProductForm from "../_components/ProductForm";
import { submitNewProduct } from "./actions";

export default async function AddProduct() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const categories = await getCategories(1); // TODO: Change to a dynamic shopId

  return (
    <ProductForm
      type={"add"}
      action={submitNewProduct}
      categories={categories}
    />
  );
}
