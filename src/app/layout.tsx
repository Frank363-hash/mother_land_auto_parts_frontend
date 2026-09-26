import type {Metadata} from 'next'; import './globals.css'; import {Header} from '@/components/Header'; import {Footer} from '@/components/Footer';
export const metadata:Metadata={title:{default:'Motherland Auto Parts | Used Foreign Auto Parts in Lithonia, GA',template:'%s | Motherland Auto Parts'},description:'Used foreign auto parts and salvage inventory serving Metro-Atlanta from Lithonia, Georgia.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  /* MOTHERLAND_SEO_V2 */
  keywords: [
    'used auto parts',
    'foreign auto parts',
    'used car parts',
    'salvage auto parts',
    'auto parts Lithonia GA',
    'used auto parts Atlanta',
    'Motherland Auto Parts'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Motherland Auto Parts | Used Foreign Auto Parts in Lithonia, GA',
    description: 'Used foreign auto parts and salvage inventory serving Metro Atlanta from Lithonia, Georgia.',
    type: 'website',
    siteName: 'Motherland Auto Parts',
  },
  twitter: {
    card: 'summary',
    title: 'Motherland Auto Parts | Used Foreign Auto Parts in Lithonia, GA',
    description: 'Used foreign auto parts and salvage inventory serving Metro Atlanta from Lithonia, Georgia.',
  },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
