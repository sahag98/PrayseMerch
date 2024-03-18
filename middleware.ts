import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  console.log(req.nextUrl.pathname);
  // if user is not signed in and the current path is not / redirect the user to /
  if (req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/product",
    "/success",
    "/cancel",
    // ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  ],
};
