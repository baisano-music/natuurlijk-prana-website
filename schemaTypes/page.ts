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
      name: 'sections',
      title: 'Secties',
      type: 'array',
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
