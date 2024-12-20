import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPath = ['/login', '/register', '/'].includes(path);
    const llm_token = request.cookies.get('llm_config') || '';
    const auth_token = request.cookies.get('token') || '';

    console.log('auth_token:', request.cookies.get('token'));
    console.log('llm_token:', request.cookies.get('llm_config'));

    if(publicPath && auth_token && llm_token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
    if (!publicPath) {
        if (!llm_token && !auth_token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }else if (llm_token && !auth_token) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }else if (!llm_token && auth_token) {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/logout',
        '/login',
        '/register',
        '/',
        '/llm_config',
        '/weather_log',
    ]
};
