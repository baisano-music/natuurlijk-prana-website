// schemaTypes/blog.ts
export const blogType = {
  name: 'blog',
  title: 'Blog / Inspiratie',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type bericht',
      type: 'string',
      options: {
        list: [
          { title: 'Verhaal', value: 'Verhaal' },
          { title: 'Inzicht', value: 'Inzicht' },
          { title: 'Nieuwsbrief', value: 'Nieuwsbrief' },
        ],
      },
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'text',
      rows: 4,
      description: 'Korte samenvatting voor overzicht (max 200 tekens)',
    },
    {
      name: 'publishedAt',
      title: 'Publicatiedatum',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bloesemtherapie', value: 'bloesemtherapie' },
          { title: 'Kinderen', value: 'kinderen' },
          { title: 'Hoogsensitiviteit', value: 'hsp' },
          { title: 'Celzouten', value: 'celzouten' },
          { title: 'Aromatherapie', value: 'aromatherapie' },
          { title: 'Tips & Advies', value: 'tips' },
        ],
      },
    },
    {
      name: 'draft',
      title: 'Concept?',
      type: 'boolean',
      initialValue: false,
      description: 'Concept artikelen worden niet op de website getoond',
    },
  ],
}
