import Link from "next/link";

export default function Shop() {
  return (
    <>
      Shop frontpage. Product:{" "}
      <Link href="/shop/product/yellow-beenie">Yellow beenie</Link>
    </>
  );
}
