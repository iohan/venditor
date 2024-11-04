"use server";

export interface OrderInput {
  shopId: number;
  delivery: {
    email: string;
  };
  shipping: {
    title: string;
    price: string; // Calculated, basePrice * exchangerate
  };
  products: {
    productId: number;
    title: string;
    amount: number;
    media: string;
    price: number; // Calculated, basePrice * exchangerate
  }[];
}
