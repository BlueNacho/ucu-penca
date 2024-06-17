import { NextRequest } from "next/server";
import { decrypt, getSession, updateSession } from "./lib/auth-utils";
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    publicRoutes,
    privateRoutes,
    adminRoutes,

} from '@/routes'

export async function middleware(request: NextRequest) {
    console.log("hola")
    const { nextUrl } = request;
    const session = await getSession();

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.is_admin;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

    if (isPublicRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (isPrivateRoute) {
        if (!isLoggedIn) {
            return Response.redirect(new URL('/auth/login', nextUrl));
        }
        return;
    }

    if (isAdminRoute) {
        if (!isAdmin) {
            return Response.redirect(new URL('/auth/login', nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl));
    }

    return null;
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}