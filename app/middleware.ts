import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/profile/:path*",
    "/users/:path*"
  ],
};
