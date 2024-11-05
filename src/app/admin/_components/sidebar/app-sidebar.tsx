"use client";

import * as React from "react";
import { Droplet } from "lucide-react";

import { NavGroup } from "@/app/admin/_components/sidebar/nav-group";
import { NavHelper } from "@/app/admin/_components/sidebar/nav-helper";
import { NavUser } from "@/app/admin/_components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarData } from "./static";
import { User } from "next-auth";
import { ShopInfo } from "../../data-layer/shop";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
  shop: ShopInfo;
}

export function AppSidebar({ user, shop, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Droplet className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">.venditor</span>
                  <span className="truncate text-xs">{shop.title}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup items={sidebarData.management} groupLabel="Management" />
        <NavGroup items={sidebarData.store} groupLabel="Store" />
        <NavHelper items={sidebarData.helper} className="mt-auto" />
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
