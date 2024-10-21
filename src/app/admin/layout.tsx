"use client";

import AdminSideNav from "@/components/admin-side-nav/AdminSideNav";
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {isAuthenticated && <AdminSideNav />}
      <div className="p-10">{children}</div>
    </div>
  );
}
