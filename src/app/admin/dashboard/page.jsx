import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { ChartAreaInteractive } from "@/components/admin/sidebar/chart-area-interactive";
import { DataTable } from "@/components/admin/sidebar/data-table";
import { SectionCards } from "@/components/admin/sidebar/section-cards";
import { SiteHeader } from "@/components/admin/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export default function Page() {
  return (
    // <SidebarProvider
    //   className={"font-instrument-sans"}
    //   style={{
    //     "--sidebar-width": "calc(var(--spacing) * 72)",
    //     "--header-height": "calc(var(--spacing) * 12)",
    //   }}
    // >
    //   <AppSidebar variant="inset" />
    //   <SidebarInset>
    <>
      <SiteHeader
        title={"Dashboard"}
        action={
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <CirclePlus />
            Tambah
          </Button>
        }
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
      </div>
    </>
    //   </SidebarInset>
    // </SidebarProvider>
  );
}
