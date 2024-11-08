"use client";

import { Category } from "@prisma/client";
import { FormEvent, useEffect, useRef, useState } from "react";
import GeneralInfo from "./GeneralInfo";
import ContainerBox from "../../_components/ContainerBox";
import InputText from "@/components/form/InputText";
import SelectCategory from "./SelectCategory";
import { generateSlug } from "@/utils/slug";
import { numberOnly } from "@/utils/number-only";
import FileUpload from "./FileUpload";
import { ProductType } from "@/app/admin/data-layer/product";
import Header from "./Header";

const initialProduct: ProductType = {
  title: "",
  draft: true,
  description: undefined,
  stock: undefined,
  basePrice: undefined,
  discount: undefined,
  sku: "",
  shopId: 1,
  selectedCategories: [],
  mediaFiles: [],
};

const ProductForm = ({
  product,
  action,
  categories,
  type,
}: {
  product?: ProductType;
  action: (
    productData: ProductType,
    uploadedMedia: FormData,
  ) => Promise<unknown>;
  categories: Category[];
  type: "add" | "edit";
}) => {
  const [changesMade, setChangesMade] = useState<boolean>(type == "add");
  const [productData, setProductData] = useState<ProductType>(
    product ?? initialProduct,
  );

  const initialProductRef = useRef<ProductType>(product ?? initialProduct);
  const initialMediaFilesRef = useRef<File[]>([]);

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
    if (!changesMade) {
      const productDataChanged =
        JSON.stringify(productData) !==
        JSON.stringify(initialProductRef.current);

      const mediaFilesChanged =
        JSON.stringify(uploadedMediaFiles) !==
        JSON.stringify(initialMediaFilesRef.current);

      setChangesMade(productDataChanged || mediaFilesChanged);
    }
  }, [productData, changesMade, uploadedMediaFiles]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Header type={type} draft={productData.draft} changesMade={changesMade} />
      <div className="flex gap-5">
        <div className="basis-2/3 flex flex-col gap-5">
          <GeneralInfo product={productData} setProduct={setProductData} />
          <ContainerBox>
            <div className="font-semibold text-lg mb-2">Pricing and stock</div>
            <div className="flex gap-3 basis-full">
              <InputText
                label="Base pricing"
                onChange={(val) =>
                  setProductData({ ...productData, basePrice: numberOnly(val) })
                }
                value={productData.basePrice ?? ""}
                placeholder="Base pricing"
              />
              <InputText
                label="Stock"
                placeholder="Stock"
                onChange={(val) =>
                  setProductData({ ...productData, stock: numberOnly(val) })
                }
                value={productData.stock ?? ""}
              />
            </div>
            <div className="flex gap-3 basis-full">
              <InputText
                label="Discount"
                onChange={(val) =>
                  setProductData({ ...productData, discount: numberOnly(val) })
                }
                value={productData.discount ?? ""}
                placeholder="Discount"
              />
              <InputText
                onChange={(val) =>
                  setProductData({
                    ...productData,
                    sku: generateSlug(String(val)),
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
