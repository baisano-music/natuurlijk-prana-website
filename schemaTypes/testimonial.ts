// schemaTypes/testimonial.ts – Klantverhalen / ervaringen
// Met rating en dienst-koppeling voor schema.org Review markup

export const testimonialType = {
  name: 'testimonial',
  title: 'Ervaringen / Testimonials',
  type: 'document',
  icon: () => '⭐',
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: 'string',
      description: 'Naam van de klant (optioneel anoniem)',
    },
    {
      name: 'initials',
      title: 'Initialen',
      type: 'string',
      description: 'Bijv. "M." als naam niet getoond wordt',
    },
    {
      name: 'quote',
      title: 'Citaat',
      type: 'text',
      rows: 4,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'Bijv. "Moeder van dochter (8)"',
    },
    {
      name: 'rating',
      title: 'Beoordeling (1-5 sterren)',
      type: 'number',
      description: 'Voor schema.org Review markup (rich snippets in Google)',
      validation: (Rule: { min: (n: number) => { max: (n: number) => unknown } }) =>
        Rule.min(1).max(5),
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ (5)', value: 5 },
          { title: '⭐⭐⭐⭐ (4)', value: 4 },
          { title: '⭐⭐⭐ (3)', value: 3 },
          { title: '⭐⭐ (2)', value: 2 },
          { title: '⭐ (1)', value: 1 },
        ],
      },
    },
    {
      name: 'relatedService',
      title: 'Gerelateerde dienst',
      type: 'reference',
      to: [{ type: 'dienst' }],
      description: 'Koppel deze ervaring aan een specifieke dienst',
    },
    {
      name: 'featured',
      title: 'Uitgelicht op homepage?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Datum',
      type: 'date',
      description: 'Wanneer is deze ervaring gedeeld?',
    },
  ],
  preview: {
    select: {
      title: 'name',
      initials: 'initials',
      quote: 'quote',
      rating: 'rating',
    },
    prepare({
      title,
      initials,
      quote,
      rating,
    }: {
      title?: string
      initials?: string
      quote?: string
      rating?: number
    }) {
      const stars = rating ? '⭐'.repeat(rating) : ''
      return {
        title: title || initials || 'Anoniem',
        subtitle: `${stars} ${quote?.substring(0, 50)}...`,
      }
    },
  },
}
