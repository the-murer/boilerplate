import { NotFoundException, RequestError } from "@/utils/errorUtils";

import { AuthSession } from "@/types/userTypes";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import dbConnect from "@/database/dbConnect";
import { findUserByEmail } from "@/database/repository/userRepository";
import { validateUserLogin } from "@/utils/authUtils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new RequestError("Email and password are required");
        }

        const user = await findUserByEmail(credentials.email);

        if (!user) {
          throw new NotFoundException("No user found with this email");
        }

        validateUserLogin(user, credentials.password);

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          companies: token.companies,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
};

export default NextAuth(authOptions);
