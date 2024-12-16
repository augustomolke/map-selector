import { auth } from "@/auth";

const allowed = ["/login", "/"];

export default auth((req) => {
  if (!req.auth && !allowed.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
