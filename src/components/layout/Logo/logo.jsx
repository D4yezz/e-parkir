import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Link className="w-16 h-16 flex items-center justify-center" href="/">
        <Image
          className="w-full h-full object-cover"
          src={"/Logo/logo1.png"}
          width={200}
          height={200}
          alt="Logo Parkir"
        />
      </Link>
      <h2 className="text-2xl font-bold text-orange-500">PARKIKIR</h2>
    </div>
  );
}
