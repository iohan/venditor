"use client";
import CartTable from "./CartTable";
import { CartProduct } from "./page";

const Cart = ({ products }: { products: CartProduct[] }) => {
  return (
    <div className="container mt-10">
      <CartTable products={products} />
    </div>
  );
};

export default Cart;
