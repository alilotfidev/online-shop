import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnOrderPage = nextUrl.pathname.startsWith('/order');
            const isOnDashboardPage = nextUrl.pathname.startsWith('/dashboard');
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');
            const isOnRegisterPage = nextUrl.pathname.startsWith('/register');
            if (isOnOrderPage || isOnDashboardPage) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isOnLoginPage || isOnRegisterPage) {
                if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;