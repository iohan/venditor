import { AppSidebar } from "@/app/admin/_components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/utils/auth";
import { ReactNode } from "react";
import { getShopInfo } from "./data-layer/shop";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const shop = await getShopInfo({ shopId: 1 });

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={session.user} shop={shop} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
