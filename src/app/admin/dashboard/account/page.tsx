'use client';

import {useEffect,useState} from 'react';
import {CheckCircle2,KeyRound,LoaderCircle,Mail,ShieldCheck} from 'lucide-react';
import {api,ApiClientError} from '@/lib/api/client';
import type {AdminAccount} from '@/types/api';

export default function AccountSettings(){
  const [account,setAccount]=useState<AdminAccount|null>(null);
  const [loading,setLoading]=useState(true);
  const [pageError,setPageError]=useState('');
  const [email,setEmail]=useState('');
  const [emailPassword,setEmailPassword]=useState('');
  const [emailBusy,setEmailBusy]=useState(false);
  const [emailNotice,setEmailNotice]=useState('');
  const [currentPassword,setCurrentPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [passwordBusy,setPasswordBusy]=useState(false);
  const [passwordNotice,setPasswordNotice]=useState('');

  // This fetch synchronizes the page with the authenticated admin account.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{
    api.admin.account()
      .then(data=>{setAccount(data);setEmail(data.email)})
      .catch(error=>setPageError(errorMessage(error,'Unable to load your account details.')))
      .finally(()=>setLoading(false));
  },[]);

  async function saveEmail(event:React.FormEvent){
    event.preventDefault();
    setEmailNotice('');
    setPageError('');
    setEmailBusy(true);
    try{
      const updated=await api.admin.changeAdminEmail(emailPassword,email.trim().toLowerCase());
      setAccount(updated);
      setEmail(updated.email);
      setEmailPassword('');
      setEmailNotice('Your email address has been updated.');
    }catch(error){
      setEmailNotice(errorMessage(error,'Unable to change your email address.'));
    }finally{
      setEmailBusy(false);
    }
  }

  async function savePassword(event:React.FormEvent){
    event.preventDefault();
    setPasswordNotice('');
    if(newPassword.length<8){
      setPasswordNotice('Your new password must be at least 8 characters.');
      return;
    }
    if(newPassword!==confirmPassword){
      setPasswordNotice('The new passwords do not match.');
      return;
    }
    setPasswordBusy(true);
    try{
      await api.admin.changeAdminPassword(currentPassword,newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordNotice('Your password has been changed successfully.');
    }catch(error){
      setPasswordNotice(errorMessage(error,'Unable to change your password.'));
    }finally{
      setPasswordBusy(false);
    }
  }

  return <div className="mx-auto max-w-4xl">
    <div className="mb-7">
      <p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Account</p>
      <h1 className="mt-1 text-3xl font-black">Account Settings</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
        Manage the email address and password you use to access the MotherLand Auto Parts admin area.
      </p>
    </div>

    {pageError&&<div role="alert" className="mb-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{pageError}</div>}

    {loading
      ? <div className="border border-gray-200 bg-white p-6 text-sm text-gray-600">Loading account details…</div>
      : <div className="grid gap-5 lg:grid-cols-2">
          <section className="border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center bg-amber-50 text-amber-700"><Mail size={19}/></div>
              <div>
                <h2 className="font-black">Change email address</h2>
                <p className="mt-1 text-sm leading-5 text-gray-600">Use your current password to confirm this change.</p>
              </div>
            </div>
            <form onSubmit={saveEmail} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-bold">Current email</span>
                <input readOnly value={account?.email||''} className="mt-1 min-h-11 w-full border border-gray-200 bg-gray-50 px-3 text-gray-600"/>
              </label>
              <label className="block">
                <span className="text-sm font-bold">New email address</span>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 min-h-11 w-full border border-gray-300 px-3"/>
              </label>
              <label className="block">
                <span className="text-sm font-bold">Current password</span>
                <input required type="password" value={emailPassword} onChange={e=>setEmailPassword(e.target.value)} className="mt-1 min-h-11 w-full border border-gray-300 px-3"/>
              </label>
              {emailNotice&&<Notice text={emailNotice}/>}
              <button type="submit" disabled={emailBusy} className="flex min-h-11 w-full items-center justify-center gap-2 bg-[#111827] px-4 text-sm font-black text-white disabled:opacity-60">
                {emailBusy?<LoaderCircle className="animate-spin" size={17}/>:<Mail size={17}/>}
                Change email address
              </button>
            </form>
          </section>

          <section className="border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center bg-amber-50 text-amber-700"><KeyRound size={19}/></div>
              <div>
                <h2 className="font-black">Change password</h2>
                <p className="mt-1 text-sm leading-5 text-gray-600">Choose a new password with at least 8 characters.</p>
              </div>
            </div>
            <form onSubmit={savePassword} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-bold">Current password</span>
                <input required type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 min-h-11 w-full border border-gray-300 px-3"/>
              </label>
              <label className="block">
                <span className="text-sm font-bold">New password</span>
                <input required minLength={8} maxLength={128} type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 min-h-11 w-full border border-gray-300 px-3"/>
              </label>
              <label className="block">
                <span className="text-sm font-bold">Confirm new password</span>
                <input required minLength={8} maxLength={128} type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 min-h-11 w-full border border-gray-300 px-3"/>
              </label>
              {passwordNotice&&<Notice text={passwordNotice}/>}
              <button type="submit" disabled={passwordBusy} className="flex min-h-11 w-full items-center justify-center gap-2 bg-[#111827] px-4 text-sm font-black text-white disabled:opacity-60">
                {passwordBusy?<LoaderCircle className="animate-spin" size={17}/>:<KeyRound size={17}/>}
                Change password
              </button>
            </form>
          </section>
        </div>
    }

    <div className="mt-5 flex gap-3 border border-gray-200 bg-white p-4 text-sm text-gray-600">
      <ShieldCheck size={19} className="mt-0.5 shrink-0 text-amber-700"/>
      <p>Only the administrator signed in to this account can change these details. Your current password is required for both changes.</p>
    </div>
  </div>;
}

function Notice({text}:{text:string}){
  return <div className="flex gap-2 border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
    <CheckCircle2 size={17} className="mt-0.5 shrink-0"/>
    <span>{text}</span>
  </div>;
}

function errorMessage(error:unknown,fallback:string){
  return error instanceof ApiClientError?error.message:error instanceof Error?error.message:fallback;
}
