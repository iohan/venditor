"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import ContainerBox from "../_components/ContainerBox";
import { LayoutList } from "lucide-react";
import { Order } from "../data-layer/order";
import prettifyDateTime from "@/utils/prettify-date-time";
import Link from "next/link";
import PaymentLabel from "../_components/label/PaymentLabel";
import OrderStatusLabel from "../_components/label/OrderStatusLabel";

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const getRandomStatus = (statuses: string[]): string => {
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  };

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
      presentation: () => (
        <PaymentLabel
          type={getRandomStatus(["pending", "success", "declined"])}
        />
      ),
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
      presentation: () => (
        <OrderStatusLabel
          type={getRandomStatus(["canceled", "completed", "in-process"])}
        />
      ),
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
