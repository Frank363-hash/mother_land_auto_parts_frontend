'use client';

import {useCallback,useEffect,useMemo,useState} from 'react';
import {Archive,CalendarDays,CheckCircle2,ChevronDown,Clock3,Mail,MessageCircle,Phone,RefreshCw,RotateCcw,Search,UserRound,XCircle} from 'lucide-react';
import {api,ApiClientError} from '@/lib/api/client';
import type {Quote,QuoteStatus} from '@/types/api';

type View = 'active'|'hidden';
const statusOptions:QuoteStatus[]=['PENDING','CONTACTED','FULFILLED','CLOSED'];
const statusLabel:Record<QuoteStatus,string>={PENDING:'Needs attention',CONTACTED:'Customer contacted',FULFILLED:'Request completed',CLOSED:'Closed'};
const statusHint:Record<QuoteStatus,string>={PENDING:'This request still needs your attention.',CONTACTED:'The customer has been contacted and the request is being handled.',FULFILLED:'The customer request has been completed. You can hide it from the main list.',CLOSED:'No further action is needed for this request.'};

function readableStatus(status:QuoteStatus){return statusLabel[status]}
function formatDate(value:string){return new Intl.DateTimeFormat(undefined,{dateStyle:'medium',timeStyle:'short'}).format(new Date(value))}
function valueText(value:unknown){if(value===null||value===undefined)return '';if(typeof value==='string'||typeof value==='number'||typeof value==='boolean')return String(value);return ''}
function vehicleSummary(details:Record<string,unknown>|null){
  if(!details)return [] as string[];
  const labels:[string,string][]=[['year','Year'],['make','Make'],['model','Model'],['trim','Trim'],['engineSize','Engine'],['bodyClass','Body style'],['driveType','Drive type']];
  return labels.flatMap(([key,label])=>{const value=valueText(details[key]);return value?[`${label}: ${value}`]:[]});
}
function partLines(parts:unknown[]){
  return parts.flatMap((part,index)=>{
    if(typeof part==='string')return [part];
    if(!part||typeof part!=='object')return [`Requested item ${index+1}`];
    const item=part as Record<string,unknown>;
    const title=valueText(item.title)||valueText(item.name)||`Requested item ${index+1}`;
    const sku=valueText(item.sku);
    return [sku?`${title} · ${sku}`:title];
  });
}
function errorMessage(error:unknown,fallback:string){
  if(error instanceof ApiClientError){
    if(error.status===409)return error.message;
    if(error.status===401)return 'Your admin session has expired. Please sign in again.';
    return error.message;
  }
  return fallback;
}

