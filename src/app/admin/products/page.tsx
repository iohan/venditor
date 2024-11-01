import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import ProductTable from "./ProductTable";
import { getProducts } from "@/data-layer/product";

export default async function Products() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const products = await getProducts({ shopId: 1 });

  return <ProductTable products={products} />;
}
