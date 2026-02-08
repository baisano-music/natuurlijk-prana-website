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
            // ===== WEBSITE =====
            S.listItem()
              .title('🏠 Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.divider(),

            // ===== INSTELLINGEN (uitgesplitst) =====
            S.listItem()
              .title('⚙️ Instellingen')
              .child(
                S.list()
                  .title('Instellingen')
                  .items([
                    S.listItem()
                      .title('📝 Site Info')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Site Titel & Beschrijving')
                      ),
                    S.listItem()
                      .title('📞 Contact & Locatie')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Contactgegevens & Openingstijden')
                      ),
                    S.listItem()
                      .title('🏢 Bedrijfsgegevens (SEO)')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('KvK, BTW & Google Maps')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('📱 Social Media')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Social Media Links')
                      ),
                    S.listItem()
                      .title('🦶 Footer')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Footer Navigatie')
                      ),
                    S.divider(),
                    S.listItem()
                      .title('⚠️ Disclaimers')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Blog & Product Disclaimers')
                      ),
                    S.listItem()
                      .title('📊 Analytics')
                      .schemaType('siteSettings')
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Google Analytics & Tag Manager')
                      ),
                  ])
              ),
            S.listItem()
              .title('📄 Pagina Instellingen')
              .child(
                S.documentTypeList('pageSettings')
                  .title('Pagina Instellingen')
              ),
            S.divider(),

            // ===== PRODUCTEN & CATEGORIEËN =====
            S.listItem()
              .title('📦 Producten & Categorieën')
              .child(
                S.list()
                  .title('Producten & Categorieën')
                  .items([
                    // Hoofdcategorieën (zonder parent)
                    S.listItem()
                      .title('📂 Hoofdcategorieën')
                      .child(
                        S.documentList()
                          .title('Hoofdcategorieën (Bloesemremedies, Celzouten, etc.)')
                          .filter('_type == "productCategory" && !defined(parent)')
                          .defaultOrdering([{ field: 'order', direction: 'asc' }])
                      ),
                    // Subcategorieën (met parent)
                    S.listItem()
                      .title('📁 Subcategorieën')
                      .child(
                        S.documentList()
                          .title('Subcategorieën (vallen onder een hoofdcategorie)')
                          .filter('_type == "productCategory" && defined(parent)')
                          .defaultOrdering([{ field: 'title', direction: 'asc' }])
                      ),
                    // Alle categorieën
                    S.listItem()
                      .title('📋 Alle categorieën')
                      .child(
                        S.documentTypeList('productCategory')
                          .title('Alle categorieën')
                      ),
                    S.divider(),
                    // Remedies (uitgebreide productinfo op site)
                    S.listItem()
                      .title('🌸 Remedies')
                      .child(
                        S.documentTypeList('remedie')
                          .title('Remedies (met uitgebreide info op de site)')
                      ),
                    // Shop Producten (link naar externe shop)
                    S.listItem()
                      .title('🛒 Shop Producten')
                      .child(
                        S.documentTypeList('product')
                          .title('Shop Producten (link naar webshop)')
                      ),
                    S.divider(),
                    // Per categorie bekijken
                    S.listItem()
                      .title('🔍 Per categorie bekijken')
                      .child(
                        S.documentList()
                          .title('Selecteer een categorie')
                          .filter('_type == "productCategory"')
                          .defaultOrdering([{ field: 'title', direction: 'asc' }])
                          .child((categoryId) =>
                            S.list()
                              .title('Inhoud van categorie')
                              .items([
                                S.listItem()
                                  .title('📁 Subcategorieën')
                                  .child(
                                    S.documentList()
                                      .title('Subcategorieën')
                                      .filter('_type == "productCategory" && parent._ref == $categoryId')
                                      .params({ categoryId })
                                  ),
                                S.listItem()
                                  .title('🌸 Remedies')
                                  .child(
                                    S.documentList()
                                      .title('Remedies in deze categorie')
                                      .filter('_type == "remedie" && category._ref == $categoryId')
                                      .params({ categoryId })
                                  ),
                                S.listItem()
                                  .title('🛒 Shop Producten')
                                  .child(
                                    S.documentList()
                                      .title('Shop producten in deze categorie')
                                      .filter('_type == "product" && category._ref == $categoryId')
                                      .params({ categoryId })
                                  ),
                                S.listItem()
                                  .title("📄 Gekoppelde pagina's")
                                  .child(
                                    S.documentList()
                                      .title("Pagina's gekoppeld aan deze categorie")
                                      .filter('_type == "page" && productCategory._ref == $categoryId')
                                      .params({ categoryId })
                                  ),
                              ])
                          )
                      ),
                  ])
              ),
            S.divider(),

            // ===== CONTENT =====
            S.listItem()
              .title('💼 Diensten')
              .child(S.documentTypeList('dienst').title('Diensten')),
            S.listItem()
              .title('📰 Nieuws / Blog')
              .child(S.documentTypeList('blog').title('Nieuws / Blog')),
            S.listItem()
              .title('⭐ Ervaringen')
              .child(S.documentTypeList('testimonial').title('Ervaringen / Testimonials')),
            S.listItem()
              .title('❓ FAQ')
              .child(
                S.documentTypeList('faq')
                  .title('Veelgestelde Vragen')
                  .defaultOrdering([
                    { field: 'category', direction: 'asc' },
                    { field: 'order', direction: 'asc' },
                  ])
              ),
            S.listItem()
              .title('👤 Auteurs')
              .child(S.documentTypeList('author').title('Auteurs (voor E-E-A-T SEO)')),
            S.divider(),

            // ===== PAGINA'S =====
            S.listItem()
              .title("📑 Pagina's")
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
                          .title("Pagina's zonder categorie of parent")
                          .filter('_type == "page" && !defined(productCategory) && !defined(parentPage)')
                      ),
                    S.listItem()
                      .title("Per bovenliggende pagina")
                      .child(
                        S.documentList()
                          .title('Pagina\'s met subpagina\'s')
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
            S.divider(),

            // ===== TECHNISCH =====
            S.listItem()
              .title('🔀 Redirects')
              .child(S.documentTypeList('redirect').title('Redirects')),
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
