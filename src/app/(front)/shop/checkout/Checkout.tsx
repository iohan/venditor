"use client";
import InputText from "@/components/form/InputText";
import { ReactNode, useEffect, useState } from "react";
import { ShippingAlternative } from "../../data-layer/shipping";
import ShippingSelector from "./ShippingSelector";
import Button from "@/components/button/Button";
import {
  DeliveryInformation,
  OrderInput,
  Shipping,
} from "../../data-layer/order";
import useCartStore from "@/stores/cart-store";

const Box = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-lg">{label}</div>
      <div className="bg-gray-100 rounded-xl p-5 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};

const Row = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-3">{children}</div>;
};

const Col = ({ children }: { children: ReactNode }) => {
  return <div className="basis-1/2">{children}</div>;
};

const Checkout = ({
  shippingAlternatives,
}: {
  shippingAlternatives: ShippingAlternative[];
}) => {
  const products = useCartStore((state) => state.products);
  const [order, setOrder] = useState<OrderInput>();
  const [deliveryData, setDeliveryData] = useState<DeliveryInformation>({
    name: undefined,
    email: undefined,
    mobileNumber: undefined,
    country: undefined,
  });
  const [shippingData, setShippingData] = useState<Shipping>({
    title: undefined,
    price: undefined,
  });

  const handlePlaceOrder = () => {
    const prod = Object.values(products);
    setOrder({
      shopId: 1, // TODO: Change to dynamic shopId
      delivery: deliveryData,
      shipping: shippingData,
      products: prod.map((p) => ({
        productId: p.id,
        title: p.title,
        sku: p.sku,
        price: p.basePrice,
        amount: p.amount,
        media: p.mediaUrl,
      })),
    });
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="container flex gap-5 mt-10">
      <div className="basis-3/5 flex flex-col gap-5">
        <Box label="Delivery information">
          <Row>
            <Col>
              <InputText
                label="Name"
                placeholder="Your name"
                value={deliveryData.name ?? ""}
                onChange={(val) => {
                  setDeliveryData({ ...deliveryData, name: val });
                }}
              />
            </Col>
            <Col>
              <InputText
                label="Mobile Number"
                placeholder="Your mobile number"
                value={deliveryData.mobileNumber ?? ""}
                onChange={(val) => {
                  setDeliveryData({ ...deliveryData, mobileNumber: val });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputText
                label="Email"
                placeholder="Your email"
                value={deliveryData.email ?? ""}
                onChange={(val) => {
                  setDeliveryData({ ...deliveryData, email: val });
                }}
              />
            </Col>
            <Col>
              <InputText
                label="Country"
                placeholder="County"
                value={deliveryData.country ?? ""}
                onChange={(val) => {
                  setDeliveryData({ ...deliveryData, country: val });
                }}
              />
            </Col>
          </Row>
        </Box>

        <Box label="Shipping">
          <ShippingSelector
            setShippingData={setShippingData}
            alternatives={shippingAlternatives}
          />
        </Box>

        <div>Payments</div>
      </div>
      <div className="basis-2/5">
        List products
        <Button primary onClick={handlePlaceOrder}>
          Place order
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
