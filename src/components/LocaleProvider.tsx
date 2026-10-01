'use client';

import {createContext,useContext} from 'react';
import type {Locale} from '@/lib/i18n';
import {tr,localizedPath} from '@/lib/i18n';

const LocaleContext=createContext<{locale:Locale;t:(key:Parameters<typeof tr>[1])=>string}>({locale:'en',t:(key)=>tr('en',key)});

export function LocaleProvider({locale,children}:{locale:Locale;children:React.ReactNode}){
  return <LocaleContext.Provider value={{locale,t:(key)=>tr(locale,key)}}>{children}</LocaleContext.Provider>;
}
export function useLocale(){return useContext(LocaleContext);}
export function useLocalizedPath(path:string){const {locale}=useLocale();return localizedPath(path,locale);}