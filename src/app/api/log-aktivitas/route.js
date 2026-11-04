import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.tb_log_aktivitas.findMany({
        skip,
        take: limit,
        include: {
          tb_user: true,
        },
        orderBy: {
          waktu_aktivitas: "desc",
        },
      }),
      prisma.tb_log_aktivitas.count(),
    ]);

    return NextResponse.json({
      data,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data log aktivitas", error: true },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const data = await req.json();

  const aktivitas = await prisma.tb_log_aktivitas.create({
    data: {
      id_user: Number(data.id_user),
      aktivitas: data.aktivitas,
      waktu_aktivitas: new Date(),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "aktivitas berhasil ditambahkan",
    data: aktivitas,
  });
}
