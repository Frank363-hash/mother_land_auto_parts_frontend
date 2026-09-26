'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {MapPin,Phone,Menu,MessageCircle,X,ChevronRight} from 'lucide-react';

const links=[
  {href:'/inventory',label:'Inventory'},
  {href:'/contact',label:'Contact'},
];

export function Header(){
  const [open,setOpen]=useState(false);

  useEffect(()=>{
    if(!open) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)};
  },[open]);

  return <>
    <div className="bg-[#111827] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
        <span className="flex items-center gap-2"><MapPin size={14}/><span>2182 Coffee Road, Suite G, Lithonia, GA 30058</span></span>
        <span className="flex items-center gap-4"><a className="focus-ring flex items-center gap-1 font-bold" href="tel:+16785803666"><Phone size={14}/>678-580-3666</a><span className="hidden sm:inline">Call for current yard hours</span></span>
      </div>
    </div>
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#111827] text-white shadow-sm">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" onClick={()=>setOpen(false)} className="focus-ring flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center bg-[#d97706] text-lg font-black">MP</span><span className="min-w-0"><strong className="block text-lg leading-none">MOTHERLAND</strong><small className="font-bold tracking-[.2em] text-gray-300">AUTO PARTS</small></span></Link>
        <div className="hidden items-center gap-6 text-sm font-bold md:flex">{links.map(link=><Link key={link.href} className="focus-ring hover:text-amber-400" href={link.href}>{link.label}</Link>)}<a className="focus-ring inline-flex min-h-11 items-center gap-2 bg-[#d97706] px-4 text-white" href="https://wa.me/16785803666" target="_blank" rel="noreferrer"><MessageCircle size={17}/>WhatsApp</a></div>
        <button type="button" onClick={()=>setOpen(true)} aria-label="Open navigation menu" aria-expanded={open} className="focus-ring grid min-h-11 min-w-11 place-items-center border border-white/20 md:hidden"><Menu size={21}/></button>
      </div>
    </nav>
    {open&&<div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button type="button" aria-label="Close navigation menu" onClick={()=>setOpen(false)} className="absolute inset-0 bg-black/60"/>
      <div className="absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-white text-[#111827] shadow-2xl motion-drawer">
        <div className="flex min-h-16 items-center justify-between border-b border-gray-200 px-4"><span className="text-sm font-black uppercase tracking-[.16em]">Menu</span><button type="button" onClick={()=>setOpen(false)} aria-label="Close navigation menu" className="focus-ring grid min-h-11 min-w-11 place-items-center border border-gray-200"><X size={20}/></button></div>
        <nav className="p-3">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)} className="focus-ring flex min-h-12 items-center justify-between border-b border-gray-100 px-3 font-black">{link.label}<ChevronRight size={17}/></Link>)}<a href="https://wa.me/16785803666" target="_blank" rel="noreferrer" onClick={()=>setOpen(false)} className="mt-3 flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-4 font-black text-white"><MessageCircle size={17}/>WhatsApp</a><a href="tel:+16785803666" onClick={()=>setOpen(false)} className="mt-2 flex min-h-12 items-center justify-center gap-2 border border-gray-300 px-4 font-black"><Phone size={17}/>Call Yard</a></nav>
      </div>
    </div>}
  </>;
}
