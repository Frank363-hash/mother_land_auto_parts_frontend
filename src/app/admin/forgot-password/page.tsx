'use client';

import Link from 'next/link';
import {useState} from 'react';
import {ArrowLeft,LoaderCircle,Mail,ShieldCheck} from 'lucide-react';
import {api,ApiClientError} from '@/lib/api/client';

export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState('');
  const [error,setError]=useState('');

  async function submit(event:React.FormEvent){
    event.preventDefault();
    setBusy(true);
    setNotice('');
    setError('');
    try{
      const result=await api.admin.forgotPassword(email.trim().toLowerCase());
      setNotice(result.message||'If an administrator account exists for this email address, a password reset link has been sent.');
    }catch(error){
      setError(error instanceof ApiClientError?error.message:error instanceof Error?error.message:'Unable to process the request.');
    }finally{
      setBusy(false);
    }
  }

  return <main className="grid min-h-[70vh] place-items-center px-4 py-12">
    <div className="w-full max-w-md border border-gray-200 bg-white p-6 shadow-sm">
      <Link href="/admin/login" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900">
        <ArrowLeft size={16}/>Back to sign in
      </Link>
      <div className="mt-7">
        <div className="grid h-11 w-11 place-items-center bg-amber-50 text-amber-700"><Mail size={20}/></div>
        <h1 className="mt-4 text-2xl font-black">Forgot your password?</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Enter the email address used for the admin account. If it matches an administrator account, we’ll send a password reset link.
        </p>
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold">Admin email address</span>
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 min-h-12 w-full border border-gray-300 px-3"/>
        </label>
        {error&&<p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        {notice&&<div role="status" className="border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-700">{notice}</div>}
        <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#111827] font-black text-white disabled:opacity-60">
          {busy?<LoaderCircle className="animate-spin" size={18}/>:<Mail size={18}/>}
          Send reset link
        </button>
      </form>
      <div className="mt-5 flex gap-2 text-xs leading-5 text-gray-500">
        <ShieldCheck size={15} className="mt-0.5 shrink-0"/>
        <span>For security, the same confirmation is shown whether or not an admin account exists.</span>
      </div>
    </div>
  </main>;
}
