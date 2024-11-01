"use client";

import { Category } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { BookDashed, Check, LayoutList } from "lucide-react";
import Button from "@/components/button/Button";
import GeneralInfo from "./GeneralInfo";
import ContainerBox from "../../_components/ContainerBox";
import InputText from "@/components/form/InputText";
import SelectCategory from "./SelectCategory";
import { generateSku } from "@/utils/sku";
import { numberOnly } from "@/utils/number-only";
import FileUpload from "./FileUpload";
import { ProductType } from "@/data-layer/product";

const initialProduct: ProductType = {
  title: "",
  draft: true,
  description: null,
  stock: null,
  basePrice: null,
  discount: null,
  sku: "",
  shopId: 1,
  selectedCategories: [],
  mediaFiles: [],
};

const ProductForm = ({
  product,
  action,
  categories,
}: {
  product?: ProductType;
  action: (
    productData: ProductType,
    uploadedMedia: FormData,
  ) => Promise<unknown>;
  categories: Category[];
}) => {
  const [productData, setProductData] = useState<ProductType>(
    product ?? initialProduct,
  );

  const [uploadedMediaFiles, setUploadedMediaFiles] = useState<File[]>([]);

  const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const uploadedMedia = new FormData();

    uploadedMediaFiles.forEach((mediaFile) => {
      uploadedMedia.append("mediaFiles", mediaFile, mediaFile.name);
    });

    try {
      const response = await action(productData, uploadedMedia);
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
    console.log(productData);
  }, [productData]);

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
          <GeneralInfo product={productData} setProduct={setProductData} />
          <ContainerBox>
            <div className="font-semibold text-lg mb-2">Pricing and stock</div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="base_price"
                label="Base pricing"
                onChange={(val) =>
                  setProductData({ ...productData, basePrice: numberOnly(val) })
                }
                value={productData.basePrice ?? undefined}
                placeholder="Base pricing"
              />
              <InputText
                name="stock"
                label="Stock"
                placeholder="Stock"
                onChange={(val) =>
                  setProductData({ ...productData, stock: numberOnly(val) })
                }
                value={productData.stock ?? undefined}
              />
            </div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="discount"
                label="Discount"
                onChange={(val) =>
                  setProductData({ ...productData, discount: numberOnly(val) })
                }
                value={productData.discount ?? undefined}
                placeholder="Discount"
              />
              <InputText
                name="sku"
                onChange={(val) =>
                  setProductData({
                    ...productData,
                    sku: generateSku(String(val)),
                  })
                }
                label="SKU"
                value={productData.sku}
                placeholder="SKU"
              />
            </div>
          </ContainerBox>
        </div>
        <div className="basis-1/3 flex flex-col gap-5">
          <FileUpload
            product={productData}
            setProduct={setProductData}
            uploadedMediaFiles={uploadedMediaFiles}
            setUploadedMediaFiles={setUploadedMediaFiles}
          />
          <SelectCategory
            categories={categories}
            product={productData}
            setProduct={setProductData}
          />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
