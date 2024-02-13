import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig : NextAuthConfig = {
    pages: {
        signIn : '/login'
    },
    callbacks : {
        authorized({auth , request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if(isOnDashboard){
                console.log("🚀 ~ authorized ~ isOnDashboard:", isOnDashboard)
                if(isLoggedIn) return true;
                return false;
            }else if(isLoggedIn){
                console.log("🚀 ~ authorized ~ isLoggedIn:", isLoggedIn)
                console.log("🚀 ~ authorized ~ nextUrl:", nextUrl)
                return Response.redirect(new URL('/dashboard' , nextUrl));
            }
            return true;
        }
    },
    providers : [Credentials({})] //google , oauth , facebook , etc
} 