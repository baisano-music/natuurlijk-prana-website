// schemaTypes/homepage.ts – Homepage instellingen (singleton)
export const homepageType = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    // Hero sectie
    {
      name: 'heroTitle',
      title: 'Hero Titel',
      type: 'string',
      description: 'Hoofdtitel bovenaan de pagina',
      initialValue: 'Natuurlijk Prana',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Ondertitel',
      type: 'string',
      description: 'Ondertitel onder de hoofdtitel',
      initialValue: 'Bloesemremedies voor innerlijke balans',
    },
    {
      name: 'heroDescription',
      title: 'Hero Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte introductietekst',
    },
    {
      name: 'heroImage',
      title: 'Hero Achtergrondafbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Optionele achtergrondafbeelding voor de hero sectie',
    },
    {
      name: 'heroPrimaryButton',
      title: 'Primaire Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Bekijk bloesemremedies →' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/remedies' },
      ],
    },
    {
      name: 'heroSecondaryButton',
      title: 'Secundaire Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Kennismakingsgesprek' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/contact' },
      ],
    },

    // Welkom sectie
    {
      name: 'welcomeTitle',
      title: 'Welkom Titel',
      type: 'string',
      initialValue: 'Welkom',
    },
    {
      name: 'welcomeText',
      title: 'Welkom Tekst',
      type: 'text',
      rows: 4,
    },

    // Remedies sectie
    {
      name: 'remediesTitle',
      title: 'Remedies Sectie Titel',
      type: 'string',
      initialValue: 'Ontdek onze remedies',
    },
    {
      name: 'remediesSubtitle',
      title: 'Remedies Sectie Ondertitel',
      type: 'string',
      initialValue: 'Elke remedie heeft een unieke kernkwaliteit en werking.',
    },
    {
      name: 'remediesCount',
      title: 'Aantal remedies tonen',
      type: 'number',
      initialValue: 4,
      description: 'Hoeveel remedies worden uitgelicht op de homepage',
    },

    // CTA sectie
    {
      name: 'ctaTitle',
      title: 'CTA Titel',
      type: 'string',
      initialValue: 'Benieuwd welke remedie bij jou past?',
    },
    {
      name: 'ctaText',
      title: 'CTA Tekst',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ctaButton',
      title: 'CTA Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Neem contact op' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/contact' },
      ],
    },
  ],
}
