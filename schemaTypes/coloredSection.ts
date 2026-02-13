// schemaTypes/coloredSection.ts – Gekleurd inhoudsblok
// Gebruik op pagina's om secties met een achtergrondkleur toe te voegen

export const coloredSectionType = {
  name: 'coloredSection',
  title: 'Gekleurd blok',
  type: 'object',
  icon: () => '🎨',
  fields: [
    {
      name: 'backgroundColor',
      title: 'Achtergrondkleur',
      type: 'string',
      description: 'Kies een voorgedefinieerde kleur of voer een hex kleurcode in (bijv. #d28a58)',
      options: {
        list: [
          { title: 'Terracotta', value: '#d28a58' },
          { title: 'Terracotta licht', value: '#e5a77d' },
          { title: 'Coral', value: '#d87f81' },
          { title: 'Coral licht', value: '#e5a0a2' },
          { title: 'Sage', value: '#89a491' },
          { title: 'Sage licht', value: '#e8efe9' },
          { title: 'Peach', value: '#faf0eb' },
          { title: 'Peach donker', value: '#f5d5c8' },
          { title: 'Oranje', value: '#f5a649' },
          { title: 'Cream', value: '#faf8f5' },
          { title: 'Wit', value: '#ffffff' },
        ],
      },
      initialValue: '#e8efe9',
    },
    {
      name: 'textColor',
      title: 'Tekstkleur',
      type: 'string',
      description: 'Donker voor lichte achtergronden, licht voor donkere achtergronden',
      options: {
        list: [
          { title: 'Donker (standaard)', value: 'dark' },
          { title: 'Licht (voor donkere achtergronden)', value: 'light' },
        ],
      },
      initialValue: 'dark',
    },
    {
      name: 'rounded',
      title: 'Afgeronde hoeken',
      type: 'boolean',
      description: 'Toon het blok met afgeronde hoeken',
      initialValue: true,
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
      title: 'title',
      backgroundColor: 'backgroundColor',
    },
    prepare({
      title,
      backgroundColor,
    }: {
      title?: string
      backgroundColor?: string
    }) {
      return {
        title: title || 'Gekleurd blok',
        subtitle: `Achtergrond: ${backgroundColor || '#e8efe9'}`,
      }
    },
  },
}
