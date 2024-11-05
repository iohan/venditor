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
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  management: [
    {
      title: "Products",
      url: "#",
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
      url: "#",
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
