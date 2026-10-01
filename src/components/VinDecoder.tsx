'use client';

import {useState} from 'react';
import {ScanLine,LoaderCircle,ArrowRight,Search} from 'lucide-react';
import {api} from '@/lib/api/client';
import {RequestButton} from './RequestButton';
import {LocalizedLink} from '@/components/LocalizedLink';
import {useLocale} from '@/components/LocaleProvider';

function formatEngineSize(value:string|null){if(!value)return '—';const numeric=Number(value);if(Number.isFinite(numeric))return `${numeric.toFixed(1)} L`;return value;}
function InfoCell({label,value}:{label:string,value:string|number|null|undefined}){return <div className="min-w-0 border-b border-white/10 p-4"><small className="text-gray-400">{label}</small><p className="mt-1 break-words font-bold leading-5">{value??'—'}</p></div>}

export function VinDecoder(){
  const {t}=useLocale();const [vin,setVin]=useState(''),[data,setData]=useState<Awaited<ReturnType<typeof api.vin>>|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setError('');setData(null);const v=vin.trim().toUpperCase();if(!/^[A-Z0-9]{17}$/.test(v)){setError(t('vin.invalid'));return}setLoading(true);try{setData(await api.vin(v))}catch(err){setError(err instanceof Error?err.message:t('vin.failed'))}finally{setLoading(false)}}
  const vehicleLabel=data?[data.year,data.make,data.model].filter(Boolean).join(' '):'';const inventoryParams=new URLSearchParams();if(data?.year)inventoryParams.set('year',String(data.year));if(data?.make)inventoryParams.set('make',data.make);if(data?.model)inventoryParams.set('model',data.model);
  return <section className="border-y border-gray-800 bg-[#111827] py-10 text-white"><div className="mx-auto max-w-7xl px-4"><div className="max-w-3xl">
    <p className="text-xs font-black uppercase tracking-[.2em] text-amber-500">{t('vin.eyebrow')}</p><h2 className="mt-2 text-2xl font-black">{t('vin.title')}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">{t('vin.intro')}</p>
    <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row"><input aria-label="VIN" value={vin} onChange={e=>setVin(e.target.value.toUpperCase())} maxLength={17} placeholder={t('vin.placeholder')} className="min-h-12 flex-1 bg-white px-4 text-gray-900 outline-none"/><button type="submit" className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-[#d97706] px-5 font-black" disabled={loading}>{loading?<LoaderCircle className="animate-spin" size={18}/>:<ScanLine size={18}/>} {loading?t('vin.decoding'):t('vin.decode')}</button></form>
    {error&&<p role="alert" className="mt-3 text-sm text-amber-300">{error}</p>}
    {data&&<div className="mt-5 overflow-hidden border border-white/15 bg-white/5"><div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3"><div className="min-w-0 border-b border-white/10 p-4 sm:col-span-2 lg:col-span-2 lg:border-r"><small className="text-gray-400">VIN</small><p className="mt-1 break-all font-bold leading-5 tracking-wide">{data.vin}</p></div><InfoCell label={t('vin.year')} value={data.year}/><InfoCell label={t('vin.makeModel')} value={[data.make,data.model].filter(Boolean).join(' ')||null}/><InfoCell label={t('vin.trim')} value={data.trim}/><InfoCell label={t('vin.engine')} value={formatEngineSize(data.engineSize)}/><InfoCell label={t('vin.body')} value={data.bodyClass}/>{data.driveType&&<InfoCell label={t('vin.drive')} value={data.driveType}/>}</div>
      <div className="border-t border-white/10 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-gray-400">{t('vin.vehicleIdentified')}</p><p className="mt-1 text-lg font-black">{vehicleLabel||t('vin.detailsFound')}</p><div className="mt-4 grid gap-2 sm:flex sm:flex-wrap">{inventoryParams.toString()&&<LocalizedLink href={`/inventory?${inventoryParams.toString()}`} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 bg-[#d97706] px-4 text-sm font-black text-white"><Search size={16}/>{t('vin.findParts')} <ArrowRight size={15}/></LocalizedLink>}<RequestButton initialVin={data.vin} vehicleDetails={{vin:data.vin,year:data.year,make:data.make,model:data.model,trim:data.trim,engineSize:data.engineSize,driveType:data.driveType,bodyClass:data.bodyClass}} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 bg-white/10 px-4 text-sm font-black text-white hover:bg-white/15" /></div></div>
    </div>}
  </div></div></section>;
}