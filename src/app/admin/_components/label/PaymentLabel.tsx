import { match } from "ts-pattern";
import Label from "./Label";

const PaymentLabel = ({ type }: { type: string }) => {
  const label = match(type)
    .with("pending", () => ({
      name: "Pending",
      color: "#f4bb87",
    }))
    .with("paymen-pending", () => ({
      name: "Payment pending",
      color: "#f4bb87",
    }))
    .with("success", () => ({ name: "Success", color: "#3ea13d" }))
    .with("declined", () => ({
      name: "Declined",
      color: "#d42c6a",
    }))
    .otherwise(() => ({ name: "Unknown", color: "#000000" }));

  return <Label color={label.color} name={label.name} />;
};

export default PaymentLabel;
