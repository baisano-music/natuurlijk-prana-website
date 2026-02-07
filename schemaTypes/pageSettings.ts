// schemaTypes/pageSettings.ts - Instellingen voor speciale pagina's
export const pageSettingsType = {
  name: 'pageSettings',
  title: 'Pagina Instellingen',
  type: 'document',
  fields: [
    {
      name: 'pageType',
      title: 'Pagina',
      type: 'string',
      options: {
        list: [
          { title: 'Contact', value: 'contact' },
          { title: 'Remedies overzicht', value: 'remedies' },
          { title: 'Nieuws overzicht', value: 'nieuws' },
          { title: 'Ervaringen', value: 'ervaringen' },
          { title: 'Producten', value: 'producten' },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    // Header sectie
    {
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      description: 'Hoofdtitel bovenaan de pagina',
    },
    {
      name: 'subtitle',
      title: 'Ondertitel',
      type: 'text',
      rows: 2,
      description: 'Korte introductietekst onder de titel',
    },
    // Optionele intro content
    {
      name: 'introContent',
      title: 'Introductie tekst',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Optionele uitgebreide introductie (wordt getoond onder de ondertitel)',
    },
    // CTA sectie onderaan
    {
      name: 'ctaTitle',
      title: 'CTA Titel',
      type: 'string',
      description: 'Titel van de call-to-action sectie onderaan',
    },
    {
      name: 'ctaText',
      title: 'CTA Tekst',
      type: 'text',
      rows: 2,
      description: 'Tekst in de CTA sectie',
    },
    {
      name: 'ctaButton',
      title: 'CTA Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Knoptekst', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
    },
    prepare({ title, pageType }: { title?: string; pageType?: string }) {
      const pageNames: Record<string, string> = {
        contact: 'Contact',
        remedies: 'Remedies overzicht',
        nieuws: 'Nieuws overzicht',
        ervaringen: 'Ervaringen',
        producten: 'Producten',
      }
      return {
        title: title || pageNames[pageType || ''] || 'Pagina-instellingen',
        subtitle: pageNames[pageType || ''] || pageType,
      }
    },
  },
}
