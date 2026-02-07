/**
 * Script om HTML entities te decoderen in alle pagina content
 * Bijv. &amp; -> &, &quot; -> ", etc.
 * Voer uit met: npx tsx scripts/fix-html-entities.ts
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

// HTML entities die we willen decoderen
const htmlEntities: Record<string, string> = {
  '&amp;': '&',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&ndash;': '\u2013', // en dash
  '&mdash;': '\u2014', // em dash
  '&lsquo;': '\u2018', // left single quote
  '&rsquo;': '\u2019', // right single quote
  '&ldquo;': '\u201C', // left double quote
  '&rdquo;': '\u201D', // right double quote
  '&hellip;': '\u2026', // ellipsis
  '&euro;': '\u20AC',
  '&copy;': '\u00A9',
  '&reg;': '\u00AE',
  '&trade;': '\u2122',
  '&deg;': '\u00B0',
  '&plusmn;': '\u00B1',
  '&frac12;': '\u00BD',
  '&frac14;': '\u00BC',
  '&frac34;': '\u00BE',
  // Nederlandse speciale tekens
  '&eacute;': '\u00E9',
  '&euml;': '\u00EB',
  '&iuml;': '\u00EF',
  '&ouml;': '\u00F6',
  '&uuml;': '\u00FC',
  '&Eacute;': '\u00C9',
  '&agrave;': '\u00E0',
  '&egrave;': '\u00E8',
  '&ccedil;': '\u00E7',
}

function decodeHtmlEntities(text: string): string {
  let decoded = text

  // Eerst de bekende entities vervangen
  for (const [entity, char] of Object.entries(htmlEntities)) {
    decoded = decoded.split(entity).join(char)
  }

  // Numerieke entities decoderen (bijv. &#8217; -> ')
  decoded = decoded.replace(/&#(\d+);/g, (_, num) => {
    return String.fromCharCode(parseInt(num, 10))
  })

  // Hexadecimale entities decoderen (bijv. &#x2019; -> ')
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16))
  })

  return decoded
}

function hasHtmlEntities(text: string): boolean {
  // Check voor & gevolgd door letters/cijfers en eindigend op ;
  return /&[a-zA-Z0-9#]+;/.test(text)
}

// Recursief door content blocks gaan en tekst decoderen
function processContent(content: unknown[]): { content: unknown[]; changed: boolean } {
  let changed = false

  const processedContent = content.map((block: unknown) => {
    if (!block || typeof block !== 'object') return block

    const blockObj = block as Record<string, unknown>
    const newBlock = { ...blockObj }

    // Process children (tekst spans)
    if (Array.isArray(blockObj.children)) {
      newBlock.children = blockObj.children.map((child: unknown) => {
        if (!child || typeof child !== 'object') return child

        const childObj = child as Record<string, unknown>
        if (typeof childObj.text === 'string' && hasHtmlEntities(childObj.text)) {
          const decoded = decodeHtmlEntities(childObj.text)
          if (decoded !== childObj.text) {
            changed = true
            return { ...childObj, text: decoded }
          }
        }
        return child
      })
    }

    // Process marks/markDefs indien nodig
    if (Array.isArray(blockObj.markDefs)) {
      newBlock.markDefs = blockObj.markDefs.map((mark: unknown) => {
        if (!mark || typeof mark !== 'object') return mark

        const markObj = mark as Record<string, unknown>
        const newMark = { ...markObj }

        // Decode href in links
        if (typeof markObj.href === 'string' && hasHtmlEntities(markObj.href)) {
          const decoded = decodeHtmlEntities(markObj.href)
          if (decoded !== markObj.href) {
            changed = true
            newMark.href = decoded
          }
        }

        return newMark
      })
    }

    return newBlock
  })

  return { content: processedContent, changed }
}

async function fixHtmlEntities() {
  console.log('Start HTML entities fix...\n')

  // Haal alle paginas op met content
  const pages = await client.fetch(`*[_type == "page" && defined(content) && length(content) > 0]{
    _id,
    title,
    "slug": slug.current,
    content
  }`)

  console.log(`Gevonden: ${pages.length} paginas met content\n`)

  let fixedCount = 0
  const fixedPages: string[] = []

  for (const page of pages) {
    const { content, changed } = processContent(page.content)

    if (changed) {
      try {
        await client.patch(page._id).set({ content }).commit()
        fixedCount++
        fixedPages.push(page.title)
        console.log(`Gefixed: ${page.title}`)
      } catch (error) {
        console.error(`Fout bij ${page.title}:`, error)
      }
    }
  }

  // Ook in blog posts checken
  console.log('\nChecking blog posts...')
  const blogs = await client.fetch(`*[_type == "blog" && defined(content) && length(content) > 0]{
    _id,
    title,
    content
  }`)

  for (const blog of blogs) {
    const { content, changed } = processContent(blog.content)

    if (changed) {
      try {
        await client.patch(blog._id).set({ content }).commit()
        fixedCount++
        fixedPages.push(`[Blog] ${blog.title}`)
        console.log(`Gefixed: [Blog] ${blog.title}`)
      } catch (error) {
        console.error(`Fout bij blog ${blog.title}:`, error)
      }
    }
  }

  // Ook in remedies checken
  console.log('\nChecking remedies...')
  const remedies = await client.fetch(`*[_type == "remedie" && defined(description) && length(description) > 0]{
    _id,
    title,
    description
  }`)

  for (const remedy of remedies) {
    const { content, changed } = processContent(remedy.description)

    if (changed) {
      try {
        await client.patch(remedy._id).set({ description: content }).commit()
        fixedCount++
        fixedPages.push(`[Remedie] ${remedy.title}`)
        console.log(`Gefixed: [Remedie] ${remedy.title}`)
      } catch (error) {
        console.error(`Fout bij remedie ${remedy.title}:`, error)
      }
    }
  }

  // Ook titel en subtitle checken
  console.log('\nChecking titles and subtitles...')
  const allPages = await client.fetch(`*[_type == "page"]{
    _id,
    title,
    subtitle
  }`)

  for (const page of allPages) {
    const updates: Record<string, string> = {}

    if (page.title && hasHtmlEntities(page.title)) {
      updates.title = decodeHtmlEntities(page.title)
    }
    if (page.subtitle && hasHtmlEntities(page.subtitle)) {
      updates.subtitle = decodeHtmlEntities(page.subtitle)
    }

    if (Object.keys(updates).length > 0) {
      try {
        await client.patch(page._id).set(updates).commit()
        fixedCount++
        console.log(`Titel/subtitle gefixed: ${page.title}`)
      } catch (error) {
        console.error(`Fout bij titel ${page.title}:`, error)
      }
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log(`\nHTML entities fix voltooid!`)
  console.log(`   - Totaal gefixte documenten: ${fixedCount}`)

  if (fixedPages.length > 0) {
    console.log('\nGefixte items:')
    fixedPages.forEach(p => console.log(`   - ${p}`))
  }
}

fixHtmlEntities()
