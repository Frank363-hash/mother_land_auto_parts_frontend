import {ArrowRight,Phone,MapPin} from 'lucide-react';
import {MotherlandGallery} from '@/components/MotherlandGallery';
import {LocalizedLink} from '@/components/LocalizedLink';
import {getLocale} from '@/lib/locale-server';
import {tr} from '@/lib/i18n';

export async function generateMetadata(){const locale=await getLocale();return {title:locale==='es'?'Sobre MotherLand Auto Parts':'About MotherLand Auto Parts',description:locale==='es'?'Conozca MotherLand Auto Parts, proveedor de autopartes extranjeras usadas en Lithonia, Georgia.':'Learn about MotherLand Auto Parts, a Metro-Atlanta used foreign auto parts supplier and auto broker in Lithonia, Georgia.'};}

export default async function AboutPage(){
  const locale=await getLocale();const t=(key:Parameters<typeof tr>[1])=>tr(locale,key);
  return <main>
    <section className="bg-[#111827] text-white"><div className="mx-auto max-w-7xl px-4 py-14 md:py-20"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-500">{t('about.eyebrow')}</p><h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">{t('about.title')}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">{t('about.intro')}</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_.8fr] md:py-16">
      <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{t('about.partsEyebrow')}</p><h2 className="mt-2 text-3xl font-black">{t('about.partsTitle')}</h2><p className="mt-5 text-base leading-8 text-gray-700">{t('about.p1')}</p><p className="mt-4 text-base leading-8 text-gray-700">{t('about.p2')}</p><div className="mt-7 flex flex-wrap gap-3"><LocalizedLink href="/inventory" className="focus-ring inline-flex min-h-12 items-center gap-2 bg-[#d97706] px-5 font-black text-white hover:bg-[#b45309]">{t('common.browseInventory')} <ArrowRight size={17}/></LocalizedLink><a href="tel:+16785803666" className="focus-ring inline-flex min-h-12 items-center gap-2 border border-gray-300 px-5 font-black"><Phone size={17}/>678-580-3666</a></div></div>
      <aside className="border border-gray-200 bg-white p-6"><h2 className="font-black">{t('about.visit')}</h2><p className="mt-3 flex gap-3 text-sm leading-6 text-gray-700"><MapPin size={19} className="mt-1 shrink-0 text-amber-700"/>2182 Coffee Road, Suite G<br/>Lithonia, GA 30058</p><p className="mt-4 text-sm text-gray-600">{t('about.hours')}</p></aside>
    </section>
    <MotherlandGallery/>
  </main>;
}