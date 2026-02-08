// schemaTypes/homepage.ts – Homepage instellingen (singleton)

// Simpele rich text block voor inline tekst (bold, italic, links)
const simpleRichText = {
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normaal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Cursief', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          },
        ],
      },
    },
  ],
}

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
      description: 'Korte introductietekst (ondersteunt bold, cursief en links)',
      ...simpleRichText,
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
      description: 'Tekst naast de afbeelding (ondersteunt bold, cursief en links)',
      ...simpleRichText,
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
      initialValue: 3,
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

    // Nieuws sectie
    {
      name: 'newsLabel',
      title: 'Nieuws Label',
      type: 'string',
      initialValue: 'Nieuws',
      description: 'Klein label boven de nieuwstitel',
    },
    {
      name: 'newsTitle',
      title: 'Nieuws Sectie Titel',
      type: 'string',
      initialValue: 'Laatste nieuws',
    },
    {
      name: 'newsSubtitle',
      title: 'Nieuws Sectie Ondertitel',
      type: 'string',
      initialValue: 'Verhalen, inzichten en tips over bloesemremedies',
    },
    {
      name: 'showNews',
      title: 'Toon nieuws op homepage',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'newsCount',
      title: 'Aantal nieuwsartikelen tonen',
      type: 'number',
      initialValue: 3,
      description: 'Hoeveel artikelen worden getoond op de homepage',
    },
    {
      name: 'newsLink',
      title: 'Nieuws Link',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Bekijk alle artikelen' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/nieuws' },
      ],
    },

    // FAQ sectie
    {
      name: 'faqLabel',
      title: 'FAQ Label',
      type: 'string',
      initialValue: 'FAQ',
      description: 'Klein label boven de FAQ titel',
    },
    {
      name: 'faqTitle',
      title: 'FAQ Sectie Titel',
      type: 'string',
      initialValue: 'Veelgestelde vragen',
    },
    {
      name: 'faqSubtitle',
      title: 'FAQ Sectie Ondertitel',
      type: 'string',
      initialValue: 'Antwoorden op de meest gestelde vragen over bloesemremedies',
    },
    {
      name: 'showFaq',
      title: 'Toon FAQ op homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Toont uitgelichte FAQ items (items met "Uitgelicht op homepage" aangevinkt)',
    },
    {
      name: 'faqLink',
      title: 'FAQ Link',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Bekijk alle vragen' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/faq' },
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
      description: 'Tekst onder de CTA titel (ondersteunt bold, cursief en links)',
      ...simpleRichText,
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
