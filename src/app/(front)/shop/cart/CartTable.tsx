"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import QuantitySelector from "@/components/quantity-selector/QuantitySelector";
import { useEffect, useState } from "react";
import Image from "next/image";
import useCartStore, { ProductStore } from "@/stores/cart-store";
import Link from "next/link";

const CartTable = ({ products }: { products: ProductStore[] }) => {
  const [selected, setSelected] = useState<{ id: number; checked: boolean }[]>(
    [],
  );

  const toggleAll = (checked: boolean) => {
    setSelected((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const toggleSelection = (id: number, checked: boolean) => {
    setSelected((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  const tableFields: Fields<ProductStore> = {
    selection: {
      title: (
        <div className="pl-2">
          <input
            type="checkbox"
            checked={selected.length > 0 && selected.every((s) => s.checked)}
            onChange={(evt) => toggleAll(evt.currentTarget.checked)}
          />
        </div>
      ),
      width: "w-10",
      presentation: ({ data }) => {
        const checked = selected.find((s) => s.id === data.id)?.checked;
        return (
          <div className="pl-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleSelection(data.id, !checked)}
            />
          </div>
        );
      },
    },
    image: {
      title: "Product",
      presentation: ({ data }) => (
        <Link href={`/shop/product/${data.sku}`}>
          <div className="flex gap-5 group">
            <Image
              src={data.mediaUrl}
              width={60}
              height={60}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-400 uppercase">{data.sku}</div>
              <div className="group-hover:underline">{data.title}</div>
            </div>
          </div>
        </Link>
      ),
    },
    basePrice: {
      title: "Price",
      width: "w-16",
      center: true,
      presentation: ({ data }) => (
        <>{data.basePrice ? `${data.basePrice}kr` : "Gratis"}</>
      ),
    },
    amount: {
      title: "Amount",
      width: "w-[200px]",
      center: true,
      presentation: ({ data }) => (
        <QuantitySelector
          quantity={data.amount}
          onChange={(qty) =>
            useCartStore.setState((state) => {
              state.products[data.id].amount = qty;
            })
          }
        />
      ),
    },
    total: {
      title: "Total",
      width: "w-24",
      center: true,
      presentation: ({ data }) => <>{(data.basePrice ?? 0) * data.amount}kr</>,
    },
  };

  useEffect(() => {
    if (products) {
      setSelected(products.map((p) => ({ id: p.id, checked: false })));
    }
  }, [products]);

  return <Table data={products} fields={tableFields} />;
};

export default CartTable;
