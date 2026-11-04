import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const area = await prisma.tb_area_parkir.findMany();
    return NextResponse.json(area);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data area parkir", error: true },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const formData = await req.formData();
  if (formData.get("kapasitas") <= formData.get("terisi")) {
    return NextResponse.json({
      message: "Kapasitas harus lebih besar dari terisi",
    });
  }
  if (formData.get("terisi") > formData.get("kapasitas")) {
    return NextResponse.json({
      message: "Terisi tidak boleh lebih besar dari kapasitas",
    });
  }

  const tarif = await prisma.tb_area_parkir.create({
    data: {
      nama_area: formData.get("nama_area"),
      kapasitas: Number(formData.get("kapasitas")),
      terisi: 0,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "Area berhasil ditambahkan",
    data: tarif,
  });
}

export async function PUT(req) {
  const formData = await req.formData();
  const area = await prisma.tb_area_parkir.update({
    where: {
      id_area: Number(formData.get("id_area")),
    },
    data: {
      nama_area: formData.get("nama_area"),
      kapasitas: Number(formData.get("kapasitas")),
      terisi: Number(formData.get("terisi")),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "Area berhasil diupdate",
    data: area,
  });
}
export async function DELETE(req) {
  //   const body = await req.json();
  const area = await prisma.tb_area_parkir.delete({
    where: {
      id_area: Number(req.id_area),
    },
  });

  return NextResponse.json({
    message: "Area berhasil dihapus",
    data: area,
  });
}
