import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  if (!req.nextauth.token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/profile/:path*","/home"],// Routes you want to protect
};