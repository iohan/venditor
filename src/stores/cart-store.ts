import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  products: {},
};

export interface ProductStore {
  id: number;
  basePrice: number;
  mediaUrl: string;
  title: string;
  sku: string;
  amount: number;
}

interface CartStore {
  products: Record<string, ProductStore>;
  addProduct: (input: ProductStore) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        addProduct: (input) =>
          set(
            (state) => {
              const product = state.products[String(input.id)];
              if (product) {
                if (input.amount > 0) {
                  product.amount = input.amount;
                } else {
                  delete state.products[String(input.id)];
                }
              } else {
                Object.assign(state.products, { [String(input.id)]: input });
              }
            },
            undefined,
            "cart/addProduct",
          ),
        clearCart: () =>
          set(
            (state) => {
              Object.assign(state, initialState);
            },
            undefined,
            "cart/clearCart",
          ),
      })),
      { name: "cart-store" },
    ),
    { name: "Cart" },
  ),
);

export default useCartStore;
