// schemaTypes/page.ts
export const pageType = {
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
      description: 'Bijv. "over-mij" voor /over-mij',
    },
    {
      name: 'subtitle',
      title: 'Ondertitel',
      type: 'string',
      description: 'Optionele ondertitel onder de paginatitel',
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Optionele afbeelding bovenaan de pagina',
    },
    {
      name: 'content',
      title: 'Inhoud',
      description: 'Voeg tekst en afbeeldingen toe. Afbeeldingen kunnen links, rechts of over de volle breedte worden geplaatst.',
      type: 'array',
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
}
