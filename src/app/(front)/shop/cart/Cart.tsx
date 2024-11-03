"use client";
import Button from "@/components/button/Button";
import CartTable from "./CartTable";
import useCartStore, { ProductStore } from "@/stores/cart-store";

const Cart = () => {
  const productsInCart = useCartStore((state) => state.products);
  const products: ProductStore[] = Object.values(productsInCart);

  return (
    <div className="container mt-10 flex flex-col gap-5">
      <CartTable products={products} />
      <div className="text-right">
        <Button primary href="/shop/checkout">
          Go to checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
