import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getProducts } from "@/app/admin/data-layer/product";
import { ProductTable } from "./ProductTable";
import { columns } from "./table-columns";
import Page from "../_components/Page";

export default async function Products() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const products = await getProducts({ shopId: 1 });

  return (
    <Page breadcrumb={{ currentPage: "Products" }}>
      <ProductTable columns={columns} data={products} />
    </Page>
  );
}