export default function CustomerRequests(){
  const [quotes,setQuotes]=useState<Quote[]>([]);
  const [view,setView]=useState<View>('active');
  const [statusFilter,setStatusFilter]=useState<'ALL'|QuoteStatus>('ALL');
  const [search,setSearch]=useState('');
  const [loading,setLoading]=useState(true);
  const [busyId,setBusyId]=useState<string|null>(null);
  const [error,setError]=useState('');
  const [notice,setNotice]=useState('');

  const load=useCallback(async(includeHidden=true)=>{
    setLoading(true);setError('');
    try{setQuotes(await api.admin.quotes(includeHidden));}
    catch(error){setError(errorMessage(error,'Unable to load customer requests.'));}
    finally{setLoading(false);}
  },[]);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function updateStatus(id:string,status:QuoteStatus){
    setBusyId(id);setError('');setNotice('');
    try{const updated=await api.admin.updateQuote(id,status);setQuotes(current=>current.map(q=>q.id===id?{...q,...updated,attachments:updated.attachments??q.attachments??[]}:q));setNotice(`Request marked as ${readableStatus(status).toLowerCase()}.`);}
    catch(error){setError(errorMessage(error,'Unable to update the request.'));}
    finally{setBusyId(null);}
  }
  async function hideRequest(quote:Quote){
    if(quote.status!=='FULFILLED'&&quote.status!=='CLOSED')return;
    if(!window.confirm('Hide this completed request from the main list? You can bring it back from Hidden Requests later.'))return;
    setBusyId(quote.id);setError('');setNotice('');
    try{await api.admin.hideQuote(quote.id);setQuotes(current=>current.map(q=>q.id===quote.id?{...q,hiddenAt:new Date().toISOString()}:q));setNotice('Request hidden.');}
    catch(error){setError(errorMessage(error,'Unable to hide this request.'));}
    finally{setBusyId(null);}
  }
  async function unhideRequest(quote:Quote){
    if(!window.confirm('Show this request in the main customer request list again?'))return;
    setBusyId(quote.id);setError('');setNotice('');
    try{const updated=await api.admin.unhideQuote(quote.id);setQuotes(current=>current.map(q=>q.id===quote.id?{...q,...updated,attachments:updated.attachments??q.attachments??[]}:q));setNotice('Request is visible again.');}
    catch(error){setError(errorMessage(error,'Unable to show this request.'));}
    finally{setBusyId(null);}
  }

  async function permanentlyDeleteRequest(quote:Quote){
    const confirmed=window.confirm(`Permanently delete the request from ${quote.customerName}? This will also delete any photos or documents attached to it. This action cannot be undone.`);
    if(!confirmed)return;
    setBusyId(quote.id);setError('');setNotice('');
    try{
      const result=await api.admin.permanentlyDeleteQuote(quote.id);
      setQuotes(current=>current.filter(q=>q.id!==quote.id));
      const attachmentNote=result.attachmentFilesFailed>0
        ? ` ${result.attachmentFilesFailed} attachment file${result.attachmentFilesFailed===1?' was':'s were'} not removed from storage and should be checked.`
        : '';
      setNotice(`Request permanently deleted.${attachmentNote}`);
    }catch(error){setError(errorMessage(error,'Unable to permanently delete this request.'));}
    finally{setBusyId(null);}
  }

  const active=useMemo(()=>quotes.filter(q=>!q.hiddenAt),[quotes]);
  const hidden=useMemo(()=>quotes.filter(q=>Boolean(q.hiddenAt)),[quotes]);
  const current= view==='active'?active:hidden;
  const filtered=useMemo(()=>{
    const needle=search.trim().toLowerCase();
    return current.filter(q=>{
      const statusOk=statusFilter==='ALL'||q.status===statusFilter;
      if(!statusOk)return false;
      if(!needle)return true;
      return [q.customerName,q.customerPhone,q.customerEmail,q.referenceNumber,q.vinNumber,q.notes].filter(Boolean).join(' ').toLowerCase().includes(needle);
    });
  },[current,search,statusFilter]);

  return <div className="min-w-0">
    <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Customer enquiries</p><h1 className="mt-1 text-3xl font-black tracking-tight">Customer Requests</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Review requests from customers, contact them, and mark each request when you have finished handling it.</p></div>
      <button type="button" onClick={()=>void load(true)} disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 bg-white px-4 text-sm font-bold hover:bg-gray-50 disabled:opacity-60"><RefreshCw size={16} className={loading?'animate-spin':''}/>Refresh</button>
    </div>

    <div className="mb-5 grid gap-3 sm:grid-cols-2">
      <button type="button" onClick={()=>{setView('active');setStatusFilter('ALL')}} className={`rounded-xl border p-4 text-left transition ${view==='active'?'border-amber-500 bg-amber-50 shadow-sm':'border-gray-200 bg-white hover:border-gray-300'}`}><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-gray-500">Current requests</span><span className="grid h-8 min-w-8 place-items-center rounded-full bg-gray-900 px-2 text-xs font-black text-white">{active.length}</span></div><p className="mt-2 font-black">Requests you are still working through</p></button>
      <button type="button" onClick={()=>{setView('hidden');setStatusFilter('ALL')}} className={`rounded-xl border p-4 text-left transition ${view==='hidden'?'border-amber-500 bg-amber-50 shadow-sm':'border-gray-200 bg-white hover:border-gray-300'}`}><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-gray-500">Hidden requests</span><span className="grid h-8 min-w-8 place-items-center rounded-full bg-gray-200 px-2 text-xs font-black text-gray-700">{hidden.length}</span></div><p className="mt-2 font-black">Completed requests kept out of the main list</p></button>
    </div>

    {error&&<div role="alert" className="mb-4 flex gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800"><XCircle className="mt-0.5 shrink-0" size={18}/><div><p className="font-black">Something went wrong</p><p className="mt-1">{error}</p></div></div>}
    {notice&&<div role="status" className="mb-4 flex gap-3 border border-green-200 bg-green-50 p-4 text-sm text-green-800"><CheckCircle2 className="mt-0.5 shrink-0" size={18}/><p className="font-bold">{notice}</p></div>}

    <div className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row">
      <label className="relative min-w-0 flex-1"><Search size={17} className="absolute left-3 top-3.5 text-gray-400"/><span className="sr-only">Search customer requests</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer, phone, email or request number" className="min-h-11 w-full border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-amber-500"/></label>
      <label className="relative"><span className="sr-only">Filter by status</span><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-gray-500"/><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value as 'ALL'|QuoteStatus)} className="min-h-11 w-full appearance-none border border-gray-300 bg-white pl-3 pr-9 text-sm font-bold sm:w-56"><option value="ALL">All statuses</option>{statusOptions.map(s=><option key={s} value={s}>{statusLabel[s]}</option>)}</select></label>
    </div>

    {loading?<div className="grid gap-4">{[1,2].map(i=><div key={i} className="h-64 animate-pulse rounded-xl border border-gray-200 bg-white"/> )}</div>:filtered.length===0?<div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"><Archive className="mx-auto text-gray-400" size={28}/><h2 className="mt-3 text-lg font-black">{view==='hidden'?'No hidden requests':'No requests found'}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">{view==='hidden'?'Completed requests you hide will appear here and can be shown again later.':'New customer enquiries submitted through the website will appear here.'}</p></div>:<div className="grid gap-4">{filtered.map(q=><RequestCard key={q.id} quote={q} busy={busyId===q.id} onStatus={updateStatus} onHide={hideRequest} onUnhide={unhideRequest} onPermanentDelete={permanentlyDeleteRequest} hiddenView={view==='hidden'}/>)}</div>}
  </div>;
}

