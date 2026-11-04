import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/owner") ||
      pathname.startsWith("/petugas") ||
      pathname.startsWith("/auth/register")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (pathname === "/owner") {
    return NextResponse.redirect(new URL("/owner/dashboard", req.url));
  }
  if (pathname === "/petugas") {
    return NextResponse.redirect(new URL("/petugas/transaksi", req.url));
  }

  if (pathname.startsWith("/auth/register")) {
    if (
      token?.role !== "admin" ||
      token?.role !== "owner" ||
      token?.role !== "petugas"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (pathname.startsWith("/admin")) {
    if (token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (pathname.startsWith("/owner")) {
    if (token?.role !== "owner") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path",
    "/petugas/:path",
    "/auth/register",
  ],
};
