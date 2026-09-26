const skeletonCards=Array.from({length:6},(_,i)=>i);

export default function InventoryLoading(){
  return <main className="mx-auto max-w-7xl px-4 py-8 md:py-12" aria-busy="true" aria-label="Loading inventory">
    <div className="motion-fade-up mb-8">
      <div className="skeleton-shimmer h-3 w-28 rounded-sm"/>
      <div className="skeleton-shimmer mt-3 h-10 w-52 rounded-sm"/>
      <div className="skeleton-shimmer mt-3 h-5 w-full max-w-2xl rounded-sm"/>
    </div>
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block"><div className="skeleton-shimmer h-72 w-full rounded-sm"/></div>
      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="skeleton-shimmer h-4 w-24 rounded-sm"/>
          <div className="skeleton-shimmer h-4 w-20 rounded-sm"/>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skeletonCards.map(i=><div key={i} className="overflow-hidden border border-gray-200 bg-white">
            <div className="skeleton-shimmer aspect-[4/3]"/>
            <div className="space-y-3 p-4">
              <div className="skeleton-shimmer h-3 w-20 rounded-sm"/>
              <div className="skeleton-shimmer h-6 w-4/5 rounded-sm"/>
              <div className="skeleton-shimmer h-4 w-2/3 rounded-sm"/>
              <div className="skeleton-shimmer h-10 w-full rounded-sm"/>
            </div>
          </div>)}
        </div>
      </section>
    </div>
  </main>
}
