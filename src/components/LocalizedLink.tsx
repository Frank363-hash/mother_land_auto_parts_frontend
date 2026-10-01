'use client';

import Link from 'next/link';
import type {ComponentProps,ReactNode} from 'react';
import {useLocalizedPath} from '@/components/LocaleProvider';

type Props=Omit<ComponentProps<typeof Link>,'href'|'children'> & {href:string;children:ReactNode};

export function LocalizedLink({href,children,...props}:Props){
  const localized=useLocalizedPath(href);
  return <Link href={localized} {...props}>{children}</Link>;
}