/**
 * Importeer remedies uit JSON naar Sanity
 *
 * Gebruik:
 * 1. Vul data/remedies.json met je data (kopieer van remedies-voorbeeld.json)
 * 2. Maak een API-token: sanity.io/manage → Project → API → Tokens
 * 3. Voer uit: npx tsx scripts/import-remedies.ts
 *
 * Of met token in .env: SANITY_API_TOKEN=sk...
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('⚠️  Geen SANITY_API_TOKEN gevonden.')
  console.error('   Voeg toe aan .env.local: SANITY_API_TOKEN=sk...')
  console.error('   Of: SANITY_API_TOKEN=sk... npx tsx scripts/import-remedies.ts')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// Slug maken van titel
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

type RemedieInput = {
  title: string
  kernkwaliteit?: string
  werking?: string
  mantra?: string
  ontstaan?: { datum?: string; krachtplek?: string }
  ingredienten?: string[]
  edelstenen?: string[]
}

async function importRemedies() {
  const dataPath = path.join(process.cwd(), 'data', 'remedies.json')

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Bestand data/remedies.json niet gevonden.')
    console.error('   Kopieer data/remedies-voorbeeld.json naar data/remedies.json')
    console.error('   en vul het met je content.')
    process.exit(1)
  }

  const raw = fs.readFileSync(dataPath, 'utf-8')
  let remedies: RemedieInput[]

  try {
    remedies = JSON.parse(raw)
  } catch (e) {
    console.error('❌ Ongeldige JSON in data/remedies.json')
    process.exit(1)
  }

  console.log(`\n📦 Importeren van ${remedies.length} remedie(s)...\n`)

  for (let i = 0; i < remedies.length; i++) {
    const r = remedies[i]
    const slug = slugify(r.title)

    const doc = {
      _type: 'remedie',
      title: r.title,
      slug: { _type: 'slug', current: slug },
      kernkwaliteit: r.kernkwaliteit || undefined,
      werking: r.werking || undefined,
      mantra: r.mantra || undefined,
      ontstaan: r.ontstaan
        ? {
            datum: r.ontstaan.datum || undefined,
            krachtplek: r.ontstaan.krachtplek || undefined,
          }
        : undefined,
      ingredienten: r.ingredienten || [],
      edelstenen: r.edelstenen || [],
    }

    try {
      await client.createOrReplace({
        ...doc,
        _id: `remedie-${slug}`,
      })
      console.log(`   ✓ ${r.title}`)
    } catch (err) {
      console.error(`   ✗ ${r.title}:`, (err as Error).message)
    }
  }

  console.log('\n✅ Import klaar.\n')
}

importRemedies()
