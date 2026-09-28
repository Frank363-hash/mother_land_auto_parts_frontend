'use client';

import Link from 'next/link';
import {useEffect,useState} from 'react';
import type {Part,Quote} from '@/types/api';
import {api} from '@/lib/api/client';

export default function Dashboard(){
  const [parts,setParts]=useState<Part[]>([]),[quotes,setQuotes]=useState<Quote[]>([]),[error,setError]=useState('');
  useEffect(()=>{Promise.all([api.admin.inventory(),api.admin.quotes()]).then(([p,q])=>{setParts(p);setQuotes(q)}).catch(e=>setError(e instanceof Error?e.message:'Unable to load dashboard'))},[]);
  const active=quotes.filter(q=>q.status==='PENDING').length;
  return <div>
    <div className="mb-7"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Yard operations</p><h1 className="mt-1 text-3xl font-black">Dashboard</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">A quick view of stock and customer enquiries that need attention.</p></div>
    {error&&<p className="mb-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800">Unable to load the latest dashboard information.</p>}
    <div className="grid gap-4 sm:grid-cols-3"><Stat label="Inventory records" value={parts.length}/><Stat label="Customer requests" value={quotes.length}/><Stat label="Needs attention" value={active}/></div>
    <div className="mt-7 grid gap-5 md:grid-cols-2">
      <Link href="/admin/dashboard/inventory" className="border border-gray-200 bg-white p-5 hover:border-amber-500"><h2 className="font-black">Inventory management</h2><p className="mt-2 text-sm text-gray-600">Create, edit, archive parts and manage their images.</p></Link>
      <Link href="/admin/dashboard/quotes" className="border border-gray-200 bg-white p-5 hover:border-amber-500"><h2 className="font-black">Customer Requests</h2><p className="mt-2 text-sm text-gray-600">Review customer enquiries, contact customers, and keep completed requests organised.</p></Link>
    </div>
  </div>
}
function Stat({label,value}:{label:string;value:number}){return <div className="border border-gray-200 bg-white p-5"><p className="text-xs font-black uppercase tracking-wider text-gray-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>}
