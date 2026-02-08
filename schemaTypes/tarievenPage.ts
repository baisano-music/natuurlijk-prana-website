// schemaTypes/tarievenPage.ts – Tarieven pagina (singleton)
// Volledig bewerkbare tarieven, pakketten en extra opties

export const tarievenPageType = {
  name: 'tarievenPage',
  title: 'Tarieven Pagina',
  type: 'document',
  icon: () => '💰',
  groups: [
    { name: 'hero', title: '🎯 Hero', default: true },
    { name: 'tarieven', title: '💵 Tarieven' },
    { name: 'pakketten', title: '📦 Pakketten' },
    { name: 'extra', title: '➕ Extra Opties' },
    { name: 'info', title: 'ℹ️ Goed om te weten' },
    { name: 'cta', title: '📣 Call-to-Action' },
    { name: 'seo', title: '🔍 SEO' },
  ],
  fields: [
    // ===== HERO =====
    {
      name: 'heroSubtitle',
      title: 'Subtitel',
      type: 'string',
      group: 'hero',
      initialValue: 'Tarieven',
    },
    {
      name: 'heroTitle',
      title: 'Titel',
      type: 'string',
      group: 'hero',
      initialValue: 'Investeer in jezelf',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'heroDescription',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Persoonlijke begeleiding met bloesemremedies. Elke sessie is maatwerk, afgestemd op jouw situatie en behoeften.',
    },

    // ===== TARIEVEN =====
    {
      name: 'tarieven',
      title: 'Tarieven',
      type: 'array',
      group: 'tarieven',
      description: 'De hoofdtarieven (consulten). Maximaal 1 kan "uitgelicht" zijn.',
      of: [
        {
          type: 'object',
          title: 'Tarief',
          fields: [
            {
              name: 'title',
              title: 'Naam',
              type: 'string',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Prijs',
              type: 'string',
              description: 'Bijv. "€85" of "Gratis"',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duur',
              type: 'string',
              description: 'Bijv. "60-75 minuten"',
            },
            {
              name: 'description',
              title: 'Beschrijving',
              type: 'text',
              rows: 2,
            },
            {
              name: 'featured',
              title: 'Uitgelicht',
              type: 'boolean',
              description: 'Toon als "Meest gekozen" met accent kleur',
              initialValue: false,
            },
            {
              name: 'featuredLabel',
              title: 'Uitgelicht label',
              type: 'string',
              description: 'Bijv. "Meest gekozen"',
              initialValue: 'Meest gekozen',
              hidden: ({ parent }: { parent?: { featured?: boolean } }) => !parent?.featured,
            },
            {
              name: 'includes',
              title: 'Wat is inbegrepen',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Lijst met punten die inbegrepen zijn',
            },
            {
              name: 'buttonText',
              title: 'Button tekst',
              type: 'string',
              initialValue: 'Boek consult',
            },
            {
              name: 'buttonLink',
              title: 'Button link',
              type: 'string',
              initialValue: '/contact',
            },
          ],
          preview: {
            select: { title: 'title', price: 'price', featured: 'featured' },
            prepare({
              title,
              price,
              featured,
            }: {
              title?: string
              price?: string
              featured?: boolean
            }) {
              return {
                title: title || 'Naamloos tarief',
                subtitle: `${price || '?'}${featured ? ' ⭐ Uitgelicht' : ''}`,
              }
            },
          },
        },
      ],
    },

    // ===== PAKKETTEN =====
    {
      name: 'pakkettenTitle',
      title: 'Sectie subtitel',
      type: 'string',
      group: 'pakketten',
      initialValue: 'Voordeelpakket',
    },
    {
      name: 'pakkettenHeading',
      title: 'Sectie titel',
      type: 'string',
      group: 'pakketten',
      initialValue: 'Bespaar met een pakket',
    },
    {
      name: 'pakketten',
      title: 'Pakketten',
      type: 'array',
      group: 'pakketten',
      of: [
        {
          type: 'object',
          title: 'Pakket',
          fields: [
            {
              name: 'title',
              title: 'Naam',
              type: 'string',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Prijs',
              type: 'string',
              description: 'De actieprijs',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'originalPrice',
              title: 'Originele prijs',
              type: 'string',
              description: 'De doorgestreepte prijs',
            },
            {
              name: 'savings',
              title: 'Besparing tekst',
              type: 'string',
              description: 'Bijv. "Bespaar €30"',
            },
            {
              name: 'description',
              title: 'Beschrijving',
              type: 'text',
              rows: 2,
            },
            {
              name: 'note',
              title: 'Extra notitie',
              type: 'string',
              description: 'Bijv. "Betaalbaar in 2 termijnen"',
            },
            {
              name: 'buttonText',
              title: 'Button tekst',
              type: 'string',
              initialValue: 'Kies pakket',
            },
            {
              name: 'buttonLink',
              title: 'Button link',
              type: 'string',
              initialValue: '/contact',
            },
          ],
          preview: {
            select: { title: 'title', price: 'price', originalPrice: 'originalPrice' },
            prepare({
              title,
              price,
              originalPrice,
            }: {
              title?: string
              price?: string
              originalPrice?: string
            }) {
              return {
                title: title || 'Naamloos pakket',
                subtitle: originalPrice ? `${originalPrice} → ${price}` : price,
              }
            },
          },
        },
      ],
    },

    // ===== EXTRA OPTIES =====
    {
      name: 'extraTitle',
      title: 'Sectie titel',
      type: 'string',
      group: 'extra',
      initialValue: 'Extra opties',
    },
    {
      name: 'extraOpties',
      title: 'Extra opties',
      type: 'array',
      group: 'extra',
      of: [
        {
          type: 'object',
          title: 'Extra optie',
          fields: [
            {
              name: 'title',
              title: 'Naam',
              type: 'string',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Prijs',
              type: 'string',
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
            {
              name: 'duration',
              title: 'Duur',
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
            select: { title: 'title', price: 'price' },
            prepare({ title, price }: { title?: string; price?: string }) {
              return {
                title: title || 'Naamloze optie',
                subtitle: price,
              }
            },
          },
        },
      ],
    },

    // ===== GOED OM TE WETEN =====
    {
      name: 'infoTitle',
      title: 'Sectie titel',
      type: 'string',
      group: 'info',
      initialValue: 'Goed om te weten',
    },
    {
      name: 'infoItems',
      title: 'Informatie items',
      type: 'array',
      group: 'info',
      of: [
        {
          type: 'object',
          title: 'Info item',
          fields: [
            {
              name: 'icon',
              title: 'Icoon',
              type: 'string',
              options: {
                list: [
                  { title: 'ℹ️ Info', value: 'info' },
                  { title: '⏰ Klok', value: 'clock' },
                  { title: '❤️ Hart', value: 'heart' },
                  { title: '💰 Geld', value: 'money' },
                  { title: '✓ Vinkje', value: 'check' },
                  { title: '⚠️ Waarschuwing', value: 'warning' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'text',
              title: 'Tekst',
              type: 'text',
              rows: 2,
              validation: (Rule: { required: () => unknown }) => Rule.required(),
            },
          ],
          preview: {
            select: { text: 'text', icon: 'icon' },
            prepare({ text, icon }: { text?: string; icon?: string }) {
              const icons: Record<string, string> = {
                info: 'ℹ️',
                clock: '⏰',
                heart: '❤️',
                money: '💰',
                check: '✓',
                warning: '⚠️',
              }
              return {
                title: text?.substring(0, 60) + (text && text.length > 60 ? '...' : '') || 'Leeg item',
                subtitle: icons[icon || 'info'] || 'ℹ️',
              }
            },
          },
        },
      ],
    },

    // ===== CTA =====
    {
      name: 'ctaTitle',
      title: 'Titel',
      type: 'string',
      group: 'cta',
      initialValue: 'Klaar om te beginnen?',
    },
    {
      name: 'ctaDescription',
      title: 'Beschrijving',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'Plan een gratis kennismakingsgesprek en ontdek of bloesemtherapie bij jou past.',
    },
    {
      name: 'ctaButtonText',
      title: 'Button tekst',
      type: 'string',
      group: 'cta',
      initialValue: 'Plan kennismakingsgesprek',
    },
    {
      name: 'ctaButtonLink',
      title: 'Button link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact',
    },

    // ===== SEO =====
    {
      name: 'seoTitle',
      title: 'SEO Titel',
      type: 'string',
      group: 'seo',
      description: 'Titel voor zoekmachines (laat leeg voor standaard)',
    },
    {
      name: 'seoDescription',
      title: 'SEO Beschrijving',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Beschrijving voor zoekmachines',
    },
  ],
}
