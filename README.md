# 🤖 Utvikler Bot – SvelteKit Chatbot

En moderne chatbot bygget med SvelteKit og OpenAI, med støtte for markdown-formaterte svar, kodeeksempler, overskrifter og avsnitt.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📘 Innholdsfortegnelse

- [🎯 Funksjoner](#-funksjoner)
- [📖 Om prosjektet](#-om-prosjektet)
- [🏗️ Prosjektstruktur](#️-prosjektstruktur)
- [⚙️ Biblioteker og begrunnelse](#️-biblioteker-og-begrunnelse)
- [🧰 Installasjon og oppsett](#-installasjon-og-oppsett)
- [🚀 Bruk](#-bruk)
- [🔒 Sikkerhet og personvern](#-sikkerhet-og-personvern)
- [🤝 Bidrag](#-bidrag)
- [📄 Lisens](#-lisens)

---

## 🎯 Funksjoner

- ✨ **Moderne chatgrensesnitt** med Svelte
- 📝 **Markdown-formaterte svar** med overskrifter, avsnitt og lister
- 💻 **Kodeblokker** med syntax highlighting
- ⚡ **Streaming av bot-svar** for bedre brukeropplevelse
- 🔗 **OpenAI-integrasjon** med Responses API
- 🎨 **Responsivt design** med gradient-bakgrunner
- 🔄 **Samtalekontekst** som bevares gjennom samtalen

---

## 📖 Om prosjektet

Utvikler Bot er en avansert chatbot bygget med OpenAI sitt Responses API og SvelteKit. Botten gir strukturerte, markdown-formaterte svar som gjør det enkelt å lese kode, dokumentasjon og forklaringer. Prosjektet demonstrerer moderne web-utvikling med focus på brukeropplevelse og læring.

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
