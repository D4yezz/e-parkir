import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const id = req.url.split("/").pop();
  const area = await prisma.tb_area_parkir.deleteMany({
    where: { id_area: Number(id) },
  });

  return NextResponse.json({ message: "Area berhasil dihapus" });
}
