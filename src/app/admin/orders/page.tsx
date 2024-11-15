import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { getOrders, Order } from "@/app/admin/data-layer/order";
import Page from "../_components/Page";
import { DataTable } from "../_components/DataTable";
import { columns } from "./table-columns";

export default async function OrdersRoute() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders: Order[] = await getOrders({ shopId: 1 });

  return (
    <Page breadcrumb={{ currentPage: "Orders" }}>
      <DataTable columns={columns} data={orders} />
    </Page>
  );
}
