// schemaTypes/testimonial.ts – Klantverhalen / ervaringen
export const testimonialType = {
  name: 'testimonial',
  title: 'Ervaringen / Testimonials',
  type: 'document',
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
      name: 'featured',
      title: 'Uitgelicht op homepage?',
      type: 'boolean',
      initialValue: false,
    },
  ],
}
