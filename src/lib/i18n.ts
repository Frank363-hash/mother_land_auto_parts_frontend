export type Locale = 'en' | 'es';

const messages = {
  en: {
    'header.inventory':'Inventory','header.about':'About','header.faq':'FAQ','header.contact':'Contact',
    'header.whatsapp':'WhatsApp','header.whatsappYard':'WhatsApp the Yard','header.callHours':'Call for current yard hours',
    'header.openMenu':'Open navigation menu','header.closeMenu':'Close navigation menu','header.home':'MotherLand Auto Parts home',
    'header.language':'Language','header.english':'English','header.spanish':'Spanish',
    'footer.quality':'Quality used foreign auto parts for drivers, mechanics and repair shops across Metro-Atlanta.',
    'footer.yard':'Yard','footer.contact':'Contact','footer.directions':'Get directions →','footer.follow':'Follow MotherLand Auto Parts on social media.',
    'footer.about':'About →','footer.faq':'FAQ →','footer.contactYard':'Contact the yard →','footer.map':'MotherLand Auto Parts yard map',
    'home.eyebrow':'QUALITY USED FOREIGN AUTO PARTS • METRO-ATLANTA','home.title':'Find the right part. Get back on the road.',
    'home.intro':'Looking for a quality used part for your foreign vehicle? Search by vehicle or keyword, decode your VIN, and send the details to our yard when you are ready.',
    'home.call':'Call Yard','home.find':'Find a Part','home.yard':'Lithonia Yard','home.specific':'Need something specific?',
    'home.send':'Send a request and the yard can confirm availability and price.','home.arrivals':'Yard arrivals','home.recent':'Recent inventory',
    'home.viewAll':'View all inventory →','home.loading':'Inventory is loading or currently unavailable.','home.searchOrCall':'Use the inventory search or call the yard for help.',
    'home.simple':'Simple parts search','home.processTitle':'Find it. Verify it. Request it.',
    'home.processText':'Use the vehicle search or VIN decoder, review the available part details, then send the yard exactly what you need.',
    'home.findVehicle':'Find the vehicle','home.findVehicleText':'Choose your year, make and model or use the VIN decoder to identify the vehicle before searching.',
    'home.reviewPart':'Review the part','home.reviewPartText':'Check photos, condition, compatibility, stock status and the information available for each listing.',
    'home.sendRequest':'Send the request','home.sendRequestText':'Submit your contact details and part information so the yard can confirm availability and price.',
    'home.cantFind':'Can’t find what you need?','home.cantFindText':'Send the vehicle details and part you’re looking for. The yard can help with the search.',
    'home.requestPart':'Request a Part',
    'common.callYard':'Call Yard','common.browseInventory':'Browse inventory','common.requestPart':'Request a Part','common.price':'Price',
    'vehicle.year':'Year','vehicle.make':'Make','vehicle.model':'Model','vehicle.category':'Category','vehicle.find':'Find Parts',
    'vehicle.anyYear':'Year','vehicle.selectMake':'Make','vehicle.selectModel':'Model','vehicle.selectCategory':'Category',
    'vin.eyebrow':'VIN Decoder','vin.title':'Know the vehicle before you request the part.',
    'vin.intro':'Enter the 17-character VIN to identify the vehicle, then use the result to jump straight into compatible inventory or start a part request.',
    'vin.placeholder':'Enter 17-character VIN','vin.decode':'Decode VIN','vin.decoding':'Decoding…','vin.invalid':'Enter a valid 17-character VIN.',
    'vin.failed':'VIN decoding failed.','vin.vehicleIdentified':'Vehicle identified','vin.detailsFound':'Vehicle details found',
    'vin.findParts':'Find parts for this vehicle','vin.request':'Request a Part','vin.year':'Year','vin.makeModel':'Make / Model','vin.trim':'Trim','vin.engine':'Engine','vin.body':'Body Type','vin.drive':'Drive Type',
    'inventory.eyebrow':'Yard inventory','inventory.title':'Find a Part','inventory.intro':'Search current inventory by vehicle, category, keyword and page.',
    'inventory.resultOne':'result','inventory.resultMany':'results','inventory.page':'Page','inventory.noMatchEyebrow':'Inventory search',
    'inventory.noMatch':'No parts currently match your search.','inventory.changes':'Our yard inventory changes frequently. Call the yard for assistance finding a specific part.',
    'inventory.clear':'Clear Search','inventory.pages':'Inventory pages','inventory.previous':'Previous','inventory.next':'Next',
    'filters.button':'Filters','filters.keyword':'Keyword','filters.keywordPlaceholder':'Part, SKU, description','filters.year':'Year',
    'filters.anyYear':'Any year','filters.make':'Make','filters.makePlaceholder':'Toyota','filters.model':'Model','filters.modelPlaceholder':'Camry',
    'filters.category':'Category','filters.allCategories':'All categories','filters.apply':'Apply Filters','filters.clear':'Clear filters',
    'part.noImage':'NO IMAGE','part.viewDetails':'View Details','part.request':'Request','part.addRequest':'Add to Request',
    'part.inStock':'In stock','part.callAvailability':'Call for availability','part.quote':'Request a quote','part.sku':'SKU',
    'part.inventory':'Inventory','part.condition':'Condition','part.availability':'Availability','part.outOfStock':'Out of stock',
    'part.quoteRequired':'Quote required','part.yardLocation':'Yard location','part.callYard':'Call yard','part.description':'Description',
    'part.compatibility':'Vehicle compatibility','part.compatibleInventory':'See compatible inventory','part.specifications':'Part specifications',
    'part.back':'Inventory','part.details':'Part details','part.whatsapp':'WhatsApp',
    'about.eyebrow':'About MotherLand Auto Parts','about.title':'Quality used foreign auto parts, right here in Metro-Atlanta.',
    'about.intro':'From our Lithonia yard, we help drivers, mechanics and repair shops find quality used parts for foreign vehicles across Metro-Atlanta.',
    'about.partsEyebrow':'Parts for the vehicles you drive','about.partsTitle':'Quality used parts for foreign cars',
    'about.p1':'MotherLand Auto Parts sells a wide range of quality used auto parts for foreign cars such as Toyota, Honda, Acura, Lexus, Mercedes-Benz, BMW, Hyundai, and KIA.',
    'about.p2':'Tell us what you need, search by year, make and model, or use your VIN to narrow the search. When you find the right part, you can send the request straight to the yard.',
    'about.visit':'Visit the yard','about.hours':'Call the yard for current hours and help locating a specific part.',
    'contact.eyebrow':'Contact the yard','contact.title':'Come by, call, or send a message.','contact.connect':'Connect with MotherLand',
    'contact.follow':'Follow the yard for updates and new arrivals.','contact.enquiry':'Send an enquiry','contact.name':'Name','contact.email':'Email',
    'contact.phone':'Phone','contact.subject':'Subject','contact.message':'Message','contact.send':'Send Message',
    'contact.sent':'Thanks — your message has been sent.','contact.failed':'Unable to send message.',
    'faq.eyebrow':'Frequently asked questions','faq.title':'Find the answers before you request.',
    'faq.intro':'A quick guide to searching the inventory, using the VIN decoder and sending a part request to the yard.',
    'faq.help':'Still need help?','faq.helpText':'Request the part or call the yard with your vehicle details.',
    'gallery.eyebrow':'Built around the yard','gallery.title':'Parts you need. Service you can trust.',
    'gallery.text':'Take a look at the parts, vehicles and yard behind MotherLand Auto Parts.',
    'gallery.previous':'Previous MotherLand image','gallery.next':'Next MotherLand image','gallery.slides':'Gallery slides',
    'gallery.usedMetro':'Used foreign parts for Metro-Atlanta.',
    'marquee.aria':'MotherLand Auto Parts specialties','marquee.parts':'Quality used foreign auto parts',
    'quote.received':'Request received.','quote.done':'Done','quote.name':'Name','quote.phone':'Phone','quote.email':'Email',
    'quote.vin':'VIN (optional)','quote.preferred':'Preferred contact','quote.phoneCall':'Phone call','quote.notes':'Notes',
    'quote.files':'Photos / documents (up to 5)','quote.choose':'Choose files','quote.selected':'file(s) selected.',
    'quote.submit':'Submit Request','quote.submitting':'Submitting…','quote.part':'Request This Part','quote.request':'Request a Part',
    'quote.whatsapp':'WhatsApp','quote.emailContact':'Email','quote.photos':'Photos / documents',
  },
  es: {
    'header.inventory':'Inventario','header.about':'Nosotros','header.faq':'Preguntas frecuentes','header.contact':'Contacto',
    'header.whatsapp':'WhatsApp','header.whatsappYard':'WhatsApp al patio','header.callHours':'Llame para conocer el horario actual del patio',
    'header.openMenu':'Abrir menú de navegación','header.closeMenu':'Cerrar menú de navegación','header.home':'Inicio de MotherLand Auto Parts',
    'header.language':'Idioma','header.english':'Inglés','header.spanish':'Español',
    'footer.quality':'Autopartes extranjeras usadas de calidad para conductores, mecánicos y talleres de reparación en Metro-Atlanta.',
    'footer.yard':'Patio','footer.contact':'Contacto','footer.directions':'Cómo llegar →','footer.follow':'Siga a MotherLand Auto Parts en las redes sociales.',
    'footer.about':'Nosotros →','footer.faq':'Preguntas frecuentes →','footer.contactYard':'Contactar al patio →','footer.map':'Mapa del patio de MotherLand Auto Parts',
    'home.eyebrow':'AUTOPARTES EXTRANJERAS USADAS DE CALIDAD • METRO-ATLANTA','home.title':'Encuentre la pieza correcta. Vuelva a la carretera.',
    'home.intro':'¿Busca una pieza usada de calidad para su vehículo extranjero? Busque por vehículo o palabra clave, decodifique su VIN y envíe los detalles a nuestro patio cuando esté listo.',
    'home.call':'Llamar al patio','home.find':'Buscar una pieza','home.yard':'Patio de Lithonia','home.specific':'¿Busca algo específico?',
    'home.send':'Envíe una solicitud y el patio puede confirmar disponibilidad y precio.','home.arrivals':'Llegadas al patio','home.recent':'Inventario reciente',
    'home.viewAll':'Ver todo el inventario →','home.loading':'El inventario se está cargando o no está disponible actualmente.','home.searchOrCall':'Use la búsqueda de inventario o llame al patio para obtener ayuda.',
    'home.simple':'Búsqueda sencilla de piezas','home.processTitle':'Encuéntrela. Verifíquela. Solicítela.',
    'home.processText':'Use la búsqueda por vehículo o el decodificador VIN, revise los detalles disponibles de la pieza y luego envíe al patio exactamente lo que necesita.',
    'home.findVehicle':'Encuentre el vehículo','home.findVehicleText':'Elija el año, marca y modelo o use el decodificador VIN para identificar el vehículo antes de buscar.',
    'home.reviewPart':'Revise la pieza','home.reviewPartText':'Compruebe fotos, condición, compatibilidad, disponibilidad y la información disponible de cada anuncio.',
    'home.sendRequest':'Envíe la solicitud','home.sendRequestText':'Envíe sus datos de contacto y la información de la pieza para que el patio pueda confirmar disponibilidad y precio.',
    'home.cantFind':'¿No encuentra lo que necesita?','home.cantFindText':'Envíe los datos del vehículo y la pieza que busca. El patio puede ayudarle con la búsqueda.',
    'home.requestPart':'Solicitar una pieza',
    'common.callYard':'Llamar al patio','common.browseInventory':'Ver inventario','common.requestPart':'Solicitar una pieza','common.price':'Precio',
    'vehicle.year':'Año','vehicle.make':'Marca','vehicle.model':'Modelo','vehicle.category':'Categoría','vehicle.find':'Buscar piezas',
    'vehicle.anyYear':'Año','vehicle.selectMake':'Marca','vehicle.selectModel':'Modelo','vehicle.selectCategory':'Categoría',
    'vin.eyebrow':'Decodificador VIN','vin.title':'Conozca el vehículo antes de solicitar la pieza.',
    'vin.intro':'Ingrese el VIN de 17 caracteres para identificar el vehículo y luego use el resultado para consultar el inventario compatible o iniciar una solicitud.',
    'vin.placeholder':'Ingrese el VIN de 17 caracteres','vin.decode':'Decodificar VIN','vin.decoding':'Decodificando…','vin.invalid':'Ingrese un VIN válido de 17 caracteres.',
    'vin.failed':'No se pudo decodificar el VIN.','vin.vehicleIdentified':'Vehículo identificado','vin.detailsFound':'Detalles del vehículo encontrados',
    'vin.findParts':'Buscar piezas para este vehículo','vin.request':'Solicitar una pieza','vin.year':'Año','vin.makeModel':'Marca / Modelo','vin.trim':'Versión','vin.engine':'Motor','vin.body':'Tipo de carrocería','vin.drive':'Tracción',
    'inventory.eyebrow':'Inventario del patio','inventory.title':'Buscar una pieza','inventory.intro':'Busque en el inventario actual por vehículo, categoría, palabra clave y página.',
    'inventory.resultOne':'resultado','inventory.resultMany':'resultados','inventory.page':'Página','inventory.noMatchEyebrow':'Búsqueda de inventario',
    'inventory.noMatch':'Ninguna pieza coincide con su búsqueda.','inventory.changes':'Nuestro inventario cambia con frecuencia. Llame al patio para ayuda a encontrar una pieza específica.',
    'inventory.clear':'Borrar búsqueda','inventory.pages':'Páginas del inventario','inventory.previous':'Anterior','inventory.next':'Siguiente',
    'filters.button':'Filtros','filters.keyword':'Palabra clave','filters.keywordPlaceholder':'Pieza, SKU, descripción','filters.year':'Año',
    'filters.anyYear':'Cualquier año','filters.make':'Marca','filters.makePlaceholder':'Toyota','filters.model':'Modelo','filters.modelPlaceholder':'Camry',
    'filters.category':'Categoría','filters.allCategories':'Todas las categorías','filters.apply':'Aplicar filtros','filters.clear':'Borrar filtros',
    'part.noImage':'SIN IMAGEN','part.viewDetails':'Ver detalles','part.request':'Solicitar','part.addRequest':'Añadir a la solicitud',
    'part.inStock':'Disponible','part.callAvailability':'Llame para disponibilidad','part.quote':'Solicitar cotización','part.sku':'SKU',
    'part.inventory':'Inventario','part.condition':'Condición','part.availability':'Disponibilidad','part.outOfStock':'Agotado',
    'part.quoteRequired':'Se requiere cotización','part.yardLocation':'Ubicación en el patio','part.callYard':'Llamar al patio','part.description':'Descripción',
    'part.compatibility':'Compatibilidad del vehículo','part.compatibleInventory':'Ver inventario compatible','part.specifications':'Especificaciones de la pieza',
    'part.back':'Inventario','part.details':'Detalles de la pieza','part.whatsapp':'WhatsApp',
    'about.eyebrow':'Sobre MotherLand Auto Parts','about.title':'Autopartes extranjeras usadas de calidad, aquí mismo en Metro-Atlanta.',
    'about.intro':'Desde nuestro patio en Lithonia, ayudamos a conductores, mecánicos y talleres a encontrar piezas usadas de calidad para vehículos extranjeros en Metro-Atlanta.',
    'about.partsEyebrow':'Piezas para los vehículos que conduce','about.partsTitle':'Piezas usadas de calidad para autos extranjeros',
    'about.p1':'MotherLand Auto Parts vende una amplia variedad de autopartes usadas de calidad para vehículos extranjeros como Toyota, Honda, Acura, Lexus, Mercedes-Benz, BMW, Hyundai y KIA.',
    'about.p2':'Díganos qué necesita, busque por año, marca y modelo, o use su VIN para reducir la búsqueda. Cuando encuentre la pieza correcta, puede enviar la solicitud directamente al patio.',
    'about.visit':'Visite el patio','about.hours':'Llame al patio para conocer el horario actual y recibir ayuda para localizar una pieza específica.',
    'contact.eyebrow':'Contacte al patio','contact.title':'Visítenos, llame o envíe un mensaje.','contact.connect':'Conéctese con MotherLand',
    'contact.follow':'Siga al patio para conocer novedades y nuevas llegadas.','contact.enquiry':'Enviar una consulta','contact.name':'Nombre','contact.email':'Correo electrónico',
    'contact.phone':'Teléfono','contact.subject':'Asunto','contact.message':'Mensaje','contact.send':'Enviar mensaje',
    'contact.sent':'Gracias — su mensaje ha sido enviado.','contact.failed':'No se pudo enviar el mensaje.',
    'faq.eyebrow':'Preguntas frecuentes','faq.title':'Encuentre las respuestas antes de solicitar.',
    'faq.intro':'Una guía rápida para buscar en el inventario, usar el decodificador VIN y enviar una solicitud de pieza al patio.',
    'faq.help':'¿Todavía necesita ayuda?','faq.helpText':'Solicite la pieza o llame al patio con los datos de su vehículo.',
    'gallery.eyebrow':'Todo gira alrededor del patio','gallery.title':'Las piezas que necesita. El servicio en el que puede confiar.',
    'gallery.text':'Conozca las piezas, vehículos y el patio detrás de MotherLand Auto Parts.',
    'gallery.previous':'Imagen anterior de MotherLand','gallery.next':'Siguiente imagen de MotherLand','gallery.slides':'Diapositivas de la galería',
    'gallery.usedMetro':'Piezas extranjeras usadas para Metro-Atlanta.',
    'marquee.aria':'Especialidades de MotherLand Auto Parts','marquee.parts':'Autopartes extranjeras usadas de calidad',
    'quote.received':'Solicitud recibida.','quote.done':'Listo','quote.name':'Nombre','quote.phone':'Teléfono','quote.email':'Correo electrónico',
    'quote.vin':'VIN (opcional)','quote.preferred':'Contacto preferido','quote.phoneCall':'Llamada telefónica','quote.notes':'Notas',
    'quote.files':'Fotos / documentos (hasta 5)','quote.choose':'Elegir archivos','quote.selected':'archivo(s) seleccionado(s).',
    'quote.submit':'Enviar solicitud','quote.submitting':'Enviando…','quote.part':'Solicitar esta pieza','quote.request':'Solicitar una pieza',
    'quote.whatsapp':'WhatsApp','quote.emailContact':'Correo electrónico','quote.photos':'Fotos / documentos',
  }
} as const;

