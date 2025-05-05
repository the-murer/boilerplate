import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/database/dbConnect";
import { findUserByEmail } from "@/database/repository/userRepository";
import { validateUserLogin } from "@/api/user/userUtils";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          
          return { 
            id: "675393f32fc75c7127648f30", 
            name: "J Smith", 
            email: credentials.email,
            roles: ["admin"]
          };
        } catch (error) {
          console.error("Erro de autenticação:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          roles: token.roles,
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 