FROM node:22-alpine AS base
WORKDIR /app

# Enable Corepack to use pnpm
RUN corepack enable
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

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]