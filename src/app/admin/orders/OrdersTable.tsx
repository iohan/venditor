"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import ContainerBox from "../_components/ContainerBox";
import { LayoutList } from "lucide-react";
import { Order } from "../data-layer/order";
import prettifyDateTime from "@/utils/prettify-date-time";

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const tableFields: Fields<Order> = {
    orderNumber: {
      title: <div className="pl-2">#</div>,
      width: "w-10",
      presentation: ({ data }) => (
        <div className="pl-2">{data.orderNumber}</div>
      ),
    },
    created: {
      title: "Created",
      presentation: ({ data }) => <>{prettifyDateTime(data.created, true)}</>,
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
