'use client';

import Link from 'next/link';
import { MapPin, Phone, Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/inventory', label: 'Inventory' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-[#111827] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <span className="hidden items-center gap-2 sm:flex"><MapPin size={14} />2182 Coffee Road, Suite G, Lithonia, GA 30058</span><span className="flex items-center gap-2 sm:hidden"><MapPin size={14} />Lithonia, GA</span>
          <span className="flex items-center gap-4">
            <a className="focus-ring flex items-center gap-1 font-bold" href="tel:+16785803666"><Phone size={14} />678-580-3666</a>
            <span className="hidden sm:inline">Call for current yard hours</span>
          </span>
        </div>
      </div>

      <nav className="sticky top-0 z-[100] border-b border-white/10 bg-[#111827] text-white shadow-sm" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:py-2.5">
          <Link href="/" className="focus-ring flex shrink-0 items-center" onClick={() => setOpen(false)} aria-label="MotherLand Auto Parts home">
            <span className="inline-flex bg-white px-2 py-1 shadow-sm">
              <img src="/motherland-logo.png" alt="MotherLand Auto Parts" className="block h-auto w-[180px] sm:w-[205px]" />
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-bold md:flex">
            {links.map((link) => <Link key={link.href} className="focus-ring hover:text-amber-400" href={link.href}>{link.label}</Link>)}
            <a className="focus-ring inline-flex min-h-11 items-center gap-2 bg-[#d97706] px-4 text-white transition hover:bg-[#b45309]" href="https://wa.me/16785803666" target="_blank" rel="noreferrer"><MessageCircle size={17} />WhatsApp</a>
          </div>

          <button type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="focus-ring grid min-h-11 min-w-11 place-items-center border border-white/20 md:hidden">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`motion-drawer border-t border-white/10 bg-[#111827] md:hidden ${open ? 'is-open' : ''}`}>
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="grid gap-1">
              {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="focus-ring min-h-12 border border-white/10 px-4 py-3 font-bold hover:bg-white/5">{link.label}</Link>)}
              <a href="https://wa.me/16785803666" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="focus-ring mt-1 inline-flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-4 font-black text-white"><MessageCircle size={17} />WhatsApp the Yard</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
