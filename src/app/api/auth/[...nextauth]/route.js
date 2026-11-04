import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { verify } from "@/utils/password";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.tb_user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Akun tidak ada");
        }

        const isValid = await verify(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Email atau password salah");
        }

        const log_aktivitas = await prisma.tb_log_aktivitas.create({
          data: {
            id_user: Number(user.id_user),
            aktivitas: "Login",
            waktu_aktivitas: new Date(),
            updatedAt: new Date(),
          },
        });

        return {
          id: user.id_user.toString(),
          name: user.nama_lengkap,
          role: user.role,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
