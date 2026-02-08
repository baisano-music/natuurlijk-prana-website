// schemaTypes/internalLink.ts
// Internal link type voor makkelijk linken naar pagina's binnen de site

export const internalLinkType = {
  name: 'internalLink',
  title: 'Interne Link',
  type: 'object',
  icon: () => '🔗',
  fields: [
    {
      name: 'reference',
      title: 'Link naar',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'blog' },
        { type: 'dienst' },
        { type: 'remedie' },
        { type: 'faq' },
      ],
      description: 'Zoek en selecteer een pagina om naar te linken',
    },
    {
      name: 'customText',
      title: 'Aangepaste linktekst',
      type: 'string',
      description: 'Optioneel: gebruik een andere tekst dan de paginatitel',
    },
  ],
  preview: {
    select: {
      pageTitle: 'reference.title',
      pageName: 'reference.name',
      customText: 'customText',
    },
    prepare({
      pageTitle,
      pageName,
      customText,
    }: {
      pageTitle?: string
      pageName?: string
      customText?: string
    }) {
      return {
        title: customText || pageTitle || pageName || 'Selecteer een pagina',
        subtitle: customText ? pageTitle || pageName : 'Interne link',
      }
    },
  },
}

// Link annotatie voor gebruik in rich text editors
export const internalLinkAnnotation = {
  name: 'internalLink',
  title: 'Interne Link',
  type: 'object',
  icon: () => '🔗',
  fields: [
    {
      name: 'reference',
      title: 'Link naar pagina',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'blog' },
        { type: 'dienst' },
        { type: 'remedie' },
      ],
    },
  ],
}
