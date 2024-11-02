import Image from "next/image";
import { ProductType } from "../../data-layer/product";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="p-4 bg-red-50 rounded-xl flex flex-col gap-2">
      <div className="rounded-xl overflow-hidden aspect-square relative">
        <Link href={`/shop/product/${product.sku}`}>
          <Image
            src={product.mediaFiles[0].url}
            alt=""
            width={300}
            height={300}
            className="absolute inset-0 object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="font-semibold uppercase">
          <Link
            href={`/shop/product/${product.sku}`}
            className="hover:text-amber-800 hover:underline"
          >
            {product.title}
          </Link>
        </div>
        <div>
          {product.basePrice === 0 || product.basePrice === undefined
            ? "Gratis"
            : `${product.basePrice}kr`}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
