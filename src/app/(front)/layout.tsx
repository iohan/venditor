"use client";

import Navigation from "@/components/navigation/Navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function FrontLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navigation pathname={pathname} />
      {children}
    </>
  );
}
