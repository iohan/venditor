import Link from "next/link";

export default function Category({ params }: { params: { category: string } }) {
  return (
    <>
      Category page: {params.category}. Product:{" "}
      <Link href="/shop/product/yellow-beenie">Yellow beenie</Link>
    </>
  );
}
