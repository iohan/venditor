import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getProducts } from "@/app/admin/data-layer/product";
import { columns } from "./table-columns";
import Page from "../_components/Page";
import { DataTable } from "../_components/DataTable";

export default async function Products() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const products = await getProducts({ shopId: 1 });

  return (
    <Page breadcrumb={{ currentPage: "Products" }}>
      <DataTable columns={columns} data={products} />
    </Page>
  );
}
