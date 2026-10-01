import {ArrowRight,Phone,MapPin,Wrench,Truck,SearchCheck,ClipboardList} from 'lucide-react';
import {VehicleLookup} from '@/components/VehicleLookup';
import {VinDecoder} from '@/components/VinDecoder';
import {api} from '@/lib/api/client';
import {PartCard} from '@/components/PartCard';
import type {Part} from '@/types/api';
import {MotherlandMarquee} from '@/components/MotherlandMarquee';
import {MotherlandGallery} from '@/components/MotherlandGallery';
import {RequestButton} from '@/components/RequestButton';
import {getLocale} from '@/lib/locale-server';
import {tr} from '@/lib/i18n';
import {LocalizedLink} from '@/components/LocalizedLink';

export const revalidate=60;

export default async function Home(){
  const locale=await getLocale();
  const t=(key:Parameters<typeof tr>[1])=>tr(locale,key);
  let parts:Part[]=[];
  try{const p=new URLSearchParams({page:'1',limit:'8'});parts=(await api.inventory.search(p)).data}catch{}
  return <main>
    <section className="relative overflow-hidden bg-[#111827] text-white">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:"url('https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/auto-parts.jpg')",backgroundPosition:'center',backgroundSize:'cover'}} aria-hidden="true"/>
      <div className="absolute inset-0 bg-[#111827]/85" aria-hidden="true"/>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_.8fr] md:items-end md:py-20">
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-amber-500">{t('home.eyebrow')}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[.98] md:text-6xl">{t('home.title')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-gray-300">{t('home.intro')}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><a href="tel:+16785803666" className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-5 font-black transition hover:bg-[#b45309]"><Phone size={18}/>{t('home.call')}</a><LocalizedLink href="/inventory" className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-white/25 px-5 font-black transition hover:bg-white/10"><Wrench size={18}/>{t('home.find')} <ArrowRight size={17}/></LocalizedLink><RequestButton className="focus-ring flex min-h-12 items-center justify-center border border-white/25 bg-white/10 px-5 font-black text-white transition hover:bg-white/15"/></div>
        </div>
        <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-sm"><div className="flex gap-3"><MapPin className="text-amber-500"/><div><p className="font-black">{t('home.yard')}</p><p className="mt-1 text-sm text-gray-300">2182 Coffee Road, Suite G<br/>Lithonia, GA 30058</p></div></div><div className="mt-5 border-t border-white/10 pt-5 text-sm"><span className="font-bold text-white">{t('home.specific')}</span><p className="mt-1 text-gray-400">{t('home.send')}</p></div></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-8"><VehicleLookup/></div>
    </section>
    <VinDecoder/>
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16"><div className="flex flex-col justify-between gap-4 border-b border-gray-300 pb-5 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{t('home.arrivals')}</p><h2 className="mt-1 text-3xl font-black">{t('home.recent')}</h2></div><LocalizedLink href="/inventory" className="font-black hover:text-amber-700">{t('home.viewAll')}</LocalizedLink></div>{parts.length?<div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{parts.map(p=><PartCard key={p.id} part={p}/>)}</div>:<div className="mt-6 border border-gray-200 bg-white p-8 text-center"><p className="font-black">{t('home.loading')}</p><p className="mt-1 text-sm text-gray-600">{t('home.searchOrCall')}</p></div>}</section>
    <MotherlandMarquee/>
    <MotherlandGallery/>
    <section className="border-y border-gray-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
      <div className="mb-6 max-w-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{t('home.simple')}</p><h2 className="mt-1 text-3xl font-black">{t('home.processTitle')}</h2><p className="mt-2 text-sm leading-6 text-gray-600">{t('home.processText')}</p></div>
      <div className="grid gap-6 md:grid-cols-3">
        <Feature icon={<SearchCheck/>} title={t('home.findVehicle')} text={t('home.findVehicleText')}/>
        <Feature icon={<Truck/>} title={t('home.reviewPart')} text={t('home.reviewPartText')}/>
        <Feature icon={<ClipboardList/>} title={t('home.sendRequest')} text={t('home.sendRequestText')}/>
      </div>
      <div className="mt-7 flex flex-col gap-3 border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-black">{t('home.cantFind')}</h3><p className="mt-1 text-sm text-gray-600">{t('home.cantFindText')}</p></div><LocalizedLink href="/contact" className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-[#d97706] px-5 text-sm font-black text-white">{t('home.requestPart')} <ArrowRight size={16}/></LocalizedLink></div>
    </div></section>
  </main>;
}
function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="border border-gray-200 p-5"><div className="text-amber-700">{icon}</div><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{text}</p></div>}