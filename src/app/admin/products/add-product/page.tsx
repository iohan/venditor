"use client";

import ContainerBox from "../../_components/ContainerBox";
import InputText from "@/components/form/InputText";
import { redirect } from "next/navigation";
import {
  BookDashed,
  Check,
  CirclePlus,
  LayoutList,
  SquareX,
} from "lucide-react";
import Button from "@/components/button/Button";
import Image from "next/image";
import productMan from "@/images/product-man-beenie.webp";
import productBeenie1 from "@/images/product-beenie.webp";
import productBeenie2 from "@/images/product-beenie2.webp";
import Dropdown from "@/components/form/Dropdown";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import GeneralInfo from "./GeneralInfo";
import { submitNewProduct } from "./actions";

export default function AddProduct() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);

  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/api/auth/signin");
  }

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
      const formData = new FormData(evt.currentTarget);

      const response = await submitNewProduct(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      if (evt.currentTarget) {
        evt.currentTarget.reset();
      }
    }
  };

  if (session.status === "loading") {
    return <>...Loading</>;
  }

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
          <GeneralInfo />
          <ContainerBox>
            <div className="font-semibold text-lg mb-2">Pricing and stock</div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="base_price"
                label="Base pricing"
                placeholder="Base pricing"
              />
              <InputText name="stock" label="Stock" placeholder="Stock" />
            </div>
            <div className="flex gap-3 basis-full">
              <InputText
                name="discount"
                label="Discount"
                placeholder="Discount"
              />
              <InputText name="sku" label="SKU" placeholder="SKU" />
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
          <ContainerBox>
            <div className="font-semibold text-lg">Category</div>
            <Dropdown
              options={[
                { label: "Beenies", value: "beenies" },
                { label: "Hats", value: "hats" },
                { label: "Cap", value: "cap" },
                { label: "Stetson", value: "stetson" },
                { label: "Test", value: "test" },
              ]}
              onChange={(val) => console.log("Select: ", val)}
            />
            <div className="flex text-sm gap-2">
              <div className="flex items-center gap-x-1 hover:underline cursor-pointer">
                <span>Beenies</span>
                <SquareX className="text-amber-700" size={13} />
              </div>
              <div className="flex items-center gap-x-1 hover:underline cursor-pointer">
                <span>Hats</span>
                <SquareX className="text-amber-700" size={13} />
              </div>
              <div className="flex items-center gap-x-1 hover:underline cursor-pointer">
                <span>Category</span>
                <SquareX className="text-amber-700" size={13} />
              </div>
              <div className="flex items-center gap-x-1 hover:underline cursor-pointer">
                <span>Test</span>
                <SquareX className="text-amber-700" size={13} />
              </div>
            </div>
            <InputText name="category_name" placeholder="Category name" />
            <Button primary onClick={() => console.log("Add category")}>
              Add new Category
            </Button>
          </ContainerBox>
        </div>
      </div>
    </form>
  );
}
