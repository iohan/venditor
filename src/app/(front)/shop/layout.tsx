import SubNavigation from "@/components/sub-navigation/SubNavigation";
import { getCategories } from "../data-layer/category";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories(1); // TODO: Dynamic shopId

  return (
    <div>
      <SubNavigation
        nav={{
          base: "/shop/category/",
          item: categories.map((c) => ({ href: c.slug, title: c.title })),
        }}
      />
      {children}
    </div>
  );
}
