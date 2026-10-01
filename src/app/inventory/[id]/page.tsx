import type {Metadata} from 'next';
import {LocalizedLink} from '@/components/LocalizedLink';
import {api} from '@/lib/api/client';
import {notFound} from 'next/navigation';
import {Phone,MessageCircle,ChevronLeft} from 'lucide-react';
import {RequestButton} from '@/components/RequestButton';
import {PartGallery} from '@/components/PartGallery';
import {getLocale} from '@/lib/locale-server';
import {tr,translateCategory,translateCondition,translateSpecLabel} from '@/lib/i18n';

export const dynamic='force-dynamic';

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
  const {id}=await params;const locale=await getLocale();const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
  try{
    const part=await api.inventory.get(id);const vehicle=part.vehicles?.[0];const vehicleText=vehicle?`${vehicle.yearStart} ${vehicle.make} ${vehicle.model}`:(locale==='es'?'vehículo extranjero':'foreign vehicle');
    const title=`${part.title} | MotherLand Auto Parts`;
    const description=(part.description?.trim()||(locale==='es'?`Pieza usada ${part.title} para ${vehicleText}. Contacte a MotherLand Auto Parts en Lithonia, Georgia para disponibilidad y precio.`:`Used ${part.title} for ${vehicleText}. Contact MotherLand Auto Parts in Lithonia, Georgia for availability and pricing.`)).slice(0,160);
    const path=`/inventory/${encodeURIComponent(id)}`;
    return {title,description,alternates:{canonical:locale==='es'?`/es${path}`:path,languages:{en:path,es:`/es${path}`}},openGraph:{title,description,url:`${siteUrl}${locale==='es'?`/es${path}`:path}`,type:'website',siteName:'MotherLand Auto Parts',...(part.images?.[0]?.url?{images:[{url:part.images[0].url,alt:part.images[0].altText||part.title}]}:{})},twitter:{card:'summary',title,description}};
  }catch{return {}}
}

export default async function PartPage({params}:{params:Promise<{id:string}>}){
  const locale=await getLocale();const t=(key:Parameters<typeof tr>[1])=>tr(locale,key);const {id}=await params;let part;try{part=await api.inventory.get(id)}catch{notFound()}
  const wa=`https://wa.me/16785803666?text=${encodeURIComponent(locale==='es'?`Hola Motherland Auto Parts, me interesa esta pieza:\n\nPieza: ${part.title}\nSKU: ${part.sku}${part.vehicles?.[0]?`\nVehículo: ${part.vehicles[0].yearStart} ${part.vehicles[0].make} ${part.vehicles[0].model}`:''}\n\nConfirmen disponibilidad y precio, por favor.\n\nGracias.`:`Hello Motherland Auto Parts, I am interested in this part:\n\nPart: ${part.title}\nSKU: ${part.sku}${part.vehicles?.[0]?`\nVehicle: ${part.vehicles[0].yearStart} ${part.vehicles[0].make} ${part.vehicles[0].model}`:''}\n\nPlease confirm availability and price.\n\nThank you.`)}`;
  return <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">
    <nav aria-label="Breadcrumb" className="mb-5"><LocalizedLink href="/inventory" aria-label={t('part.back')} className="focus-ring inline-flex min-h-10 items-center gap-1 text-sm font-black text-gray-600 hover:text-[#111827]"><ChevronLeft size={17}/>{t('part.back')}</LocalizedLink><span className="ml-1 text-sm text-gray-400">/ {t('part.details')}</span></nav>
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><section><PartGallery images={part.images||[]} title={part.title}/></section><section>
      <p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{part.category?translateCategory(part.category.name,locale):t('part.inventory')}</p><h1 className="mt-2 break-words text-4xl font-black">{part.title}</h1><p className="mt-2 font-bold text-gray-500">SKU {part.sku}</p>
      <div className="mt-6 grid grid-cols-2 gap-3"><Info label={t('part.condition')} value={translateCondition(part.conditionGrade,locale)}/><Info label={t('part.availability')} value={part.inStock?t('part.inStock'):t('part.outOfStock')}/><Info label={t('common.price')} value={part.isQuoteOnly||part.price===null?t('part.quoteRequired'):`$${Number(part.price).toLocaleString()}`}/><Info label={t('part.yardLocation')} value={part.yardLocation||t('part.callYard')}/></div>
      {part.description&&<div className="mt-6 border-t border-gray-200 pt-5"><h2 className="font-black">{t('part.description')}</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{part.description}</p></div>}
      {part.specifications&&Object.keys(part.specifications).length>0&&<Specifications fields={part.category?.specificationFields||[]} values={part.specifications} locale={locale} title={t('part.specifications')}/>}
      {part.vehicles?.length?<div className="mt-6 border-t border-gray-200 pt-5"><h2 className="font-black">{t('part.compatibility')}</h2><ul className="mt-2 space-y-2 text-sm text-gray-700">{part.vehicles.map(v=><li key={v.id}>{v.yearStart} {v.make} {v.model}</li>)}</ul>{part.vehicles?.[0]&&<LocalizedLink href={`/inventory?year=${part.vehicles[0].yearStart}&make=${encodeURIComponent(part.vehicles[0].make)}&model=${encodeURIComponent(part.vehicles[0].model)}`} className="mt-4 inline-flex min-h-10 items-center border border-gray-300 px-3 text-sm font-bold hover:border-gray-500">{t('part.compatibleInventory')}</LocalizedLink>}</div>:null}
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><RequestButton part={part}/><a href={wa} target="_blank" rel="noreferrer" className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-gray-300 font-black"><MessageCircle size={18}/>{t('part.whatsapp')}</a><a href="tel:+16785803666" className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-gray-300 font-black"><Phone size={18}/>{t('common.callYard')}</a></div>
    </section></div>
  </main>;
}

function Info({label,value}:{label:string;value:string}){return <div className="border border-gray-200 bg-white p-3"><div className="text-[11px] font-black uppercase text-gray-500">{label}</div><div className="mt-1 text-sm font-bold">{value}</div></div>}
function Specifications({fields,values,locale,title}:{fields:{key:string;label:string;unit?:string}[];values:Record<string,string|number>;locale:'en'|'es';title:string}){const items=fields.map(field=>({field,value:values[field.key]})).filter(item=>item.value!==undefined&&item.value!==null&&item.value!=='');if(!items.length)return null;return <div className="mt-6 border-t border-gray-200 pt-5"><h2 className="font-black">{title}</h2><dl className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(({field,value})=><div key={field.key} className="border border-gray-200 bg-gray-50 p-3"><dt className="text-[11px] font-black uppercase tracking-wide text-gray-500">{translateSpecLabel(field.label,locale)}</dt><dd className="mt-1 text-sm font-bold">{String(value)}{field.unit?<span className="ml-1 font-normal text-gray-500">{field.unit}</span>:null}</dd></div>)}</dl></div>}