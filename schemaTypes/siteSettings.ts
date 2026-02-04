// schemaTypes/siteSettings.ts – Algemene site-instellingen (singleton)
export const siteSettingsType = {
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Titel',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Beschrijving',
      type: 'text',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'contactInfo',
      title: 'Contact Informatie',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'E-mail' },
        { name: 'phone', type: 'string', title: 'Telefoon' },
        { name: 'address', type: 'text', title: 'Adres' },
      ],
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
      ],
    },
    {
      name: 'openingHours',
      title: 'Openingstijden',
      type: 'text',
      rows: 4,
    },
  ],
}
