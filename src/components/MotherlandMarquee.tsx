'use client';
import {useLocale} from '@/components/LocaleProvider';
export function MotherlandMarquee(){
  const {t}=useLocale();const items=[t('marquee.parts'),'Toyota','Honda','Acura','Lexus','Mercedes-Benz','BMW','Hyundai','KIA','Metro-Atlanta'];
  return <section className="overflow-hidden border-y border-white/10 bg-[#111827] text-white" aria-label={t('marquee.aria')}><div className="marquee-track flex min-w-max items-center gap-8 py-4 text-xs font-black uppercase tracking-[.16em]">{[...items,...items].map((item,i)=><span key={`${item}-${i}`} className="flex items-center gap-8"><span>{item}</span><span className="text-[#d97706]">◆</span></span>)}</div></section>;
}