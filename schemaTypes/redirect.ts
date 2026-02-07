// schemaTypes/redirect.ts - Beheer 301 redirects vanuit het CMS
export const redirectType = {
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  icon: () => '↪️',
  fields: [
    {
      name: 'source',
      title: 'Bron URL',
      type: 'string',
      description: 'Het oude pad zonder domein (bijv. /oude-pagina of /blog/oud-artikel)',
      validation: (Rule: { required: () => { (): unknown; new(): unknown; custom: { (fn: (value: string) => true | string): unknown; new(): unknown } } }) =>
        Rule.required().custom((value: string) => {
          if (!value.startsWith('/')) {
            return 'URL moet beginnen met /'
          }
          return true
        }),
    },
    {
      name: 'destination',
      title: 'Doel URL',
      type: 'string',
      description: 'Het nieuwe pad (bijv. /nieuwe-pagina) of volledige URL voor externe redirects',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'permanent',
      title: 'Permanente redirect (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Aan = 301 (permanent), Uit = 302 (tijdelijk)',
    },
    {
      name: 'active',
      title: 'Actief',
      type: 'boolean',
      initialValue: true,
      description: 'Schakel de redirect in of uit',
    },
    {
      name: 'note',
      title: 'Notitie',
      type: 'string',
      description: 'Optionele notitie voor eigen administratie',
    },
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      active: 'active',
    },
    prepare({ source, destination, active }: { source: string; destination: string; active: boolean }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: active ? '✓ Actief' : '✗ Inactief',
      }
    },
  },
  orderings: [
    {
      title: 'Bron A-Z',
      name: 'sourceAsc',
      by: [{ field: 'source', direction: 'asc' }],
    },
  ],
}
