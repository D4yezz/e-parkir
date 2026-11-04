"use client";
import { SiteHeader } from "@/components/views/admin/sidebar/site-header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import KendaraanTable from "@/components/views/admin/kendaraan";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import KelolaUser from "@/components/views/admin/kelolaUser";

export default function KelolaAkunPage() {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const getUser = async () => {
    try {
      axios.get("/api/users").then((res) => {
        setUser(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <SiteHeader
        title={"Kelola Akun"}
        action={
          <Button
            size="sm"
            className="bg-linear-to-br from-yellow-400 to-orange-500"
            asChild
          >
            <Link href={"/admin/kelola-akun/tambah"}>
              <CirclePlus />
              Tambah Akun
            </Link>
          </Button>
        }
      />
      <KelolaUser user={user} onRefresh={getUser} />
    </>
  );
}
