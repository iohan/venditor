import { redirect } from "next/navigation";
import AddProductForm from "./AddProductForm";
import { getCategories } from "@/data-layer/category";
import { auth } from "@/utils/auth";

export default async function AddProduct() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const categories = await getCategories(1); // TODO: Change to a dynamic shopId

  return <AddProductForm categories={categories} />;
}
