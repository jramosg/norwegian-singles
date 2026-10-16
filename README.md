# 🇳🇴 Norwegian Singles Training Planner

A high-performance training plan generator based strictly on the **Norwegian Singles (NS)** methodology. Designed for runners who want to improve their aerobic threshold through science-backed, repeatable, and sustainable training blocks.

## 🏃‍♂️ What is Norwegian Singles?

The Norwegian Singles method is a training philosophy centered around lactate threshold management. Unlike traditional systems that push athletes to failure, NS prioritizes staying just below the threshold to maximize recovery and volume.

### Key Principles
- **⚡ Threshold Rules**: Quality work represents 20-25% of weekly volume.
- **🎯 Never to Failure**: Paces are conservative. You finish sessions knowing you could have done more.
- **⏱️ Short Recoveries**: 60-second breaks between intervals to maintain a steady lactate state.
- **🔄 Repeatable System**: 6-week blocks with a test on week 6 to recalibrate paces.

## 🚀 Target Distances
The application intelligently adapts training volume and interval structure based on your goal:
- **5K/10K**: Focus on race-pace specificity and short intervals.
- **Half Marathon/Marathon**: Increased aerobic base and longer threshold blocks.

## 🛠 Tech Stack
- **Framework**: [Astro](https://astro.build/) (Static Site Generation + Islands Architecture)
- **Frontend**: [React](https://reactjs.org/) (Form logic & interactive Plan Viewer)
- **Styling**: Modern CSS variables, mobile-first design.
- **i18n**: Native Astro internationalization (English, Spanish, Korean,
  German, French, Italian, and Brazilian Portuguese).
- **Architecture**: Clean separation between calculation logic (`lib`) and UI (`components`).

## 📁 Project Structure
```text
/src
  ├── components/     # Astro & React components
  ├── i18n/           # Translation dictionaries and helpers
  ├── layouts/        # Page wrappers
  ├── lib/            # Core logic (VDOT, Paces, Plan Generation)
  ├── pages/          # Multilingual routes (/es, /en)
  ├── styles/         # Global & component styles
  └── types/          # TypeScript interfaces
```

Language pages are prerendered at `/en/`, `/es/`, `/ko/`, `/de/`, `/fr/`,
`/it/`, and `/pt-BR/`, with localized guides, race pages, and language
annotations in the HTML and sitemap. Explicit language URLs always keep
their language.

The root `/` uses a small inline script to select the last visited language,
then the first supported browser language, then English. This requires no
application server or language lookup request. Without JavaScript, `/`
redirects to English. The language-specific pages do not run this redirect.

`/llms.txt` provides a concise content map for agents, with links to the
calculator, training guides, and all supported languages. Missing pages and
discovery files return HTTP 404 rather than the language chooser's HTML.
There is no agent resource catalog because the site does not expose an API,
MCP server, or agent skill.

## 🧞 Commands

| Command | Action |
| :--- | :--- |
| `pnpm install` | Installs dependencies |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build your production site to `./dist/` |
| `pnpm preview` | Preview your build locally |

## 💶 Monetization

Amazon links are stored in `src/lib/affiliate.ts`. Generate them with Amazon
SiteStripe ("Obtener enlace"), selecting `jramosg-20` for both the store ID and
tracking ID. Open each generated short link and verify its product and
`tag=jramosg-20` before replacing a URL. All seven current links were verified
on Amazon.es on 2026-10-15.

Affiliate and support clicks are recorded without cookies by Nginx. Inspect
them on the server with:

```shell
docker logs norwegian-singles 2>&1 | grep '^monetization '
```

Amazon Associates remains the source of truth for ordered items, dispatched
items, conversion rate, and commission income.

## 🧪 Methodology Details
- **VDOT Calculations**: Based on Jack Daniels' oxygen power formula.
- **Interval Structures**: 
  - **Short**: 3–4' (15K pace)
  - **Medium**: 6–8' (Half Marathon pace)
  - **Long**: 10–12' (≈30K pace)
- **Tapering**: Automatic adjustment for Race A (7-10 days) and Race B (3-4 days).

---

*Based on the Norwegian training philosophy. Train smarter, not harder.*
