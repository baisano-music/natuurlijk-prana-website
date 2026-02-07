/**
 * Script om een migratie rapport te genereren
 * Vergelijkt oude URLs met nieuwe structuur
 * Voer uit met: npx tsx scripts/generate-redirects-report.ts
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface RedirectEntry {
  oldUrl: string
  newUrl: string
  type: 'page' | 'blog' | 'remedie'
  status: 'same' | 'redirect' | 'remove'
  note?: string
}

async function generateRedirectsReport() {
  console.log('Generating URL migration report...\n')

  const redirects: RedirectEntry[] = []

  // Haal alle pagina's op
  const pages = await client.fetch(`*[_type == "page"]{
    title,
    "slug": slug.current,
    productCategory->{title, "slug": slug.current}
  } | order(title asc)`)

  // Haal alle blog posts op
  const blogs = await client.fetch(`*[_type == "blog"]{
    title,
    "slug": slug.current
  } | order(title asc)`)

  // Haal alle remedies op
  const remedies = await client.fetch(`*[_type == "remedie"]{
    title,
    "slug": slug.current
  } | order(title asc)`)

  // Process pagina's
  for (const page of pages) {
    if (!page.slug) continue

    const entry: RedirectEntry = {
      oldUrl: `/${page.slug}`,
      newUrl: `/${page.slug}`,
      type: 'page',
      status: 'same',
    }

    // Speciale gevallen
    if (page.slug === 'mijn-account' || page.slug === 'uitloggen') {
      entry.status = 'remove'
      entry.note = 'WordPress account pagina - niet meer nodig'
    } else if (page.slug === 'gratis-e-magazine') {
      entry.newUrl = '/gratis-magazine'
      entry.status = 'redirect'
    } else if (page.slug === 'consult-bloesemremedies') {
      entry.newUrl = '/tarieven'
      entry.status = 'redirect'
    } else if (page.slug === 'lees-ervaringen') {
      entry.newUrl = '/ervaringen'
      entry.status = 'redirect'
    } else if (page.slug === 'producten-bestellen') {
      entry.newUrl = '/contact'
      entry.status = 'redirect'
      entry.note = 'Geen webshop - redirect naar contact'
    }

    if (page.productCategory) {
      entry.note = `Categorie: ${page.productCategory.title}`
    }

    redirects.push(entry)
  }

  // Process blog posts
  for (const blog of blogs) {
    if (!blog.slug) continue

    redirects.push({
      oldUrl: `/${blog.slug}`,
      newUrl: `/nieuws/${blog.slug}`,
      type: 'blog',
      status: 'redirect',
    })
  }

  // Process remedies
  for (const remedy of remedies) {
    if (!remedy.slug) continue

    redirects.push({
      oldUrl: `/${remedy.slug}`,
      newUrl: `/remedies/${remedy.slug}`,
      type: 'remedie',
      status: 'redirect',
    })
  }

  // Output als JSON voor verdere verwerking
  console.log('='.repeat(80))
  console.log('MIGRATIE SAMENVATTING')
  console.log('='.repeat(80))
  console.log(`\nTotaal URLs: ${redirects.length}`)
  console.log(`- Pagina's: ${redirects.filter(r => r.type === 'page').length}`)
  console.log(`- Blog posts: ${redirects.filter(r => r.type === 'blog').length}`)
  console.log(`- Remedies: ${redirects.filter(r => r.type === 'remedie').length}`)
  console.log(`\nStatus verdeling:`)
  console.log(`- Blijft hetzelfde: ${redirects.filter(r => r.status === 'same').length}`)
  console.log(`- Redirect nodig: ${redirects.filter(r => r.status === 'redirect').length}`)
  console.log(`- Te verwijderen: ${redirects.filter(r => r.status === 'remove').length}`)

  // Toon redirects die nodig zijn
  console.log('\n' + '='.repeat(80))
  console.log('REDIRECTS DIE INGESTELD MOETEN WORDEN')
  console.log('='.repeat(80))

  const needsRedirect = redirects.filter(r => r.status === 'redirect')
  for (const r of needsRedirect) {
    console.log(`${r.oldUrl} -> ${r.newUrl}`)
  }

  // Toon URLs die verwijderd kunnen worden
  console.log('\n' + '='.repeat(80))
  console.log('URLs DIE KUNNEN WORDEN VERWIJDERD/GENEGEERD')
  console.log('='.repeat(80))

  const toRemove = redirects.filter(r => r.status === 'remove')
  for (const r of toRemove) {
    console.log(`${r.oldUrl} - ${r.note || 'Geen reden opgegeven'}`)
  }

  // Exporteer als CSV
  console.log('\n' + '='.repeat(80))
  console.log('CSV EXPORT (voor import in spreadsheet)')
  console.log('='.repeat(80))
  console.log('oude_url,nieuwe_url,type,status,opmerking')
  for (const r of redirects) {
    console.log(`${r.oldUrl},${r.newUrl},${r.type},${r.status},${r.note || ''}`)
  }
}

generateRedirectsReport()
