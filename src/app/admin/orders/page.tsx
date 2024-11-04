import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import OrdersTable from "./OrdersTable";
import { getOrders } from "@/app/admin/data-layer/order";

export default async function OrdersRoute() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await getOrders({ shopId: 1 });

  return <OrdersTable orders={orders} />;
}
