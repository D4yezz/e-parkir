"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Landing() {
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
  return (
    <section className="bg-linear-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-between font-instrument-sans px-20 w-full min-h-screen">
      <div className="flex w-1/2 h-full items-start justify-center flex-col gap-2 text-start">
        <h1 className="text-[5rem] leading-20 font-bold font-geist-sans text-shadow-md">
          Website Kelola Parkir
        </h1>
        <p className="text-2xl">Website manajemen parkir</p>
        <div className="flex">
          <Button
            onClick={handleRedirect}
            className={"text-orange-500 bg-white font-semibold"}
          >
            Kelola Sekarang
          </Button>
        </div>
      </div>
      <div className="flex w-1/2 h-full items-end justify-center flex-col gap-2 ">
        <Image
          src={"/SUV/White-SUV-PNG-Picture.png"}
          alt="welcome"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
