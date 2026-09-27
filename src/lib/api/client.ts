import type { ApiEnvelope, Category, ContactMessage, LoginResult, Paginated, Part, Quote, VinDecode, Vehicle } from '@/types/api';

const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');
export const apiBaseUrl = BASE;
export function resolveApiUrl(url:string){return /^https?:\/\//i.test(url)?url:`${BASE.replace(/\/api\/v1$/,'')}${url.startsWith('/')?url:`/${url}`}`}

export class ApiClientError extends Error { code?:string; status:number; details?:unknown; constructor(message:string,status:number,code?:string,details?:unknown){super(message);this.name='ApiClientError';this.status=status;this.code=code;this.details=details;} }

async function request<T>(path:string, init:RequestInit = {}, token?:string):Promise<T>{
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData)) headers.set('Content-Type','application/json');
  if (token) headers.set('Authorization',`Bearer ${token}`);
  const res = await fetch(`${BASE}${path}`, {...init,headers,cache:'no-store'});
  let body:ApiEnvelope<T>|null=null; try{body=await res.json()}catch{}
  if(!res.ok || !body?.success){throw new ApiClientError(body?.error?.message || `Request failed (${res.status})`,res.status,body?.error?.code,body?.error?.details)}
  return body.data;
}

async function sameOriginRequest<T>(path:string, init:RequestInit={}):Promise<T>{
  const headers=new Headers(init.headers);
  if(!(init.body instanceof FormData)) headers.set('Content-Type','application/json');
  const res=await fetch(path,{...init,headers,cache:'no-store'});
  let body:ApiEnvelope<T>|null=null; try{body=await res.json()}catch{}
  if(!res.ok||!body?.success) throw new ApiClientError(body?.error?.message||`Request failed (${res.status})`,res.status,body?.error?.code,body?.error?.details);
  return body.data;
}

async function requestPaginated<T>(path:string, init:RequestInit = {}, token?:string):Promise<Paginated<T>>{
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData)) headers.set('Content-Type','application/json');
  if (token) headers.set('Authorization',`Bearer ${token}`);
  const res = await fetch(`${BASE}${path}`, {...init,headers,cache:'no-store'});
  let body:ApiEnvelope<T[]>|null=null; try{body=await res.json()}catch{}
  if(!res.ok || !body?.success){throw new ApiClientError(body?.error?.message || `Request failed (${res.status})`,res.status,body?.error?.code,body?.error?.details)}
  if(!body.meta || typeof body.meta !== 'object') throw new ApiClientError('Invalid paginated response from inventory search.',res.status);
  return {data:body.data,meta:body.meta as Paginated<T>['meta']};
}

function normalizeAdminInventory(parts:Part[]):Part[]{
  const mediaBase=BASE.replace(/\/api\/v1$/,'');
  return parts.map(part=>({
    ...part,
    images:part.images?.map(image=>({
      ...image,
      url:image.url || `${mediaBase}/api/v1/media/inventory/parts/${part.id}/images/${image.id}`,
    })),
  }));
}

export const api = {
  inventory: {
    search: (params:URLSearchParams)=>requestPaginated<Part>(`/inventory/search?${params.toString()}`),
    get: (id:string)=>request<Part>(`/inventory/parts/${encodeURIComponent(id)}`),
  },
  categories: ()=>request<Category[]>('/categories'),
  vehicles: {
    years: ()=>request<number[]>('/vehicles/years'),
    makes: (year?:number)=>request<string[]>(`/vehicles/makes${year?`?year=${year}`:''}`),
    models: (year?:number,make?:string)=>{const p=new URLSearchParams();if(year)p.set('year',String(year));if(make)p.set('make',make);return request<string[]>(`/vehicles/models?${p.toString()}`)}
  },
  vin: (vin:string)=>request<VinDecode>(`/vin/decode/${encodeURIComponent(vin)}`),
  quote: (form:FormData)=>request<{referenceNumber:string;status:string}>('/quotes',{method:'POST',body:form}),
  contact: (body:Record<string,unknown>)=>request<ContactMessage>('/contact',{method:'POST',body:JSON.stringify(body)}),
  admin: {
    login:(body:{email:string;password:string})=>request<LoginResult>('/admin/auth/login',{method:'POST',body:JSON.stringify(body)}),
    inventory:()=>sameOriginRequest<Part[]>('/api/admin/inventory',{}).then(normalizeAdminInventory),
    createInventory:(form:FormData)=>sameOriginRequest<Part>('/api/admin/inventory',{method:'POST',body:form}),
    updateInventory:(id:string,body:Record<string,unknown>)=>sameOriginRequest<Part>(`/api/admin/inventory/${id}`,{method:'PUT',body:JSON.stringify(body)}),
    archiveInventory:(id:string)=>sameOriginRequest<{id:string;archived:boolean}>(`/api/admin/inventory/${id}`,{method:'DELETE'}),
    uploadImages:(id:string,form:FormData)=>sameOriginRequest<unknown>(`/api/admin/inventory/${id}/images`,{method:'POST',body:form}),
    deleteImage:(id:string,imageId:string)=>sameOriginRequest<unknown>(`/api/admin/inventory/${id}/images/${imageId}`,{method:'DELETE'}),
    setPrimary:(id:string,imageId:string)=>sameOriginRequest<unknown>(`/api/admin/inventory/${id}/images/${imageId}/primary`,{method:'PATCH'}),
    reorderImages:(id:string,imageIds:string[])=>sameOriginRequest<unknown>(`/api/admin/inventory/${id}/images/reorder`,{method:'PATCH',body:JSON.stringify({imageIds})}),
    quotes:()=>sameOriginRequest<Quote[]>('/api/admin/quotes',{}),
    updateQuote:(id:string,status:Quote['status'])=>sameOriginRequest<Quote>(`/api/admin/quotes/${id}`,{method:'PATCH',body:JSON.stringify({status})}),
    contacts:()=>sameOriginRequest<ContactMessage[]>('/api/admin/contacts',{}),
    attachmentUrl:(quoteId:string,attachmentId:string)=>`/api/admin/quotes/${quoteId}/attachments/${attachmentId}`,
  }
};
