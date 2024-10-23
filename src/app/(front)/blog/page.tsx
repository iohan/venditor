import Link from "next/link";

export default function Blog() {
  return (
    <>
      Blog frontpage. Blogpost:{" "}
      <Link href="/blog/keep-your-head-cool">Keep your head cool</Link>
      <div>
        <Link href="/blog/archive">Archive</Link>
      </div>
    </>
  );
}
