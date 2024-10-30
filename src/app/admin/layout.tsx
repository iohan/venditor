"use client";

import AdminSideNav from "./_components/admin-side-nav/AdminSideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <AdminSideNav />
      <div className="p-10 w-full">{children}</div>
    </div>
  );
}
