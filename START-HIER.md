# Natuurlijk Prana – starten

## Stap 1: Dependencies installeren

```bash
cd /Users/Gebruiker/Dropbox/Github-projects/natuurlijk-prana-website
npm install
```

---

## Stap 2: CORS instellen (eenmalig)

1. Ga naar **https://www.sanity.io/manage**
2. Klik op je project (ID: 0xp96ddy)
3. Ga naar **API** → **CORS origins**
4. Klik **Add CORS origin**
5. Vul in: `http://localhost:3000`
6. Vink aan: **Allow credentials**
7. Sla op

---

## Stap 3: Inloggen bij Sanity (eenmalig)

```bash
npx sanity login
```

Kies GitHub of Google en volg de instructies.

---

## Stap 4: Website starten

```bash
npm run dev
```

Open in je browser: **http://localhost:3000**

---

## Wat zie je?

| URL | Wat |
|-----|-----|
| http://localhost:3000 | **Homepage** – welkom + links |
| http://localhost:3000/remedies | **Bloesemremedies** – lijst van remedies uit Sanity |
| http://localhost:3000/studio | **Sanity Studio** – content beheren (remedies toevoegen/aanpassen) |

---

## Eerste content toevoegen

1. Ga naar http://localhost:3000/studio
2. Log in bij Sanity als dat gevraagd wordt
3. Klik op **Bloesemremedies** in het menu links
4. Klik **Create** om een eerste remedie toe te voegen
5. Vul de velden in en publiceer
6. Ga terug naar http://localhost:3000/remedies – je remedie staat er nu
