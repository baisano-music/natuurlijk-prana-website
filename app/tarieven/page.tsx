import Link from 'next/link'

export const metadata = {
  title: 'Tarieven & Consult | Natuurlijk Prana',
  description: 'Bekijk de tarieven voor bloesemtherapie consulten. Inclusief gratis kennismakingsgesprek, intake en vervolgconsulten.',
}

const tarieven = [
  {
    title: 'Kennismakingsgesprek',
    price: 'Gratis',
    duration: 'max. 20 minuten',
    description: 'Telefonisch of via video. Vrijblijvend gesprek om te bepalen of een consult bij jou past.',
    featured: false,
    includes: [
      'Kennismaking en eerste indruk',
      'Bespreken van je vraag of situatie',
      'Uitleg over de werkwijze',
      'Geen verplichting',
    ],
  },
  {
    title: 'Intake Consult',
    price: '€85',
    duration: '60-75 minuten',
    description: 'Uitgebreid eerste consult waarin we samen kijken naar wat er speelt en welke remedies passen.',
    featured: true,
    includes: [
      'Uitgebreide intake en kennismaking',
      'Persoonlijke remedieselectie',
      'Doseerflesje (30ml) voor 4-6 weken',
      'Nazorg via e-mail',
    ],
  },
  {
    title: 'Vervolgconsult',
    price: '€70',
    duration: 'ca. 50 minuten',
    description: 'Evaluatie van de voortgang en afstemming van de remedies op de huidige situatie.',
    featured: false,
    includes: [
      'Evaluatie van de afgelopen periode',
      'Nieuw doseerflesje indien nodig',
      'Bijstellen van de aanpak',
      'Binnen 6 maanden na vorig consult',
    ],
  },
]

const pakketten = [
  {
    title: '3-Sessie Pakket',
    price: '€195',
    originalPrice: '€225',
    description: 'Intake + 2 vervolgconsulten over een periode van 3-4 maanden. Inclusief remedies bij elke sessie.',
    note: 'Betaalbaar in 2 termijnen',
  },
]

const extraOpties = [
  {
    title: 'Telefonisch Consult',
    price: '€45',
    duration: '30 minuten',
    description: 'Coaching op afstand. Verzendkosten voor rekening cliënt.',
  },
  {
    title: 'Los Doseerflesje',
    price: '€20',
    description: 'Voor bestaande cliënten. Bijvoorbeeld voor broers/zussen of herhaalbehoefte.',
  },
]

export default function TarievenPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-cream to-peach-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
            Tarieven
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mt-4">
            Investeer in jezelf
          </h1>
          <p className="text-lg text-stone mt-6 max-w-2xl mx-auto leading-relaxed">
            Persoonlijke begeleiding met bloesemremedies. Elke sessie is maatwerk,
            afgestemd op jouw situatie en behoeften.
          </p>
        </div>
      </section>

      {/* Hoofdtarieven */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tarieven.map((tarief) => (
              <div
                key={tarief.title}
                className={`relative rounded-3xl p-8 ${
                  tarief.featured
                    ? 'bg-terracotta text-white shadow-xl scale-105 z-10'
                    : 'bg-white border border-peach-200 shadow-sm'
                }`}
              >
                {tarief.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-terracotta text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                      Meest gekozen
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`font-serif text-xl ${tarief.featured ? 'text-white' : 'text-charcoal'}`}>
                    {tarief.title}
                  </h3>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold ${tarief.featured ? 'text-white' : 'text-terracotta'}`}>
                      {tarief.price}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${tarief.featured ? 'text-sage-100' : 'text-stone'}`}>
                    {tarief.duration}
                  </p>
                </div>

                <p className={`text-center mb-6 ${tarief.featured ? 'text-sage-100' : 'text-stone'}`}>
                  {tarief.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tarief.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          tarief.featured ? 'text-peach-200' : 'text-sage-500'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tarief.featured ? 'text-sage-50' : 'text-charcoal'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full py-3 px-6 rounded-full font-medium text-center transition-all ${
                    tarief.featured
                      ? 'bg-white text-terracotta hover:bg-peach-100'
                      : 'bg-coral text-white hover:bg-coral-dark'
                  }`}
                >
                  {tarief.price === 'Gratis' ? 'Plan gesprek' : 'Boek consult'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakket */}
      <section className="py-16 md:py-24 px-4 bg-peach-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-terracotta uppercase tracking-widest text-sm font-medium">
              Voordeelpakket
            </span>
            <h2 className="font-serif text-3xl text-charcoal mt-4">
              Bespaar met een pakket
            </h2>
          </div>

          {pakketten.map((pakket) => (
            <div
              key={pakket.title}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-peach-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal">{pakket.title}</h3>
                  <p className="text-stone mt-2 max-w-lg">{pakket.description}</p>
                  {pakket.note && (
                    <p className="text-sage-600 text-sm mt-2 font-medium">{pakket.note}</p>
                  )}
                </div>
                <div className="text-center md:text-right">
                  <div className="flex items-baseline gap-3 justify-center md:justify-end">
                    <span className="text-stone line-through text-lg">{pakket.originalPrice}</span>
                    <span className="text-4xl font-bold text-terracotta">{pakket.price}</span>
                  </div>
                  <p className="text-sage-600 text-sm mt-1">
                    Bespaar €30
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block mt-4 bg-coral text-white px-8 py-3 rounded-full font-medium hover:bg-coral-dark transition-colors"
                  >
                    Kies pakket
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra opties */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-charcoal">
              Extra opties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {extraOpties.map((optie) => (
              <div
                key={optie.title}
                className="bg-white rounded-2xl p-6 border border-peach-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-lg text-charcoal">{optie.title}</h3>
                  <span className="text-xl font-bold text-terracotta">{optie.price}</span>
                </div>
                {optie.duration && (
                  <p className="text-sm text-sage-600 mb-2">{optie.duration}</p>
                )}
                <p className="text-stone">{optie.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Belangrijke info */}
      <section className="py-16 md:py-24 px-4 bg-sage-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-charcoal text-center mb-8">
            Goed om te weten
          </h2>

          <div className="bg-white rounded-2xl p-8 border border-sage-200 space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-stone">
                Bloesemremedies zijn een natuurlijke ondersteuning en vervangen geen medische of psychologische zorg.
                Raadpleeg bij twijfel altijd een arts.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-stone">
                Vervolgconsulten dienen binnen 6 maanden na het vorige consult plaats te vinden.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-stone">
                Remedies zijn veilig naast andere behandelingen en medicijnen.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-stone">
                Financiële drempels? Neem gerust contact op om de mogelijkheden te bespreken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-terracotta via-terracotta-dark to-terracotta">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-sage-100 leading-relaxed mb-10 text-lg">
            Plan een gratis kennismakingsgesprek en ontdek of bloesemtherapie bij jou past.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-coral text-white px-10 py-4 rounded-full font-medium hover:bg-coral-dark transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Plan kennismakingsgesprek
          </Link>
        </div>
      </section>
    </div>
  )
}
