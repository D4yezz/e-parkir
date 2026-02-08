import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Gagal mengambil data user", error: true },
//       { status: 500 },
//     );
//   }
// }

export async function POST(req) {
  try {
    const data = await req.json();

    const exist = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exist) {
      return NextResponse.json(
        { message: "Email sudah terdaftar", error: true },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        nama_user: data.nama_user,
        username: data.username,
        alamat: data.alamat,
        email: data.email,
        password: hashedPassword,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Register berhasil",
        user: {
          id: user.id_user,
          nama_user: user.nama_user,
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
