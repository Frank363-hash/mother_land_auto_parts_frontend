'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-552df4376272.jpg', 'MotherLand yard and parts'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/auto-parts.jpg', 'Used foreign auto parts'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/1-1.jpg', 'Parts and salvage inventory'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-f8cb8037a29e.jpg', 'MotherLand inventory'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-f3daf39f25f2.jpg', 'Foreign vehicle parts'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-bbca2c351cb9.jpg', 'Yard parts selection'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-992331f8d030.jpg', 'Used auto parts'],
  ['https://motherlandautoparts.wordpress.com/wp-content/uploads/2020/04/ezgif-6-257fde3be08c.jpg', 'MotherLand Auto Parts'],
];

export function MotherlandGallery() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), 5500); return () => window.clearInterval(id); }, []);
  const move = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const [src, alt] = images[index];

  return <section className="mx-auto max-w-7xl px-4 py-12 md:py-16" aria-labelledby="motherland-gallery-title">
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Built around the yard</p><h2 id="motherland-gallery-title" className="mt-1 text-3xl font-black">Parts you need. Service you can trust.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Take a look at the parts, vehicles and yard behind MotherLand Auto Parts.</p></div>
      <div className="flex gap-2">
        <button type="button" aria-label="Previous MotherLand image" onClick={() => move(-1)} className="focus-ring grid h-11 w-11 place-items-center border border-gray-300 bg-white hover:border-gray-500"><ChevronLeft size={19} /></button>
        <button type="button" aria-label="Next MotherLand image" onClick={() => move(1)} className="focus-ring grid h-11 w-11 place-items-center border border-gray-300 bg-white hover:border-gray-500"><ChevronRight size={19} /></button>
      </div>
    </div>
    <div className="relative overflow-hidden border border-gray-200 bg-[#111827]">
      <img key={src} src={src} alt={alt} className="h-[300px] w-full object-cover md:h-[460px]" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white"><p className="font-black">MotherLand Auto Parts</p><p className="mt-1 text-sm text-gray-200">Used foreign parts for Metro-Atlanta.</p></div>
    </div>
    <div className="mt-4 flex justify-center gap-2" aria-label="Gallery slides">
      {images.map((_, i) => <button key={i} type="button" aria-label={`Show image ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} className={`h-2.5 w-2.5 rounded-full border ${i === index ? 'border-[#d97706] bg-[#d97706]' : 'border-gray-400 bg-gray-200'}`} />)}
    </div>
  </section>;
}
