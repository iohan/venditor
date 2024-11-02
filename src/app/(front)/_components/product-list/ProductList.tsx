"use client";
import { ProductType } from "../../data-layer/product";
import ProductCard from "../product-card/ProductCard";

const ProductList = ({ products }: { products: ProductType[] }) => {
  console.log("List", products);
  return (
    <div className="mt-10 grid grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
