'use client';

import Link from 'next/link';
import {useEffect,useState} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {LayoutDashboard,Package,Inbox,LogOut,Menu,X,ChevronRight} from 'lucide-react';

const navItems=[
  {href:'/admin/dashboard',label:'Overview',icon:<LayoutDashboard size={17}/>},
  {href:'/admin/dashboard/inventory',label:'Inventory',icon:<Package size={17}/>},
  {href:'/admin/dashboard/quotes',label:'Quotes',icon:<Inbox size={17}/>},
];

export default function AdminLayout({children}:{children:React.ReactNode}){
  const path=usePathname(),router=useRouter();
  const [open,setOpen]=useState(false);
  useEffect(()=>{setOpen(false)},[path]);
  useEffect(()=>{
    if(!open) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)};
  },[open]);
  async function logout(){await fetch('/api/admin/logout',{method:'POST'});router.push('/admin/login')}
  return <div className="min-h-[70vh] overflow-x-hidden bg-[#f3f4f6]">
    <div className="mx-auto flex max-w-7xl">
      <aside className="sticky top-0 hidden h-screen w-[220px] shrink-0 flex-col bg-[#111827] p-4 text-white lg:flex"><AdminNav path={path} onNavigate={()=>setOpen(false)}/><button onClick={logout} className="mt-auto flex min-h-11 w-full items-center gap-2 border border-white/10 px-3 text-sm font-bold hover:bg-white/10"><LogOut size={17}/>Sign out</button></aside>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-40 flex min-h-14 items-center justify-between border-b border-gray-200 bg-white/95 px-4 shadow-sm backdrop-blur lg:hidden"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-amber-700">Motherland</p><p className="text-sm font-black">Yard Admin</p></div><button type="button" onClick={()=>setOpen(true)} aria-label="Open admin menu" aria-expanded={open} className="focus-ring grid min-h-11 min-w-11 place-items-center border border-gray-300"><Menu size={20}/></button></div>
        <section className="min-w-0 overflow-hidden p-4 md:p-7">{children}</section>
      </div>
    </div>
    {open&&<div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation"><button type="button" aria-label="Close admin menu" onClick={()=>setOpen(false)} className="absolute inset-0 bg-black/60"/><aside className="absolute left-0 top-0 flex h-full w-[min(84vw,320px)] flex-col bg-[#111827] p-4 text-white shadow-2xl motion-drawer"><div className="mb-6 flex items-center justify-between"><div><div className="text-lg font-black">YARD ADMIN</div><div className="text-[10px] font-bold uppercase tracking-[.16em] text-gray-400">Operations</div></div><button type="button" onClick={()=>setOpen(false)} aria-label="Close admin menu" className="focus-ring grid min-h-11 min-w-11 place-items-center border border-white/15"><X size={19}/></button></div><AdminNav path={path} onNavigate={()=>setOpen(false)}/><button onClick={logout} className="mt-auto flex min-h-11 w-full items-center gap-2 border border-white/10 px-3 text-sm font-bold"><LogOut size={17}/>Sign out</button></aside></div>}
  </div>
}
function AdminNav({path,onNavigate}:{path:string;onNavigate:()=>void}){return <nav className="grid gap-1">{navItems.map(item=><Link key={item.href} href={item.href} onClick={onNavigate} className={`flex min-h-12 items-center justify-between gap-2 px-3 text-sm font-bold transition-colors ${path===item.href||path.startsWith(item.href+'/')?'bg-[#d97706]':'hover:bg-white/10'}`}><span className="flex items-center gap-2">{item.icon}{item.label}</span><ChevronRight size={15} className="opacity-50"/></Link>)}</nav>}
