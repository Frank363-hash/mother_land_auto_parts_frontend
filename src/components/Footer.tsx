import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';
import { SocialLinks } from '@/components/SocialLinks';

export function Footer() {
  return <footer className="bg-white text-gray-600">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1fr_1.2fr_.8fr]">
      <div>
        <img src="/motherland-logo.png" alt="MotherLand Auto Parts" className="block h-auto w-[190px] sm:w-[215px]" />
        <p className="mt-4 max-w-sm text-sm leading-6">Quality used foreign auto parts for drivers, mechanics and repair shops across Metro-Atlanta.</p>
      </div>

      <div>
        <h2 className="font-bold text-[#111827]">Yard</h2>
        <p className="mt-3 flex gap-2 text-sm leading-6"><MapPin size={17} className="mt-1 shrink-0" /><span>2182 Coffee Road, Suite G<br />Lithonia, GA 30058</span></p>
        <div className="relative mt-5 h-44 overflow-hidden border border-gray-200 bg-gray-100">
          <iframe
            title="MotherLand Auto Parts yard map"
            src="https://www.google.com/maps?q=Motherland+Auto+Parts,+2182+Coffee+Rd,+Ste+G,+Lithonia,+GA+30058&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale opacity-75"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        </div>
        <a className="mt-3 inline-flex text-sm font-bold text-[#111827] hover:text-amber-600" href="https://www.google.com/maps/search/?api=1&query=Motherland+Auto+Parts,+2182+Coffee+Rd,+Ste+G,+Lithonia,+GA+30058" target="_blank" rel="noreferrer">Get directions →</a>
      </div>

      <div>
        <h2 className="font-bold text-[#111827]">Contact</h2>
        <a href="tel:+16785803666" className="mt-3 flex min-h-11 items-center gap-2 text-sm text-[#111827] hover:text-amber-600"><Phone size={17} />678-580-3666</a>
        <SocialLinks className="mt-3" />
        <p className="mt-3 max-w-[18rem] text-xs leading-5 text-gray-400">Follow MotherLand Auto Parts on social media.</p>
        <nav aria-label="Footer links" className="mt-4 flex flex-col items-start gap-2 text-sm text-[#111827] sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
          <Link href="/about" className="hover:text-amber-400">About →</Link>
          <Link href="/faq" className="hover:text-amber-400">FAQ →</Link>
          <Link href="/contact" className="hover:text-amber-400">Contact the yard →</Link>
        </nav>
      </div>
    </div>
    <div className="border-t border-gray-200"><div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-500">© 2026 MotherLand Auto Parts. All rights reserved.</div></div>
  </footer>;
}
