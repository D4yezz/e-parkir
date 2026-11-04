import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const id = req.url.split("/").pop();
  const tarif = await prisma.tb_tarif.deleteMany({
    where: { id_tarif: Number(id) },
  });

  return NextResponse.json({ message: "Tarif berhasil dihapus" });
}
