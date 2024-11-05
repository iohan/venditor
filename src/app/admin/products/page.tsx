import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
//import ProductTable from "./old_ProductTable";
import { getProducts } from "@/app/admin/data-layer/product";
import { ProductTable } from "./ProductTable";
import { columns } from "./table-columns";

export default async function Products() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const products = await getProducts({ shopId: 1 });

  //return <ProductTable products={products} />;
  return <ProductTable columns={columns} data={products} />;
}
