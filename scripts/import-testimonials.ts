/**
 * Script om testimonials te importeren in Sanity
 * Run: npx tsx scripts/import-testimonials.ts
 */
import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Laad .env.local (Next.js standaard)
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0xp96ddy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const testimonials = [
  {
    name: 'Sandra',
    context: 'Baasje van hond Ben',
    quote: 'Wat een effect hebben je druppels! Ik vind hem echt rustig en relaxter.',
    featured: true,
  },
  {
    name: 'Leonie',
    context: 'Moeder van L.',
    quote: 'Ons zoontje slaapt sinds de druppels echt al een stuk rustiger! Hij wordt niet meer huilend wakker.',
    featured: true,
  },
  {
    name: 'Jose',
    context: '',
    quote: 'Travelease is super spul. Totaal geen last van jetlag gehad naar Thailand.',
    featured: false,
  },
  {
    name: 'Manon',
    context: 'Moeder van Cleo',
    quote: 'De druppeltjes voor Cleo voor het beter en rustiger slapen werken super goed.',
    featured: true,
  },
  {
    name: 'Esther',
    context: '',
    quote: 'Sandy is iemand waar je je snel bij op je gemak voelt. Ze zorgt voor veiligheid en vertrouwen.',
    featured: false,
  },
  {
    name: 'Marina',
    context: 'Moeder',
    quote: 'Na het gebruik van een spray samengesteld door Sandy, slaapt mijn dochter nu stukken beter.',
    featured: false,
  },
  {
    name: 'Amela',
    context: '',
    quote: 'Een consult bij Sandy is voor mij elke keer weer een stapje vooruit in mijn eigen zoektocht.',
    featured: false,
  },
  {
    name: 'Maria',
    context: 'Moeder',
    quote: 'Mijn dochter heeft het flesje remedies de hele dag bij zich en zegt dat ze zich er erg blij door voelt.',
    featured: false,
  },
  {
    name: 'Nina',
    context: '',
    quote: 'Nogmaals dank Sandy voor je hulp. Hij gaat veel beter. Geen buikpijn meer.',
    featured: false,
  },
]

async function importTestimonials() {
  console.log('🚀 Start import van testimonials...\n')

  for (const testimonial of testimonials) {
    try {
      const doc = {
        _type: 'testimonial',
        name: testimonial.name,
        quote: testimonial.quote,
        context: testimonial.context || undefined,
        featured: testimonial.featured,
      }

      const result = await client.create(doc)
      console.log(`✅ Geïmporteerd: ${testimonial.name} (${result._id})`)
    } catch (error) {
      console.error(`❌ Fout bij ${testimonial.name}:`, error)
    }
  }

  console.log('\n✨ Import voltooid!')
}

importTestimonials()
