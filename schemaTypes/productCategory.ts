// schemaTypes/productCategory.ts
export const productCategoryType = {
  name: 'productCategory',
  title: 'Productcategorie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naam',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
    },
    {
      name: 'parent',
      title: 'Bovenliggende categorie',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Laat leeg voor hoofdcategorieën',
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Uitgebreide inhoud',
      description: 'Optionele uitgebreide tekst voor de categoriepagina',
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
            },
            {
              name: 'caption',
              title: 'Bijschrift',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      parentTitle: 'parent.title',
      media: 'image',
    },
    prepare({ title, parentTitle, media }: { title: string; parentTitle?: string; media?: unknown }) {
      return {
        title,
        subtitle: parentTitle ? `onder ${parentTitle}` : 'Hoofdcategorie',
        media,
      }
    },
  },
}
