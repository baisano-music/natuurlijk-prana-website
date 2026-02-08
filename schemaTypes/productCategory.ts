// schemaTypes/productCategory.ts
// Hiërarchische categorieën voor producten
// - Hoofdcategorieën: Bloesemremedies, Celzouten, Essentiële Oliën (zonder parent)
// - Subcategorieën: PRANA Remedies, Alaskan Essences, etc. (met parent)

export const productCategoryType = {
  name: 'productCategory',
  title: 'Productcategorie',
  type: 'document',
  icon: () => '📂',
  fields: [
    {
      name: 'title',
      title: 'Naam',
      type: 'string',
      description: 'Bijv. "Bloesemremedies" of "PRANA Remedies"',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
      description: 'Wordt gebruikt in de URL: /producten/[slug]',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte beschrijving voor overzichtspagina\'s',
    },
    {
      name: 'parent',
      title: 'Bovenliggende categorie',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Selecteer de hoofdcategorie waar deze onder valt. Laat LEEG voor hoofdcategorieën (Bloesemremedies, Celzouten, etc.)',
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
