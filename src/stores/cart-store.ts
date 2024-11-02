import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  products: {},
  totalProducts: 0,
};

interface CartStore {
  products: Record<string, { id: number; amount: number }>;
  totalProducts: number;
  addProduct: (input: { id: number; amount: number }) => void;
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

              state.totalProducts = Object.values(state.products).reduce(
                (total, product) => total + product.amount,
                0,
              );
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
