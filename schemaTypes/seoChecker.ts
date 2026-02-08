// schemaTypes/seoChecker.ts
// SEO/GEO Kwaliteitscheck voor content

// SEO Check object dat scores en tips bevat
export const seoCheckerType = {
  name: 'seoChecker',
  title: 'SEO/GEO Check',
  type: 'object',
  icon: () => '📊',
  description: 'Kwaliteitscheck voor zoekmachines en AI',
  fields: [
    {
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Het belangrijkste zoekwoord voor deze pagina',
    },
    {
      name: 'secondaryKeywords',
      title: 'Secundaire Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Extra zoekwoorden (max 5)',
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(5),
    },
  ],
}

// SEO Checklist items met uitleg
export const seoChecklistItems = {
  // Basis SEO
  titleLength: {
    name: 'Titel lengte',
    check: (title: string) => {
      const len = title?.length || 0
      if (len >= 50 && len <= 60) return { score: 100, message: 'Perfecte lengte (50-60 tekens)' }
      if (len >= 40 && len <= 70) return { score: 70, message: 'Acceptabel (40-70 tekens)' }
      if (len < 40) return { score: 30, message: 'Te kort - voeg meer context toe' }
      return { score: 30, message: 'Te lang - maak korter voor zoekresultaten' }
    },
  },
  metaDescription: {
    name: 'Meta beschrijving',
    check: (desc: string) => {
      const len = desc?.length || 0
      if (!desc) return { score: 0, message: 'Ontbreekt - voeg een meta beschrijving toe' }
      if (len >= 120 && len <= 160) return { score: 100, message: 'Perfecte lengte' }
      if (len >= 100 && len <= 180) return { score: 70, message: 'Acceptabel' }
      return { score: 40, message: len < 100 ? 'Te kort' : 'Te lang' }
    },
  },
  hasImage: {
    name: 'Hoofdafbeelding',
    check: (hasImage: boolean) => {
      if (hasImage) return { score: 100, message: 'Afbeelding aanwezig' }
      return { score: 0, message: 'Voeg een afbeelding toe voor betere resultaten' }
    },
  },
  imageAlt: {
    name: 'Alt tekst afbeelding',
    check: (alt: string) => {
      if (!alt) return { score: 0, message: 'Ontbreekt - voeg alt tekst toe' }
      if (alt.length >= 10) return { score: 100, message: 'Alt tekst aanwezig' }
      return { score: 50, message: 'Alt tekst is erg kort' }
    },
  },

  // GEO specifiek
  contentLength: {
    name: 'Content lengte',
    check: (wordCount: number) => {
      if (wordCount >= 1000) return { score: 100, message: `${wordCount} woorden - uitstekend voor GEO` }
      if (wordCount >= 500) return { score: 70, message: `${wordCount} woorden - goed` }
      if (wordCount >= 300) return { score: 50, message: `${wordCount} woorden - overweeg uitbreiding` }
      return { score: 20, message: `${wordCount} woorden - te kort voor goede vindbaarheid` }
    },
  },
  hasStructuredData: {
    name: 'Schema.org markup',
    check: (hasSchema: boolean) => {
      if (hasSchema) return { score: 100, message: 'Structured data aanwezig' }
      return { score: 0, message: 'Voeg schema.org markup toe voor AI-zoekmachines' }
    },
  },
  hasFAQ: {
    name: 'FAQ sectie',
    check: (hasFaq: boolean) => {
      if (hasFaq) return { score: 100, message: 'FAQ aanwezig - goed voor GEO' }
      return { score: 30, message: 'Overweeg FAQ toe te voegen voor betere AI-vindbaarheid' }
    },
  },
  hasInternalLinks: {
    name: 'Interne links',
    check: (linkCount: number) => {
      if (linkCount >= 3) return { score: 100, message: `${linkCount} interne links - uitstekend` }
      if (linkCount >= 1) return { score: 60, message: `${linkCount} interne link(s) - voeg meer toe` }
      return { score: 0, message: 'Geen interne links - voeg links naar gerelateerde content toe' }
    },
  },
  hasExternalSources: {
    name: 'Bronvermeldingen',
    check: (hasExternal: boolean) => {
      if (hasExternal) return { score: 100, message: 'Externe bronnen aanwezig - verhoogt betrouwbaarheid' }
      return { score: 50, message: 'Overweeg betrouwbare bronnen toe te voegen' }
    },
  },
  keywordInTitle: {
    name: 'Keyword in titel',
    check: (title: string, keyword: string) => {
      if (!keyword) return { score: 50, message: 'Geen focus keyword ingesteld' }
      if (title?.toLowerCase().includes(keyword.toLowerCase())) {
        return { score: 100, message: 'Focus keyword staat in de titel' }
      }
      return { score: 30, message: 'Voeg het focus keyword toe aan de titel' }
    },
  },
  keywordInFirstParagraph: {
    name: 'Keyword in eerste alinea',
    check: (firstParagraph: string, keyword: string) => {
      if (!keyword) return { score: 50, message: 'Geen focus keyword ingesteld' }
      if (firstParagraph?.toLowerCase().includes(keyword.toLowerCase())) {
        return { score: 100, message: 'Focus keyword staat in de eerste alinea' }
      }
      return { score: 40, message: 'Gebruik het focus keyword in de eerste alinea' }
    },
  },

  // E-E-A-T
  hasAuthor: {
    name: 'Auteur gekoppeld',
    check: (hasAuthor: boolean) => {
      if (hasAuthor) return { score: 100, message: 'Auteur gekoppeld - goed voor E-E-A-T' }
      return { score: 20, message: 'Koppel een auteur voor betere betrouwbaarheid' }
    },
  },
  hasPublishDate: {
    name: 'Publicatiedatum',
    check: (hasDate: boolean) => {
      if (hasDate) return { score: 100, message: 'Publicatiedatum ingesteld' }
      return { score: 30, message: 'Voeg een publicatiedatum toe' }
    },
  },
}

// Helper functie om totale score te berekenen
export function calculateSEOScore(checks: Array<{ score: number }>): number {
  if (checks.length === 0) return 0
  const total = checks.reduce((sum, check) => sum + check.score, 0)
  return Math.round(total / checks.length)
}

// Score kleuren
export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e' // green
  if (score >= 60) return '#f59e0b' // amber
  if (score >= 40) return '#f97316' // orange
  return '#ef4444' // red
}

// Score labels
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Uitstekend'
  if (score >= 60) return 'Goed'
  if (score >= 40) return 'Kan beter'
  return 'Actie nodig'
}
