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

export type SelectedCategory = { id?: number; title: string };
export type NewProduct = Omit<Product, "id"> & {
  selectedCategories: SelectedCategory[];
} & { media?: File };

const AddProductForm = ({ categories }: { categories: Category[] }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
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

  const handleImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    setFile(uploadedFile);

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    if (uploadedFile) {
      setFileUrl(URL.createObjectURL(uploadedFile));
    } else {
      setFileUrl(undefined);
    }
  };

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
          <ContainerBox>
            <div className="font-semibold text-lg">Upload Img</div>
            <input
              type="file"
              name="media"
              accept="image/jpeg,image/png, image/webp, image/gif, video/mp4, video/webm"
              onChange={handleImageOnChange}
            />
            {fileUrl && file && (
              <div className="flex-grow relative h-[300px] rounded-lg overflow-hidden">
                <img
                  src={fileUrl}
                  alt="Picture of the author"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex gap-2">
              <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
                <Image
                  src={productMan}
                  alt="Picture of the author"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
              <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
                <Image
                  src={productBeenie1}
                  alt="Picture of the author"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
              <div className="flex-grow relative basis-1/4 aspect-square rounded-lg overflow-hidden">
                <Image
                  src={productBeenie2}
                  alt="Picture of the author"
                  className="absolute inset-0 object-cover w-full h-full"
                />
              </div>
              <div className="border cursor-pointer hover:border-red-200 flex justify-center items-center border-2 border-dashed basis-1/4 aspect-square rounded-lg overflow-hidden">
                <CirclePlus className="text-amber-700" />
              </div>
            </div>
          </ContainerBox>
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
