"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Order } from "../data-layer/order";

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      headerClassName: "w-[40px]",
    },
  },
  {
    accessorKey: "orderNumber",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer hover:underline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product info
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link href={`/admin/products/edit-product/${product.id}`}>
          <div className="text-md font-semibold">{product.orderNumber}</div>
          <div className="text-sm text-gray-500">{product.id}</div>
        </Link>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("created"));
      const formatted =
        amount > 0
          ? new Intl.NumberFormat("sv-SE", {
              style: "currency",
              currency: "sek",
            }).format(amount)
          : "Gratis";

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
