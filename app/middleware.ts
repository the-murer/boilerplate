import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("🚀 ~ middleware ~ req => ", req);
  // Tenta buscar o token do usuário
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Se não houver token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Exemplo: rota "/admin" exige a role "ADMIN"
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Caso o usuário não possua a role "ADMIN", redireciona
    if (!((token.roles as string[]).includes("ADMIN"))) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
  }

  // Caso passe pelas validações, segue normalmente
  return NextResponse.next();
}

// Define em quais rotas o middleware será executado
export const config = {
  matcher: [
    "/users*",
    // Adicione outras rotas que deseja proteger
  ],
}; 