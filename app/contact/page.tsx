import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="bg-cream min-h-[60vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
          Contact
        </h1>
        <p className="text-stone leading-relaxed mb-8 text-lg">
          Benieuwd welke remedie bij jou past? Ik bied een vrijblijvend en
          kosteloos kennismakingsgesprek aan. Neem gerust contact op.
        </p>

        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-peach-200">
          <p className="text-sage-600 italic">
            Deze pagina wordt binnenkort ingericht met een contactformulier en
            contactgegevens. Je kunt intussen een mail sturen of bellen via de
            gegevens in de footer.
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-sage-600 hover:text-terracotta font-medium transition-colors"
          >
            ← Terug naar home
          </Link>
        </div>
      </div>
    </div>
  )
}
