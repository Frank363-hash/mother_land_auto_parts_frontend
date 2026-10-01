import {headers} from 'next/headers';
import type {Locale} from './i18n';

export async function getLocale():Promise<Locale>{
  const value=(await headers()).get('x-motherland-locale');
  return value==='es'?'es':'en';
}