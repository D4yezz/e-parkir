import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();
  const area = await prisma.tb_area_parkir.update({
    where: { id_area: Number(body.id_area) },
    data: {
      terisi: { increment: Number(body.jumlah) },
    },
  });

  return NextResponse.json({
    message: "Kapasitas Berkurang",
    data: area,
  });
}
