"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import { Product } from "@prisma/client";
import ContainerBox from "../_components/ContainerBox";
import { Check, LayoutList, Trash2 } from "lucide-react";
import Button from "@/components/button/Button";
import { useEffect, useState } from "react";
import { deleteProducts } from "@/app/admin/data-layer/product";
import Link from "next/link";

const ProductTable = ({ products }: { products: Product[] }) => {
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

  const handleDeleteProducts = async () => {
    await deleteProducts({
      shopId: 1,
      productIds: selected.map((s) => s.id),
    });
  };

  const tableFields: Fields<Product> = {
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
    title: {
      title: "Product",
      presentation: ({ data }) => (
        <Link href={`products/edit-product/${data.id}`}>{data.title}</Link>
      ),
    },
    draft: {
      title: "SKU",
    },
    shopId: {
      title: "Price",
      width: "w-16",
      center: true,
    },
    total: {
      title: "Total",
      width: "w-16",
      center: true,
      presentation: ({ data }) => <>{data.shopId * 10}</>,
    },
  };

  useEffect(() => {
    if (products) {
      setSelected(products.map((p) => ({ id: p.id, checked: false })));
    }
  }, [products]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <LayoutList size={20} className="text-amber-700/75" />
          <div className="text-xl font-semibold">Products</div>
        </div>
        <div className="flex gap-3">
          {selected.some((s) => s.checked) && (
            <Button primary icon={Trash2} onClick={handleDeleteProducts}>
              Delete
            </Button>
          )}
          <Button primary icon={Check} href={"products/add-product"}>
            Add Product
          </Button>
        </div>
      </div>
      <ContainerBox>
        <Table data={products} fields={tableFields} />
      </ContainerBox>
    </div>
  );
};

export default ProductTable;
