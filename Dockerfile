FROM node:22-alpine AS base
WORKDIR /app

# Enable Corepack and pin pnpm to the project version.
# pnpm 9 runs required native build scripts for esbuild/sharp and honors the
# lockfile exactly, avoiding host/binary version drift.
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
ENV PNPM_STORE_PATH=/pnpm/store

# Copy only manifest files to leverage build cache
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build-deps
RUN pnpm install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=80
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY package.json ./
COPY --from=build /app/dist ./dist

EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
