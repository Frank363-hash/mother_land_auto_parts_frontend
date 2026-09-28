'use client';

import Link from 'next/link';
import {Suspense,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {CheckCircle2,KeyRound,LoaderCircle,ShieldCheck} from 'lucide-react';
import {api,ApiClientError} from '@/lib/api/client';

export default function ResetPasswordPage(){
  return <Suspense fallback={<main className="grid min-h-[70vh] place-items-center px-4 py-12"><div className="text-sm text-gray-600">Loading password reset…</div></main>}>
    <ResetPasswordForm/>
  </Suspense>;
}

function ResetPasswordForm(){
  const params=useSearchParams();
  const token=params.get('token')||'';
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [busy,setBusy]=useState(false);
  const [done,setDone]=useState(false);
  const [error,setError]=useState('');

  async function submit(event:React.FormEvent){
    event.preventDefault();
    setError('');
    if(!token){
      setError('This password reset link is missing or invalid. Please request a new reset link.');
      return;
    }
    if(password.length<8){
      setError('Your new password must be at least 8 characters.');
      return;
    }
    if(password!==confirm){
      setError('The new passwords do not match.');
      return;
    }
    setBusy(true);
    try{
      await api.admin.resetPassword(token,password);
      setDone(true);
    }catch(error){
      setError(error instanceof ApiClientError?error.message:error instanceof Error?error.message:'Unable to reset your password.');
    }finally{
      setBusy(false);
    }
  }

  return <main className="grid min-h-[70vh] place-items-center px-4 py-12">
    <div className="w-full max-w-md border border-gray-200 bg-white p-6 shadow-sm">
      {done
        ? <>
            <div className="grid h-11 w-11 place-items-center bg-green-50 text-green-700"><CheckCircle2 size={21}/></div>
            <h1 className="mt-4 text-2xl font-black">Password updated</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">Your admin password has been changed. You can now sign in with your new password.</p>
            <Link href="/admin/login" className="mt-6 flex min-h-12 w-full items-center justify-center bg-[#111827] text-sm font-black text-white">Return to sign in</Link>
          </>
        : <>
            <div className="grid h-11 w-11 place-items-center bg-amber-50 text-amber-700"><KeyRound size={20}/></div>
            <h1 className="mt-4 text-2xl font-black">Set a new password</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">Choose a new password with at least 8 characters.</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold">New password</span>
                <input required minLength={8} maxLength={128} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 min-h-12 w-full border border-gray-300 px-3"/>
              </label>
              <label className="block">
                <span className="text-sm font-bold">Confirm new password</span>
                <input required minLength={8} maxLength={128} type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-1 min-h-12 w-full border border-gray-300 px-3"/>
              </label>
              {error&&<p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
              <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#111827] font-black text-white disabled:opacity-60">
                {busy?<LoaderCircle className="animate-spin" size={18}/>:<KeyRound size={18}/>}
                Set new password
              </button>
            </form>
            <div className="mt-5 flex gap-2 text-xs leading-5 text-gray-500">
              <ShieldCheck size={15} className="mt-0.5 shrink-0"/>
              <span>Reset links expire after 30 minutes and can only be used once.</span>
            </div>
          </>
      }
    </div>
  </main>;
}
