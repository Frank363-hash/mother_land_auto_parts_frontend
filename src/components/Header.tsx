'use client';

import Link from 'next/link';
import {MapPin,Phone,Menu,MessageCircle,X,Languages} from 'lucide-react';
import {useEffect,useRef,useState} from 'react';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';
import {LocalizedLink} from '@/components/LocalizedLink';
import {useLocale} from '@/components/LocaleProvider';
import type {Locale} from '@/lib/i18n';
import {localizedPath} from '@/lib/i18n';

const links=[['/inventory','header.inventory'],['/about','header.about'],['/faq','header.faq'],['/contact','header.contact']] as const;

export function Header(){
  const [open,setOpen]=useState(false);
  const {locale,t}=useLocale();
  const other:Locale=locale==='en'?'es':'en';
  const pathname=usePathname()||'/';
  const search=useSearchParams().toString();
  const router=useRouter();
  const pendingLocaleRefresh=useRef(false);
  const otherPath=localizedPath(pathname,other);
  const otherHref=search?`${otherPath}?${search}`:otherPath;

  useEffect(()=>{
    if(!pendingLocaleRefresh.current)return;
    pendingLocaleRefresh.current=false;
    router.refresh();
  },[pathname,router]);
  return <>
    <div className="bg-[#111827] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
        <span className="hidden items-center gap-2 sm:flex"><MapPin size={14}/>2182 Coffee Road, Suite G, Lithonia, GA 30058</span>
        <span className="flex items-center gap-4">
          <a className="focus-ring flex items-center gap-1 font-bold" href="tel:+16785803666"><Phone size={14}/>678-580-3666</a>
          <span className="hidden sm:inline">{t('header.callHours')}</span>
        </span>
      </div>
    </div>
    <nav className="sticky top-0 z-[100] border-b border-gray-200 bg-white text-[#111827] shadow-sm" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 md:py-2.5">
        <LocalizedLink href="/" className="focus-ring flex shrink-0 items-center" onClick={()=>setOpen(false)} aria-label={t('header.home')}>
          <img src="/motherland-logo.png" alt="MotherLand Auto Parts" className="block h-auto w-[190px] sm:w-[215px]"/>
        </LocalizedLink>
        <div className="hidden items-center gap-5 text-sm font-bold md:flex">
          {links.map(([href,key])=><LocalizedLink key={href} className="focus-ring hover:text-amber-400" href={href}>{t(key)}</LocalizedLink>)}
          <Link href={otherHref} onClick={(event)=>{event.preventDefault();pendingLocaleRefresh.current=true;router.push(otherHref);}} className="focus-ring inline-flex min-h-10 items-center gap-1 border border-gray-300 px-2.5 text-xs font-black" aria-label={`${t('header.language')}: ${other==='es'?t('header.spanish'):t('header.english')}`}>
            <Languages size={15}/><span>{locale.toUpperCase()}</span><span className="text-gray-400">/</span><span>{other.toUpperCase()}</span>
          </Link>
          <a className="focus-ring inline-flex min-h-11 items-center gap-2 bg-[#d97706] px-4 text-white transition hover:bg-[#b45309]" href="https://wa.me/16785803666" target="_blank" rel="noreferrer"><MessageCircle size={17}/>{t('header.whatsapp')}</a>
        </div>
        <button type="button" aria-label={open?t('header.closeMenu'):t('header.openMenu')} aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="focus-ring grid min-h-11 min-w-11 place-items-center border border-gray-300 md:hidden">{open?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
      <div className={`motion-drawer border-t border-gray-200 bg-white md:hidden ${open?'is-open':''}`}>
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="grid gap-1">
            {links.map(([href,key])=><LocalizedLink key={href} href={href} onClick={()=>setOpen(false)} className="focus-ring min-h-12 border border-gray-200 px-4 py-3 font-bold hover:bg-gray-50">{t(key)}</LocalizedLink>)}
            <Link href={otherHref} onClick={(event)=>{event.preventDefault();setOpen(false);pendingLocaleRefresh.current=true;router.push(otherHref);}} className="focus-ring mt-1 inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-4 font-black"><Languages size={17}/>{locale==='en'?t('header.spanish'):t('header.english')}</Link>
            <a href="https://wa.me/16785803666" target="_blank" rel="noreferrer" onClick={()=>setOpen(false)} className="focus-ring mt-1 inline-flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-4 font-black text-white"><MessageCircle size={17}/>{t('header.whatsappYard')}</a>
          </div>
        </div>
      </div>
    </nav>
  </>;
}