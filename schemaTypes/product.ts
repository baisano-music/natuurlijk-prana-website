// schemaTypes/product.ts
// Producten die linken naar externe webshop

export const productType = {
  name: 'product',
  title: 'Producten (Shop)',
  type: 'document',
  icon: () => '🛒',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'shop', title: 'Shop & Prijs' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Productnaam',
      type: 'string',
      group: 'content',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
      group: 'content',
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'content',
      description: 'Selecteer de productcategorie',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      group: 'content',
      initialValue: 0,
      description: 'Lagere nummers worden eerst getoond',
    },
    {
      name: 'image',
      title: 'Productafbeelding',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      fields: [
        {
          name: 'alt',
          title: 'Alt tekst',
          type: 'string',
          description: 'Beschrijf de afbeelding voor toegankelijkheid',
        },
      ],
    },
    {
      name: 'shortDescription',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Wordt getoond in overzichten (max 200 tekens)',
    },
    {
      name: 'content',
      title: 'Uitgebreide beschrijving',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt tekst', type: 'string' },
            { name: 'caption', title: 'Bijschrift', type: 'string' },
          ],
        },
      ],
    },
    // Shop velden
    {
      name: 'shopUrl',
      title: 'Link naar webshop',
      type: 'url',
      group: 'shop',
      description: 'Directe link naar het product in je webshop',
      validation: (Rule: { uri: (opts: { scheme: string[] }) => unknown }) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'price',
      title: 'Prijs (optioneel)',
      type: 'string',
      group: 'shop',
      description: 'Bijv. "€12,95" of "Vanaf €8,50"',
    },
    {
      name: 'priceNote',
      title: 'Prijs toelichting',
      type: 'string',
      group: 'shop',
      description: 'Bijv. "per 100ml" of "excl. verzendkosten"',
    },
    {
      name: 'inStock',
      title: 'Op voorraad',
      type: 'boolean',
      group: 'shop',
      initialValue: true,
    },
    {
      name: 'shopButtonText',
      title: 'Knoptekst',
      type: 'string',
      group: 'shop',
      initialValue: 'Bekijk in shop',
      description: 'Tekst op de bestelknop',
    },
    // Varianten
    {
      name: 'variants',
      title: 'Varianten',
      type: 'array',
      group: 'shop',
      description: 'Optioneel: verschillende maten of uitvoeringen',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'name', title: 'Naam', type: 'string' },
            { name: 'price', title: 'Prijs', type: 'string' },
            { name: 'shopUrl', title: 'Shop link', type: 'url' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        },
      ],
    },
    // SEO
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'title',
          title: 'SEO Titel',
          type: 'string',
          description: 'Laat leeg om productnaam te gebruiken',
        },
        {
          name: 'description',
          title: 'Meta Beschrijving',
          type: 'text',
          rows: 3,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      categoryTitle: 'category.title',
      media: 'image',
      price: 'price',
    },
    prepare({
      title,
      categoryTitle,
      media,
      price,
    }: {
      title?: string
      categoryTitle?: string
      media?: unknown
      price?: string
    }) {
      return {
        title: title || 'Zonder naam',
        subtitle: `${categoryTitle || 'Geen categorie'}${price ? ` • ${price}` : ''}`,
        media,
      }
    },
  },
}
