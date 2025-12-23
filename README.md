# 🤖 FagAssistenten – SvelteKit Chatbot

En moderne chatbot bygget med SvelteKit og OpenAI, med støtte for markdown-formaterte svar, kodeeksempler, overskrifter og avsnitt.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Mistral AI](https://img.shields.io/badge/Mistral%20AI-4F8CBF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LTggOCAzLjU4IDggOC0zLjU4IDgtOCA4eiIvPjwvc3ZnPg==&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---
[![Svelte](https://img.shields.io/badge/Svelte-5%2B-ff3e00?logo=svelte)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2%2B-ff3e00?logo=svelte)](https://kit.svelte.dev)
[![Status](https://img.shields.io/badge/status-under%20arbeid-yellow)](#)

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
- 🤖 **Multi-agent system** med agent-selektor
  - **GPT-5.1** (OpenAI) - Generell AI-assistent
  - **Syntax Agent** - Spesialist på kodehjelp og syntax-støtte
  - **Mistral AI** - koblet opp mot Mistral Large 3
- 🌐 **Web Søk** - kan søke på nett og hente innformasjon derfra
- 📝 **Markdown-formaterte svar** med overskrifter, avsnitt og lister
- 💻 **Kodeblokker** med syntax highlighting
- ⚡ **Streaming av bot-svar** for bedre brukeropplevelse
- 🔄 **Loading-indikator** som viser "Genererer respons..."
- 🎨 **Responsivt design** med gradient-bakgrunner og moderne styling
- 🔧 **Modulær arkitektur** med separert agent-logikk
- ⌨️ **Tastaturnavigasjon** (Enter for å sende, Shift+Enter for ny linje)
- 🔄 **Nullstill chat** funksjonalitet
- 📱 **Intuitive ikoner** (↑ for send, tooltip-støtte)
- ♿ **Accessibility-forbedringer** med title-attributter

---

## 📖 Om prosjektet

FagAssistenten er en avansert chatbot med multi-agent arkitektur bygget med SvelteKit. Systemet lar brukere velge mellom forskjellige AI-agenter optimalisert for ulike oppgaver - fra generell assistanse til spesialisert kodegenerering. Prosjektet demonstrerer moderne web-utvikling med fokus på modulær arkitektur, brukeropplevelse og læring.

### 🤖 Agent-system

- **OpenAI Agent (GPT-5.1)**: Generell AI-assistent for diverse spørsmål og oppgaver
- **Syntax Agent**: Spesialist på kodehjelp, syntax-støtte og programmeringsassistanse
- **Mistral AI**: Utforsker muligheter med
- **Utvidbar arkitektur**: Enkelt å legge til nye agenter

---

## 🏗️ Prosjektstruktur

```
src/
├── routes/
│   ├── +page.svelte         # 💬 Hovedchat-grensesnitt med agent-selektor
│   ├── +layout.svelte       # 🎨 Layout-komponent
│   ├── openai/
│   │   └── +server.js       # 🤖 OpenAI agent endpoint
│   └── codeGeneration/
│       └── +server.js       # � Code Generation agent endpoint
├── lib/
│   ├── agentLogic.js        # 🧠 Multi-agent routing logikk
│   ├── index.js            # 📚 Delte moduler
│   ├── components/
│   │   └── agentComponents.svelte  # 🔧 Agent-komponenter (deprecated)
│   └── assets/             # 🎨 Statiske ressurser
└── app.html                # 🏠 Svelte hoved-HTML

static/
├── robots.txt              # 🤖 SEO-konfigurasjon
└── bilder/                 # 🖼️ Ikoner og bilder
    └── chat-notification_*.png

Konfigurasjonsfiler:
├── package.json            # 📦 Prosjektavhengigheter
├── svelte.config.js        # ⚙️ Svelte-konfigurasjon
├── vite.config.js          # ⚡ Vite build-konfigurasjon
└── jsconfig.json           # 🔧 JavaScript-konfigurasjon
```

---

## ⚙️ Biblioteker og begrunnelse

| Import / Bibliotek           | Formål                                                                 |
|------------------------------|------------------------------------------------------------------------|
| `$env/dynamic/private`       | 🔐 Henter miljøvariabler (API-nøkler) som ikke skal være synlige for klienten |
| `@sveltejs/kit` (`json`)     | 📤 Returnerer JSON-responser fra server-endepunkter på standardisert måte |
| `path`                       | 📁 Node.js-modul for håndtering av filstier på serveren               |
| `openai`                     | 🤖 OpenAI-klient for kommunikasjon med API og AI-generering |
| `marked`                     | 📝 Konverterer markdown til HTML for formaterte chat-meldinger        |
| `agentLogic.js`              | 🧠 Sentral routing-logikk for multi-agent systemet                    |

### Frontend-teknologier
- **SvelteKit**: Moderne web-framework med server-side rendering
- **Vite**: Rask build-tool og dev-server
- **CSS3**: Custom styling med gradients, animasjoner og responsive design

### Backend-teknologier  
- **Node.js**: Server-runtime
- **OpenAI API**: AI-modell for chatbot-funksjonalitet
- **Multi-agent arkitektur**: Modulær struktur for ulike AI-spesialiseringer

---

## 🧰 Installasjon og oppsett

### 📋 Forutsetninger

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
- OpenAI API-nøkkel

### 1️⃣ Kloning av repository

```bash
git clone https://github.com/ditt-brukernavn/FagAssistenten.git
cd FagAssistenten
```

### 2️⃣ Installer avhengigheter

```bash
npm install
```

### 3️⃣ Opprett miljøvariabler

Lag en `.env`-fil i prosjektroten:

```env
OPENAI_API_KEY=din_openai_api_nokkel
# Tilleggskonfigurationer for agenter (valgfritt)
# VECTOR_STORE_ID=din_vector_store_id  
# INSTRUCTIONS=instruksjoner_til_botten
```

### 4️⃣ Start utviklingsserver

```bash
npm run dev
```

Åpne nettleseren på `http://localhost:5173`

### 5️⃣ Bygg for produksjon

```bash
npm run build
npm run preview
```

---

## 🚀 Bruk

### 🎯 Velge Agent
1. **Bruk dropdown-menyen** øverst til venstre for å velge agent:
   - **GPT-5.1**: For generelle spørsmål og samtaler
   - **Syntax Agent**: For koding og syntax-spørsmål

### 💬 Chat-funksjoner
1. **Skriv meldinger** i chat-grensesnittet
2. **Send meldinger**: Klikk på ↑-knappen eller bruk tastatur
3. **Tastatur shortcuts**:
   - `Enter` - Send melding
   - `Shift + Enter` - Ny linje
4. **Motta formaterte svar** med overskrifter, kodeblokker og lister  
5. **Loading-indikator** viser "Genererer respons..." mens AI tenker
6. **Streaming-effekt** viser svarene i sanntid
7. **Nullstill chat** med knappen øverst til høyre
8. **Tooltip-hjelp**: Hover over knapper for å se funksjoner

### 🔄 Agent-switching
- Skift agent når som helst under samtalen
- Hver agent har sin egen spesialisering
- Konsistent grensesnitt på tvers av agenter

### Eksempel på bot-svar:

```markdown
# JavaScript Funksjoner

## Definere en funksjon

Du kan definere en funksjon på denne måten:

```javascript
function hilsen(navn) {
    return `Hei, ${navn}!`;
}
```

**Viktige punkter:**
- Bruk `function`-nøkkelordet
- *Parametere* defineres i parenteser
- Return-verdier bruker `return`
```

---

## 🔒 Sikkerhet og personvern

- 🔐 **API-nøkler**: Lagres sikkert i `.env` og eksponeres ikke til klienten
- 🚫 **Ingen lagring**: Prosjektet lagrer ikke personopplysninger lokalt
- ⚠️ **OpenAI-data**: Meldinger sendes til OpenAI for prosessering
- 🔒 **Anbefaling**: Del aldri sensitiv informasjon når du tester botten
- 📝 **Logget data**: Kun feilmeldinger logges til konsoll

### Miljøvariabel-sikkerhet

```bash
# Legg til i .gitignore
.env
.env.*
!.env.example
```

---

## � Bidrag

Bidrag er velkomne! Her er hvordan du kan hjelpe:

1. 🍴 **Fork** repositoryet  
2. 🌿 **Opprett** en feature branch (`git checkout -b feature/AmazingFeature`)
3. ✏️ **Commit** endringene dine (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **Push** til branchen (`git push origin feature/AmazingFeature`)
5. 🔄 **Åpne** en Pull Request

### � Rapporter bugs

Bruk [Issues](../../issues) for å rapportere bugs eller foreslå forbedringer.

---

## 📄 Lisens

Dette prosjektet er lisensiert under MIT-lisensen - se [LICENSE](LICENSE) filen for detaljer.

```
MIT License

Copyright (c) 2025 FagAssistenten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```