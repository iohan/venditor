"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { deleteProducts } from "../data-layer/product";
import ContextActions from "./ContextActions";

export const columns: ColumnDef<Product>[] = [
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
  },
  {
    accessorKey: "title",
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
          <div className="text-md font-semibold">{product.title}</div>
          <div className="text-sm text-gray-500">{product.sku}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("basePrice"));
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
  {
    id: "actions",
    header: () => <div className="w-8"></div>,
    cell: ({ row }) => {
      const product = row.original;
      return <ContextActions productId={product.id} />;
    },
  },
];
