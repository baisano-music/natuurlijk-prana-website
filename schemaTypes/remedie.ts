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
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers worden eerst getoond. Laat leeg voor alfabetische volgorde.',
      initialValue: 0,
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
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Wordt getoond in overzichten en bovenaan de pagina',
    },
    {
      name: 'content',
      title: 'Uitgebreide inhoud',
      description: 'Voeg tekst en afbeeldingen toe. Afbeeldingen kunnen links, rechts of over de volle breedte worden geplaatst.',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              description: 'Beschrijving voor toegankelijkheid',
            },
            {
              name: 'caption',
              title: 'Bijschrift',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Positie',
              type: 'string',
              options: {
                list: [
                  { title: 'Links in tekst', value: 'left' },
                  { title: 'Rechts in tekst', value: 'right' },
                  { title: 'Volle breedte', value: 'full' },
                  { title: 'Gecentreerd', value: 'center' },
                ],
              },
              initialValue: 'full',
            },
          ],
        },
      ],
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
    // Categorie referentie
    {
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      description: 'Selecteer de productcategorie waartoe dit product behoort',
    },
    // Shop link
    {
      name: 'shopUrl',
      title: 'Link naar webshop',
      type: 'url',
      description: 'Directe link naar het product in de Jortt shop (bijv. https://prana.jortt.shop/product/...)',
      validation: (Rule: { uri: (opts: { scheme: string[] }) => unknown }) =>
        Rule.uri({ scheme: ['http', 'https'] }),
    },
    {
      name: 'shopButtonText',
      title: 'Bestelknop tekst',
      type: 'string',
      description: 'Tekst op de bestelknop (standaard: "Bestel in shop")',
    },
    // Uitgebreide velden (optioneel - behouden voor backwards compatibility)
    {
      name: 'remedieType',
      title: 'Type remedie (oud)',
      type: 'string',
      hidden: true,
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
      title: 'Lijn/Merk (oud)',
      type: 'string',
      hidden: true,
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
