"use client";

import { cx } from "@/utils/cx";
import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/components/spinner/Spinner";
import useCartStore from "@/stores/cart-store";

const Navigation = ({ pathname }: { pathname: string }) => {
  const { status } = useSession();
  const productsInCart = useCartStore((state) => state.products);
  const totalProductsInCart = Object.values(productsInCart).reduce(
    (total, product) => total + product.amount,
    0,
  );

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/shop",
      label: "Shop",
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ];

  return (
    <div className="bg-red-100 font-dmSans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-5 gap-x-7 text-stone-800">
        <div className="w-full text-xl font-bold text-amber-700">.venditor</div>
        <div className="font-bold flex gap-x-3">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={cx(
                "hover:text-amber-800 hover:underline",
                pathname === link.href && "text-red-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="font-bold flex gap-x-2 items-center">
          {status === "loading" ? (
            <div className="py-1 px-2 border border-transparent">
              <Spinner />
            </div>
          ) : status === "authenticated" ? (
            <Link
              href={"/admin"}
              className="flex gap-x-1 word whitespace-nowrap border border-red-100 rounded-md py-1 px-2 hover:text-amber-800 hover:border-red-300"
            >
              <User />
            </Link>
          ) : (
            <button
              onClick={() => signIn("github", { redirectTo: "/admin" })}
              className="flex gap-x-1 word whitespace-nowrap border border-red-100 rounded-md py-1 px-2 hover:text-amber-800 hover:border-red-300"
            >
              <User />
              Sign in
            </button>
          )}
          <Link href="/shop/cart" className="relative hover:text-amber-800">
            <ShoppingBasket />
            <div className="animate-bounce-slow absolute -top-4 -right-3 flex items-center justify-center text-xs rounded-full bg-green-200 w-6 h-6 text-green-800 font-normal">
              {totalProductsInCart}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
