import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.tb_user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data user", error: true },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    const exist = await prisma.tb_user.findUnique({
      where: { email: data.email },
    });

    if (exist) {
      return NextResponse.json(
        { message: "Email sudah terdaftar", error: true },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.tb_user.create({
      data: {
        nama_lengkap: data.nama_lengkap,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        status_aktif: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Register berhasil",
        user: {
          id: user.id_user,
          nama_lengkap: user.nama_lengkap,
          email: user.email,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error, error: true }, { status: 500 });
  }
}
export async function PUT(req) {
  const data = await req.json();
  const allowedRole = ["admin", "petugas", "owner"];
  const role = data.role;
  if (!allowedRole.includes(role)) {
    return NextResponse.json({ message: "Role tidak valid" }, { status: 400 });
  }
  try {
    const user = await prisma.tb_user.update({
      where: {
        id_user: data.id_user,
      },
      data: {
        nama_lengkap: data.nama_lengkap,
        username: data.username,
        email: data.email,
        role: role,
        status_aktif: 1,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Update user berhasil",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error, error: true }, { status: 500 });
  }
}
