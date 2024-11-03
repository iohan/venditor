"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import { useRouter } from "next/navigation";
import { CartProduct } from "./page";

const tableFields: Fields<CartProduct> = {
  title: {
    title: "Product",
  },
  amount: {
    title: "Amount",
  },
  basePrice: {
    title: "Price",
    width: "w-16",
    center: true,
    presentation: ({ data }) => (
      <>{data.basePrice ? `${data.basePrice}kr` : "Gratis"}</>
    ),
  },
  total: {
    title: "Total",
    width: "w-24",
    center: true,
    presentation: ({ data }) => <>{(data.basePrice ?? 0) * data.amount}kr</>,
  },
};

const CartTable = ({ products }: { products: CartProduct[] }) => {
  const router = useRouter();

  return (
    <Table
      data={products}
      fields={tableFields}
      onClick={(item) => {
        router.push(`products/edit-product/${item.id}`);
      }}
    />
  );
};

export default CartTable;
