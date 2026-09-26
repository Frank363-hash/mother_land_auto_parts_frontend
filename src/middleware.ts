import {NextRequest,NextResponse} from 'next/server';
export function middleware(req:NextRequest){if(req.nextUrl.pathname.startsWith('/admin/dashboard')&&!req.cookies.get('motherland_admin'))return NextResponse.redirect(new URL('/admin/login',req.url));return NextResponse.next()}
export const config={matcher:['/admin/dashboard/:path*']};
