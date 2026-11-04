"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/views/admin/sidebar/nav-documents";
import { NavMain } from "@/components/views/admin/sidebar/nav-main";
import { NavSecondary } from "@/components/views/admin/sidebar/nav-secondary";
import { NavUser } from "@/components/views/admin/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/layout/Logo/logo";
import { useSession } from "next-auth/react";
import { CarFront, CircleDollarSign, MapPinned, User2 } from "lucide-react";

const data = {
  navAdmin: [
    {
      title: "Log Aktivitas",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Tarif Parkir",
      url: "/admin/tarif-parkir",
      icon: CircleDollarSign,
    },
    {
      title: "Area Parkir",
      url: "/admin/area-parkir",
      icon: MapPinned,
    },
    {
      title: "Kendaraan",
      url: "/admin/kendaraan",
      icon: CarFront,
    },
    {
      title: "Kelola Akun",
      url: "/admin/kelola-akun",
      icon: User2,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { data: session } = useSession();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className={"font-instrument-sans"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={"font-instrument-sans"}>
        <NavMain items={data.navAdmin} />
      </SidebarContent>
      <SidebarFooter className={"font-instrument-sans"}>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