function RequestCard({quote:q,busy,onStatus,onHide,onUnhide,onPermanentDelete,hiddenView}:{quote:Quote;busy:boolean;onStatus:(id:string,status:QuoteStatus)=>void;onHide:(quote:Quote)=>void;onUnhide:(quote:Quote)=>void;onPermanentDelete:(quote:Quote)=>void;hiddenView:boolean}){
  const vehicle=vehicleSummary(q.vehicleDetails);
  const parts=partLines(q.partsList);
  return <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0"><p className="text-[11px] font-black uppercase tracking-[.14em] text-gray-500">Request {q.referenceNumber}</p><h2 className="mt-1 break-words text-xl font-black text-gray-900">{q.customerName}</h2><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600"><span>{q.customerPhone}</span>{q.customerEmail&&<span className="break-all">{q.customerEmail}</span>}</div></div>
        <div className="w-full lg:max-w-xs"><label className="block text-[11px] font-black uppercase tracking-wider text-gray-500">Request status</label><div className="relative mt-1"><select value={q.status} disabled={busy||hiddenView} onChange={e=>onStatus(q.id,e.target.value as QuoteStatus)} className="min-h-11 w-full appearance-none border border-gray-300 bg-white px-3 pr-9 text-sm font-bold disabled:bg-gray-100"><option value="PENDING">Needs attention</option><option value="CONTACTED">Customer contacted</option><option value="FULFILLED">Request completed</option><option value="CLOSED">Closed</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-3.5 text-gray-500"/></div><p className="mt-1 text-xs leading-5 text-gray-500">{statusHint[q.status]}</p></div>
      </div>
    </div>
    <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="min-w-0 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Info icon={<CalendarDays size={16}/>} label="Received" value={formatDate(q.createdAt)}/>
          <Info icon={<Clock3 size={16}/>} label="Preferred contact" value={q.contactPreference==='WHATSAPP'?'WhatsApp':q.contactPreference==='EMAIL'?'Email':'Phone call'}/>
        </div>
        {vehicle.length>0&&<section><h3 className="text-sm font-black">Vehicle</h3><div className="mt-2 flex flex-wrap gap-2">{vehicle.map(item=><span key={item} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">{item}</span>)}</div></section>}
        {q.vinNumber&&<section><h3 className="text-sm font-black">VIN</h3><p className="mt-1 break-all font-mono text-xs text-gray-600">{q.vinNumber}</p></section>}
        <section><h3 className="text-sm font-black">Requested parts</h3><div className="mt-2 space-y-2">{parts.length?parts.map(item=><div key={item} className="border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold">{item}</div>):<p className="text-sm text-gray-500">No specific part was listed.</p>}</div></section>
        {q.notes&&<section><h3 className="text-sm font-black">Customer message</h3><p className="mt-2 whitespace-pre-wrap break-words border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm leading-6 text-gray-700">{q.notes}</p></section>}
        {(q.attachments??[]).length>0&&<section><h3 className="text-sm font-black">Photos or documents</h3><div className="mt-2 flex flex-wrap gap-2">{(q.attachments??[]).map(a=><a key={a.id} href={api.admin.attachmentUrl(q.id,a.id)} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center border border-gray-300 bg-white px-3 text-xs font-bold hover:border-gray-500">View {a.fileName}</a>)}</div></section>}
      </div>
      <aside className="border-t border-gray-200 pt-4 lg:border-l lg:border-t-0 lg:pl-5">
        <p className="text-xs font-black uppercase tracking-wider text-gray-500">Contact customer</p>
        <div className="mt-3 grid gap-2">
          <a href={`tel:${q.customerPhone}`} className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-3 text-sm font-bold hover:bg-gray-50"><Phone size={16}/>Call customer</a>
          <a href={`https://wa.me/${q.customerPhone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-3 text-sm font-bold hover:bg-gray-50"><MessageCircle size={16}/>WhatsApp</a>
          {q.customerEmail&&<a href={`mailto:${q.customerEmail}`} className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-3 text-sm font-bold hover:bg-gray-50"><Mail size={16}/>Email customer</a>}
        </div>
        <div className="mt-5 border-t border-gray-200 pt-4">
          {hiddenView?<div className="grid gap-2"><button type="button" disabled={busy} onClick={()=>onUnhide(q)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-gray-300 bg-white px-3 text-sm font-black hover:bg-gray-50 disabled:opacity-60"><RotateCcw size={16}/>Show in current requests</button><button type="button" disabled={busy} onClick={()=>onPermanentDelete(q)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-red-200 bg-red-50 px-3 text-sm font-black text-red-700 hover:bg-red-100 disabled:opacity-60">{busy?'Working…':'Delete permanently'}</button><p className="text-xs leading-5 text-gray-500">Permanent deletion removes this request and its uploaded photos or documents. It cannot be undone.</p></div>:<><p className="text-xs leading-5 text-gray-500">Once a request is completed or closed, you can hide it to keep the main list tidy.</p>{(q.status==='FULFILLED'||q.status==='CLOSED')&&<button type="button" disabled={busy} onClick={()=>onHide(q)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-gray-300 bg-gray-900 px-3 text-sm font-black text-white hover:bg-gray-800 disabled:opacity-60"><Archive size={16}/>{busy?'Working…':'Hide request'}</button>}</>}
        </div>
      </aside>
    </div>
  </article>;
}

function Info({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-50 text-amber-700">{icon}</span><div><p className="text-[11px] font-black uppercase tracking-wider text-gray-500">{label}</p><p className="mt-0.5 text-sm font-semibold text-gray-800">{value}</p></div></div>}
