import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

export function Footer() {
  return <footer className="bg-[#111827] text-gray-300">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1fr_1.2fr_.8fr]">
      <div>
        <span className="inline-flex bg-white px-2 py-1 shadow-sm">
          <img src="/motherland-logo.png" alt="MotherLand Auto Parts" className="block h-auto w-[180px] sm:w-[205px]" />
        </span>
        <p className="mt-4 max-w-sm text-sm leading-6">Quality used foreign auto parts for drivers, mechanics and repair shops across Metro-Atlanta.</p>
      </div>

      <div>
        <h2 className="font-bold text-white">Yard</h2>
        <p className="mt-3 flex gap-2 text-sm leading-6"><MapPin size={17} className="mt-1 shrink-0" /><span>2182 Coffee Road, Suite G<br />Lithonia, GA 30058</span></p>
        <div className="relative mt-5 h-44 overflow-hidden border border-white/10 bg-[#1f2937]">
          <iframe
            title="MotherLand Auto Parts yard map"
            src="https://www.google.com/maps?q=Motherland+Auto+Parts,+2182+Coffee+Rd,+Ste+G,+Lithonia,+GA+30058&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale opacity-75"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#111827] to-transparent" aria-hidden="true" />
        </div>
        <a className="mt-3 inline-flex text-sm font-bold text-white hover:text-amber-400" href="https://www.google.com/maps/search/?api=1&query=Motherland+Auto+Parts,+2182+Coffee+Rd,+Ste+G,+Lithonia,+GA+30058" target="_blank" rel="noreferrer">Get directions →</a>
      </div>

      <div>
        <h2 className="font-bold text-white">Contact</h2>
        <a href="tel:+16785803666" className="mt-3 flex min-h-11 items-center gap-2 text-sm hover:text-amber-400"><Phone size={17} />678-580-3666</a>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <Link href="/about" className="hover:text-amber-400">About →</Link>
          <Link href="/faq" className="hover:text-amber-400">FAQ →</Link>
          <Link href="/contact" className="hover:text-amber-400">Contact the yard →</Link>
        </div>
      </div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-400">© 2026 MotherLand Auto Parts. All rights reserved.</div></div>
  </footer>;
}
