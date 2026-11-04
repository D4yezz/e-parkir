import { AppSidebar } from "@/components/views/admin/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider
      className={"font-instrument-sans overflow-hidden"}
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
