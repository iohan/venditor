"use client";
import Table from "@/components/table/Table";
import { Fields } from "@/components/table/types";
import { Product } from "@prisma/client";
import ContainerBox from "../_components/ContainerBox";
import { Check, LayoutList, Trash2 } from "lucide-react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProducts } from "@/data-layer/product";

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
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleDeleteProducts = async () => {
    await deleteProducts({
      shopId: 1,
      productIds: selectedProducts.map((s) => s.id),
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <LayoutList size={20} className="text-amber-700/75" />
          <div className="text-xl font-semibold">Products</div>
        </div>
        <div className="flex gap-3">
          {selectedProducts.length > 0 && (
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
        <Table
          data={products}
          fields={tableFields}
          onSelected={(selectedProducts) =>
            setSelectedProducts(selectedProducts)
          }
          onClick={(item) => {
            router.push(`products/edit-product/${item.id}`);
          }}
        />
      </ContainerBox>
    </div>
  );
};

export default ProductTable;
