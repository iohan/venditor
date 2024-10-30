"use client";

import { cx } from "@/utils/cx";
import { ShoppingBasket, User } from "lucide-react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Spinner from "@/components/spinner/Spinner";

const Navigation = ({ pathname }: { pathname: string }) => {
  const { status } = useSession();

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
          <Link href="/cart" className="relative hover:text-amber-800">
            <ShoppingBasket />
            <div className="animate-bounce absolute -top-3 -right-2 text-xs rounded-full bg-green-200 w-4 h-4 text-green-800 text-center font-normal">
              5
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
