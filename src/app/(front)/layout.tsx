"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navigation from "./_components/navigation/Navigation";

export default function FrontLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navigation pathname={pathname} />
      {children}
    </>
  );
}
