import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { verify } from "@/utils/password";

const handler = NextAuth({
  //   adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Akun tidak ada");
        }

        const isValid = await verify(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Email atau password salah");
        }

        return {
          id: user.id_user.toString(),
          name: user.nama_user,
          // username: user.username,
          role: user.role,
          email: user.email,
          // alamat: user.alamat,
          // createdAt: user.createdAt,
          // updatedAt: user.updatedAt,
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
