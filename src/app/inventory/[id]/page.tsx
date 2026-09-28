import type { Metadata } from 'next';
import Link from 'next/link'; import {api} from '@/lib/api/client'; import {notFound} from 'next/navigation'; import {Phone,MessageCircle,MapPin,ChevronLeft} from 'lucide-react'; import {RequestButton} from '@/components/RequestButton'; import {PartGallery} from '@/components/PartGallery';
export const dynamic='force-dynamic';export async function generateMetadata(
  {params}: {params: Promise<{id:string}>}
): Promise<Metadata> {
  const {id} = await params;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

  try {
    const part = await api.inventory.get(id);
    const vehicle = part.vehicles?.[0];
    const vehicleText = vehicle
      ? `${vehicle.yearStart} ${vehicle.make} ${vehicle.model}`
      : 'foreign vehicle';

    const title = `${part.title} | MotherLand Auto Parts`;
    const description = (
      part.description?.trim()
      || `Used ${part.title} for ${vehicleText}. Contact MotherLand Auto Parts in Lithonia, Georgia for availability and pricing.`
    ).slice(0, 160);

    return {
      title,
      description,
      alternates: {
        canonical: `/inventory/${encodeURIComponent(id)}`,
      },
      openGraph: {
        title,
        description,
        url: `${siteUrl}/inventory/${encodeURIComponent(id)}`,
        type: 'website',
        siteName: 'MotherLand Auto Parts',
        ...(part.images?.[0]?.url
          ? {images: [{url: part.images[0].url, alt: part.images[0].altText || part.title}]}
          : {}),
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    };
  } catch {
    return {};
  }
}


export default async function PartPage({params}:{params:Promise<{id:string}>}){const {id}=await params;let part;try{part=await api.inventory.get(id)}catch{notFound()}const wa=`https://wa.me/16785803666?text=${encodeURIComponent(`Hello Motherland Auto Parts, I am interested in this part:\n\nPart: ${part.title}\nSKU: ${part.sku}${part.vehicles?.[0]?`\nVehicle: ${part.vehicles[0].yearStart} ${part.vehicles[0].make} ${part.vehicles[0].model}`:''}\n\nPlease confirm availability and price.\n\nThank you.`)}`;return <main className="mx-auto max-w-7xl px-4 py-8 md:py-12"><nav aria-label="Breadcrumb" className="mb-5"><Link href="/inventory" aria-label="Back to inventory" className="focus-ring inline-flex min-h-10 items-center gap-1 text-sm font-black text-gray-600 hover:text-[#111827]"><ChevronLeft size={17}/>Inventory</Link><span className="ml-1 text-sm text-gray-400">/ Part details</span></nav><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><section><PartGallery images={part.images||[]} title={part.title}/></section><section><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{part.category?.name||'Inventory'}</p><h1 className="mt-2 break-words text-4xl font-black">{part.title}</h1><p className="mt-2 font-bold text-gray-500">SKU {part.sku}</p><div className="mt-6 grid grid-cols-2 gap-3"><Info label="Condition" value={part.conditionGrade.replace('_',' ')}/><Info label="Availability" value={part.inStock?'In stock':'Out of stock'}/><Info label="Price" value={part.isQuoteOnly||part.price===null?'Quote required':`$${Number(part.price).toLocaleString()}`}/><Info label="Yard location" value={part.yardLocation||'Call yard'}/></div>{part.description&&<div className="mt-6 border-t border-gray-200 pt-5"><h2 className="font-black">Description</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{part.description}</p></div>}{part.vehicles?.length?<div className="mt-6 border-t border-gray-200 pt-5"><h2 className="font-black">Vehicle compatibility</h2><ul className="mt-2 space-y-2 text-sm text-gray-700">{part.vehicles.map(v=><li key={v.id}>{v.yearStart} {v.make} {v.model}</li>)}</ul>{part.vehicles?.[0]&&<Link href={`/inventory?year=${part.vehicles[0].yearStart}&make=${encodeURIComponent(part.vehicles[0].make)}&model=${encodeURIComponent(part.vehicles[0].model)}`} className="mt-4 inline-flex min-h-10 items-center border border-gray-300 px-3 text-sm font-bold hover:border-gray-500">See compatible inventory</Link>}</div>:null}<div className="mt-7 grid gap-3 sm:grid-cols-3"><RequestButton part={part}/><a href={wa} target="_blank" rel="noreferrer" className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-gray-300 font-black"><MessageCircle size={18}/>WhatsApp</a><a href="tel:+16785803666" className="focus-ring flex min-h-12 items-center justify-center gap-2 border border-gray-300 font-black"><Phone size={18}/>Call Yard</a></div></section></div></main>}
function Info({label,value}:{label:string;value:string}){return <div className="border border-gray-200 bg-white p-3"><div className="text-[11px] font-black uppercase text-gray-500">{label}</div><div className="mt-1 text-sm font-bold">{value}</div></div>}
