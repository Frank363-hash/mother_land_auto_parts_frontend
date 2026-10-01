import {NextRequest,NextResponse} from 'next/server';

export function middleware(req:NextRequest){
  const {pathname}=req.nextUrl;
  if(pathname.startsWith('/admin/dashboard')&&!req.cookies.get('motherland_admin'))return NextResponse.redirect(new URL('/admin/login',req.url));

  if(pathname==='/es'||pathname.startsWith('/es/')){
    const nextPath=pathname==='/es'?'/' : pathname.slice(3);
    const url=req.nextUrl.clone();
    url.pathname=nextPath||'/';
    const headers=new Headers(req.headers);
    headers.set('x-motherland-locale','es');
    return NextResponse.rewrite(url,{request:{headers}});
  }
  return NextResponse.next();
}

export const config={matcher:['/admin/dashboard/:path*','/es','/es/:path*']};