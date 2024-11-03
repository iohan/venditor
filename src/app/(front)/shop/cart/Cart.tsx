"use client";
import QuantitySelector from "@/components/quantity-selector/QuantitySelector";
import CartTable from "./CartTable";
import { CartProduct } from "./page";
import { useEffect, useState } from "react";

const Cart = ({ products }: { products: CartProduct[] }) => {
  const [quantity, setQuantity] = useState(46);

  useEffect(() => {
    console.log("Quantity outside", quantity);
  }, [quantity]);

  return (
    <div className="container flex">
      <div className="basis-1/2">
        <CartTable products={products} />
      </div>
      <div className="basis-1/2">
        <QuantitySelector
          quantity={quantity}
          onChange={(qty) => setQuantity(qty)}
        />
      </div>
    </div>
  );
};

export default Cart;
