"use client";

import AdminSideNav from "@/components/admin-side-nav/AdminSideNav";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading } = useAuth();
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
    console.log(isAuthenticated, loading);
  }, [isAuthenticated, loading]);

  if (loading) {
    return <>...Loading</>;
  }
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {showSideNav && <AdminSideNav />}
      <div className="p-10">{children}</div>
    </div>
  );
}
