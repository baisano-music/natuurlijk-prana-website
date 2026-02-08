// schemaTypes/siteSettings.ts – Algemene site-instellingen (singleton)
// Inclusief LocalBusiness gegevens voor schema.org SEO

export const siteSettingsType = {
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  groups: [
    { name: 'general', title: 'Algemeen' },
    { name: 'disclaimers', title: 'Disclaimers' },
    { name: 'contact', title: 'Contact' },
    { name: 'business', title: 'Bedrijfsgegevens (SEO)' },
    { name: 'social', title: 'Social Media' },
    { name: 'footer', title: 'Footer' },
    { name: 'analytics', title: 'Analytics' },
  ],
  fields: [
    // Algemeen
    {
      name: 'title',
      title: 'Site Titel',
      type: 'string',
      group: 'general',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Beschrijving',
      type: 'text',
      group: 'general',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },

    // Disclaimers
    {
      name: 'blogDisclaimer',
      title: 'Nieuws/Blog Disclaimer',
      type: 'text',
      rows: 5,
      group: 'disclaimers',
      description: 'Deze tekst wordt automatisch onder alle nieuwsberichten getoond',
      initialValue: `Disclaimer
Bloesem-, edelsteen- en omgevingsremedies en celzouten worden gebruikt ter ondersteuning van persoonlijk welzijn en balans.
Ze zijn geen vervanging voor medische, psychologische of andere professionele zorg.
Bij klachten of twijfel wordt geadviseerd contact op te nemen met een arts of gekwalificeerd zorgverlener.`,
    },
    {
      name: 'productDisclaimer',
      title: 'Product Disclaimer',
      type: 'text',
      rows: 5,
      group: 'disclaimers',
      description: 'Optioneel: disclaimer voor productpagina\'s (remedies)',
    },

    // Contact
    {
      name: 'contactInfo',
      title: 'Contact Informatie',
      type: 'object',
      group: 'contact',
      fields: [
        { name: 'email', type: 'string', title: 'E-mail' },
        { name: 'phone', type: 'string', title: 'Telefoon' },
        { name: 'address', type: 'text', title: 'Adres' },
      ],
    },
    {
      name: 'openingHours',
      title: 'Openingstijden',
      type: 'text',
      rows: 4,
      group: 'contact',
    },
    {
      name: 'parkingInfo',
      title: 'Parkeergelegenheid info',
      type: 'string',
      group: 'contact',
      initialValue: 'Gratis parkeren voor de deur',
    },

    // Bedrijfsgegevens voor LocalBusiness schema.org (SEO)
    {
      name: 'localBusiness',
      title: 'LocalBusiness gegevens',
      type: 'object',
      group: 'business',
      description: 'Gestructureerde bedrijfsgegevens voor Google rich snippets en lokale SEO',
      fields: [
        {
          name: 'businessType',
          title: 'Type bedrijf',
          type: 'string',
          initialValue: 'HealthAndBeautyBusiness',
          options: {
            list: [
              { title: 'Health & Beauty Business', value: 'HealthAndBeautyBusiness' },
              { title: 'Medical Business', value: 'MedicalBusiness' },
              { title: 'Professional Service', value: 'ProfessionalService' },
            ],
          },
        },
        {
          name: 'legalName',
          title: 'Officiële bedrijfsnaam',
          type: 'string',
          description: 'Zoals geregistreerd bij KvK',
        },
        {
          name: 'kvkNumber',
          title: 'KvK nummer',
          type: 'string',
        },
        {
          name: 'vatNumber',
          title: 'BTW nummer',
          type: 'string',
        },
        {
          name: 'streetAddress',
          title: 'Straat + huisnummer',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postcode',
          type: 'string',
        },
        {
          name: 'city',
          title: 'Plaats',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Land',
          type: 'string',
          initialValue: 'NL',
        },
        {
          name: 'geo',
          title: 'Coördinaten',
          type: 'object',
          description: 'Voor Google Maps en lokale zoekresultaten',
          fields: [
            {
              name: 'lat',
              title: 'Latitude',
              type: 'number',
              description: 'Bijv: 52.3676',
            },
            {
              name: 'lng',
              title: 'Longitude',
              type: 'number',
              description: 'Bijv: 4.9041',
            },
          ],
        },
        {
          name: 'priceRange',
          title: 'Prijsklasse',
          type: 'string',
          options: {
            list: [
              { title: '€ (Budget)', value: '€' },
              { title: '€€ (Gemiddeld)', value: '€€' },
              { title: '€€€ (Premium)', value: '€€€' },
            ],
          },
          initialValue: '€€',
        },
        {
          name: 'openingHoursSpec',
          title: 'Openingstijden (schema.org formaat)',
          type: 'array',
          description: 'Gestructureerde openingstijden voor zoekmachines',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'dayOfWeek',
                  title: 'Dag(en)',
                  type: 'array',
                  of: [{ type: 'string' }],
                  options: {
                    list: [
                      { title: 'Maandag', value: 'Monday' },
                      { title: 'Dinsdag', value: 'Tuesday' },
                      { title: 'Woensdag', value: 'Wednesday' },
                      { title: 'Donderdag', value: 'Thursday' },
                      { title: 'Vrijdag', value: 'Friday' },
                      { title: 'Zaterdag', value: 'Saturday' },
                      { title: 'Zondag', value: 'Sunday' },
                    ],
                  },
                },
                { name: 'opens', title: 'Opent om', type: 'string', description: 'Bijv: 09:00' },
                { name: 'closes', title: 'Sluit om', type: 'string', description: 'Bijv: 17:00' },
              ],
              preview: {
                select: { days: 'dayOfWeek', opens: 'opens', closes: 'closes' },
                prepare({ days, opens, closes }: { days?: string[]; opens?: string; closes?: string }) {
                  return {
                    title: days?.join(', ') || 'Geen dagen',
                    subtitle: `${opens || '?'} - ${closes || '?'}`,
                  }
                },
              },
            },
          ],
        },
      ],
    },

    // Social Media
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      description: 'Vul alleen de platforms in die je wilt tonen',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'pinterest', type: 'url', title: 'Pinterest URL' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'youtube', type: 'url', title: 'YouTube URL' },
        { name: 'twitter', type: 'url', title: 'X (Twitter) URL' },
        { name: 'tiktok', type: 'url', title: 'TikTok URL' },
      ],
    },

    // Footer
    {
      name: 'footerNavigation',
      title: 'Footer Navigatie',
      type: 'array',
      group: 'footer',
      description: 'Voeg links toe voor de footer navigatie',
      of: [
        {
          type: 'object',
          title: 'Link',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL', description: 'Bijv. /remedies of https://externe-site.nl' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    },
    {
      name: 'footerBottomLinks',
      title: 'Footer Onderste Links',
      type: 'array',
      group: 'footer',
      description: 'Links onderaan de footer (naast copyright)',
      of: [
        {
          type: 'object',
          title: 'Link',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    },

    // Analytics
    {
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      group: 'analytics',
      description: 'Je GA4 Measurement ID (bijv. G-XXXXXXXXXX)',
      validation: (Rule: { custom: (fn: (value: string | undefined) => true | string) => unknown }) =>
        Rule.custom((value: string | undefined) => {
          if (!value) return true
          if (/^G-[A-Z0-9]+$/.test(value)) return true
          return 'Moet beginnen met G- gevolgd door letters en cijfers (bijv. G-ABC123DEF4)'
        }),
    },
    {
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
      group: 'analytics',
      description: 'Optioneel: GTM container ID (bijv. GTM-XXXXXXX)',
    },
  ],
}
