import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/auth"; // Ensure this function is correctly implemented

// Middleware function to handle route access
export async function middleware(request: NextRequest) {
  try {
    const user = await getCurrentUser(); // Ensure this function retrieves the user from cookies or session

    const { pathname } = request.nextUrl; // Extract the pathname from the URL

    // Redirect unauthenticated users trying to access protected routes
    if (!user && pathname !== "/user-login") {
      return NextResponse.redirect(new URL("/user-login", request.url));
    }

    // Redirect authenticated users away from the login page
    if (user && pathname === "/user-login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);

    // Redirect to login on errors or unauthorized access
    return NextResponse.redirect(new URL("/user-login", request.url));
  }
}

// Configuring the middleware to match all routes except static files and API routes
export const config = {
  matcher: [
    /*
     Match all routes except:
     - Static files (_next/static, _next/image, favicon.ico)
     - API routes (/api/**)
    */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
