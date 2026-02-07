/**
 * Script om pagina content te migreren van sections naar content
 * en pagina's te koppelen aan categorieën
 * Voer uit met: npx tsx scripts/migrate-page-content.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Mapping van slugs naar categorieën
const categoryMapping: Record<string, string> = {
  // Bloesemremedies
  'bloesemremedies': 'bloesemremedies',
  'bloesemremedies-van-alaskan-essences': 'alaskan-essences',
  'bloesemremedies-uit-alaska-steve-m-johnson': 'alaskan-essences',
  'alaska-edelsteen-remedies': 'edelsteenremedies',
  'edelsteenremedie-pyrite': 'edelsteenremedies',
  'edelsteenremedie-red-quartz': 'edelsteenremedies',
  'alaska-combinatieremedies': 'combinatieremedies',
  'combinatieremedie-fireweed-combo': 'combinatieremedies',
  'combinatieremedie-soul-support': 'combinatieremedies',
  'easy-learning-combinatieremedie': 'combinatieremedies',
  'easy-learning-helpt-jouw-kind-om-te-focussen-en-te-leren': 'combinatieremedies',
  'alaska-omgevingsremedies': 'omgevingsremedies',
  'prana-remedies': 'prana-remedies',
  'over-bloesemremedies': 'bloesemremedies',
  'gebruik-bloesemremedies': 'bloesemremedies',
  // Celzouten
  'schussler-celzouten-adler': 'celzouten',
  'celzouten-cremegel-zalf': 'celzouten',
  'sonnenmineral-celzouten': 'celzouten',
  'schussler-celzouten-gezichtsanalyse': 'celzouten',
  'lezing-celzouten-presentatie': 'celzouten',
  'in-balans-met-schusslerzouten': 'celzouten',
  // Essentiële oliën
  'primavera-essentiele-olien': 'essentiele-olien',
  'primavera-revitaliserend-serum': 'essentiele-olien',
  'orchid-airspray-love-formule': 'essentiele-olien',
}

async function migratePages() {
  console.log('🔄 Start migratie van pagina content...\n')

  // Haal alle categorieën op
  const categories = await client.fetch(`*[_type == "productCategory"]{
    _id, "slug": slug.current, title
  }`)

  const categoryIdBySlug: Record<string, string> = {}
  for (const cat of categories) {
    categoryIdBySlug[cat.slug] = cat._id
  }
  console.log(`📂 Gevonden categorieën: ${categories.map((c: { title: string }) => c.title).join(', ')}\n`)

  // Haal alle pagina's op die migratie nodig hebben
  const pages = await client.fetch(`*[_type == "page" && defined(sections) && length(sections) > 0 && (!defined(content) || length(content) == 0)]{
    _id,
    title,
    "slug": slug.current,
    sections
  }`)

  console.log(`📄 Te migreren pagina's: ${pages.length}\n`)

  let migrated = 0
  let linked = 0

  for (const page of pages) {
    try {
      // Converteer sections naar content
      const newContent: unknown[] = []

      for (const section of page.sections || []) {
        // Voeg heading toe als H2 block
        if (section.heading) {
          newContent.push({
            _type: 'block',
            _key: `heading-${Math.random().toString(36).substr(2, 9)}`,
            style: 'h2',
            children: [
              {
                _type: 'span',
                _key: `span-${Math.random().toString(36).substr(2, 9)}`,
                text: section.heading,
                marks: []
              }
            ],
            markDefs: []
          })
        }

        // Voeg body blocks toe
        if (section.body && Array.isArray(section.body)) {
          for (const block of section.body) {
            newContent.push({
              ...block,
              _key: block._key || `block-${Math.random().toString(36).substr(2, 9)}`
            })
          }
        }
      }

      // Bereid de update voor
      const updates: Record<string, unknown> = {}

      if (newContent.length > 0) {
        updates.content = newContent
      }

      // Check of deze pagina aan een categorie gekoppeld moet worden
      const categorySlug = categoryMapping[page.slug]
      if (categorySlug && categoryIdBySlug[categorySlug]) {
        updates.productCategory = {
          _type: 'reference',
          _ref: categoryIdBySlug[categorySlug]
        }
        updates.showInNavigation = true
        linked++
      }

      // Voer de update uit
      if (Object.keys(updates).length > 0) {
        await client.patch(page._id).set(updates).commit()
        console.log(`✅ Gemigreerd: ${page.title}${categorySlug ? ` → ${categorySlug}` : ''}`)
        migrated++
      }

    } catch (error) {
      console.error(`❌ Fout bij ${page.title}:`, error)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\n✨ Migratie voltooid!`)
  console.log(`   - Gemigreerde pagina's: ${migrated}`)
  console.log(`   - Gekoppeld aan categorie: ${linked}`)
}

migratePages()
