import { client, queries } from '@/lib/SanityClient'
import Link from 'next/link'

// Geen caching voor verse data
export const revalidate = 0

// Kleuren voor testimonial kaarten - meer uitgesproken
const testimonialColors = [
  'bg-terracotta/10 border-terracotta/30',
  'bg-sage-200 border-sage-400',
  'bg-peach-200 border-peach-300',
  'bg-coral/10 border-coral/30',
]

export const metadata = {
  title: 'Ervaringen | Natuurlijk Prana',
  description: 'Lees ervaringen van ouders en kinderen met de bloesemremedies van Natuurlijk Prana.',
}

interface Testimonial {
  _id: string
  name?: string
  initials?: string
  quote: string
  context?: string
}

async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(queries.testimonials)
}

export default async function ErvaringenPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <header className="text-center mb-12">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            Ervaringen
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-2">
            Wat anderen zeggen
          </h1>
          <p className="text-lg text-stone mt-4 max-w-2xl mx-auto">
            Lees hier ervaringen van ouders, kinderen en anderen die met de bloesemremedies hebben gewerkt.
          </p>
        </header>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial._id}
                className={`rounded-2xl p-8 shadow-md border-2 ${testimonialColors[index % testimonialColors.length]}`}
              >
                <div className="text-terracotta text-7xl font-serif leading-none mb-2 -mt-2">&ldquo;</div>
                <p className="text-charcoal leading-relaxed mb-6 text-lg">
                  {testimonial.quote}
                </p>
                <footer className="border-t border-charcoal/10 pt-4">
                  <p className="font-semibold text-charcoal">
                    {testimonial.name || testimonial.initials || 'Anoniem'}
                  </p>
                  {testimonial.context && (
                    <p className="text-sm text-terracotta-dark font-medium">{testimonial.context}</p>
                  )}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone text-lg">
              Er zijn nog geen ervaringen gedeeld.
            </p>
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-stone mb-6">
            Wil je ook je ervaring delen? Neem gerust contact op.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-coral text-white px-8 py-3 rounded-full hover:bg-terracotta hover:text-white transition-colors font-medium shadow-sm hover:shadow-md"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    </div>
  )
}
