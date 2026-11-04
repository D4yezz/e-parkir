import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    const kendaraan = await prisma.tb_kendaraan.findMany();
    return NextResponse.json(kendaraan);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data kendaraan", error: true },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("photo");
  let photoPath = null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(uploadPath, buffer);
    photoPath = `/uploads/${fileName}`;
  }

  const kendaraan = await prisma.tb_kendaraan.create({
    data: {
      plat_nomor: formData.get("plat_nomor"),
      jenis_kendaraan: formData.get("jenis_kendaraan"),
      warna: formData.get("warna"),
      pemilik: formData.get("pemilik"),
      id_user: Number(formData.get("id_user")),
      photo: photoPath,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "kendaraan berhasil ditambahkan",
    data: kendaraan,
  });
}

export async function PUT(req) {
  const formData = await req.formData();
  const file = formData.get("photo");

  const oldKendaraan = await prisma.tb_kendaraan.findUnique({
    where: { id_kendaraan: Number(formData.get("id_kendaraan")) },
    select: { photo: true },
  });

  let photoPath = oldKendaraan?.photo;

  if (file && file.size > 0) {
    if (oldKendaraan?.photo) {
      const oldPhoto = path.join(process.cwd(), "public", oldKendaraan?.photo);
      try {
        await unlink(oldPhoto);
      } catch (err) {
        console.warn("Foto lama gagal ditemukan :", err);
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(uploadPath, buffer);
    photoPath = `/uploads/${fileName}`;
  }

  const kendaraan = await prisma.tb_kendaraan.update({
    where: { id_kendaraan: Number(formData.get("id_kendaraan")) },
    data: {
      plat_nomor: formData.get("plat_nomor"),
      jenis_kendaraan: formData.get("jenis_kendaraan"),
      warna: formData.get("warna"),
      pemilik: formData.get("pemilik"),
      id_user: Number(formData.get("id_user")),
      photo: photoPath,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "Kendaraan berhasil diubah",
    data: kendaraan,
  });
}
