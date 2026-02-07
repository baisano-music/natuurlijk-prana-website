// schemaTypes/siteSettings.ts – Algemene site-instellingen (singleton)
export const siteSettingsType = {
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  groups: [
    { name: 'general', title: 'Algemeen' },
    { name: 'contact', title: 'Contact' },
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
