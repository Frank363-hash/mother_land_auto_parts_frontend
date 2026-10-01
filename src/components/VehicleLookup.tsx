'use client';

import {useEffect,useState} from 'react';
import {Search} from 'lucide-react';
import {api} from '@/lib/api/client';
import type {Category} from '@/types/api';
import {LocalizedLink} from '@/components/LocalizedLink';
import {useLocale} from '@/components/LocaleProvider';
import {translateCategory} from '@/lib/i18n';

export function VehicleLookup(){
  const {locale,t}=useLocale();
  const [years,setYears]=useState<number[]>([]),[makes,setMakes]=useState<string[]>([]),[models,setModels]=useState<string[]>([]),[cats,setCats]=useState<Category[]>([]),[year,setYear]=useState(''),[make,setMake]=useState(''),[model,setModel]=useState(''),[categoryId,setCategoryId]=useState('');
  useEffect(()=>{api.vehicles.years().then(setYears).catch(()=>{});api.categories().then(setCats).catch(()=>{})},[]);
  const handleYearChange=(value:string)=>{setYear(value);setMake('');setModel('');setMakes([]);setModels([]);if(value)api.vehicles.makes(Number(value)).then(setMakes).catch(()=>{})};
  const handleMakeChange=(value:string)=>{setMake(value);setModel('');setModels([]);if(year&&value)api.vehicles.models(Number(year),value).then(setModels).catch(()=>{})};
  const params=new URLSearchParams();if(year)params.set('year',year);if(make)params.set('make',make);if(model)params.set('model',model);if(categoryId)params.set('categoryId',categoryId);
  return <div className="border border-gray-700 bg-[#111827] p-4 shadow-xl"><div className="grid gap-3 md:grid-cols-5">
    <select aria-label={t('vehicle.year')} value={year} onChange={e=>handleYearChange(e.target.value)} className="min-h-12 bg-white px-3 text-gray-900"><option value="">{t('vehicle.anyYear')}</option>{years.map(y=><option key={y}>{y}</option>)}</select>
    <select aria-label={t('vehicle.make')} disabled={!year} value={make} onChange={e=>handleMakeChange(e.target.value)} className="min-h-12 bg-white px-3 text-gray-900 disabled:opacity-50"><option value="">{t('vehicle.selectMake')}</option>{makes.map(x=><option key={x}>{x}</option>)}</select>
    <select aria-label={t('vehicle.model')} disabled={!make} value={model} onChange={e=>setModel(e.target.value)} className="min-h-12 bg-white px-3 text-gray-900 disabled:opacity-50"><option value="">{t('vehicle.selectModel')}</option>{models.map(x=><option key={x}>{x}</option>)}</select>
    <select aria-label={t('vehicle.category')} value={categoryId} onChange={e=>setCategoryId(e.target.value)} className="min-h-12 bg-white px-3 text-gray-900"><option value="">{t('vehicle.selectCategory')}</option>{cats.map(c=><option key={c.id} value={c.id}>{translateCategory(c.name,locale)}</option>)}</select>
    <LocalizedLink href={`/inventory${params.toString()?`?${params}`:''}`} className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-5 font-black text-white"><Search size={18}/>{t('vehicle.find')}</LocalizedLink>
  </div></div>;
}