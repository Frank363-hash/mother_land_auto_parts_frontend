'use client';

import {useState} from 'react';
import type {Part} from '@/types/api';
import {QuoteModal} from './QuoteModal';
import {useLocale} from '@/components/LocaleProvider';

export function RequestButton({part,initialVin,vehicleDetails,className}:{part?:Part;initialVin?:string;vehicleDetails?:Record<string,unknown>;className?:string}){
  const [open,setOpen]=useState(false);const {t}=useLocale();const label=part?t('quote.part'):t('quote.request');
  return <><button type="button" onClick={()=>setOpen(true)} className={className||'focus-ring min-h-12 bg-[#d97706] px-5 font-black text-white'}>{label}</button>{open&&<QuoteModal part={part} initialVin={initialVin} vehicleDetails={vehicleDetails} onClose={()=>setOpen(false)}/>}</>;
}