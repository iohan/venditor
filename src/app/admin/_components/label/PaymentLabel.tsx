import { match } from "ts-pattern";
import Label from "./Label";

const PaymentLabel = ({
  type,
}: {
  type: "pending" | "success" | "declined";
}) => {
  const label = match(type)
    .with("pending", () => ({
      name: "Pending",
      color: "#f4bb87",
    }))
    .with("success", () => ({ name: "Success", color: "#3ea13d" }))
    .with("declined", () => ({
      name: "Declined",
      color: "#d42c6a",
    }))
    .exhaustive();

  return <Label color={label.color} name={label.name} />;
};

export default PaymentLabel;
