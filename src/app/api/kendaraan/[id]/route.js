import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req, context) {
  const { id } = await context.params;
  const kendaraan = await prisma.tb_kendaraan.findUnique({
    where: {
      id_kendaraan: Number(id),
    },
  });

  if (!kendaraan) {
    return NextResponse.json(
      { message: "Kendaraan tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(kendaraan);
}

export async function DELETE(req) {
  const id = req.url.split("/").pop();
  const oldKendaraan = await prisma.tb_kendaraan.findUnique({
    where: { id_kendaraan: Number(id) },
    select: { photo: true },
  });

  if (!oldKendaraan) {
    return NextResponse.json(
      { message: "Kendaraan tidak ditemukan" },
      { status: 404 },
    );
  }

  if (oldKendaraan?.photo) {
    const oldPhoto = path.join(process.cwd(), "public", oldKendaraan?.photo);
    try {
      await unlink(oldPhoto);
    } catch (err) {
      console.warn("Foto lama gagal ditemukan :", err);
    }
  }
  const kendaraan = await prisma.tb_kendaraan.deleteMany({
    where: { id_kendaraan: Number(id) },
  });

  return NextResponse.json({ message: "Kendaraan berhasil dihapus" });
}
