// schemaTypes/faq.ts - FAQ items voor GEO-optimalisatie
// FAQ secties met schema.org markup voor betere AI-vindbaarheid

export const faqType = {
  name: 'faq',
  title: 'Veelgestelde Vragen (FAQ)',
  type: 'document',
  icon: () => '❓',
  description: 'FAQ items worden automatisch voorzien van schema.org markup voor betere vindbaarheid in AI-zoekmachines',
  fields: [
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      description: 'Groepeer FAQ items per categorie',
      options: {
        list: [
          { title: 'Algemeen', value: 'algemeen' },
          { title: 'Bloesemremedies', value: 'bloesemremedies' },
          { title: 'Consulten & Sessies', value: 'consulten' },
          { title: 'Bestellen & Verzenden', value: 'bestellen' },
          { title: 'Over Natuurlijk Prana', value: 'over-ons' },
        ],
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'question',
      title: 'Vraag',
      type: 'string',
      description: 'De vraag zoals bezoekers deze zouden stellen',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Antwoord',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Geef een duidelijk en compleet antwoord. Tip: Begin met het directe antwoord, voeg daarna details toe.',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'shortAnswer',
      title: 'Kort antwoord (voor schema)',
      type: 'text',
      rows: 3,
      description: 'Een korte versie van het antwoord (max 300 tekens) voor zoekresultaten en AI',
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(300),
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers worden eerst getoond',
      initialValue: 99,
    },
    {
      name: 'featured',
      title: 'Uitgelicht op homepage',
      type: 'boolean',
      description: 'Toon deze FAQ op de homepage',
      initialValue: false,
    },
    {
      name: 'relatedPages',
      title: 'Gerelateerde pagina\'s',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'page' }, { type: 'remedie' }, { type: 'dienst' }],
        },
      ],
      description: 'Link naar relevante pagina\'s voor interne linking (GEO best practice)',
    },
  ],
  orderings: [
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Categorie',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      featured: 'featured',
    },
    prepare({
      title,
      subtitle,
      featured,
    }: {
      title?: string
      subtitle?: string
      featured?: boolean
    }) {
      const categoryNames: Record<string, string> = {
        algemeen: 'Algemeen',
        bloesemremedies: 'Bloesemremedies',
        consulten: 'Consulten & Sessies',
        bestellen: 'Bestellen & Verzenden',
        'over-ons': 'Over Natuurlijk Prana',
      }
      return {
        title: `${featured ? '⭐ ' : ''}${title || 'Nieuwe vraag'}`,
        subtitle: categoryNames[subtitle || ''] || subtitle,
      }
    },
  },
}

// FAQ Block type voor gebruik in rich text editors
export const faqBlockType = {
  name: 'faqBlock',
  title: 'FAQ Sectie',
  type: 'object',
  icon: () => '❓',
  fields: [
    {
      name: 'title',
      title: 'Sectie titel',
      type: 'string',
      initialValue: 'Veelgestelde vragen',
    },
    {
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Vraag',
              type: 'string',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Antwoord',
              type: 'text',
              rows: 4,
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }: { title?: string; items?: unknown[] }) {
      return {
        title: title || 'FAQ Sectie',
        subtitle: `${items?.length || 0} vragen`,
      }
    },
  },
}
