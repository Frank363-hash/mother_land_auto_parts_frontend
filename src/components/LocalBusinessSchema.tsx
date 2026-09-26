const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    '@id': `${siteUrl}/#business`,
    name: 'MotherLand Auto Parts',
    url: siteUrl,
    logo: `${siteUrl}/motherland-logo.png`,
    image: `${siteUrl}/motherland-logo.png`,
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+16785803666',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2182 Coffee Road, Suite G',
      addressLocality: 'Lithonia',
      addressRegion: 'GA',
      postalCode: '30058',
      addressCountry: 'US',
    },
    areaServed: 'Metro Atlanta',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
