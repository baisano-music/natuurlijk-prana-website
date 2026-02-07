// schemaTypes/page.ts
export const pageType = {
  name: 'page',
  title: 'Pagina',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'organization', title: 'Organisatie' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      group: 'content',
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
      description: 'Bijv. "over-mij" voor /over-mij',
      group: 'content',
    },
    {
      name: 'subtitle',
      title: 'Ondertitel',
      type: 'string',
      description: 'Optionele ondertitel onder de paginatitel',
      group: 'content',
    },
    // Organisatie velden
    {
      name: 'parentPage',
      title: 'Bovenliggende pagina',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Selecteer een pagina waar deze onder valt (optioneel)',
      group: 'organization',
    },
    {
      name: 'productCategory',
      title: 'Productcategorie',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Koppel deze pagina aan een productcategorie (optioneel)',
      group: 'organization',
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers worden eerst getoond',
      initialValue: 0,
      group: 'organization',
    },
    {
      name: 'showInNavigation',
      title: 'Tonen in navigatie',
      type: 'boolean',
      description: 'Toon deze pagina in het menu van de productcategorie',
      initialValue: true,
      group: 'organization',
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Optionele afbeelding bovenaan de pagina',
      group: 'content',
    },
    {
      name: 'content',
      title: 'Inhoud',
      description: 'Voeg tekst en afbeeldingen toe. Afbeeldingen kunnen links, rechts of over de volle breedte worden geplaatst.',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              description: 'Beschrijving voor toegankelijkheid',
            },
            {
              name: 'caption',
              title: 'Bijschrift',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Positie',
              type: 'string',
              options: {
                list: [
                  { title: 'Links in tekst', value: 'left' },
                  { title: 'Rechts in tekst', value: 'right' },
                  { title: 'Volle breedte', value: 'full' },
                  { title: 'Gecentreerd', value: 'center' },
                ],
              },
              initialValue: 'full',
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'title', title: 'SEO Titel', type: 'string' },
        { name: 'description', title: 'Meta Beschrijving', type: 'text', rows: 3 },
      ],
    },
    // Legacy veld - behouden voor oude content
    {
      name: 'sections',
      title: 'Secties (oud formaat)',
      type: 'array',
      hidden: true,
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content sectie',
          fields: [
            {
              name: 'heading',
              title: 'Koptekst',
              type: 'string',
            },
            {
              name: 'body',
              title: 'Tekst',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      parentTitle: 'parentPage.title',
      categoryTitle: 'productCategory.title',
      media: 'mainImage',
    },
    prepare({ title, parentTitle, categoryTitle, media }: {
      title?: string
      parentTitle?: string
      categoryTitle?: string
      media?: unknown
    }) {
      const subtitle = categoryTitle
        ? `In: ${categoryTitle}`
        : parentTitle
          ? `Onder: ${parentTitle}`
          : 'Losse pagina'
      return {
        title: title || 'Zonder titel',
        subtitle,
        media,
      }
    },
  },
}
