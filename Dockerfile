FROM node:22-alpine AS base
WORKDIR /app

# Pin pnpm to 11, matching local development and CI. The old pin to 9 existed
# because newer pnpm refuses to run dependency build scripts
# (ERR_PNPM_IGNORED_BUILDS); that is now handled explicitly by `allowBuilds`
# in pnpm-workspace.yaml, and pnpm 9 cannot read that file without a
# `packages` field it does not need.
RUN corepack enable && corepack prepare pnpm@11.5.2 --activate

# better-sqlite3 is a native module with no musl prebuild, so Alpine has to
# compile it. These are build-only: the runtime stage below does not get them.
RUN apk add --no-cache python3 make g++
ENV PNPM_STORE_PATH=/pnpm/store
# pnpm runs a dependency-state check before scripts and wants to purge
# node_modules interactively, which cannot work in a build. CI=true makes it
# proceed without prompting.
ENV CI=true

# Copy only manifest files to leverage build cache. pnpm-workspace.yaml has to
# come too: it carries the build-script permissions, and without it every
# install fails with ERR_PNPM_IGNORED_BUILDS.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
RUN pnpm install

FROM build-deps AS build
# PUBLIC_* values are inlined into the client bundle at build time, and the
# build runs here rather than on the server, so they have to arrive as build
# args rather than as runtime environment variables.
ARG PUBLIC_STRIPE_PUBLISHABLE_KEY=''
ENV PUBLIC_STRIPE_PUBLISHABLE_KEY=$PUBLIC_STRIPE_PUBLISHABLE_KEY
COPY . .
RUN pnpm run build

# The site used to be served by nginx, which meant the image had no Node
# runtime at all. On-demand routes need one, so the runtime stage is Node and
# the reverse proxy lives on the VPS host instead.
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

# Mount point for the SQLite database, so orders survive a redeploy.
RUN mkdir -p /app/data && chown -R node:node /app/data
USER node

EXPOSE 4321

# nginx:alpine did not ship curl, so the old healthcheck could never pass.
# Node is guaranteed to be here.
HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4321)+'/en/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "./dist/server/entry.mjs"]
