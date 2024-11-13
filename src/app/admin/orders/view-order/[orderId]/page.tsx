import Page from "@/app/admin/_components/Page";
import ViewOrder from "./ViewOrder";

const ViewOrderRoute = async (params: Promise<{ orderId: string }>) => {
  const orderId = (await params).orderId;

  return (
    <Page
      breadcrumb={{
        currentPage: "View order",
        tree: [{ title: "Orders", href: "/admin/orders" }],
      }}
    >
      <ViewOrder />
    </Page>
  );
};

export default ViewOrderRoute;
