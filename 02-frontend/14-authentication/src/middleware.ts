import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (!session?.user) {
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  // /protected/admin/status
  // /protected/admin/detail/history
  if (
    pathname.startsWith("/protected/admin") &&
    session.user.role !== "ADMIN"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/protected/reader") &&
    session.user.role !== "READER"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (
    pathname.startsWith("/protected/author") &&
    session.user.role !== "AUTHOR"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};
