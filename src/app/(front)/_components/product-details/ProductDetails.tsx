"use client";

import { MoveLeft } from "lucide-react";
import { ProductType } from "../../data-layer/product";
import Image from "next/image";
import { cx } from "@/utils/cx";
import InputText from "@/components/form/InputText";
import { useState } from "react";
import { numberOnly } from "@/utils/number-only";
import Button from "@/components/button/Button";
import useCartStore from "@/stores/cart-store";

const ProductDetails = ({ product }: { product?: ProductType }) => {
  const [amount, setAmount] = useState<number | undefined>(1);
  const addProductToCart = useCartStore((state) => state.addProduct);

  if (!product) {
    return <>Not found</>;
  }

  return (
    <div>
      <div className="flex gap-2 text-gray-400 items-center mb-5">
        <MoveLeft size={20} />
        <div className="text-sm font-dmSans">Back to search product</div>
      </div>
      <h1 className="text-3xl mb-3">{product.title}</h1>
      <div className="flex gap-8">
        <div className="basis-3/5 flex gap-2 h-96 overflow-hidden rounded-xl">
          <div className={cx("bg-green-200 relative basis-full")}>
            {product.mediaFiles[0] && (
              <Image
                src={product.mediaFiles[0].url}
                alt=""
                width={450}
                height={450}
                className="absolute inset-0 object-cover w-full h-full"
              />
            )}
          </div>
          {product.mediaFiles.length > 1 && (
            <div className="basis-1/3 flex flex-col gap-2">
              {product.mediaFiles[1] && (
                <div className="h-full relative">
                  <Image
                    src={product.mediaFiles[1].url}
                    alt=""
                    width={450}
                    height={450}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              )}
              {product.mediaFiles[2] && (
                <div className="h-full relative">
                  <Image
                    src={product.mediaFiles[2].url}
                    alt=""
                    width={450}
                    height={450}
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="basis-2/5">
          <div className="text-xl mb-2">Description</div>
          <div className="text-sm font-dmSans">{product.description}</div>
          <div className="mt-5 text-3xl text-semibold font-dmSans">
            {product.basePrice}kr
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <InputText
              name="amount"
              value={amount}
              onChange={(value) => setAmount(numberOnly(value))}
            />
            <Button
              primary
              onClick={() =>
                amount !== undefined &&
                addProductToCart({
                  id: product.id,
                  amount,
                  title: product.title,
                  mediaUrl: product.mediaFiles[0].url,
                  sku: product.sku,
                  basePrice: product.basePrice ?? 0,
                })
              }
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
