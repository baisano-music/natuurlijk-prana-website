// schemaTypes/callout.ts – Callout block voor rich text content
// Gebruik in blog artikelen voor tips, waarschuwingen, info blokken

export const calloutType = {
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: () => '💡',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: '💡 Tip', value: 'tip' },
          { title: 'ℹ️ Info', value: 'info' },
          { title: '⚠️ Let op', value: 'warning' },
          { title: '✨ Highlight', value: 'highlight' },
          { title: '🌿 Natuurtip', value: 'nature' },
        ],
      },
      initialValue: 'tip',
    },
    {
      name: 'title',
      title: 'Titel (optioneel)',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
    },
    prepare({
      type,
      title,
    }: {
      type?: string
      title?: string
    }) {
      const typeLabels: Record<string, string> = {
        tip: '💡 Tip',
        info: 'ℹ️ Info',
        warning: '⚠️ Let op',
        highlight: '✨ Highlight',
        nature: '🌿 Natuurtip',
      }
      return {
        title: title || typeLabels[type || 'tip'] || 'Callout',
        subtitle: typeLabels[type || 'tip'],
      }
    },
  },
}
