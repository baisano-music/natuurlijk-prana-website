# Data importeren in Sanity

Handige manieren om je bestaande data in Sanity te krijgen.

---

## Optie 0: Vanuit WordPress (natuurlijkprana.nl)

**Directe import uit de live site:**

1. Zorg dat `SANITY_API_TOKEN` in `.env.local` staat (zie Optie 1)
2. Voer uit:

```bash
npm run import:wordpress
```

Het script haalt op:
- **Blogposts** (nieuws) → Sanity `blog`
- **Pagina's** → Sanity `page`
- **PRANA-remedies** (Liefde, Vertrouwen, Stroming, Regenbooglicht, Het Nest) → Sanity `remedie`

De content wordt automatisch van [natuurlijkprana.nl](https://natuurlijkprana.nl/) via de WordPress REST API opgehaald. Afbeeldingen worden niet meegenomen (die kun je later in Studio uploaden).

---

## Optie 1: Via JSON (meest praktisch)

**Stap 1:** Kopieer het voorbeeldbestand:
```bash
cp data/remedies-voorbeeld.json data/remedies.json
```

**Stap 2:** Vul `data/remedies.json` met je eigen data. Structuur:

```json
[
  {
    "title": "Liefde",
    "kernkwaliteit": "Zelfliefde, verbinding",
    "werking": "De remedie ondersteunt...",
    "mantra": "Ik open mijn hart",
    "ontstaan": {
      "datum": "2008-08-08T12:00:00.000Z",
      "krachtplek": "Maria Bron in Heiloo"
    },
    "ingredienten": ["bloem", "water", "brandy"],
    "edelstenen": ["Rozenkwarts"]
  }
]
```

**Stap 3:** Maak een Sanity API-token:
- Ga naar [sanity.io/manage](https://www.sanity.io/manage)
- Kies je project → **API** → **Tokens**
- Klik **Add API token**
- Naam: `Import script`, permissions: **Editor**
- Kopieer de token (begint met `sk...`)

**Stap 4:** Voeg toe aan `.env.local`:
```
SANITY_API_TOKEN=sk...
```

**Stap 5:** Installeer tsx en voer het script uit:
```bash
npm install -D tsx
npx tsx scripts/import-remedies.ts
```

---

## Optie 2: Van Excel/CSV naar JSON

1. Sla je Excel op als **CSV**
2. Gebruik [convertcsv.com](https://www.convertcsv.com/csv-to-json.htm) om CSV → JSON te converteren
3. Pas de JSON aan zodat velden overeenkomen met het voorbeeld
4. Sla op als `data/remedies.json` en voer Optie 1, Stap 5 uit

---

## Optie 3: Van een bestaande website scrapen

Als je data op een website staat:

1. **Handmatig:** Kopieer per remedie de tekst en plak in `data/remedies.json`
2. **Browser:** Gebruik de console om data te extraheren (vereist wat JavaScript)
3. **Tool:** Bijv. [Import.io](https://www.import.io/) of een eenvoudige scraper

---

## Optie 4: Handmatig in Studio

Voor weinig items (bijv. < 10):

1. Ga naar http://localhost:3000/studio
2. Bloesemremedies → Create
3. Vul per remedie de velden in

---

## Afbeeldingen

Afbeeldingen kunnen **niet** via het JSON-script. Die voeg je toe:

1. **Na import:** Ga in Studio naar elke remedie en upload de afbeelding
2. **Of** gebruik de Sanity Asset API als je afbeeldingen al online staan (vereist extra script)

---

## Velden in het importbestand

| Veld | Type | Voorbeeld |
|------|------|-----------|
| title | string | "Liefde" |
| kernkwaliteit | string | "Zelfliefde" |
| werking | string | Lange tekst |
| mantra | string | "Ik open mijn hart" |
| ontstaan.datum | ISO-datum | "2008-08-08T12:00:00.000Z" |
| ontstaan.krachtplek | string | "Maria Bron in Heiloo" |
| ingredienten | string[] | ["bloem", "water"] |
| edelstenen | string[] | ["Rozenkwarts"] |
