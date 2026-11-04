"use client";
import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import KendaraanTable from "@/components/views/admin/kendaraan";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function KendaraanPage() {
  const [kendaraan, setKendaraan] = useState([]);
  //   const [show, setShow] = useState(false);
  const getKendaraan = async () => {
    try {
      axios.get("/api/kendaraan").then((res) => {
        setKendaraan(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getKendaraan();
  }, []);
  return (
    <>
      <SiteHeader
        title={"Kelola Kendaraan"}
        action={
          <Button
            size="sm"
            className="bg-linear-to-br from-yellow-400 to-orange-500"
            asChild
          >
            <Link href={"/admin/kendaraan/tambah"}>
              <CirclePlus />
              Tambah Kendaraan
            </Link>
          </Button>
        }
      />
      <KendaraanTable kendaraan={kendaraan} onRefresh={getKendaraan} />
    </>
  );
}
