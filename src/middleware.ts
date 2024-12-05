import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
	const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
	const loginurl = req.nextUrl.pathname.startsWith("/login");

	if (isLoggedIn && loginurl) {
		return Response.redirect(new URL("/dashboard", req.url));
	};


  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.url));
	};


  return NextResponse.next();
});

// Configure which paths middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
