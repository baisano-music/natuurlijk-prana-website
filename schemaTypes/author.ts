// schemaTypes/author.ts – Auteur profiel voor E-E-A-T SEO
// Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

export const authorType = {
  name: 'author',
  title: 'Auteur',
  type: 'document',
  icon: () => '👤',
  description: 'Auteursprofiel voor blog artikelen - belangrijk voor Google E-E-A-T',
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Profielfoto',
      type: 'image',
      options: { hotspot: true },
      description: 'Een professionele foto verhoogt de betrouwbaarheid',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
        },
      ],
    },
    {
      name: 'role',
      title: 'Rol / Functie',
      type: 'string',
      description: 'Bijv: "Bloesemtherapeut & Oprichtster PRANA"',
    },
    {
      name: 'bio',
      title: 'Biografie',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Korte achtergrond en expertise',
    },
    {
      name: 'credentials',
      title: 'Certificaten & Kwalificaties',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bijv: "25+ jaar ervaring", "BVEP gecertificeerd", "Alaskan Essences practitioner"',
    },
    {
      name: 'experience',
      title: 'Jaren ervaring',
      type: 'number',
      description: 'Wordt getoond bij auteursprofiel',
    },
    {
      name: 'social',
      title: 'Social media',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
      ],
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      description: 'Voor schema.org markup (niet publiek getoond)',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}
