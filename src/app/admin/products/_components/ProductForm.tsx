"use client";

import { Category } from "@prisma/client";
import { FormEvent, useEffect, useRef, useState } from "react";
import GeneralInfo from "./GeneralInfo";
import SelectCategory from "./SelectCategory";
import FileUpload from "./FileUpload";
import { ProductType } from "@/app/admin/data-layer/product";
import Header from "./Header";
import PricingStock from "./PricingStock";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

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
    options?: { pathToRevalidate?: string },
  ) => Promise<unknown>;
  categories: Category[];
  type: "add" | "edit";
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [changesMade, setChangesMade] = useState<boolean>(type == "add");
  const [productData, setProductData] = useState<ProductType>(
    product ?? initialProduct,
  );
  const [submitInProgress, setSubmitInProgress] = useState(false);

  const initialProductRef = useRef<ProductType>(product ?? initialProduct);
  const initialMediaFilesRef = useRef<File[]>([]);

  const [uploadedMediaFiles, setUploadedMediaFiles] = useState<File[]>([]);

  const handleOnSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitInProgress(true);

    const uploadedMedia = new FormData();

    uploadedMediaFiles.forEach((mediaFile) => {
      uploadedMedia.append("mediaFiles", mediaFile, mediaFile.name);
    });

    try {
      await action(productData, uploadedMedia, {
        pathToRevalidate: "/admin/products",
      });
    } catch (error) {
      console.error(error);
    } finally {
      router.push("/admin/products");
      toast({
        description:
          type === "add"
            ? "Your product was successfully created!"
            : "Your product was successfully updated!",
        variant: "success",
      });
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
      <Header
        type={type}
        draft={productData.draft}
        changesMade={changesMade}
        state={{ changesMade, submitInProgress }}
      />
      <div className="flex gap-5">
        <div className="basis-2/3 flex flex-col gap-5">
          <GeneralInfo product={productData} setProduct={setProductData} />
          <PricingStock product={productData} setProduct={setProductData} />
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
