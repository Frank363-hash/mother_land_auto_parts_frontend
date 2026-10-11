'use client';

import {ChevronLeft,ChevronRight,ExternalLink,Quote,Star} from 'lucide-react';
import {useEffect,useMemo,useState} from 'react';
import {useLocale} from '@/components/LocaleProvider';

type Review={
  name:string;
  rating:1|2|3|4|5;
  text?:string;
};

// Source: customer reviews visibly shown in the Google Business Profile screenshots
// supplied for this patch. Text is reproduced only where readable in the screenshots.
// Truncated Google text remains truncated rather than being completed or invented.
const REVIEWS:Review[]=[
  {name:'Beneyam Nadew',rating:5,text:'Great service & great price for used parts.'},
  {name:'Jorge Fernandez',rating:5,text:'Good engine and quality'},
  {name:'alem gezah egn',rating:5,text:"This people have Toyota's & Honda's parts."},
  {name:'Evaristus muh Ngong',rating:5},
  {name:'Tameratdagne2@gmail.com Dagne',rating:5},
  {name:'Gbemisola Owolweselu',rating:5},
  {name:'Michael Osho',rating:5},
  {name:'Miss B',rating:4,text:'Interesting concept map nice people (I was there briefly)'},
  {name:'M H',rating:1,text:"Don't waste your time or money doing business with Roy Metu or Motherland Auto Parts. Seriously overpriced. They want..."},
  {name:'jay_yee',rating:1,text:'Sold me 2 doors for $800, did not includ all the parts, when I call the next day for the parts they tried selling me. Very skeevy shady business.'},
];

const READ_REVIEWS_URL='https://www.google.com/search?q=motherland+auto+parts';
const LEAVE_REVIEW_URL='https://g.page/r/CV2pnYaWbpxGEAE/review';

function initials(name:string){
  const parts=name.replace(/@/g,' ').trim().split(/\s+/).filter(Boolean);
  return (parts.slice(0,2).map(part=>part[0]).join('')||'G').toUpperCase();
}

function Stars({rating}:{rating:Review['rating']}){
  return <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({length:5},(_,index)=>{
      const filled=index<rating;
      return <Star
        key={index}
        size={15}
        className={filled?'text-[#F4B400]':'text-gray-300'}
        fill={filled?'currentColor':'none'}
        strokeWidth={1.6}
        aria-hidden="true"
      />;
    })}
  </span>;
}

export function GoogleReviews(){
  const {locale}=useLocale();
  const [index,setIndex]=useState(0);
  const [paused,setPaused]=useState(false);
  const total=REVIEWS.length;

  const labels=useMemo(()=>locale==='es'?{
    eyebrow:'Opiniones de Google',title:'Lo que dicen nuestros clientes',
    intro:'Opiniones reales compartidas en Google por clientes de MotherLand Auto Parts.',
    google:'Opinión de Google',rating:'Calificación compartida en Google.',
    read:'Leer opiniones en Google',leave:'Déjenos una opinión',previous:'Opinión anterior',next:'Siguiente opinión',slide:'Ir a la opinión'
  }:{
    eyebrow:'Google Reviews',title:'What Our Customers Say',
    intro:'Real feedback shared on Google by customers of MotherLand Auto Parts.',
    google:'Google review',rating:'Rating shared on Google.',
    read:'Read Reviews on Google',leave:'Leave Us a Review',previous:'Previous review',next:'Next review',slide:'Go to review'
  },[locale]);

  useEffect(()=>{
    if(paused||total<2)return;
    const timer=window.setInterval(()=>setIndex(current=>(current+1)%total),6000);
    return()=>window.clearInterval(timer);
  },[paused,total]);

  const visible=Array.from({length:5},(_,offset)=>{
    const relative=offset-2;
    const review=REVIEWS[(index+relative+total)%total];
    return {review,relative};
  });

  const deckTransform=(relative:number)=>{
    if(relative===0)return 'translateX(-50%) scale(1)';
    const distance=Math.abs(relative)===1?310:535;
    const direction=relative<0?-1:1;
    return `translateX(calc(-50% + ${direction*distance}px)) scale(${Math.abs(relative)===1?.92:.84})`;
  };

  return <section className="border-y border-[#243044] bg-[#111827] text-white" aria-labelledby="google-reviews-title" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-black uppercase tracking-[.2em] text-amber-500">{labels.eyebrow}</p>
        <h2 id="google-reviews-title" className="mt-2 text-3xl font-black md:text-4xl">{labels.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300">{labels.intro}</p>
      </div>

      <div className="mt-9 overflow-hidden" role="region" aria-roledescription="carousel" aria-label={labels.eyebrow}>
        <div className="google-review-deck" aria-live="polite">
          {visible.map(({review,relative})=>{
            const active=relative===0;
            return <article key={`${review.name}-${relative}-${index}`} className={`google-review-card ${active?'google-review-card-active':'google-review-card-side'}`} style={{transform:deckTransform(relative),zIndex:10-Math.abs(relative)}} aria-hidden={!active}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="google-review-avatar" aria-hidden="true">{initials(review.name)}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-gray-900">{review.name}</p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[.12em] text-gray-500">{labels.google}</p>
                  </div>
                </div>
                <Quote size={20} className="shrink-0 text-amber-500" aria-hidden="true"/>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-b border-gray-200 pb-4">
                <Stars rating={review.rating}/>
                <span className="text-xs font-bold text-gray-500">{review.rating}/5</span>
              </div>
              <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-gray-700">{review.text||labels.rating}</p>
              <a href={READ_REVIEWS_URL} target="_blank" rel="noopener noreferrer" tabIndex={active?0:-1} className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-gray-900 hover:text-amber-700">Google <ExternalLink size={13}/></a>
            </article>;
          })}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        <button type="button" onClick={()=>setIndex(current=>(current-1+total)%total)} className="focus-ring google-review-control" aria-label={labels.previous}><ChevronLeft size={17}/></button>
        <div className="flex items-center gap-1.5 px-2" aria-label={labels.eyebrow}>
          {REVIEWS.map((review,dotIndex)=><button key={review.name} type="button" onClick={()=>setIndex(dotIndex)} className={`focus-ring google-review-dot ${dotIndex===index?'is-active':''}`} aria-label={`${labels.slide} ${dotIndex+1}`}/>) }
        </div>
        <button type="button" onClick={()=>setIndex(current=>(current+1)%total)} className="focus-ring google-review-control" aria-label={labels.next}><ChevronRight size={17}/></button>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={READ_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="focus-ring google-review-button google-review-button-primary">{labels.read}<ExternalLink size={15}/></a>
        <a href={LEAVE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="focus-ring google-review-button google-review-button-secondary">{labels.leave}<ExternalLink size={15}/></a>
      </div>
    </div>
  </section>;
}
