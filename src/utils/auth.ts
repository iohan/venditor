import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const neon = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session?.user?.name;
      return token;
    },
  },
});
