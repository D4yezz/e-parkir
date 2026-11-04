import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import LogAktivitas from "@/components/views/admin/logAktivitas";

export default function DashboardPage() {
  return (
    <>
      <SiteHeader title={"Log Aktivitas"} />
      <LogAktivitas />
    </>
  );
}
