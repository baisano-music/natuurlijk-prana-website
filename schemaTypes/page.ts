// schemaTypes/page.ts
// Met verbeterde internal linking en SEO/GEO checks

import { SEOCheckerInput } from './seoCheckerField'

export const pageType = {
  name: 'page',
  title: 'Pagina',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'links', title: 'Links & Relaties' },
    { name: 'organization', title: 'Organisatie' },
    { name: 'seo', title: 'SEO/GEO' },
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
      description: 'Voeg tekst en afbeeldingen toe. Gebruik de link-knop om naar andere pagina\'s te linken.',
      type: 'array',
      group: 'content',
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
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
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
    // Gerelateerde content voor internal linking
    {
      name: 'relatedPages',
      title: 'Gerelateerde pagina\'s',
      type: 'array',
      group: 'links',
      description: 'Selecteer gerelateerde content om onderaan te tonen (verbetert interne linking)',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'page' },
            { type: 'blog' },
            { type: 'dienst' },
            { type: 'remedie' },
          ],
        },
      ],
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(6),
    },
    {
      name: 'seo',
      title: 'SEO/GEO Instellingen',
      type: 'object',
      group: 'seo',
      description: 'Optimaliseer deze pagina voor zoekmachines en AI',
      components: {
        input: SEOCheckerInput,
      },
      fields: [
        {
          name: 'title',
          title: 'SEO Titel',
          type: 'string',
          description: 'Ideaal: 50-60 tekens. Laat leeg om paginatitel te gebruiken.',
          validation: (Rule: { max: (n: number) => { warning: (msg: string) => unknown } }) =>
            Rule.max(70).warning('Titel is langer dan aanbevolen voor zoekresultaten'),
        },
        {
          name: 'description',
          title: 'Meta Beschrijving',
          type: 'text',
          rows: 3,
          description: 'Ideaal: 120-160 tekens. Beschrijf waar de pagina over gaat.',
          validation: (Rule: { max: (n: number) => { warning: (msg: string) => unknown } }) =>
            Rule.max(170).warning('Beschrijving is langer dan aanbevolen'),
        },
        {
          name: 'focusKeyword',
          title: 'Focus Keyword',
          type: 'string',
          description: 'Het belangrijkste zoekwoord voor deze pagina',
        },
        {
          name: 'secondaryKeywords',
          title: 'Secundaire Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Extra zoekwoorden (max 5)',
          validation: (Rule: { max: (n: number) => unknown }) => Rule.max(5),
        },
        {
          name: 'noIndex',
          title: 'Niet indexeren',
          type: 'boolean',
          description: 'Verberg deze pagina voor zoekmachines',
          initialValue: false,
        },
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
