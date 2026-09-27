'use client';

import {useState} from 'react';
import Link from 'next/link';
import type {Category} from '@/types/api';
import {Filter,RotateCcw} from 'lucide-react';

export function InventoryFilters({
  categories,
  years,
  initial,
}: {
  categories:Category[];
  years:number[];
  initial?:{keyword?:string;year?:string;make?:string;model?:string;categoryId?:string};
}) {
  const [open,setOpen]=useState(false);
  const activeCount=Object.values(initial||{}).filter(Boolean).length;

  return <aside>
    <button type="button" onClick={()=>setOpen(!open)} aria-expanded={open} className="mb-3 flex min-h-11 w-full items-center justify-center gap-2 border border-gray-300 bg-white font-black lg:hidden"><Filter size={17}/>Filters{activeCount>0&&<span className="grid h-6 min-w-6 place-items-center bg-[#111827] px-1 text-xs text-white">{activeCount}</span>}</button>
    <form method="get" className={`${open?'block':'hidden'} space-y-4 border border-gray-200 bg-white p-4 lg:block`}>
      <div><label className="text-xs font-black uppercase" htmlFor="inventory-keyword">Keyword</label><input id="inventory-keyword" name="keyword" defaultValue={initial?.keyword||''} placeholder="Part, SKU, description" className="mt-1 min-h-11 w-full border border-gray-300 px-3"/></div>
      <div><label className="text-xs font-black uppercase" htmlFor="inventory-year">Year</label><select id="inventory-year" name="year" defaultValue={initial?.year||''} className="mt-1 min-h-11 w-full border border-gray-300 px-3"><option value="">Any year</option>{years.map(y=><option key={y} value={y}>{y}</option>)}</select></div>
      <div><label className="text-xs font-black uppercase" htmlFor="inventory-make">Make</label><input id="inventory-make" name="make" defaultValue={initial?.make||''} placeholder="Toyota" className="mt-1 min-h-11 w-full border border-gray-300 px-3"/></div>
      <div><label className="text-xs font-black uppercase" htmlFor="inventory-model">Model</label><input id="inventory-model" name="model" defaultValue={initial?.model||''} placeholder="Camry" className="mt-1 min-h-11 w-full border border-gray-300 px-3"/></div>
      <div><label className="text-xs font-black uppercase" htmlFor="inventory-category">Category</label><select id="inventory-category" name="categoryId" defaultValue={initial?.categoryId||''} className="mt-1 min-h-11 w-full border border-gray-300 px-3"><option value="">All categories</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <button type="submit" className="min-h-11 w-full bg-[#d97706] font-black text-white">Apply Filters</button>
        {activeCount>0&&<Link href="/inventory" className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 text-sm font-bold"><RotateCcw size={15}/>Clear filters</Link>}
      </div>
    </form>
  </aside>;
}
