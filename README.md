# 🤖 Labs-Apprentice Bot

En læringsfokusert chatbot for IT-Utviklerfaget, bygget med OpenAI og SvelteKit.

---
[![Svelte](https://img.shields.io/badge/Svelte-5%2B-ff3e00?logo=svelte)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2%2B-ff3e00?logo=svelte)](https://kit.svelte.dev)
[![Status](https://img.shields.io/badge/status-under%20arbeid-yellow)](#)

## 📘 Innholdsfortegnelse

- [Om prosjektet](#-om-prosjektet)
- [Prosjektstruktur](#-prosjektstruktur)
- [Biblioteker og begrunnelse](#️-biblioteker-og-begrunnelse)
- [Sikkerhet og personvern](#-sikkerhet-og-personvern)
- [Installasjon og oppsett](#-installasjon-og-oppsett)
- [Lisens](#-lisens)

---

# Prosjekt struktur
Prosjektet er bygget med Svelte og Vite, og har følgende hovedmapper og filer:
•	src – Inneholder all kildekode for Svelte-applikasjonen.
o	app.html – Hoved-HTML-fil for Svelte.
o	lib/ – Egen mappe for delte JavaScript-moduler og assets.
o	routes/ – Sider og API-endepunkter, f.eks. +page.svelte for chat og +server.js for backend.
•	static – Statisk innhold som robots.txt.
•	jsconfig.json, package.json, README.md, svelte.config.js, vite.config.js – Konfigurasjonsfiler for prosjektet og verktøyene.
Strukturen gir god separasjon mellom frontend, backend og konfigurasjon, og gjør det enkelt å utvide med flere funksjoner
