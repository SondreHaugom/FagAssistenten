# 🤖 Labs-Apprentice Bot

En læringsfokusert chatbot for IT-Utviklerfaget, bygget med OpenAI og SvelteKit.

---

## 📘 Innholdsfortegnelse

- [Om prosjektet](#-om-prosjektet)
- [Prosjektstruktur](#-prosjektstruktur)
- [Biblioteker og begrunnelse](#️-biblioteker-og-begrunnelse)
- [Sikkerhet og personvern](#-sikkerhet-og-personvern)
- [Installasjon og oppsett](#-installasjon-og-oppsett)
- [Lisens](#-lisens)

---

## 📖 Om prosjektet

Labs-Apprentice Bot er en avansert chatbot bygget med OpenAI sitt Responses API og SvelteKit. Den er trent på kompetanseplanen for IT-Utviklerfaget og programmert for å gi pedagogisk og faglig korrekte svar. Målet er å tilby en trygg og læringsfokusert digital assistent for elever og lærlinger.

---

## 🏗️ Prosjektstruktur

src/              # Kildekode for Svelte-applikasjonen  
lib/              # Delte moduler og assets  
routes/           # Chat UI og backend API  
app.html          # Hoved HTML-template  
static/           # Statisk innhold (f.eks. robots.txt)  
package.json      # Prosjektavhengigheter  
svelte.config.js  # Svelte-konfigurasjon  
vite.config.js    # Vite-konfigurasjon  
README.md         # Denne filen

---

## ⚙️ Biblioteker og begrunnelse

| Bibliotek / import           | Formål                                                                 |
|------------------------------|------------------------------------------------------------------------|
| `$env/dynamic/private`       | Henter miljøvariabler (API-nøkler, konfigurasjon) som ikke skal være synlige for klienten |
| `@sveltejs/kit`              | Returnerer JSON-responser fra server-endepunkter på en standardisert måte |
| `path`                       | Node.js-modul for håndtering av filstier på serveren                   |
| `openai`                     | OpenAI-klient for kommunikasjon med Responses API og AI-svar           |

---

## 🔒 Sikkerhet og personvern

- Prosjektet samler **ikke** inn personopplysninger under vanlig bruk.
- Chatboten bruker OpenAI sine språkmodeller.
- ⚠️ **Del aldri sensitiv eller personlig informasjon når du tester boten.**
- Bruk en `.env`-fil for API-nøkler – **ikke** del denne filen i repoet.

---

## 🧰 Installasjon og oppsett

### 📋 Forutsetninger

- Node.js 18+
- Git
- VS Code eller annen editor
- OpenAI API-nøkkel (`.env`)

### 💾 Kloning av repo

git clone https://github.com/SondreHaugom/Labs-Apprentice_bot.git  
cd Labs-Apprentice_bot

### 📦 Installer avhengigheter

npm install

### 🔑 Opprett `.env`

Lag en `.env`-fil i prosjektroten med din API-nøkkel:

OPENAI_API_KEY=din_api_nokkel

### ▶️ Start prosjekt

npm run dev

---

## 📄 Lisens

MIT — fritt å bruke, modifisere og distribuere.

---

*Bidra gjerne med forslag eller feilrettinger!*
