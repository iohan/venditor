import Page from "@/app/admin/_components/Page";
import OrderForm from "./OrderForm";

const EditOrderRoute = async (params: Promise<{ orderId: string }>) => {
  const orderId = (await params).orderId;

  return (
    <Page
      breadcrumb={{
        currentPage: "Edit order",
        tree: [{ title: "Orders", href: "/admin/orders" }],
      }}
    >
      <OrderForm />
    </Page>
  );
};

export default EditOrderRoute;
