import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import type {Metadata} from 'next';
import './globals.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import {LocaleProvider} from '@/components/LocaleProvider';
import {getLocale} from '@/lib/locale-server';
import {localizedPath,tr} from '@/lib/i18n';

export async function generateMetadata():Promise<Metadata>{
  const locale=await getLocale();
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  const title=locale==='es'?'MotherLand Auto Parts | Autopartes extranjeras usadas en Lithonia, GA':'Motherland Auto Parts | Used Foreign Auto Parts in Lithonia, GA';
  const description=locale==='es'?'Autopartes extranjeras usadas y piezas de salvamento para Metro-Atlanta desde Lithonia, Georgia.':'Used foreign auto parts and salvage inventory serving Metro-Atlanta from Lithonia, Georgia.';
  return {
    title:{default:title,template:'%s | Motherland Auto Parts'},description,metadataBase:new URL(base),
    icons:{icon:'/favicon.ico',shortcut:'/favicon.ico'},
    keywords:locale==='es'?['autopartes usadas','autopartes extranjeras','piezas de autos usadas','autopartes de salvamento','autopartes Lithonia GA','Motherland Auto Parts']:['used auto parts','foreign auto parts','used car parts','salvage auto parts','auto parts Lithonia GA','used auto parts Atlanta','Motherland Auto Parts'],
    alternates:{canonical:localizedPath('/',locale),languages:{en:'/',es:'/es'}},
    openGraph:{title,description,type:'website',siteName:'Motherland Auto Parts',url:`${base}${localizedPath('/',locale)}`},
    twitter:{card:'summary',title,description}
  };
}

export default async function RootLayout({children}:{children:React.ReactNode}){
  const locale=await getLocale();
  return <html lang={locale}><body><LocaleProvider locale={locale}><Header/>{children}<Footer/></LocaleProvider><LocalBusinessSchema/><BackToTop/></body></html>;
}