"use client";

import { useAuth } from "@/hooks/useAuth";
import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const inAdminSection = pathname.startsWith("/admin");

  if (inAdminSection) {
    return false;
  }

  return (
    <div className="bg-red-100 font-dmSans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5 gap-x-7 text-stone-800">
        <div className="w-full text-xl font-bold text-amber-700">.venditor</div>
        <div className="font-bold flex gap-x-3">
          <Link href="/" className="hover:text-amber-800 hover:underline">
            Home
          </Link>
          <Link href="/shop" className="hover:text-amber-800 hover:underline">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-amber-800 hover:underline">
            Blog
          </Link>
        </div>
        <div className="font-bold flex gap-x-2 items-center">
          <Link
            href="/admin"
            className="flex gap-x-1 word whitespace-nowrap border border-red-100 rounded-md py-1 px-2 hover:text-amber-800 hover:border-red-300"
          >
            <User />
            {!isAuthenticated && "Sign in"}
          </Link>
          <Link href="/shop" className="relative hover:text-amber-800">
            <ShoppingBasket />
            <div className="absolute -top-3 -right-2 text-xs rounded-full bg-green-200 w-4 h-4 text-green-800 text-center font-normal">
              5
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
