# Sanity Studio aanpassen in Cursor

Alle aanpassingen aan de Studio doe je in code. Hieronder waar je wat vindt.

---

## 1. Kleuren & thema

**Bestand:** `sanity.config.ts`

Zoek de `sage`-object bovenaan:

```ts
const sage = {
  light: '#f6f7f4',   // achtergrondtinten
  base: '#75806b',    // primaire kleur (knoppen, links)
  dark: '#3d4438',    // tekst, navigatie
  accent: '#5c6652',  // accentkleur
}
```

Wijzig hier de hex-waarden. Voor nieuwe kleuren: gebruik [coolors.co](https://coolors.co) of de pipet in je browser.

---

## 2. Titel van de Studio

**Bestand:** `sanity.config.ts`

```ts
export default defineConfig({
  title: 'Natuurlijk Prana',  // ← wijzig hier
  // ...
})
```

---

## 3. Menu (Structure Tool)

**Bestand:** `sanity.config.ts`

Zoek `structureTool` en pas `S.listItem()`-items aan:

```ts
S.listItem()
  .title('Bloesemremedies')           // menu-item label
  .child(S.documentTypeList('remedie').title('Bloesemremedies'))
```

- Nieuwe items: voeg extra `S.listItem()`-blokken toe
- Volgorde: verander de volgorde in de `.items([...])`-array

---

## 4. Velden in schema’s

**Map:** `schemaTypes/`

| Bestand     | Content type     |
|------------|------------------|
| `remedie.ts` | Bloesemremedies |
| `blog.ts`    | Blog / Inspiratie |
| `page.ts`    | Pagina's        |

Voorbeeld – nieuw veld in een remedie:

```ts
{
  name: 'nieuwveld',
  title: 'Mijn veld',
  type: 'string',
}
```

---

## 5. Themer gebruiken (visueel)

1. Ga naar [themer.sanity.build](https://themer.sanity.build)
2. Kies kleuren
3. Exporteer de gegenereerde code
4. Vervang `studioTheme` in `sanity.config.ts` door de export

---

## 6. Wijzigingen testen

Na wijzigingen:

```bash
rm -rf .next && npm run dev
```

Daarna: http://localhost:3000/studio
