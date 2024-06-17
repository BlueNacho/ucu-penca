import { NextRequest } from "next/server";
import { decrypt, getSession, updateSession } from "./lib/auth-utils";
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    publicRoutes,
    privateRoutes,
    ADMIN_PREFIX,

} from '@/routes'

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const session = await getSession();

    const isLoggedIn = !!session;
    const isAdmin = session?.user?.is_admin;

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(ADMIN_PREFIX);

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
        console.log(isAdmin)
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