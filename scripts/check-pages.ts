/**
 * Script om te controleren wat er in de pagina's staat
 * Voer uit met: npx tsx scripts/check-pages.ts
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

async function checkPages() {
  console.log('🔍 Controleren van pagina data...\n')

  const pages = await client.fetch(`*[_type == "page"]{
    _id,
    title,
    "slug": slug.current,
    "hasContent": defined(content) && length(content) > 0,
    "hasSections": defined(sections) && length(sections) > 0,
    "contentLength": length(content),
    "sectionsLength": length(sections),
    productCategory->{title},
    parentPage->{title}
  } | order(title asc)`)

  console.log(`Gevonden: ${pages.length} pagina's\n`)
  console.log('=' .repeat(80))

  for (const page of pages) {
    console.log(`\n📄 ${page.title || 'Zonder titel'}`)
    console.log(`   Slug: ${page.slug || 'geen'}`)
    console.log(`   Content veld: ${page.hasContent ? `✅ ${page.contentLength} items` : '❌ leeg'}`)
    console.log(`   Sections veld: ${page.hasSections ? `⚠️ ${page.sectionsLength} items (oud formaat)` : '- leeg'}`)
    console.log(`   Categorie: ${page.productCategory?.title || '-'}`)
    console.log(`   Parent: ${page.parentPage?.title || '-'}`)
  }

  // Check hoeveel pagina's migratie nodig hebben
  const needsMigration = pages.filter((p: { hasSections: boolean; hasContent: boolean }) => p.hasSections && !p.hasContent)
  console.log('\n' + '=' .repeat(80))
  console.log(`\n📊 Samenvatting:`)
  console.log(`   - Pagina's met nieuwe content: ${pages.filter((p: { hasContent: boolean }) => p.hasContent).length}`)
  console.log(`   - Pagina's met oude sections: ${pages.filter((p: { hasSections: boolean }) => p.hasSections).length}`)
  console.log(`   - Pagina's die migratie nodig hebben: ${needsMigration.length}`)

  if (needsMigration.length > 0) {
    console.log('\n⚠️  Er zijn pagina\'s met oude content die gemigreerd moeten worden.')
    console.log('   Voer uit: npx tsx scripts/migrate-page-content.ts')
  }
}

checkPages()
