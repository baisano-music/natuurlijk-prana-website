// schemaTypes/blog.ts
// Blog artikelen met auteur referentie voor E-E-A-T SEO
// Inclusief internal linking en SEO/GEO optimalisatie

import { SEOCheckerInput } from './seoCheckerField'

export const blogType = {
  name: 'blog',
  title: 'Blog / Inspiratie',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'links', title: 'Links & Relaties' },
    { name: 'seo', title: 'SEO/GEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'content',
      description: 'Belangrijk voor E-E-A-T SEO - koppel aan een auteursprofiel',
    },
    {
      name: 'type',
      title: 'Type bericht',
      type: 'string',
      group: 'content',
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
      group: 'content',
      options: { source: 'title' },
    },
    {
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Korte samenvatting voor overzicht en meta beschrijving (max 200 tekens)',
    },
    {
      name: 'publishedAt',
      title: 'Publicatiedatum',
      type: 'datetime',
      group: 'content',
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt tekst',
          type: 'string',
          description: 'Beschrijf de afbeelding (belangrijk voor SEO)',
        },
      ],
    },
    {
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      group: 'content',
      description: 'Gebruik de link-knop om naar andere pagina\'s te linken',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Externe Link',
                icon: () => '🌐',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Interne Link',
                icon: () => '🔗',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Link naar',
                    to: [
                      { type: 'page' },
                      { type: 'blog' },
                      { type: 'dienst' },
                      { type: 'remedie' },
                      { type: 'faq' },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt tekst', type: 'string' },
            { name: 'caption', title: 'Bijschrift', type: 'string' },
          ],
        },
        { type: 'callout' },
      ],
    },
    {
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      group: 'content',
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
      group: 'content',
      initialValue: false,
      description: 'Concept artikelen worden niet op de website getoond',
    },
    // Gerelateerde content
    {
      name: 'relatedPosts',
      title: 'Gerelateerde artikelen',
      type: 'array',
      group: 'links',
      description: 'Selecteer gerelateerde content om onderaan te tonen',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'blog' },
            { type: 'page' },
            { type: 'dienst' },
            { type: 'remedie' },
          ],
        },
      ],
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(4),
    },
    // SEO/GEO velden
    {
      name: 'seo',
      title: 'SEO/GEO Optimalisatie',
      type: 'object',
      group: 'seo',
      description: 'Optimaliseer dit artikel voor zoekmachines en AI',
      components: {
        input: SEOCheckerInput,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'SEO Titel',
          type: 'string',
          description: 'Ideaal: 50-60 tekens. Laat leeg om artikeltitel te gebruiken.',
          validation: (Rule: { max: (n: number) => { warning: (msg: string) => unknown } }) =>
            Rule.max(70).warning('Titel is langer dan aanbevolen'),
        },
        {
          name: 'metaDescription',
          title: 'Meta Beschrijving',
          type: 'text',
          rows: 3,
          description: 'Ideaal: 120-160 tekens. Laat leeg om samenvatting te gebruiken.',
          validation: (Rule: { max: (n: number) => { warning: (msg: string) => unknown } }) =>
            Rule.max(170).warning('Beschrijving is langer dan aanbevolen'),
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
          description: 'Het belangrijkste zoekwoord voor dit artikel',
        },
        {
          name: 'secondaryKeywords',
          title: 'Secundaire Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Extra zoekwoorden (max 5)',
          validation: (Rule: { max: (n: number) => unknown }) => Rule.max(5),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
      draft: 'draft',
    },
    prepare({
      title,
      author,
      media,
      date,
      draft,
    }: {
      title?: string
      author?: string
      media?: unknown
      date?: string
      draft?: boolean
    }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Geen datum'
      return {
        title: `${draft ? '📝 ' : ''}${title || 'Zonder titel'}`,
        subtitle: `${author || 'Geen auteur'} • ${formattedDate}`,
        media,
      }
    },
  },
}
