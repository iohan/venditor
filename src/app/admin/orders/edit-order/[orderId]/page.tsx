import OrderForm from "./OrderForm";

const EditOrderRoute = async (params: Promise<{ orderId: string }>) => {
  const orderId = (await params).orderId;

  return <OrderForm />;
};

export default EditOrderRoute;
