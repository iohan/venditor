import ViewOrder from "./ViewOrder";

const ViewOrderRoute = async (params: Promise<{ orderId: string }>) => {
  const orderId = (await params).orderId;

  return <ViewOrder />;
};

export default ViewOrderRoute;
