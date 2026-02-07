/**
 * Script om productcategorieën aan te maken in Sanity
 * Voer uit met: npx tsx scripts/seed-categories.ts
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

interface CategoryData {
  title: string
  slug: string
  description: string
  order: number
  children?: Omit<CategoryData, 'children'>[]
}

const categories: CategoryData[] = [
  {
    title: 'Bloesemremedies',
    slug: 'bloesemremedies',
    description: 'Natuurlijke bloesemremedies voor emotionele balans en welzijn. Ontdek de kracht van bloesems uit de natuur.',
    order: 1,
    children: [
      {
        title: 'PRANA Remedies',
        slug: 'prana-remedies',
        description: 'Unieke bloesemremedies gemaakt op krachtige plekken in Nederland, gecombineerd met edelstenen.',
        order: 1,
      },
      {
        title: 'Alaskan Essences',
        slug: 'alaskan-essences',
        description: 'Krachtige bloesem-, edelsteen- en omgevingsremedies uit de ongerepte natuur van Alaska.',
        order: 2,
      },
      {
        title: 'Edelsteenremedies',
        slug: 'edelsteenremedies',
        description: 'Remedies gemaakt met de energie van edelstenen voor diepe healing en transformatie.',
        order: 3,
      },
      {
        title: 'Combinatieremedies',
        slug: 'combinatieremedies',
        description: 'Speciaal samengestelde combinaties van bloesemremedies voor specifieke thema\'s.',
        order: 4,
      },
      {
        title: 'Omgevingsremedies',
        slug: 'omgevingsremedies',
        description: 'Remedies die de energie van bijzondere plekken en omgevingen bevatten.',
        order: 5,
      },
    ],
  },
  {
    title: 'Celzouten',
    slug: 'celzouten',
    description: 'Schüssler celzouten voor mineraalbalans en ondersteuning van de gezondheid op celniveau.',
    order: 2,
  },
  {
    title: 'Essentiële oliën',
    slug: 'essentiele-olien',
    description: 'Zuivere essentiële oliën voor aromatherapie en natuurlijke verzorging.',
    order: 3,
  },
]

async function seedCategories() {
  console.log('🌱 Start met aanmaken van productcategorieën...\n')

  for (const category of categories) {
    try {
      // Check if category already exists
      const existing = await client.fetch(
        `*[_type == "productCategory" && slug.current == $slug][0]`,
        { slug: category.slug }
      )

      if (existing) {
        console.log(`⏭️  Categorie "${category.title}" bestaat al, overslaan...`)
      } else {
        // Create main category
        const mainCategory = await client.create({
          _type: 'productCategory',
          title: category.title,
          slug: { _type: 'slug', current: category.slug },
          description: category.description,
          order: category.order,
        })
        console.log(`✅ Hoofdcategorie aangemaakt: ${category.title}`)

        // Create subcategories if any
        if (category.children) {
          for (const child of category.children) {
            const existingChild = await client.fetch(
              `*[_type == "productCategory" && slug.current == $slug][0]`,
              { slug: child.slug }
            )

            if (existingChild) {
              console.log(`   ⏭️  Subcategorie "${child.title}" bestaat al, overslaan...`)
            } else {
              await client.create({
                _type: 'productCategory',
                title: child.title,
                slug: { _type: 'slug', current: child.slug },
                description: child.description,
                order: child.order,
                parent: { _type: 'reference', _ref: mainCategory._id },
              })
              console.log(`   ✅ Subcategorie aangemaakt: ${child.title}`)
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Fout bij aanmaken van ${category.title}:`, error)
    }
  }

  console.log('\n✨ Klaar met aanmaken van categorieën!')
}

seedCategories()
