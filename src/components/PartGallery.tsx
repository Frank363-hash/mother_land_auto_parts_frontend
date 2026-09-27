'use client';

import {useState} from 'react';
import {ChevronLeft,ChevronRight,Expand} from 'lucide-react';
import type {Image} from '@/types/api';
import {resolveApiUrl} from '@/lib/api/client';

export function PartGallery({images,title}:{images:Image[];title:string}){
  const ordered=[...images].sort((a,b)=>a.sortOrder-b.sortOrder);
  const [index,setIndex]=useState(Math.max(0,ordered.findIndex(image=>image.isPrimary)));
  const [zoom,setZoom]=useState(false);
  const current=ordered[index]||ordered[0];
  if(!current)return <div className="grid aspect-[4/3] place-items-center border border-gray-200 bg-white font-bold text-gray-500">NO IMAGE</div>;
  const move=(delta:number)=>setIndex(i=>(i+delta+ordered.length)%ordered.length);

  return <>
    <div className="relative aspect-[4/3] overflow-hidden border border-gray-200 bg-white">
      <button type="button" onClick={()=>setZoom(true)} className="focus-ring absolute right-3 top-3 z-10 grid min-h-10 min-w-10 place-items-center border border-gray-200 bg-white/95 text-gray-900 shadow-sm" aria-label="Enlarge part image"><Expand size={17}/></button>
      <img src={resolveApiUrl(current.url)} alt={current.altText||title} className="h-full w-full object-contain" />
      {ordered.length>1&&<>
        <button type="button" onClick={()=>move(-1)} className="focus-ring absolute left-3 top-1/2 grid min-h-10 min-w-10 -translate-y-1/2 place-items-center border border-gray-200 bg-white/95 shadow-sm" aria-label="Previous part image"><ChevronLeft size={18}/></button>
        <button type="button" onClick={()=>move(1)} className="focus-ring absolute right-3 top-1/2 grid min-h-10 min-w-10 -translate-y-1/2 place-items-center border border-gray-200 bg-white/95 shadow-sm" aria-label="Next part image"><ChevronRight size={18}/></button>
      </>}
    </div>
    {ordered.length>1&&<div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
      {ordered.map((image,i)=><button key={image.id} type="button" onClick={()=>setIndex(i)} aria-label={`Show image ${i+1}`} aria-current={i===index} className={`aspect-square overflow-hidden border bg-white ${i===index?'border-[#d97706] ring-2 ring-[#d97706]/20':'border-gray-200'}`}><img src={resolveApiUrl(image.url)} alt={image.altText||title} className="h-full w-full object-cover"/></button>)}
    </div>}
    {zoom&&<div role="dialog" aria-modal="true" aria-label="Enlarged part image" className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4" onClick={()=>setZoom(false)}>
      <button type="button" onClick={()=>setZoom(false)} className="focus-ring absolute right-4 top-4 min-h-11 min-w-11 border border-white/30 bg-black/50 px-3 font-black text-white">Close</button>
      <img src={resolveApiUrl(current.url)} alt={current.altText||title} className="max-h-[88vh] max-w-full object-contain" onClick={e=>e.stopPropagation()}/>
    </div>}
  </>;
}
