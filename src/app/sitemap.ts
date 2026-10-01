import type {MetadataRoute} from 'next';

export default function sitemap():MetadataRoute.Sitemap{
  const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');
  const paths=['','/inventory','/contact','/about','/faq'];
  return paths.flatMap(path=>[
    {url:`${siteUrl}${path||'/'}`,changeFrequency:path==='/inventory'?'daily' as const:'monthly' as const,priority:path===''?1:path==='/inventory'?.9:.6},
    {url:`${siteUrl}/es${path}`,changeFrequency:path==='/inventory'?'daily' as const:'monthly' as const,priority:path===''?1:path==='/inventory'?.9:.6},
  ]);
}