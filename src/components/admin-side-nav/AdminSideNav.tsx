"use client";
import { ChevronRight, Home, LayoutList, LogOut } from "lucide-react";
import Link from "next/link";

const AdminSideNav = () => {
  return (
    <div className="bg-red-100 flex flex-col min-w-48 pl-3 pt-4 pr-1 gap-y-4">
      <div className="w-full text-xl font-bold text-amber-700 pl-6">
        .venditor
      </div>
      <div className="flex flex-col gap-y-1">
        <Link
          href="/admin"
          className="flex font-bold gap-x-2 items-center hover:underline hover:text-amber-700 justify-between"
        >
          <div>
            <Home size={20} className="text-amber-700/75" />
          </div>
          <div>Dashboard</div>
          <div className="w-full flex justify-end">
            <ChevronRight size={18} className="text-stone-400" />
          </div>
        </Link>
        <Link
          href="/admin/products"
          className="flex font-bold gap-x-2 items-center hover:underline hover:text-amber-700 justify-between"
        >
          <div>
            <LayoutList size={20} className="text-amber-700/75" />
          </div>
          <div>Products</div>
          <div className="w-full flex justify-end">
            <ChevronRight size={18} className="text-stone-400" />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-y-1">
        <Link
          href="/admin/sign-out"
          className="flex font-bold gap-x-2 items-center hover:underline hover:text-amber-700 justify-between"
        >
          <div>
            <LogOut size={20} className="text-amber-700/75" />
          </div>
          <div className="whitespace-nowrap">Sign out</div>
          <div className="w-full flex justify-end">
            <ChevronRight size={18} className="text-stone-400" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideNav;
