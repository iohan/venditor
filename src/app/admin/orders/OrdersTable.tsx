"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import ContainerBox from "../_components/ContainerBox";
import { LayoutList } from "lucide-react";
import { Order } from "../data-layer/order";
import prettifyDateTime from "@/utils/prettify-date-time";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const tableFields: Fields<Order> = {
    selection: {
      title: (
        <div className="pl-2">
          <input type="checkbox" />
        </div>
      ),
      width: "w-10",
      presentation: () => (
        <div className="pl-2">
          <input type="checkbox" />
        </div>
      ),
    },
    orderNumber: {
      title: <div className="pl-2">Order</div>,
      width: "w-20",
      presentation: ({ data }) => (
        <div className="pl-2">#{data.orderNumber}</div>
      ),
    },
    created: {
      title: "Date",
      presentation: ({ data }) => (
        <Link href={`/admin/orders/view-order/${data.id}`}>
          {prettifyDateTime(data.created, {
            showTime: false,
            showCurrentYear: true,
          })}
        </Link>
      ),
    },
    customer: {
      title: "Customer",
    },
    payment: {
      title: "Payment",
      presentation: () => <Badge variant={"completed"}>Success</Badge>,
    },
    totalPrice: {
      title: "Total",
      presentation: ({ data }) => <>{data.totalPrice}kr</>,
    },
    itemCount: {
      title: "Items",
      presentation: ({ data }) => (
        <>
          {data.itemCount} item{data.itemCount > 1 && "s"}
        </>
      ),
    },
    orderStatus: {
      title: "Order status",
      presentation: () => <Badge variant={"pending"}>In process</Badge>,
    },
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <LayoutList size={20} className="text-amber-700/75" />
          <div className="text-xl font-semibold">Orders</div>
        </div>
      </div>
      <ContainerBox>
        <Table data={orders} fields={tableFields} />
      </ContainerBox>
    </div>
  );
};

export default OrdersTable;
