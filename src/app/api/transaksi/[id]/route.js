import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { id } = await context.params;
  const transaksi = await prisma.tb_transaksi.findUnique({
    where: {
      id_parkir: Number(id),
    },
  });

  if (!transaksi) {
    return NextResponse.json(
      { message: "Transaksi tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(transaksi);
}

export async function DELETE(req, context) {
  const { id } = await context.params;
  const transaksi = await prisma.tb_transaksi.deleteMany({
    where: {
      id_parkir: Number(id),
    },
  });

  return NextResponse.json({ message: "Transaksi berhasil dihapus" });
}
