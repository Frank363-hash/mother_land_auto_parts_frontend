import Link from 'next/link';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { MotherlandGallery } from '@/components/MotherlandGallery';

export const metadata = {
  title: 'About MotherLand Auto Parts',
  description: 'Learn about MotherLand Auto Parts, a Metro-Atlanta used foreign auto parts supplier and auto broker in Lithonia, Georgia.',
};

export default function AboutPage() {
  return <main>
    <section className="bg-[#111827] text-white"><div className="mx-auto max-w-7xl px-4 py-14 md:py-20"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-500">About MotherLand Auto Parts</p><h1 className="mt-3 max-w-4xl text-4xl font-black md:text-6xl">Quality used foreign auto parts, right here in Metro-Atlanta.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">From our Lithonia yard, we help drivers, mechanics and repair shops find quality used parts for foreign vehicles across Metro-Atlanta.</p></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_.8fr] md:py-16">
      <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Parts for the vehicles you drive</p><h2 className="mt-2 text-3xl font-black">Quality used parts for foreign cars</h2><p className="mt-5 text-base leading-8 text-gray-700">MotherLand Auto Parts sells a wide range of quality used auto parts for foreign cars such as Toyota, Honda, Acura, Lexus, Mercedes-Benz, BMW, Hyundai, and KIA.</p><p className="mt-4 text-base leading-8 text-gray-700">Tell us what you need, search by year, make and model, or use your VIN to narrow the search. When you find the right part, you can send the request straight to the yard.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/inventory" className="focus-ring inline-flex min-h-12 items-center gap-2 bg-[#d97706] px-5 font-black text-white hover:bg-[#b45309]">Browse inventory <ArrowRight size={17}/></Link><a href="tel:+16785803666" className="focus-ring inline-flex min-h-12 items-center gap-2 border border-gray-300 px-5 font-black"><Phone size={17}/>678-580-3666</a></div></div>
      <aside className="border border-gray-200 bg-white p-6"><h2 className="font-black">Visit the yard</h2><p className="mt-3 flex gap-3 text-sm leading-6 text-gray-700"><MapPin size={19} className="mt-1 shrink-0 text-amber-700"/>2182 Coffee Road, Suite G<br/>Lithonia, GA 30058</p><p className="mt-4 text-sm text-gray-600">Call the yard for current hours and help locating a specific part.</p></aside>
    </section>
    <MotherlandGallery/>
  </main>;
}
