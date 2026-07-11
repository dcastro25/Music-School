import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/courses",
    "/sign-up(.*)",
]);

// Ajustá "/teacher" al prefijo real de tus rutas de Docencia
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }

    if (isTeacherRoute(req)) {
        const { sessionClaims } = await auth();
        const role = sessionClaims?.metadata?.role;

        if (role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/(.*)",
    ],
};