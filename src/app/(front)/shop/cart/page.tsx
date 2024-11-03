"use client";
import useCartStore from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { getProducts, ProductType } from "../../data-layer/product";
import Cart from "./Cart";

export type CartProduct = ProductType & { amount: number };

export default function CartRoute() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const productsInCart = useCartStore((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts({
        shopId: 1,
        productIds: Object.values(productsInCart).map((p) => p.id),
      });

      const updatedProducts = products.map((product) => ({
        ...product,
        amount: productsInCart[product.id].amount,
      }));

      setCart(updatedProducts);
    };

    if (Object.values(productsInCart).length > 0) {
      fetchProducts();
    }
  }, [productsInCart]);

  return <Cart products={cart} />;
}
