import {NextRequest,NextResponse} from 'next/server';

const BASE=(process.env.NEXT_PUBLIC_API_URL||'http://localhost:5000/api/v1').replace(/\/$/,'');

export async function POST(req:NextRequest){
  const upstream=await fetch(`${BASE}/admin/auth/forgot-password`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:await req.text(),
    cache:'no-store',
  });
  const data=await upstream.json().catch(()=>({success:false,error:{message:'Unable to process the request.'}}));
  return NextResponse.json(data,{status:upstream.status});
}
