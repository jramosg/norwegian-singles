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
- **Framework**: [Astro](https://astro.build/) (prerendered pages + islands,
  with a Node adapter so a handful of routes render on demand)
- **Frontend**: [React](https://reactjs.org/) (Form logic & interactive Plan Viewer)
- **Styling**: Modern CSS variables, mobile-first design.
- **i18n**: Native Astro internationalization (English, Spanish, Korean,
  German, and French).
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

Affiliate and support clicks are recorded without cookies by the app itself
(`src/pages/events/outbound.ts`, a 204 plus one log line). Inspect them on the
server with:

```shell
docker logs norwegian-singles 2>&1 | grep '^monetization '
```

Amazon Associates remains the source of truth for ordered items, dispatched
items, conversion rate, and commission income.

## 🚢 Deployment

The site is **prerendered by default with a Node runtime attached**. Only
routes that opt out with `export const prerender = false` are rendered on
demand, so every free page is still a static file and the sitemap still
lists it.

Build output:

```
dist/client/   prerendered HTML, assets, sitemap
dist/server/   entry.mjs, the Node server
```

On-demand routes today:

| Route | Why it needs a server |
| --- | --- |
| `/` | A real 301 to `/en/` instead of a meta refresh |
| `/events/outbound` | Cookie-free click beacon, returns 204 and logs a line |

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the
image in CI, `docker save`s it, copies the tarball to the VPS over SSH, and
restarts the compose stack. Secrets are written to `.env` on the server by
that workflow and read by compose via `env_file`; see `.env.example` for the
full list. `PUBLIC_*` values are inlined into the client bundle at build time
and therefore have to be passed as `--build-arg`, not as runtime env.

nginx no longer lives in the image. TLS, the vhost, asset caching and the
security headers belong to the reverse proxy on the host: see
`deploy/nginx-host.conf.example`, which is a reference to copy to the server,
not something the repo installs.

Local check of the production container:

```shell
pnpm build && node dist/server/entry.mjs   # or:
docker build -t norwegian-singles:test . && docker run --rm -p 4321:4321 norwegian-singles:test
```

`./data` is mounted into the container for the SQLite database, so orders
survive a redeploy.

## 🧪 Methodology Details
- **VDOT Calculations**: Based on Jack Daniels' oxygen power formula.
- **Interval Structures**: 
  - **Short**: 3–4' (15K pace)
  - **Medium**: 6–8' (Half Marathon pace)
  - **Long**: 10–12' (≈30K pace)
- **Tapering**: Automatic adjustment for Race A (7-10 days) and Race B (3-4 days).

---

*Based on the Norwegian training philosophy. Train smarter, not harder.*
