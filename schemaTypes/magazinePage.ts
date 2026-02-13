// schemaTypes/magazinePage.ts - Instellingen voor de Gratis Magazine pagina

const colorOptions = [
  { title: 'Geen (standaard)', value: '' },
  { title: 'Cream', value: '#faf8f5' },
  { title: 'Wit', value: '#ffffff' },
  { title: 'Peach licht', value: '#faf0eb' },
  { title: 'Peach donker', value: '#f5d5c8' },
  { title: 'Sage licht', value: '#e8efe9' },
  { title: 'Sage', value: '#d1dfd3' },
  { title: 'Terracotta licht', value: '#e5a77d' },
  { title: 'Terracotta', value: '#d28a58' },
  { title: 'Coral', value: '#d87f81' },
  { title: 'Oranje', value: '#f5a649' },
]

const sectionStyleFields = [
  {
    name: 'backgroundColor',
    title: 'Achtergrondkleur',
    type: 'string',
    options: { list: colorOptions },
    description: 'Kies een achtergrondkleur voor deze sectie',
  },
  {
    name: 'backgroundImage',
    title: 'Achtergrondafbeelding',
    type: 'image',
    options: { hotspot: true },
    description: 'Optionele achtergrondafbeelding (wordt getoond achter de inhoud met overlay)',
  },
  {
    name: 'backgroundOverlay',
    title: 'Overlay sterkte',
    type: 'string',
    options: {
      list: [
        { title: 'Licht (30%)', value: 'light' },
        { title: 'Gemiddeld (50%)', value: 'medium' },
        { title: 'Donker (70%)', value: 'dark' },
      ],
    },
    description: 'Hoe sterk de overlay over de achtergrondafbeelding is (voor leesbaarheid)',
    initialValue: 'medium',
    hidden: ({ parent }: { parent?: { backgroundImage?: unknown } }) => !parent?.backgroundImage,
  },
  {
    name: 'textColor',
    title: 'Tekstkleur',
    type: 'string',
    options: {
      list: [
        { title: 'Donker (standaard)', value: 'dark' },
        { title: 'Licht (wit)', value: 'light' },
      ],
    },
    initialValue: 'dark',
    description: 'Kies licht bij een donkere achtergrond',
  },
]

export const magazinePageType = {
  name: 'magazinePage',
  title: 'Gratis Magazine Pagina',
  type: 'document',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'heroStyle', title: 'Stijl: Hero' },
    { name: 'formStyle', title: 'Stijl: Formulier' },
    { name: 'highlightsStyle', title: 'Stijl: Highlights' },
    { name: 'ctaStyle', title: 'Stijl: CTA' },
  ],
  fields: [
    // Hero sectie - inhoud
    {
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      description: 'Hoofdtitel in de hero sectie',
      initialValue: 'Gratis PRANA E-magazine',
      group: 'content',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Ondertitel',
      type: 'text',
      rows: 3,
      description: 'Tekst onder de hoofdtitel',
      initialValue: 'Ontvang inspiratie, praktische tips en persoonlijke verhalen over bloesemremedies en natuurlijke gezondheid — direct in je mailbox.',
      group: 'content',
    },
    {
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      description: 'Kleine badge tekst boven de titel',
      initialValue: '100% Gratis',
      group: 'content',
    },
    // Hero sectie - stijl
    {
      name: 'heroStyle',
      title: 'Hero Stijl',
      type: 'object',
      group: 'heroStyle',
      fields: sectionStyleFields,
    },
    // Formulier sectie - stijl
    {
      name: 'formStyle',
      title: 'Formulier Sectie Stijl',
      type: 'object',
      group: 'formStyle',
      fields: sectionStyleFields,
    },
    // Highlights sectie - inhoud
    {
      name: 'highlightsTitle',
      title: 'Highlights Sectie Titel',
      type: 'string',
      description: 'Titel boven de highlights blokken',
      initialValue: 'Wat zit er in het magazine?',
      group: 'content',
    },
    {
      name: 'highlights',
      title: 'Magazine Highlights',
      type: 'array',
      group: 'content',
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
    // Highlights sectie - stijl
    {
      name: 'highlightsStyle',
      title: 'Highlights Stijl',
      type: 'object',
      group: 'highlightsStyle',
      fields: sectionStyleFields,
    },
    // CTA sectie - inhoud
    {
      name: 'ctaTitle',
      title: 'CTA Titel',
      type: 'string',
      description: 'Titel van de onderste sectie',
      initialValue: 'Liever persoonlijk advies?',
      group: 'content',
    },
    {
      name: 'ctaText',
      title: 'CTA Tekst',
      type: 'text',
      rows: 3,
      description: 'Tekst in de CTA sectie',
      initialValue: 'Het e-magazine is een mooie eerste kennismaking. Wil je direct aan de slag met bloesemremedies die bij jouw situatie passen? Plan dan een gratis kennismakingsgesprek.',
      group: 'content',
    },
    {
      name: 'ctaButtonText',
      title: 'CTA Knoptekst',
      type: 'string',
      initialValue: 'Plan een kennismakingsgesprek',
      group: 'content',
    },
    {
      name: 'ctaButtonLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/contact',
      group: 'content',
    },
    // CTA sectie - stijl
    {
      name: 'ctaStyle',
      title: 'CTA Stijl',
      type: 'object',
      group: 'ctaStyle',
      fields: sectionStyleFields,
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
