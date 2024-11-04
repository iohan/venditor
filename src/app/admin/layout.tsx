"use client";

import Navigation from "./_components/navigation/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="p-10 w-full">{children}</div>
    </div>
  );
}
