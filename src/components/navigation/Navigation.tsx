"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Navigation = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const inAdminSection = pathname.startsWith("/admin");

  if (inAdminSection) {
    return (
      <div>
        <div>
          <Link href="/admin/sign-in">Sign in</Link>
          <Link href="/admin/sign-up">Sign up</Link>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/blog">Blog</Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Navigation;
