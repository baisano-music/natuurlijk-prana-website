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
      description: 'Fallback afbeelding (wordt getoond als er geen video is, of als poster)',
    },
    {
      name: 'heroVideo',
      title: 'Hero Achtergrondvideo',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      description: 'Optionele achtergrondvideo (MP4 of WebM, max 10MB aanbevolen). Speelt automatisch af, gedempt en in een loop.',
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

    // E-magazine banner
    {
      name: 'showMagazineBanner',
      title: 'Toon E-magazine banner',
      type: 'boolean',
      initialValue: true,
      description: 'Schakel de E-magazine promotiebanner in of uit',
    },
    {
      name: 'magazineBannerTitle',
      title: 'E-magazine Titel',
      type: 'string',
      initialValue: 'Gratis PRANA E-magazine',
    },
    {
      name: 'magazineBannerSubtitle',
      title: 'E-magazine Ondertitel',
      type: 'string',
      initialValue: 'Tips, recepten en inspiratie over bloesemremedies',
    },
    {
      name: 'magazineBannerButton',
      title: 'E-magazine Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Download gratis' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/gratis-magazine' },
      ],
    },

    // Welkom sectie
    {
      name: 'welcomeLabel',
      title: 'Welkom Label',
      type: 'string',
      initialValue: 'Welkom',
      description: 'Klein label boven de welkomtitel',
    },
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
    {
      name: 'welcomeImage',
      title: 'Welkom Afbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Afbeelding naast de welkomtekst (wordt links getoond)',
    },
    {
      name: 'welcomeLink',
      title: 'Welkom Link',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Meer over mij' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/over-mij' },
      ],
    },

    // Remedies sectie
    {
      name: 'remediesLabel',
      title: 'Remedies Label',
      type: 'string',
      initialValue: 'Collectie',
      description: 'Klein label boven de remedietitel',
    },
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
    {
      name: 'remediesButton',
      title: 'Remedies Knop',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Bekijk alle remedies' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/remedies' },
      ],
    },

    // Ervaringen sectie
    {
      name: 'testimonialsLabel',
      title: 'Ervaringen Label',
      type: 'string',
      initialValue: 'Ervaringen',
      description: 'Klein label boven de ervaringentitel',
    },
    {
      name: 'testimonialsTitle',
      title: 'Ervaringen Sectie Titel',
      type: 'string',
      initialValue: 'Wat anderen zeggen',
    },
    {
      name: 'testimonialsSubtitle',
      title: 'Ervaringen Sectie Ondertitel',
      type: 'string',
      initialValue: 'Ervaringen van ouders en kinderen',
    },
    {
      name: 'showTestimonials',
      title: 'Toon ervaringen op homepage',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'testimonialsLink',
      title: 'Ervaringen Link',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Lees meer ervaringen' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/ervaringen' },
      ],
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
      name: 'ctaImage',
      title: 'CTA Achtergrondafbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Achtergrondafbeelding voor de CTA sectie onderaan de pagina',
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
