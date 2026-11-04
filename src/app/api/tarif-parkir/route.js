import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tarif = await prisma.tb_tarif.findMany();
    return NextResponse.json(tarif);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data tarif parkir", error: true },
      { status: 500 },
    );
  }
}

// export async function POST(req) {
//   const formData = await req.formData();
//   const allowedKendaraan = ["motor", "mobil", "lainnya"];
//   const jenis = formData.get("jenis_kendaraan");
//   if (!allowedKendaraan.includes(jenis)) {
//     return NextResponse.json({ message: "Jenis tidak valid" }, { status: 400 });
//   }

//   const tarif = await prisma.tb_tarif.create({
//     data: {
//       jenis_kendaraan: allowedKendaraan,
//       tarif_per_jam: formData.get("tarif_per_jam"),
//       updatedAt: new Date(),
//     },
//   });

//   return NextResponse.json({
//     message: "Tarif berhasil ditambahkan",
//     data: tarif,
//   });
// }

export async function PUT(req) {
  const formData = await req.formData();
  const tarif = await prisma.tb_tarif.update({
    where: {
      id_tarif: Number(formData.get("id_tarif")),
    },
    data: {
      tarif_per_jam: Number(formData.get("tarif_per_jam")),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "Tarif berhasil diupdate",
    data: tarif,
  });
}
