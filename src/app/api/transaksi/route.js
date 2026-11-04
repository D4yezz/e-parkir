import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "id_parkir";
  const order = searchParams.get("order") || "asc";

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const skip = (page - 1) * limit;

  const allowedFields = ["id_parkir", "id_kendaraan"];

  const safeSortBy = allowedFields.includes(sortBy) ? sortBy : "id_kendaraan";

  const where = {};

  if (search) {
    where.OR = [
      {
        tb_kendaraan: {
          plat_nomor: {
            contains: search,
          },
        },
      },
      {
        tb_area_parkir: {
          nama_area: {
            contains: search,
          },
        },
      },
    ];

    if (!isNaN(search)) {
      where.OR.push({
        id_parkir: Number(search),
      });
    }
  }

  if (status && status !== "all") {
    where.status = status;
  }
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  const [data, total] = await Promise.all([
    prisma.tb_transaksi.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [safeSortBy]: order === "desc" ? "desc" : "asc",
      },
      include: {
        tb_kendaraan: {
          select: {
            id_kendaraan: true,
            plat_nomor: true,
            jenis_kendaraan: true,
          },
        },
        tb_user: {
          select: {
            id_user: true,
            username: true,
          },
        },
        tb_tarif: {
          select: {
            id_tarif: true,
            tarif_per_jam: true,
          },
        },
        tb_area_parkir: {
          select: {
            id_area: true,
            nama_area: true,
          },
        },
      },
    }),
    prisma.tb_transaksi.count({ where }),
  ]);

  return NextResponse.json({
    data,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req) {
  const formData = await req.formData();

  const transaksi = await prisma.tb_transaksi.create({
    data: {
      id_kendaraan: Number(formData.get("id_kendaraan")),
      waktu_masuk: new Date(),
      waktu_keluar: null,
      id_tarif: Number(formData.get("id_tarif")),
      durasi_jam: null,
      biaya_total: 0,
      status: "masuk",
      id_user: Number(formData.get("id_user")),
      id_area: Number(formData.get("id_area")),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "transaksi berhasil ditambahkan",
    data: transaksi,
  });
}

export async function PUT(req) {
  const formData = await req.formData();

  const idParkir = Number(formData.get("id_parkir"));
  const waktuMasuk = new Date(formData.get("waktu_masuk"));
  const tarifPerJam = Number(formData.get("tarif"));

  const waktuKeluar = new Date();
  const selisihMs = waktuKeluar - waktuMasuk;
  const selisihJam = selisihMs / (1000 * 60 * 60);
  const durasiJam = Math.max(1, Math.ceil(selisihJam));

  const biayaTotal = durasiJam * tarifPerJam;

  const transaksi = await prisma.tb_transaksi.update({
    where: {
      id_parkir: idParkir,
    },
    data: {
      waktu_keluar: waktuKeluar,
      durasi_jam: durasiJam,
      biaya_total: biayaTotal,
      status: formData.get("status"),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({
    message: "transaksi berhasil diupdate",
    data: transaksi,
  });
}
