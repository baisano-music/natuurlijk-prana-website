// schemaTypes/magazinePage.ts - Instellingen voor de Gratis Magazine pagina
export const magazinePageType = {
  name: 'magazinePage',
  title: 'Gratis Magazine Pagina',
  type: 'document',
  fields: [
    // Hero sectie
    {
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      description: 'Hoofdtitel in de hero sectie',
      initialValue: 'Gratis PRANA E-magazine',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Ondertitel',
      type: 'text',
      rows: 3,
      description: 'Tekst onder de hoofdtitel',
      initialValue: 'Ontvang inspiratie, praktische tips en persoonlijke verhalen over bloesemremedies en natuurlijke gezondheid — direct in je mailbox.',
    },
    {
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      description: 'Kleine badge tekst boven de titel',
      initialValue: '100% Gratis',
    },
    // Highlights sectie
    {
      name: 'highlightsTitle',
      title: 'Highlights Sectie Titel',
      type: 'string',
      description: 'Titel boven de highlights blokken',
      initialValue: 'Wat zit er in het magazine?',
    },
    {
      name: 'highlights',
      title: 'Magazine Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlight',
          title: 'Highlight',
          fields: [
            {
              name: 'icon',
              title: 'Icoon',
              type: 'string',
              options: {
                list: [
                  { title: 'Lamp (tips)', value: 'lightbulb' },
                  { title: 'Chat (interview)', value: 'chat' },
                  { title: 'Boek (recepten)', value: 'book' },
                  { title: 'Cadeau (bonus)', value: 'gift' },
                  { title: 'Hart', value: 'heart' },
                  { title: 'Ster', value: 'star' },
                  { title: 'Bloem', value: 'flower' },
                ],
              },
              initialValue: 'lightbulb',
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Beschrijving',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    },
    // CTA sectie onderaan
    {
      name: 'ctaTitle',
      title: 'CTA Titel',
      type: 'string',
      description: 'Titel van de onderste sectie',
      initialValue: 'Liever persoonlijk advies?',
    },
    {
      name: 'ctaText',
      title: 'CTA Tekst',
      type: 'text',
      rows: 3,
      description: 'Tekst in de CTA sectie',
      initialValue: 'Het e-magazine is een mooie eerste kennismaking. Wil je direct aan de slag met bloesemremedies die bij jouw situatie passen? Plan dan een gratis kennismakingsgesprek.',
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Knoptekst',
      type: 'string',
      initialValue: 'Plan een kennismakingsgesprek',
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Gratis Magazine Pagina',
        subtitle: 'Instellingen voor /gratis-magazine',
      }
    },
  },
}
