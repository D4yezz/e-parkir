"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "../Logo/logo";
import axios from "axios";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleRedirect = () => {
    if (!session) {
      router.push("/auth/login");
    }
    if (session?.user.role === "admin") {
      router.push("/admin/dashboard");
    } else if (session?.user.role === "owner") {
      router.push("/owner/transaksi");
    } else if (session?.user.role === "petugas") {
      router.push("/petugas/transaksi");
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/log-aktivitas", {
        id_user: session.user.id,
        aktivitas: "Logout",
      });

      signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full flex justify-between items-center bg-white px-12 py-2 font-geist-sans absolute z-10">
      {/* <div className="flex items-center justify-center gap-2">
        <a className="w-16 h-16 flex items-center justify-center" href="#">
          <Image
            className="w-full h-full object-cover"
            src={"/Logo/logo1.png"}
            width={200}
            height={200}
            alt="Logo Parkir"
          />
        </a>
        <h2 className="text-2xl font-bold text-orange-500">PARKIR</h2>
      </div> */}
      <Logo />
      <div className="flex gap-2 items-center justify-center">
        <Button
          className={"bg-orange-500 font-semibold"}
          onClick={handleRedirect}
        >
          {session?.user ? (
            <>
              <LayoutGrid /> Dashboard
            </>
          ) : (
            <>
              <LogIn /> Log in
            </>
          )}
        </Button>
        {session?.user && (
          <Button
            className={"bg-orange-500 font-semibold"}
            onClick={handleLogout}
          >
            <LogOut /> Logout
          </Button>
        )}
      </div>
    </div>
  );
}
