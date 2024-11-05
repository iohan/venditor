import {
  LifeBuoy,
  ListChecks,
  Paintbrush,
  PieChart,
  ScanBarcode,
  Send,
  Settings2,
} from "lucide-react";

export const sidebarData = {
  management: [
    {
      title: "Products",
      url: "/products",
      icon: ScanBarcode,
      isActive: true,
      items: [
        {
          title: "Inventory",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ListChecks,
      items: [
        {
          title: "Invoices",
          url: "#",
        },
      ],
    },
  ],
  store: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Shipping",
          url: "#",
        },
        {
          title: "Payments",
          url: "#",
        },
      ],
    },
    {
      title: "Theme",
      url: "#",
      icon: Paintbrush,
      items: [],
    },

    {
      title: "Analytics",
      url: "#",
      icon: PieChart,
      items: [],
    },
  ],
  helper: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
