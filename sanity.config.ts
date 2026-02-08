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
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Homepage (singleton)
            S.listItem()
              .title('Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            // Site-instellingen (singleton)
            S.listItem()
              .title('Site Instellingen')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Pagina Instellingen (voor nieuws, contact, etc.)
            S.listItem()
              .title('Pagina Instellingen')
              .child(
                S.documentTypeList('pageSettings')
                  .title('Pagina Instellingen')
              ),
            S.divider(),
            // Producten folder met categorieën en bijbehorende pagina's
            S.listItem()
              .title('Producten')
              .child(
                S.list()
                  .title('Producten')
                  .items([
                    S.listItem()
                      .title('Categorieën beheren')
                      .child(S.documentTypeList('productCategory').title('Categorieën')),
                    S.divider(),
                    S.listItem()
                      .title('Alle Producten')
                      .child(S.documentTypeList('remedie').title('Alle Producten')),
                    S.divider(),
                    // Pagina's per categorie
                    S.listItem()
                      .title("Pagina's per categorie")
                      .child(
                        S.documentTypeList('productCategory')
                          .title('Selecteer categorie')
                          .child((categoryId) =>
                            S.documentList()
                              .title("Pagina's in deze categorie")
                              .filter('_type == "page" && productCategory._ref == $categoryId')
                              .params({ categoryId })
                          )
                      ),
                  ])
              ),
            // Diensten
            S.listItem()
              .title('Diensten')
              .child(S.documentTypeList('dienst').title('Diensten')),
            // Nieuws
            S.listItem()
              .title('Nieuws')
              .child(S.documentTypeList('blog').title('Nieuws')),
            // Ervaringen / Testimonials
            S.listItem()
              .title('Ervaringen')
              .child(S.documentTypeList('testimonial').title('Ervaringen')),
            S.divider(),
            // Pagina's - georganiseerd
            S.listItem()
              .title("Pagina's")
              .child(
                S.list()
                  .title("Pagina's")
                  .items([
                    S.listItem()
                      .title("Alle pagina's")
                      .child(
                        S.documentTypeList('page')
                          .title("Alle pagina's")
                          .defaultOrdering([{ field: 'title', direction: 'asc' }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title("Losse pagina's")
                      .child(
                        S.documentList()
                          .title("Losse pagina's (zonder categorie)")
                          .filter('_type == "page" && !defined(productCategory) && !defined(parentPage)')
                      ),
                    S.listItem()
                      .title("Pagina's met bovenliggende")
                      .child(
                        S.documentTypeList('page')
                          .title('Selecteer bovenliggende pagina')
                          .filter('_type == "page" && count(*[_type == "page" && parentPage._ref == ^._id]) > 0')
                          .child((parentId) =>
                            S.documentList()
                              .title("Subpagina's")
                              .filter('_type == "page" && parentPage._ref == $parentId')
                              .params({ parentId })
                          )
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],
  schema: {
    types: schemaTypes as import('sanity').SchemaTypeDefinition[],
    templates: (prev) =>
      prev
        .filter((t) => t.id !== 'siteSettings' && t.id !== 'homepage')
        .concat([
          {
            id: 'siteSettings',
            title: 'Site Instellingen',
            schemaType: 'siteSettings',
            value: { _id: 'siteSettings' },
          },
          {
            id: 'homepage',
            title: 'Homepage',
            schemaType: 'homepage',
            value: { _id: 'homepage' },
          },
        ]),
  },
})
