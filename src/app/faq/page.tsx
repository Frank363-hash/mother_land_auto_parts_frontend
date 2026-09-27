import Link from 'next/link';
import {ArrowRight,Phone} from 'lucide-react';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about finding and requesting used foreign auto parts from MotherLand Auto Parts in Lithonia, Georgia.',
};

const faqs = [
  { question: 'How do I find a part?', answer: 'Start with the vehicle search using year, make and model, or browse the current inventory by category and keyword. If you have the VIN, you can decode it first and then search the identified vehicle.' },
  { question: 'Can I use my VIN to identify the vehicle?', answer: 'Yes. Enter the 17-character VIN in the VIN Decoder. It can return vehicle details such as year, make, model, trim, engine size and body type when those details are available from the VIN data source.' },
  { question: 'Does the VIN decoder guarantee that a part will fit?', answer: 'No. VIN decoding helps identify the vehicle, but final part compatibility should be confirmed against the specific listing and, when needed, by the MotherLand Auto Parts yard.' },
  { question: 'Are the parts new or used?', answer: 'The site is focused on quality used foreign auto parts. Individual listings show the condition information available for that part.' },
  { question: 'What if I cannot find the part in the inventory?', answer: 'Submit a Request a Part enquiry with your vehicle details, VIN if available, the part you need and your preferred contact method. The yard can then confirm availability and pricing.' },
  { question: 'Can I send photos with my request?', answer: 'Yes. The part-request form accepts up to five image or document attachments, which can help the yard understand what you are looking for.' },
  { question: 'How do I confirm the price?', answer: 'Listings that do not have a fixed price can be requested as a quote. Submit the request or contact the yard directly to confirm current availability and pricing.' },
  { question: 'Where is MotherLand Auto Parts located?', answer: 'MotherLand Auto Parts is located at 2182 Coffee Road, Suite G, Lithonia, GA 30058. Call the yard for current hours and help locating a specific part.' },
];

export default function FAQPage(){
  return <main className="mx-auto max-w-7xl px-4 py-10 md:py-14">
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Frequently asked questions</p>
      <h1 className="mt-2 text-4xl font-black md:text-5xl">Find the answers before you request.</h1>
      <p className="mt-4 text-base leading-7 text-gray-600">A quick guide to searching the inventory, using the VIN decoder and sending a part request to the yard.</p>
    </div>
    <div className="mt-9 grid gap-3 md:max-w-4xl">
      {faqs.map((faq)=><details key={faq.question} className="group border border-gray-200 bg-white">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-4 font-black [&::-webkit-details-marker]:hidden"><span>{faq.question}</span><span aria-hidden="true" className="text-xl text-amber-700 transition-transform group-open:rotate-45">+</span></summary>
        <div className="border-t border-gray-100 px-4 pb-5 pt-4 text-sm leading-6 text-gray-600">{faq.answer}</div>
      </details>)}
    </div>
    <section className="mt-10 flex flex-col gap-4 border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between md:max-w-4xl">
      <div><h2 className="font-black">Still need help?</h2><p className="mt-1 text-sm text-gray-600">Request the part or call the yard with your vehicle details.</p></div>
      <div className="flex flex-col gap-2 sm:flex-row"><Link href="/inventory" className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-black">Browse inventory <ArrowRight size={15}/></Link><a href="tel:+16785803666" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#d97706] px-4 text-sm font-black text-white"><Phone size={15}/>Call yard</a></div>
    </section>
  </main>;
}
