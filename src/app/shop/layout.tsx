import Link from "next/link";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <div>
        <Link href="/shop/category/beenies">Beenies</Link>
      </div>
      {children}
    </div>
  );
}
