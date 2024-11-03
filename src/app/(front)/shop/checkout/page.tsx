import { getShippingAlternatives } from "../../data-layer/shipping";
import Checkout from "./Checkout";

export default async function CheckoutRoute() {
  const shippingAlternatives = await getShippingAlternatives({ shopId: 1 }); // TODO: Change to dynamic shopid

  return <Checkout shippingAlternatives={shippingAlternatives} />;
}
