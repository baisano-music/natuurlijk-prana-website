// schemaTypes/dienst.ts – Diensten (consult, behandeling, etc.)
import type { Rule } from '@sanity/types'

export const dienstType = {
  name: 'dienst',
  title: 'Diensten',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (R: Rule) => R.required(),
    },
    {
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R: Rule) => R.required(),
    },
    {
      name: 'description',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 3,
      validation: (R: Rule) => R.required().max(160),
    },
    {
      name: 'icon',
      title: 'Icoon',
      type: 'string',
      description: 'Emoji of icoon naam',
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
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
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Bijschrift' },
          ],
        },
      ],
    },
    {
      name: 'duration',
      title: 'Duur',
      type: 'string',
      description: 'Bijvoorbeeld: 60 minuten',
    },
    {
      name: 'price',
      title: 'Prijs',
      type: 'string',
      description: 'Bijvoorbeeld: €85',
    },
    {
      name: 'featured',
      title: 'Uitgelicht op homepage?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers komen eerst',
      validation: (R: Rule) => R.required().integer().min(0),
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
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', order: 'order' },
  },
}
