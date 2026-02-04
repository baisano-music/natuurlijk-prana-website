import { buildLegacyTheme, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'

// Sage-kleurenpalet – pas hier aan voor Studio look & feel
const sage = {
  light: '#f6f7f4',
  base: '#75806b',
  dark: '#3d4438',
  accent: '#5c6652',
}

export const studioTheme = buildLegacyTheme({
  '--black': sage.dark,
  '--white': '#fff',
  '--gray': '#6b7280',
  '--gray-base': '#6b7280',
  '--component-bg': '#fff',
  '--component-text-color': sage.dark,
  '--brand-primary': sage.base,
  '--default-button-color': sage.dark,
  '--default-button-primary-color': sage.base,
  '--default-button-success-color': '#0f9d58',
  '--default-button-warning-color': '#f4b400',
  '--default-button-danger-color': '#db4437',
  '--state-info-color': sage.base,
  '--state-success-color': '#0f9d58',
  '--state-warning-color': '#f4b400',
  '--state-danger-color': '#db4437',
  '--main-navigation-color': sage.dark,
  '--main-navigation-color--inverted': '#fff',
  '--focus-color': sage.base,
})

export default defineConfig({
  name: 'natuurlijk-prana',
  title: 'Natuurlijk Prana',
  projectId: '0xp96ddy',
  dataset: 'production',
  basePath: '/studio',
  theme: studioTheme,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site-instellingen (singleton)
            S.listItem()
              .title('Site Instellingen')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Diensten
            S.listItem()
              .title('Diensten')
              .child(S.documentTypeList('dienst').title('Diensten')),
            // PRANA Bloesemremedies
            S.listItem()
              .title('PRANA Bloesemremedies')
              .child(S.documentTypeList('remedie').title('PRANA Bloesemremedies')),
            // Nieuws
            S.listItem()
              .title('Nieuws')
              .child(S.documentTypeList('blog').title('Nieuws')),
            // Ervaringen / Testimonials
            S.listItem()
              .title('Ervaringen')
              .child(S.documentTypeList('testimonial').title('Ervaringen')),
            S.divider(),
            // Pagina's
            S.listItem()
              .title("Pagina's")
              .child(S.documentTypeList('page').title("Pagina's")),
          ]),
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes as import('sanity').SchemaTypeDefinition[],
    templates: (prev) =>
      prev.filter((t) => t.id !== 'siteSettings').concat({
        id: 'siteSettings',
        title: 'Site Instellingen',
        schemaType: 'siteSettings',
        value: { _id: 'siteSettings' },
      }),
  },
})
