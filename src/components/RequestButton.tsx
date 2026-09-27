'use client';

import {useState} from 'react';
import type {Part} from '@/types/api';
import {QuoteModal} from './QuoteModal';

export function RequestButton({
  part,
  initialVin,
  vehicleDetails,
  className,
}: {
  part?: Part;
  initialVin?: string;
  vehicleDetails?: Record<string, unknown>;
  className?: string;
}) {
  const [open,setOpen]=useState(false);
  const label=part ? 'Request This Part' : 'Request a Part';

  return <>
    <button
      type="button"
      onClick={()=>setOpen(true)}
      className={className || 'focus-ring min-h-12 bg-[#d97706] px-5 font-black text-white'}
    >
      {label}
    </button>
    {open&&<QuoteModal
      part={part}
      initialVin={initialVin}
      vehicleDetails={vehicleDetails}
      onClose={()=>setOpen(false)}
    />}
  </>;
}
