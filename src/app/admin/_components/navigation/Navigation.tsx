"use client";
import { ChevronRight, Home, Library, Logs, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AdminSideNav = () => {
  const pages = [
    {
      icon: Home,
      name: "Dashboard",
      href: "/",
    },
    {
      icon: Library,
      name: "Products",
      href: "/products",
    },
    {
      icon: Logs,
      name: "Orders",
      href: "/orders",
    },
  ];

  return (
    <div className="bg-red-100 flex flex-col min-w-48 pl-3 pt-4 pr-1 gap-y-4">
      <div className="w-full text-xl font-bold text-amber-700 pl-6">
        .venditor
      </div>
      <div className="flex flex-col gap-y-1">
        {pages.map((page, i) => {
          const Icon = page.icon;

          return (
            <Link
              key={i}
              href={`/admin${page.href}`}
              className="flex font-bold gap-x-2 items-center hover:underline hover:text-amber-700 justify-between"
            >
              <div>
                <Icon size={20} className="text-amber-700/75" />
              </div>
              <div>{page.name}</div>
              <div className="w-full flex justify-end">
                <ChevronRight size={18} className="text-stone-400" />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-y-1">
        <button
          onClick={() => signOut()}
          className="flex font-bold gap-x-2 items-center hover:underline hover:text-amber-700 justify-between"
        >
          <div>
            <LogOut size={20} className="text-amber-700/75" />
          </div>
          <div className="whitespace-nowrap">Sign out</div>
          <div className="w-full flex justify-end">
            <ChevronRight size={18} className="text-stone-400" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminSideNav;
