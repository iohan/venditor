import SubNavigation from "@/components/sub-navigation/SubNavigation";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SubNavigation
        nav={{
          base: "/shop/category/",
          item: [
            {
              href: "beenies",
              title: "Beenies",
            },
            {
              href: "hats",
              title: "Hats",
            },
          ],
        }}
      />
      {children}
    </div>
  );
}
