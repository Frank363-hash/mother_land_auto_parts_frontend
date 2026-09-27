'use client';

import {useEffect,useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {X,LoaderCircle,Upload} from 'lucide-react';
import {api,ApiClientError} from '@/lib/api/client';
import type {Part} from '@/types/api';

const schema=z.object({
  customerName:z.string().min(2).max(160),
  customerPhone:z.string().min(7).max(40),
  customerEmail:z.string().email().optional().or(z.literal('')),
  vinNumber:z.string().regex(/^[A-Za-z0-9]{17}$/).optional().or(z.literal('')),
  contactPreference:z.enum(['WHATSAPP','EMAIL','PHONE_CALL']),
  notes:z.string().max(5000).optional(),
});

type Form=z.infer<typeof schema>;

export function QuoteModal({
  part,
  initialVin,
  vehicleDetails,
  onClose,
}: {
  part?:Part;
  initialVin?:string;
  vehicleDetails?:Record<string,unknown>;
  onClose:()=>void;
}) {
  const {register,handleSubmit,formState:{errors}}=useForm<Form>({
    resolver:zodResolver(schema),
    defaultValues:{
      contactPreference:'PHONE_CALL',
      vinNumber:initialVin||'',
      notes:part?`Request for: ${part.title} (SKU ${part.sku})`:vehicleDetails?`Vehicle identified from VIN. Please help me find the part I need.`:'',
    },
  });
  const [files,setFiles]=useState<File[]>([]),[busy,setBusy]=useState(false),[success,setSuccess]=useState(''),[error,setError]=useState('');

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'&&!busy)onClose()};
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)};
  },[busy,onClose]);

  async function submit(v:Form){
    setBusy(true);setError('');
    const fd=new FormData();
    Object.entries(v).forEach(([k,val])=>{if(val)fd.append(k,val)});
    fd.append('partsList',JSON.stringify([{
      partId:part?.id||null,
      title:part?.title||'Part request',
      sku:part?.sku||null,
    }]));
    if(vehicleDetails)fd.append('vehicleDetails',JSON.stringify(vehicleDetails));
    files.forEach(f=>fd.append('attachments',f));
    try{
      const r=await api.quote(fd);
      setSuccess(`Request ${r.referenceNumber} submitted successfully.`);
    }catch(e){
      setError(e instanceof ApiClientError?e.message:'Unable to submit request. Please call the yard.');
    }finally{setBusy(false)}
  }

  return <div role="dialog" aria-modal="true" aria-labelledby="quote-title" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-3 sm:p-4">
    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-white text-gray-900 shadow-2xl">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
        <div className="min-w-0 pr-3">
          <h2 id="quote-title" className="text-xl font-black">Request a Part</h2>
          {part&&<p className="mt-1 truncate text-xs text-gray-500">{part.title} · {part.sku}</p>}
          {!part&&initialVin&&<p className="mt-1 truncate text-xs text-gray-500">VIN: {initialVin}</p>}
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="focus-ring grid min-h-11 min-w-11 shrink-0 place-items-center"><X/></button>
      </div>
      {success?<div className="p-8">
        <p className="text-xl font-black text-green-700">Request received.</p>
        <p className="mt-2 text-gray-600">{success}</p>
        <button type="button" onClick={onClose} className="mt-6 min-h-11 bg-[#d97706] px-5 font-black text-white">Done</button>
      </div>:<form onSubmit={handleSubmit(submit)} className="space-y-4 p-4 sm:p-5">
        <Field label="Name" error={errors.customerName?.message}><input autoFocus {...register('customerName')} /></Field>
        <Field label="Phone" error={errors.customerPhone?.message}><input inputMode="tel" {...register('customerPhone')} /></Field>
        <Field label="Email" error={errors.customerEmail?.message}><input type="email" inputMode="email" {...register('customerEmail')} /></Field>
        <Field label="VIN (optional)" error={errors.vinNumber?.message}><input maxLength={17} autoCapitalize="characters" {...register('vinNumber')} /></Field>
        <Field label="Preferred contact" error={errors.contactPreference?.message}><select {...register('contactPreference')}><option value="PHONE_CALL">Phone call</option><option value="WHATSAPP">WhatsApp</option><option value="EMAIL">Email</option></select></Field>
        <Field label="Notes" error={errors.notes?.message}><textarea rows={4} {...register('notes')} /></Field>
        <label className="block"><span className="text-sm font-bold">Photos / documents (up to 5)</span><span className="mt-1 flex min-h-12 cursor-pointer items-center gap-2 border border-dashed border-gray-300 px-3 text-sm"><Upload size={16}/>Choose files<input type="file" multiple accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={e=>setFiles(Array.from(e.target.files||[]).slice(0,5))}/></span></label>
        {files.length>0&&<p className="text-xs text-gray-600">{files.length} file(s) selected.</p>}
        {error&&<p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#d97706] font-black text-white">{busy&&<LoaderCircle size={18} className="animate-spin"/>}{busy?'Submitting…':'Submit Request'}</button>
      </form>}
    </div>
  </div>;
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){
  return <label className="block"><span className="text-sm font-bold">{label}</span><div className="mt-1 [&>input]:min-h-11 [&>input]:w-full [&>input]:border [&>input]:border-gray-300 [&>input]:px-3 [&>select]:min-h-11 [&>select]:w-full [&>select]:border [&>select]:border-gray-300 [&>select]:px-3 [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-gray-300 [&>textarea]:p-3">{children}</div>{error&&<span className="text-xs text-red-700">{error}</span>}</label>;
}
