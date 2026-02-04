// schemaTypes/remedie.ts
export const remedieType = {
  name: 'remedie',
  title: 'Remedies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naam (bijv. Liefde)',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-naam',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'kernkwaliteit',
      title: 'Thema / Kernkwaliteit',
      type: 'string',
    },
    {
      name: 'werking',
      title: 'Beschrijving van de werking',
      type: 'text',
    },
    {
      name: 'mantra',
      title: 'Mantra (tussen aanhalingstekens)',
      type: 'string',
    },
    {
      name: 'ontstaan',
      title: 'Details van Ontstaan',
      type: 'object',
      fields: [
        { name: 'datum', title: 'Datum & Tijd', type: 'datetime' },
        {
          name: 'krachtplek',
          title: 'Krachtplek (volledig uitgeschreven)',
          type: 'string',
        },
      ],
    },
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'ingredienten',
      title: 'Ingrediënten',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'edelstenen',
      title: 'Edelstenen',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    // Uitgebreide velden (optioneel)
    {
      name: 'remedieType',
      title: 'Type remedie',
      type: 'string',
      options: {
        list: [
          { title: 'Bloesemremedies', value: 'bloesem' },
          { title: 'Edelsteenremedies', value: 'edelsteen' },
          { title: 'Omgevingsremedies', value: 'omgeving' },
          { title: 'Combinatieremedies', value: 'combinatie' },
          { title: 'PRANA Remedies', value: 'prana' },
          { title: 'Celzouten', value: 'celzout' },
        ],
      },
    },
    {
      name: 'lijn',
      title: 'Lijn/Merk',
      type: 'string',
      options: {
        list: [
          { title: 'Alaskan Essences', value: 'alaskan' },
          { title: 'Bach Bloesems', value: 'bach' },
          { title: 'PRANA', value: 'prana' },
          { title: 'Schüssler Celzouten', value: 'schussler' },
        ],
      },
    },
    {
      name: 'shortDescription',
      title: 'Korte beschrijving',
      type: 'text',
      rows: 3,
      description: 'Voor overzichtspagina\'s (max 200 tekens)',
    },
    {
      name: 'indicaties',
      title: 'Indicaties',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Bijv. angst, stress, concentratieproblemen',
    },
    {
      name: 'chakra',
      title: 'Chakra',
      type: 'string',
      options: {
        list: [
          { title: '1e Chakra - Wortel', value: '1' },
          { title: '2e Chakra - Sacraal', value: '2' },
          { title: '3e Chakra - Zonnevlecht', value: '3' },
          { title: '4e Chakra - Hart', value: '4' },
          { title: '5e Chakra - Keel', value: '5' },
          { title: '6e Chakra - Derde oog', value: '6' },
          { title: '7e Chakra - Kruin', value: '7' },
        ],
      },
    },
    {
      name: 'dosering',
      title: 'Dosering',
      type: 'text',
      rows: 3,
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO Titel', type: 'string' },
        { name: 'description', title: 'Meta Beschrijving', type: 'text', rows: 3 },
      ],
    },
  ],
}
