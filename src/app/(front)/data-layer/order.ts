"use server";

export interface DeliveryInformation {
  name?: string;
  email?: string;
  mobileNumber?: string;
  country?: string;
}

export interface Shipping {
  title?: string;
  price?: number; // Calculated, basePrice * exchangerate
}

export interface OrderInput {
  shopId: number;
  delivery: DeliveryInformation;
  shipping: Shipping;
  products: {
    productId: number;
    title: string;
    sku: string;
    amount: number;
    media: string;
    price: number; // Calculated, basePrice * exchangerate
  }[];
}
