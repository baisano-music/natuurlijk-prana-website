/**
 * Importeer content van natuurlijkprana.nl (WordPress) naar Sanity
 *
 * Haalt op:
 * - Blogposts (nieuws) → Sanity 'blog'
 * - Pagina's → Sanity 'page'
 * - PRANA-remediepagina's (Liefde, Vertrouwen, etc.) → Sanity 'remedie'
 *
 * Gebruik:
 * 1. SANITY_API_TOKEN in .env.local
 * 2. npm run import:wordpress
 */

import { createClient } from '@sanity/client'

const WP_URL = 'https://natuurlijkprana.nl/wp-json/wp/v2'
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

// PRANA remedies – pagina-slugs die we als remedie importeren
const REMEDIE_SLUGS = ['liefde', 'vertrouwen', 'stroming', 'regenbooglicht', 'het-nest']

if (!token) {
  console.error('⚠️  Geen SANITY_API_TOKEN. Voeg toe aan .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

async function fetchAll<T>(url: string): Promise<T[]> {
  const all: T[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const res = await fetch(`${url}&page=${page}&per_page=100`)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `WordPress API fout (${res.status} ${res.statusText}): ${text.slice(0, 200)}`
      )
    }
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) hasMore = false
    else {
      all.push(...data)
      if (data.length < 100) hasMore = false
      else page++
    }
  }
  return all
}

async function importPosts() {
  console.log('\n📰 Blogposts ophalen van WordPress...')
  const posts = await fetchAll<any>(`${WP_URL}/posts?_embed&status=publish`)
  console.log(`   Gevonden: ${posts.length} blogposts`)

  let ok = 0
  let fail = 0
  for (const p of posts) {
    const slug = p.slug
    const content = stripHtml(p.content?.rendered || '')

    const doc = {
      _id: `blog-wp-${p.id}`,
      _type: 'blog',
      title: p.title?.rendered || 'Zonder titel',
      slug: { _type: 'slug', current: slug },
      type: 'Verhaal',
      content: [
        {
          _type: 'block',
          _key: `block-${p.id}`,
          style: 'normal',
          children: [{ _type: 'span', _key: '1', text: content.slice(0, 8000) }],
          markDefs: [],
        },
      ],
      publishedAt: p.date,
    }

    try {
      await client.createOrReplace(doc)
      ok++
      console.log(`   ✓ ${p.title?.rendered}`)
    } catch (e) {
      fail++
      console.error(`   ✗ ${p.title?.rendered}:`, (e as Error).message)
    }
  }

  console.log(`   Klaar: ${ok} gelukt, ${fail} mislukt`)
}

async function importPages() {
  console.log('\n📄 Pagina\'s ophalen van WordPress...')
  const pages = await fetchAll<any>(`${WP_URL}/pages?_embed&status=publish`)
  console.log(`   Gevonden: ${pages.length} pagina's`)

  let ok = 0
  let fail = 0
  for (const p of pages) {
    const slug = p.slug
    const isRemedie = REMEDIE_SLUGS.includes(slug)

    if (isRemedie) {
      const content = stripHtml(p.content?.rendered || '')
      try {
        await client.createOrReplace({
          _id: `remedie-wp-${p.id}`,
          _type: 'remedie',
          title: p.title?.rendered || slug,
          slug: { _type: 'slug', current: slug },
          werking: content.slice(0, 5000),
        })
        ok++
        console.log(`   ✓ [remedie] ${p.title?.rendered}`)
      } catch (e) {
        fail++
        console.error(`   ✗ [remedie] ${p.title?.rendered}:`, (e as Error).message)
      }
    } else {
      const content = p.content?.rendered || ''
      try {
        await client.createOrReplace({
          _id: `page-wp-${p.id}`,
          _type: 'page',
          title: p.title?.rendered || slug,
          slug: { _type: 'slug', current: slug },
          sections: [
            {
              _key: `section-${p.id}`,
              _type: 'contentSection',
              heading: p.title?.rendered || '',
              body: [
                {
                  _type: 'block',
                  _key: 'migrated',
                  style: 'normal',
                  children: [{ _type: 'span', _key: '1', text: stripHtml(content).slice(0, 5000) }],
                  markDefs: [],
                },
              ],
            },
          ],
        })
        ok++
        console.log(`   ✓ [pagina] ${p.title?.rendered}`)
      } catch (e) {
        fail++
        console.error(`   ✗ [pagina] ${p.title?.rendered}:`, (e as Error).message)
      }
    }
  }

  console.log(`   Klaar: ${ok} gelukt, ${fail} mislukt`)
}

async function main() {
  console.log('\n🌐 WordPress → Sanity import (natuurlijkprana.nl)\n')
  try {
    await importPosts()
    await importPages()
    console.log('\n✅ Import klaar.\n')
  } catch (e) {
    console.error('\n❌ Import gestopt door fout:', (e as Error).message)
    process.exit(1)
  }
}

main()