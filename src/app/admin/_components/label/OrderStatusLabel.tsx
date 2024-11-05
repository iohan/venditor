import { match } from "ts-pattern";
import Label from "./Label";

const OrderStatusLabel = ({ type }: { type: string }) => {
  const label = match(type)
    .with("in-process", () => ({
      name: "In process",
      color: "#f4bb87",
    }))
    .with("completed", () => ({ name: "Completed", color: "#3ea13d" }))
    .with("canceled", () => ({
      name: "Canceled",
      color: "#d42c6a",
    }))
    .otherwise(() => ({ name: "Unknown", color: "#000000" }));

  return <Label color={label.color} name={label.name} />;
};

export default OrderStatusLabel;