export function tr(locale:Locale,key:keyof typeof messages.en):string {
  return messages[locale][key] || messages.en[key] || key;
}

const categoryNames:Record<string,string> = {
  'engines':'Engines','transmissions':'Transmissions','differentials / rear ends':'Differentials / Rear Ends',
  'front hubs & bearings':'Front Hubs & Bearings','alternators':'Alternators','power steering pumps':'Power Steering Pumps',
  'a/c compressors':'A/C Compressors','starters':'Starters'
};
const categorySpanish:Record<string,string> = {
  engines:'Motores',transmissions:'Transmisiones','differentials / rear ends':'Diferenciales / Ejes traseros',
  'front hubs & bearings':'Mazas y rodamientos delanteros',alternators:'Alternadores','power steering pumps':'Bombas de dirección asistida',
  'a/c compressors':'Compresores de A/C',starters:'Motores de arranque'
};
export function translateCategory(name:string,locale:Locale){const key=name.trim().toLowerCase();return locale==='es'?(categorySpanish[key]||name):(categoryNames[key]||name);}
export function translateCondition(value:string,locale:Locale){if(locale==='en')return value.replace('_',' ');const map:Record<string,string>={'GRADE_A':'Grado A','GRADE_B':'Grado B','OEM_USED':'Usado OEM'};return map[value]||value.replace('_',' ');}
export function translateSpecLabel(label:string,locale:Locale){
  if(locale==='en')return label;
  const map:Record<string,string>={'Engine Type':'Tipo de motor','Engine Size':'Tamaño del motor','Cylinders':'Cilindros','Fuel Type':'Tipo de combustible','Engine Code':'Código del motor','Transmission Type':'Tipo de transmisión','Drive Type':'Tipo de tracción','Mileage':'Millaje','Donor Vehicle':'Vehículo donante','Donor VIN':'VIN del donante','Warranty':'Garantía','Speeds':'Velocidades','Transmission Code':'Código de transmisión','Compatible Engine':'Motor compatible','Differential Type':'Tipo de diferencial','Gear Ratio':'Relación de engranajes','Axle Code':'Código del eje','Hub Type':'Tipo de maza','ABS':'ABS','Amperage':'Amperaje','Part Number':'Número de pieza','Plug Type':'Tipo de conector','Pulley Type':'Tipo de polea','Reservoir':'Depósito','Compressor Type':'Tipo de compresor','Refrigerant':'Refrigerante','Terminal Type':'Tipo de terminal','Mounting':'Montaje'};
  return map[label]||label;
}

export function localizedPath(path:string,locale:Locale){
  if(!path.startsWith('/')) return path;
  const withoutLocale=path==='/es'?'/':path.startsWith('/es/')?path.slice(3):path;
  if(locale==='es') return withoutLocale==='/'?'/es':`/es${withoutLocale}`;
  return withoutLocale||'/';
}