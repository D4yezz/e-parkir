import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const kategori = await prisma.kategori.findMany();
    return NextResponse.json(kategori);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data kategori" },
      { status: 500 },
    );
  }
}
