import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const id = req.url.split("/").pop();
  const user = await prisma.tb_user.deleteMany({
    where: { id_user: Number(id) },
  });

  return NextResponse.json({ message: "User berhasil dihapus" });
}
