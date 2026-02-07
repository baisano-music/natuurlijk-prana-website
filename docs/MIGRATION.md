# URL Migratie Document - Natuurlijk Prana

Dit document bevat alle URL mappings van de oude website (natuurlijkprana.nl) naar de nieuwe website.
Gebruik deze informatie voor het instellen van 301 redirects voor SEO en vindbaarheid.

## Overzicht

| Type | Aantal | Actie nodig |
|------|--------|-------------|
| Pagina's | 49 | Meeste URLs blijven hetzelfde |
| Blog posts | 111 | REDIRECT nodig naar /nieuws/[slug] |
| Remedies | 5 | REDIRECT nodig naar /remedies/[slug] |

## Redirects die ingesteld moeten worden

### Blog posts → /nieuws/

Alle blog posts moeten worden doorverwezen van `/{slug}` naar `/nieuws/{slug}`.
Dit is al geconfigureerd in `next.config.ts`.

### Remedies → /remedies/

Alle remedie pagina's moeten worden doorverwezen van `/{slug}` naar `/remedies/{slug}`.
Dit is al geconfigureerd in `next.config.ts`.

## Pagina's die hetzelfde blijven

De volgende pagina's behouden hun huidige URL:

- `/over-mij`
- `/contact`
- `/nieuws`
- `/privacy-en-disclaimer`
- `/bloesemremedies`
- `/tarieven` (mogelijk nieuw: was `/consult-bloesemremedies`)
- En alle andere content pagina's

## Speciale gevallen

### Pagina's die mogelijk een andere URL krijgen

| Oude URL | Overwegen nieuwe URL | Reden |
|----------|---------------------|-------|
| `/gratis-e-magazine` | `/gratis-magazine` | Kortere URL |
| `/consult-bloesemremedies` | `/tarieven` | Betere naamgeving |
| `/praktijk-voor-balans-en-bewustzijn-hoofddorp-prana` | `/over-mij` of verwijderen | Dubbele content |
| `/mijn-account` | Verwijderen | Geen webshop functionaliteit |
| `/uitloggen` | Verwijderen | Geen webshop functionaliteit |
| `/producten-bestellen` | `/contact` of verwijderen | Geen webshop |

### WordPress specifieke URLs die genegeerd kunnen worden

- `/mijn-account`
- `/uitloggen`
- `/producten-bestellen` (als er geen webshop is)

## Implementatie in Next.js

De redirects zijn geconfigureerd in `next.config.ts`. Zie het bestand voor de implementatie.

## Checklist SEO migratie

- [ ] Alle 301 redirects instellen
- [ ] Google Search Console updaten met nieuwe sitemap
- [ ] Oude sitemap.xml controleren en vergelijken
- [ ] Belangrijke backlinks controleren
- [ ] 404 pagina maken met handige links
- [ ] Canonical URLs instellen
- [ ] Meta descriptions controleren

## Contact

Voor vragen over deze migratie, neem contact op met de ontwikkelaar.
