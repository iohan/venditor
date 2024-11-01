"use client";

import { Category, Product } from "@prisma/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { submitNewProduct } from "./actions";
import { BookDashed, Check, CirclePlus, LayoutList } from "lucide-react";
import Button from "@/components/button/Button";
import GeneralInfo from "./GeneralInfo";
import ContainerBox from "../../_components/ContainerBox";
import InputText from "@/components/form/InputText";
import Image from "next/image";
import productMan from "@/images/product-man-beenie.webp";
import productBeenie1 from "@/images/product-beenie.webp";
import productBeenie2 from "@/images/product-beenie2.webp";
import SelectCategory from "./SelectCategory";
import { generateSku } from "@/utils/sku";
import { numberOnly } from "@/utils/number-only";
import FileUpload from "./FileUpload";

export type SelectedCategory = { id?: number; title: string };
export type NewProduct = Omit<Product, "id"> & {
  selectedCategories: SelectedCategory[];
} & { media?: File };

const AddProductForm = ({ categories }: { categories: Category[] }) => {
  const [media, setMedia] = useState<File | undefined>(undefined);
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<NewProduct>({
    title: "",
    draft: true,
    description: null,
    stock: null,
    basePrice: null,
    discount: null,
    sku: "",
    shopId: 1,
    selectedCategories: [],
    media: undefined,
  });

  const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    try {
      const response = await submitNewProduct(product);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      if (evt.currentTarget) {
        evt.currentTarget.reset();
      }
    }
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <LayoutList size={20} className="text-amber-700/75" />
          <div className="text-xl font-semibold">Add new product</div>
        </div>
        <div className="flex gap-3">
          <Button
            secondary
            icon={BookDashed}
            onClick={() => console.log("Save draft")}
          >
            Save Draft
          </Button>
          <Button primary icon={Check} type="submit">
            Add Product
          </Button>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="basis-2/3 flex flex-col gap-5">
          <GeneralInfo product={product} setProduct={setProduct} />
          <ContainerBox>
            <div className="font-semibold text-lg mb-2">Pricing and stock</div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="base_price"
                label="Base pricing"
                onChange={(val) =>
                  setProduct({ ...product, basePrice: numberOnly(val) })
                }
                value={product.basePrice ?? undefined}
                placeholder="Base pricing"
              />
              <InputText
                name="stock"
                label="Stock"
                placeholder="Stock"
                onChange={(val) =>
                  setProduct({ ...product, stock: numberOnly(val) })
                }
                value={product.stock ?? undefined}
              />
            </div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="discount"
                label="Discount"
                onChange={(val) =>
                  setProduct({ ...product, discount: numberOnly(val) })
                }
                value={product.discount ?? undefined}
                placeholder="Discount"
              />
              <InputText
                name="sku"
                onChange={(val) =>
                  setProduct({ ...product, sku: generateSku(String(val)) })
                }
                label="SKU"
                value={product.sku}
                placeholder="SKU"
              />
            </div>
          </ContainerBox>
        </div>
        <div className="basis-1/3 flex flex-col gap-5">
          <FileUpload />
          <SelectCategory
            categories={categories}
            product={product}
            setProduct={setProduct}
          />
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
