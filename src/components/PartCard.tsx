'use client';

import {MapPin,MessageCircle,Tag} from 'lucide-react';
import type {Part} from '@/types/api';
import {resolveApiUrl} from '@/lib/api/client';
import {useLocale} from '@/components/LocaleProvider';
import {translateCategory,translateCondition} from '@/lib/i18n';
import {LocalizedLink} from '@/components/LocalizedLink';

export function PartCard({part,onRequest}:{part:Part;onRequest?:()=>void}){
  const {locale,t}=useLocale();
  const image=part.images?.find(x=>x.isPrimary)||part.images?.[0];
  const vehicle=part.vehicles?.[0];
  const vehicleLabel=vehicle?`${vehicle.yearStart}${vehicle.yearEnd?`–${vehicle.yearEnd}`:''} ${vehicle.make} ${vehicle.model}`:'';
  const message=part.isImageOnly
    ? (locale==='es'?`Hola Motherland Auto Parts, me interesa una imagen de inventario. Referencia: ${part.sku}. ¿Podrían confirmar disponibilidad y precio?`:`Hello Motherland Auto Parts, I am interested in an inventory photo. Reference: ${part.sku}. Please confirm availability and price.`)
    : (locale==='es'?`Hola Motherland Auto Parts, me interesa esta pieza:

Pieza: ${part.title}
SKU: ${part.sku}${vehicle?`
Vehículo: ${vehicleLabel}`:''}

Confirmen disponibilidad y precio, por favor.

Gracias.`:`Hello Motherland Auto Parts, I am interested in this part:

Part: ${part.title}
SKU: ${part.sku}${vehicle?`
Vehicle: ${vehicleLabel}`:''}

Please confirm availability and price.

Thank you.`);
  const wa=`https://wa.me/16785803666?text=${encodeURIComponent(message)}`;
  return <article className="motion-card flex h-full flex-col border border-[#e5e7eb] bg-white">
    {part.isImageOnly
      ? <div className="block aspect-[5/3] overflow-hidden bg-gray-200">{image?<img src={resolveApiUrl(image.url)} alt={image.altText||'Inventory photo'} loading="lazy" className="h-full w-full object-cover"/>:<div className="grid h-full place-items-center text-sm font-bold text-gray-500">{t('part.noImage')}</div>}</div>
      : <LocalizedLink href={`/inventory/${part.id}`} className="group block aspect-[5/3] overflow-hidden bg-gray-200">{image?<img src={resolveApiUrl(image.url)} alt={image.altText||part.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"/>:<div className="grid h-full place-items-center text-sm font-bold text-gray-500">{t('part.noImage')}</div>}</LocalizedLink>}
    {part.isImageOnly
      ? <div className="flex flex-1 flex-col justify-between gap-4 p-3"><span className={`self-start text-[10px] font-black uppercase ${part.inStock?'text-green-700':'text-gray-500'}`}>{part.inStock?t('part.inStock'):t('part.callAvailability')}</span><a href={wa} target="_blank" rel="noreferrer" className="focus-ring flex min-h-10 w-full items-center justify-center gap-1 bg-[#d97706] px-2 text-sm font-black text-white"><MessageCircle size={15}/>{t('part.request')}</a></div>
      : <div className="flex flex-1 flex-col p-3"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-gray-500">{translateCategory(part.category?.name||'',locale)||t('part.inventory')}</p><LocalizedLink href={`/inventory/${part.id}`} className="mt-1 block text-base font-black hover:text-amber-700">{part.title}</LocalizedLink></div><div className="flex shrink-0 flex-col items-end gap-1">{part.conditionGrade&&<span className="border border-gray-200 px-2 py-1 text-[11px] font-black">{translateCondition(part.conditionGrade,locale)}</span>}<span className={`text-[10px] font-black uppercase ${part.inStock?'text-green-700':'text-gray-500'}`}>{part.inStock?t('part.inStock'):t('part.callAvailability')}</span></div></div>
        <div className="mt-2 space-y-1 text-sm text-gray-600"><p className="flex items-center gap-2"><Tag size={14}/>{t('part.sku')} {part.sku}</p>{vehicle&&<p>{vehicleLabel}</p>}{part.yardLocation&&<p className="flex items-center gap-2"><MapPin size={14}/>{part.yardLocation}</p>}</div>
        <div className="mt-auto pt-3"><div className="mb-2 font-black">{part.isQuoteOnly||part.price===null?t('part.quote'):`$${Number(part.price).toLocaleString()}`}</div><div className="grid grid-cols-2 gap-2"><LocalizedLink href={`/inventory/${part.id}`} className="focus-ring flex min-h-10 items-center justify-center border border-gray-300 px-2 text-sm font-black">{t('part.viewDetails')}</LocalizedLink><a href={wa} target="_blank" rel="noreferrer" className="focus-ring flex min-h-10 items-center justify-center gap-1 bg-[#d97706] px-2 text-sm font-black text-white"><MessageCircle size={15}/>{t('part.request')}</a></div>{onRequest&&<button onClick={onRequest} className="mt-2 min-h-10 w-full border border-gray-200 text-xs font-bold">{t('part.addRequest')}</button>}</div>
      </div>}
  </article>;
}
