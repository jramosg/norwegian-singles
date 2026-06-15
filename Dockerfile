FROM node:22-alpine AS base
WORKDIR /app

# Enable Corepack and pin pnpm to 9 (matches the pnpm-lock.yaml 9.0 format).
# Unpinned, corepack pulls the latest pnpm (10+), which fails install with
# ERR_PNPM_IGNORED_BUILDS; pnpm 9 runs build scripts by default and honors
# the lockfile exactly (avoiding esbuild host/binary version drift).
RUN corepack enable && corepack prepare pnpm@9 --activate
ENV PNPM_STORE_PATH=/pnpm/store

# Copy only manifest files to leverage build cache
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
RUN pnpm install 

FROM build-deps AS build
COPY . .
RUN pnpm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]