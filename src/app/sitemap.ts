import type {MetadataRoute} from 'next';
import {api} from '@/lib/api/client';

const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000').replace(/\/$/,'');

type SitemapEntry = MetadataRoute.Sitemap[number];

function staticEntries():SitemapEntry[]{
  const paths=['','/inventory','/contact','/about','/faq'];
  return paths.flatMap(path=>[
    {
      url:`${siteUrl}${path||'/'}`,
      changeFrequency:path==='/inventory'?'daily' as const:'monthly' as const,
      priority:path===''?1:path==='/inventory'?0.9:0.6
    },
    {
      url:`${siteUrl}/es${path}`,
      changeFrequency:path==='/inventory'?'daily' as const:'monthly' as const,
      priority:path===''?1:path==='/inventory'?0.9:0.6
    }
  ]);
}

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const entries=staticEntries();

  try{
    const firstParams=new URLSearchParams({page:'1',limit:'100'});
    const first=await api.inventory.search(firstParams);

    const allParts=[...first.data];
    const totalPages=Math.min(first.meta.totalPages,500);

    for(let page=2;page<=totalPages;page++){
      const params=new URLSearchParams({page:String(page),limit:'100'});
      const result=await api.inventory.search(params);
      allParts.push(...result.data);
    }

    const inventoryEntries=allParts.flatMap(part=>{
      const path=`/inventory/${encodeURIComponent(part.id)}`;
      const lastModified=part.updatedAt?new Date(part.updatedAt):undefined;

      return [
        {
          url:`${siteUrl}${path}`,
          lastModified,
          changeFrequency:'weekly' as const,
          priority:0.8
        },
        {
          url:`${siteUrl}/es${path}`,
          lastModified,
          changeFrequency:'weekly' as const,
          priority:0.8
        }
      ];
    });

    return [...entries,...inventoryEntries];
  }catch(error){
    console.error('Sitemap inventory discovery failed; returning static sitemap.',error);
    return entries;
  }
}
