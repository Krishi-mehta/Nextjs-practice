import { clerkMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Check if admin route
  const isAdmin = /^\/admin(\/.*)?$/.test(pathname);
  // Check if protected route
  const isProtected = pathname.startsWith("/user-profile");

  if (isAdmin && (await auth()).sessionClaims?.metadata?.role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (isProtected) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
