import {ArrowRight,Phone} from 'lucide-react';
import {LocalizedLink} from '@/components/LocalizedLink';
import {getLocale} from '@/lib/locale-server';
import {tr} from '@/lib/i18n';

const faqs={
  en:[
    ['How do I find a part?','Start with the vehicle search using year, make and model, or browse the current inventory by category and keyword. If you have the VIN, you can decode it first and then search the identified vehicle.'],
    ['Can I use my VIN to identify the vehicle?','Yes. Enter the 17-character VIN in the VIN Decoder. It can return vehicle details such as year, make, model, trim, engine size and body type when those details are available from the VIN data source.'],
    ['Does the VIN decoder guarantee that a part will fit?','No. VIN decoding helps identify the vehicle, but final part compatibility should be confirmed against the specific listing and, when needed, by the MotherLand Auto Parts yard.'],
    ['Are the parts new or used?','The site is focused on quality used foreign auto parts. Individual listings show the condition information available for that part.'],
    ['What if I cannot find the part in the inventory?','Submit a Request a Part enquiry with your vehicle details, VIN if available, the part you need and your preferred contact method. The yard can then confirm availability and pricing.'],
    ['Can I send photos with my request?','Yes. The part-request form accepts up to five image or document attachments, which can help the yard understand what you are looking for.'],
    ['How do I confirm the price?','Listings that do not have a fixed price can be requested as a quote. Submit the request or contact the yard directly to confirm current availability and pricing.'],
    ['Where is MotherLand Auto Parts located?','MotherLand Auto Parts is located at 2182 Coffee Road, Suite G, Lithonia, GA 30058. Call the yard for current hours and help locating a specific part.']
  ],
  es:[
    ['¿Cómo encuentro una pieza?','Comience con la búsqueda por vehículo usando año, marca y modelo, o explore el inventario actual por categoría y palabra clave. Si tiene el VIN, puede decodificarlo primero y luego buscar el vehículo identificado.'],
    ['¿Puedo usar mi VIN para identificar el vehículo?','Sí. Ingrese el VIN de 17 caracteres en el Decodificador VIN. Puede mostrar datos como año, marca, modelo, versión, tamaño del motor y carrocería cuando estén disponibles.'],
    ['¿El decodificador VIN garantiza que una pieza sea compatible?','No. El VIN ayuda a identificar el vehículo, pero la compatibilidad final debe confirmarse con el anuncio específico y, cuando sea necesario, con el patio de MotherLand Auto Parts.'],
    ['¿Las piezas son nuevas o usadas?','El sitio se enfoca en autopartes extranjeras usadas de calidad. Cada anuncio muestra la información de condición disponible para esa pieza.'],
    ['¿Qué hago si no encuentro la pieza en el inventario?','Envíe una solicitud con los datos de su vehículo, el VIN si lo tiene, la pieza que necesita y su método de contacto preferido. El patio puede confirmar disponibilidad y precio.'],
    ['¿Puedo enviar fotos con mi solicitud?','Sí. El formulario de solicitud acepta hasta cinco archivos de imagen o documentos, lo que puede ayudar al patio a entender lo que busca.'],
    ['¿Cómo confirmo el precio?','Los anuncios sin precio fijo pueden solicitarse como cotización. Envíe la solicitud o contacte directamente al patio para confirmar disponibilidad y precio actuales.'],
    ['¿Dónde está MotherLand Auto Parts?','MotherLand Auto Parts está en 2182 Coffee Road, Suite G, Lithonia, GA 30058. Llame al patio para conocer el horario actual y recibir ayuda para localizar una pieza.']
  ]
} as const;

export async function generateMetadata(){const locale=await getLocale();return {title:locale==='es'?'Preguntas frecuentes':'FAQ',description:locale==='es'?'Preguntas frecuentes sobre cómo encontrar y solicitar autopartes extranjeras usadas.':'Frequently asked questions about finding and requesting used foreign auto parts from MotherLand Auto Parts in Lithonia, Georgia.'};}

export default async function FAQPage(){
  const locale=await getLocale();const t=(key:Parameters<typeof tr>[1])=>tr(locale,key);const list=faqs[locale];
  return <main className="mx-auto max-w-7xl px-4 py-10 md:py-14"><div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.2em] text-amber-700">{t('faq.eyebrow')}</p><h1 className="mt-2 text-4xl font-black md:text-5xl">{t('faq.title')}</h1><p className="mt-4 text-base leading-7 text-gray-600">{t('faq.intro')}</p></div>
    <div className="mt-9 grid gap-3 md:max-w-4xl">{list.map(([question,answer])=><details key={question} className="group border border-gray-200 bg-white"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-4 font-black [&::-webkit-details-marker]:hidden"><span>{question}</span><span aria-hidden="true" className="text-xl text-amber-700 transition-transform group-open:rotate-45">+</span></summary><div className="border-t border-gray-100 px-4 pb-5 pt-4 text-sm leading-6 text-gray-600">{answer}</div></details>)}</div>
    <section className="mt-10 flex flex-col gap-4 border border-gray-200 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between md:max-w-4xl"><div><h2 className="font-black">{t('faq.help')}</h2><p className="mt-1 text-sm text-gray-600">{t('faq.helpText')}</p></div><div className="flex flex-col gap-2 sm:flex-row"><LocalizedLink href="/inventory" className="inline-flex min-h-11 items-center justify-center gap-2 border border-gray-300 px-4 text-sm font-black">{t('common.browseInventory')} <ArrowRight size={15}/></LocalizedLink><a href="tel:+16785803666" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#d97706] px-4 text-sm font-black text-white"><Phone size={15}/>{t('common.callYard')}</a></div></section>
  </main>;
}