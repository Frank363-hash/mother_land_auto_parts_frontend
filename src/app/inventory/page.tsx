import {LocalizedLink} from '@/components/LocalizedLink';
import {api} from '@/lib/api/client';
import {PartCard} from '@/components/PartCard';
import {InventoryFilters} from '@/components/InventoryFilters';
import type {Category,Paginated,Part} from '@/types/api';
import {getLocale} from '@/lib/locale-server';
import {tr} from '@/lib/i18n';
export async function generateMetadata():Promise<import('next').Metadata>{
  const locale=await getLocale();
  const title=locale==='es'?'Inventario de Autopartes Usadas | MotherLand Auto Parts':'Used Auto Parts Inventory | MotherLand Auto Parts';
  const description=locale==='es'
    ?'Explore el inventario actual de autopartes extranjeras usadas de MotherLand Auto Parts en Lithonia, Georgia.'
    :'Browse the current used foreign auto parts inventory from MotherLand Auto Parts in Lithonia, Georgia.';
  const path='/inventory';
  return {
    title,
    description,
    alternates:{
      canonical:locale==='es'?'/es/inventory':path,
      languages:{en:path,es:'/es/inventory'}
    },
    openGraph:{
      title,
      description,
      type:'website',
      siteName:'MotherLand Auto Parts',
      url:locale==='es'?'/es/inventory':path
    },
    twitter:{card:'summary',title,description}
  };
}


export const dynamic='force-dynamic';

export default async function InventoryPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const locale=await getLocale();const t=(key:Parameters<typeof tr>[1])=>tr(locale,key);
  const sp=await searchParams;const q=(k:string):string|undefined=>Array.isArray(sp[k])?sp[k][0]:sp[k];
  const params=new URLSearchParams();for(const k of ['year','make','model','categoryId','keyword','page','limit'])if(q(k))params.set(k,q(k)!);
  params.set('limit','10');if(!params.get('page'))params.set('page','1');
  let result:Paginated<Part>={data:[],meta:{page:1,limit:10,total:0,totalPages:0}};let error='';
  try{result=await api.inventory.search(params)}catch(e){error=e instanceof Error?e.message:(locale==='es'?'No se pudo cargar el inventario.':'Unable to load inventory.')}
  let categories:Category[]=[];let years:number[]=[];try{[categories,years]=await Promise.all([api.categories(),api.vehicles.years()])}catch{}
  return <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 md:py-12">
    <div className="mb-8 motion-fade-up"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{t('inventory.eyebrow')}</p><h1 className="mt-1 text-4xl font-black">{t('inventory.title')}</h1><p className="mt-2 max-w-2xl text-gray-600">{t('inventory.intro')}</p></div>
    <div className="grid min-w-0 gap-6 lg:grid-cols-[280px_1fr]"><InventoryFilters categories={categories} years={years} initial={{keyword:q('keyword'),year:q('year'),make:q('make'),model:q('model'),categoryId:q('categoryId')}}/>
      <section className="min-w-0">{error?<div className="border border-red-200 bg-red-50 p-5 text-red-800">{error}</div>:result.data.length?<><div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm"><span className="font-bold">{result.meta.total} {result.meta.total===1?t('inventory.resultOne'):t('inventory.resultMany')}</span><span>{t('inventory.page')} {result.meta.page} {locale==='es'?'de':'of'} {Math.max(result.meta.totalPages,1)}</span></div><div className="motion-stagger grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{result.data.map(p=><PartCard key={p.id} part={p}/>)}</div><Pagination page={result.meta.page} totalPages={result.meta.totalPages} params={params}/></>:<EmptyInventory t={t}/>}</section>
    </div>
  </main>;
}

function EmptyInventory({t}:{t:(key:Parameters<typeof tr>[1])=>string}){return <div className="border border-gray-200 bg-white p-7 sm:p-10 motion-fade-up"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-black uppercase tracking-[.18em] text-amber-700">{t('inventory.noMatchEyebrow')}</p><h2 className="mt-2 text-xl font-black">{t('inventory.noMatch')}</h2><p className="mt-2 text-sm leading-6 text-gray-600">{t('inventory.changes')}</p><div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center"><a href="tel:+16785803666" className="inline-flex min-h-11 items-center justify-center bg-[#d97706] px-5 text-sm font-black text-white">{t('common.callYard')}</a><LocalizedLink href="/inventory" className="inline-flex min-h-11 items-center justify-center border border-gray-300 px-5 text-sm font-black">{t('inventory.clear')}</LocalizedLink></div></div></div>}

async function Pagination({page,totalPages,params}:{page:number;totalPages:number;params:URLSearchParams}){
  const locale=await getLocale();
  if(totalPages<=1)return null;
  const make=(n:number)=>{const p=new URLSearchParams(params);p.set('page',String(n));return `/inventory?${p}`};
  const start=Math.max(1,Math.min(page-2,totalPages-4));const end=Math.min(totalPages,Math.max(5,page+2));const pages=Array.from({length:end-start+1},(_,i)=>start+i);
  return <nav aria-label={tr(locale,'inventory.pages')} className="mt-9 flex flex-wrap items-center justify-center gap-2">{page>1&&<LocalizedLink className="min-h-11 border border-gray-300 bg-white px-3 py-2 text-sm font-bold transition hover:border-gray-400 hover:bg-gray-50" href={make(page-1)}>{tr(locale,'inventory.previous')}</LocalizedLink>}{start>1&&<><LocalizedLink className="grid h-11 w-11 place-items-center border border-gray-300 bg-white text-sm font-bold hover:border-gray-400" href={make(1)}>1</LocalizedLink>{start>2&&<span aria-hidden="true" className="px-1 text-gray-400">...</span>}</>}{pages.map(n=><LocalizedLink key={n} aria-current={n===page?'page':undefined} className={`grid h-11 w-11 place-items-center border text-sm font-black transition ${n===page?'border-[#111827] bg-[#111827] text-white':'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'}`} href={make(n)}>{n}</LocalizedLink>)}{end<totalPages&&<>{end<totalPages-1&&<span aria-hidden="true" className="px-1 text-gray-400">...</span>}<LocalizedLink className="grid h-11 w-11 place-items-center border border-gray-300 bg-white text-sm font-bold hover:border-gray-400" href={make(totalPages)}>{totalPages}</LocalizedLink></>}{page<totalPages&&<LocalizedLink className="min-h-11 border border-gray-300 bg-white px-3 py-2 text-sm font-bold transition hover:border-gray-400 hover:bg-gray-50" href={make(page+1)}>{tr(locale,'inventory.next')}</LocalizedLink>}</nav>;
}
// Server components cannot call a hook here; this helper is replaced by the page's locale through a small async-safe value.
async function awaitLocaleHack(){return await getLocale();}