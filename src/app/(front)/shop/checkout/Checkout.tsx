"use client";
import InputText from "@/components/form/InputText";
import { ReactNode } from "react";
import { ShippingAlternative } from "../../data-layer/shipping";
import ShippingSelector from "./ShippingSelector";

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
  return (
    <div className="container flex gap-5 mt-10">
      <div className="basis-3/5 flex flex-col gap-5">
        <Box label="Delivery information">
          <Row>
            <Col>
              <InputText label="Name" placeholder="Your name" name="name" />
            </Col>
            <Col>
              <InputText
                label="Mobile Number"
                placeholder="Your mobile number"
                value={`+46 7`}
                name="mobile"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputText label="Email" placeholder="Your email" name="email" />
            </Col>
            <Col>
              <InputText label="Country" placeholder="County" name="country" />
            </Col>
          </Row>
        </Box>

        <Box label="Shipping">
          <ShippingSelector alternatives={shippingAlternatives} />
        </Box>

        <div>Payments</div>
      </div>
      <div className="basis-2/5">List products</div>
    </div>
  );
};

export default Checkout;
