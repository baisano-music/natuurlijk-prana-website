// schemaTypes/seoCheckerField.tsx
// Custom field component voor SEO/GEO kwaliteitscheck

import React, { useCallback, useEffect, useState } from 'react'
import { Card, Stack, Text, Box, Flex, Badge } from '@sanity/ui'
import { useFormValue, ObjectInputProps } from 'sanity'

interface CheckResult {
  name: string
  score: number
  message: string
  category: 'seo' | 'geo' | 'eeat'
}

// Helper om plain text uit PortableText te halen
function portableTextToPlain(blocks: unknown[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .map((block: unknown) => {
      if (typeof block === 'object' && block !== null && 'children' in block) {
        const typedBlock = block as { children?: Array<{ text?: string }> }
        return typedBlock.children?.map((child) => child?.text || '').join('') || ''
      }
      return ''
    })
    .join(' ')
}

// Woorden tellen
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

// Interne links tellen in PortableText
function countInternalLinks(blocks: unknown[]): number {
  if (!blocks || !Array.isArray(blocks)) return 0

  let count = 0
  blocks.forEach((block: unknown) => {
    if (typeof block === 'object' && block !== null && 'markDefs' in block) {
      const typedBlock = block as { markDefs?: Array<{ _type?: string }> }
      typedBlock.markDefs?.forEach((mark) => {
        if (mark._type === 'internalLink') count++
      })
    }
  })
  return count
}

export function SEOCheckerInput(props: ObjectInputProps) {
  const [checks, setChecks] = useState<CheckResult[]>([])
  const [totalScore, setTotalScore] = useState(0)

  // Haal document waarden op
  const title = useFormValue(['title']) as string | undefined
  const seoTitle = useFormValue(['seo', 'title']) as string | undefined
  const seoMetaTitle = useFormValue(['seo', 'metaTitle']) as string | undefined
  const seoDescription = useFormValue(['seo', 'description']) as string | undefined
  const seoMetaDescription = useFormValue(['seo', 'metaDescription']) as string | undefined
  const excerpt = useFormValue(['excerpt']) as string | undefined
  const focusKeyword = useFormValue(['seo', 'focusKeyword']) as string | undefined
  const content = useFormValue(['content']) as unknown[] | undefined
  const mainImage = useFormValue(['mainImage']) as { alt?: string } | undefined
  const author = useFormValue(['author']) as { _ref?: string } | undefined
  const publishedAt = useFormValue(['publishedAt']) as string | undefined
  const relatedPages = useFormValue(['relatedPages']) as unknown[] | undefined
  const relatedPosts = useFormValue(['relatedPosts']) as unknown[] | undefined

  const runChecks = useCallback(() => {
    const results: CheckResult[] = []

    // Effectieve titel en beschrijving
    const effectiveTitle = seoTitle || seoMetaTitle || title || ''
    const effectiveDescription = seoDescription || seoMetaDescription || excerpt || ''
    const contentText = content ? portableTextToPlain(content) : ''
    const wordCount = countWords(contentText)
    const internalLinkCount = content ? countInternalLinks(content) : 0
    const relatedCount = (relatedPages?.length || 0) + (relatedPosts?.length || 0)

    // ===== SEO CHECKS =====

    // Titel lengte
    const titleLen = effectiveTitle.length
    if (titleLen >= 50 && titleLen <= 60) {
      results.push({ name: 'Titel lengte', score: 100, message: `${titleLen} tekens - perfect!`, category: 'seo' })
    } else if (titleLen >= 40 && titleLen <= 70) {
      results.push({ name: 'Titel lengte', score: 70, message: `${titleLen} tekens - acceptabel`, category: 'seo' })
    } else if (titleLen > 0) {
      results.push({ name: 'Titel lengte', score: 30, message: `${titleLen} tekens - ${titleLen < 40 ? 'te kort' : 'te lang'}`, category: 'seo' })
    } else {
      results.push({ name: 'Titel lengte', score: 0, message: 'Geen titel ingesteld', category: 'seo' })
    }

    // Meta beschrijving
    const descLen = effectiveDescription.length
    if (descLen >= 120 && descLen <= 160) {
      results.push({ name: 'Meta beschrijving', score: 100, message: `${descLen} tekens - perfect!`, category: 'seo' })
    } else if (descLen >= 100 && descLen <= 180) {
      results.push({ name: 'Meta beschrijving', score: 70, message: `${descLen} tekens - acceptabel`, category: 'seo' })
    } else if (descLen > 0) {
      results.push({ name: 'Meta beschrijving', score: 40, message: `${descLen} tekens - ${descLen < 100 ? 'te kort' : 'te lang'}`, category: 'seo' })
    } else {
      results.push({ name: 'Meta beschrijving', score: 0, message: 'Ontbreekt - voeg toe', category: 'seo' })
    }

    // Afbeelding
    if (mainImage) {
      results.push({ name: 'Hoofdafbeelding', score: 100, message: 'Aanwezig', category: 'seo' })
      // Alt tekst
      if (mainImage.alt && mainImage.alt.length >= 10) {
        results.push({ name: 'Alt tekst', score: 100, message: 'Goed ingevuld', category: 'seo' })
      } else if (mainImage.alt) {
        results.push({ name: 'Alt tekst', score: 50, message: 'Te kort', category: 'seo' })
      } else {
        results.push({ name: 'Alt tekst', score: 0, message: 'Ontbreekt', category: 'seo' })
      }
    } else {
      results.push({ name: 'Hoofdafbeelding', score: 0, message: 'Ontbreekt', category: 'seo' })
    }

    // Focus keyword
    if (focusKeyword) {
      results.push({ name: 'Focus keyword', score: 100, message: `"${focusKeyword}"`, category: 'seo' })

      // Keyword in titel
      if (effectiveTitle.toLowerCase().includes(focusKeyword.toLowerCase())) {
        results.push({ name: 'Keyword in titel', score: 100, message: 'Aanwezig', category: 'seo' })
      } else {
        results.push({ name: 'Keyword in titel', score: 30, message: 'Niet gevonden', category: 'seo' })
      }

      // Keyword in content
      if (contentText.toLowerCase().includes(focusKeyword.toLowerCase())) {
        results.push({ name: 'Keyword in content', score: 100, message: 'Aanwezig', category: 'seo' })
      } else {
        results.push({ name: 'Keyword in content', score: 30, message: 'Niet gevonden', category: 'seo' })
      }
    } else {
      results.push({ name: 'Focus keyword', score: 30, message: 'Niet ingesteld', category: 'seo' })
    }

    // ===== GEO CHECKS =====

    // Content lengte (belangrijk voor AI)
    if (wordCount >= 1000) {
      results.push({ name: 'Content lengte', score: 100, message: `${wordCount} woorden - uitstekend`, category: 'geo' })
    } else if (wordCount >= 500) {
      results.push({ name: 'Content lengte', score: 70, message: `${wordCount} woorden - goed`, category: 'geo' })
    } else if (wordCount >= 300) {
      results.push({ name: 'Content lengte', score: 50, message: `${wordCount} woorden - kan beter`, category: 'geo' })
    } else {
      results.push({ name: 'Content lengte', score: 20, message: `${wordCount} woorden - te kort`, category: 'geo' })
    }

    // Interne links
    const totalLinks = internalLinkCount + relatedCount
    if (totalLinks >= 5) {
      results.push({ name: 'Interne links', score: 100, message: `${totalLinks} links - uitstekend`, category: 'geo' })
    } else if (totalLinks >= 3) {
      results.push({ name: 'Interne links', score: 70, message: `${totalLinks} links - goed`, category: 'geo' })
    } else if (totalLinks >= 1) {
      results.push({ name: 'Interne links', score: 50, message: `${totalLinks} link(s) - voeg meer toe`, category: 'geo' })
    } else {
      results.push({ name: 'Interne links', score: 0, message: 'Geen - voeg links toe', category: 'geo' })
    }

    // ===== E-E-A-T CHECKS =====

    // Auteur
    if (author?._ref) {
      results.push({ name: 'Auteur gekoppeld', score: 100, message: 'Ja - goed voor betrouwbaarheid', category: 'eeat' })
    } else {
      results.push({ name: 'Auteur gekoppeld', score: 20, message: 'Nee - koppel een auteur', category: 'eeat' })
    }

    // Publicatiedatum
    if (publishedAt) {
      results.push({ name: 'Publicatiedatum', score: 100, message: 'Ingesteld', category: 'eeat' })
    } else {
      results.push({ name: 'Publicatiedatum', score: 30, message: 'Ontbreekt', category: 'eeat' })
    }

    // Bereken totaalscore
    const total = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 0

    setChecks(results)
    setTotalScore(total)
  }, [title, seoTitle, seoMetaTitle, seoDescription, seoMetaDescription, excerpt, focusKeyword, content, mainImage, author, publishedAt, relatedPages, relatedPosts])

  useEffect(() => {
    runChecks()
  }, [runChecks])

  const getScoreColor = (score: number): 'positive' | 'caution' | 'critical' => {
    if (score >= 70) return 'positive'
    if (score >= 40) return 'caution'
    return 'critical'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Uitstekend'
    if (score >= 60) return 'Goed'
    if (score >= 40) return 'Kan beter'
    return 'Actie nodig'
  }

  const seoChecks = checks.filter((c) => c.category === 'seo')
  const geoChecks = checks.filter((c) => c.category === 'geo')
  const eeatChecks = checks.filter((c) => c.category === 'eeat')

  return (
    <Stack space={4}>
      {/* Render de standaard SEO velden */}
      {props.renderDefault(props)}

      {/* SEO/GEO Checker Card */}
      <Card padding={4} radius={2} shadow={1} tone="transparent">
        <Stack space={4}>
          {/* Totaalscore */}
          <Flex align="center" justify="space-between">
            <Text size={2} weight="semibold">
              📊 SEO/GEO Score
            </Text>
            <Badge
              tone={getScoreColor(totalScore)}
              padding={2}
              radius={2}
            >
              {totalScore}% - {getScoreLabel(totalScore)}
            </Badge>
          </Flex>

          {/* Score balk */}
          <Box
            style={{
              height: 8,
              borderRadius: 4,
              background: '#e5e7eb',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                height: '100%',
                width: `${totalScore}%`,
                background:
                  totalScore >= 80 ? '#22c55e' :
                  totalScore >= 60 ? '#f59e0b' :
                  totalScore >= 40 ? '#f97316' : '#ef4444',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>

          {/* SEO Checks */}
          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
              🔍 SEO
            </Text>
            <Stack space={2}>
              {seoChecks.map((check, i) => (
                <Flex key={i} align="center" justify="space-between">
                  <Text size={1} muted>{check.name}</Text>
                  <Badge
                    tone={getScoreColor(check.score)}
                    fontSize={0}
                    padding={1}
                  >
                    {check.message}
                  </Badge>
                </Flex>
              ))}
            </Stack>
          </Box>

          {/* GEO Checks */}
          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
              🤖 GEO (AI Vindbaarheid)
            </Text>
            <Stack space={2}>
              {geoChecks.map((check, i) => (
                <Flex key={i} align="center" justify="space-between">
                  <Text size={1} muted>{check.name}</Text>
                  <Badge
                    tone={getScoreColor(check.score)}
                    fontSize={0}
                    padding={1}
                  >
                    {check.message}
                  </Badge>
                </Flex>
              ))}
            </Stack>
          </Box>

          {/* E-E-A-T Checks */}
          <Box>
            <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
              🏆 E-E-A-T (Betrouwbaarheid)
            </Text>
            <Stack space={2}>
              {eeatChecks.map((check, i) => (
                <Flex key={i} align="center" justify="space-between">
                  <Text size={1} muted>{check.name}</Text>
                  <Badge
                    tone={getScoreColor(check.score)}
                    fontSize={0}
                    padding={1}
                  >
                    {check.message}
                  </Badge>
                </Flex>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Card>
    </Stack>
  )
}

export default SEOCheckerInput
