"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import { Product } from "@prisma/client";
import ContainerBox from "../_components/ContainerBox";
import { Check, LayoutList } from "lucide-react";
import Button from "@/components/button/Button";

const tableFields: Fields<Product> = {
  title: {
    title: "Product",
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

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <LayoutList size={20} className="text-amber-700/75" />
          <div className="text-xl font-semibold">Products</div>
        </div>
        <div className="flex gap-3">
          <Button primary icon={Check} href={"products/add-product"}>
            Add Product
          </Button>
        </div>
      </div>
      <ContainerBox>
        <Table
          data={products}
          fields={tableFields}
          onClick={() => {
            console.log("Hello");
          }}
        />
      </ContainerBox>
    </div>
  );
};

export default ProductTable;
