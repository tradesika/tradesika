# syntax=docker/dockerfile:1
# Multi-stage build for the Tradesika Next.js app (standalone output).
# Designed for Coolify (Dockerfile build pack). Serves on port 3000.

# ---------- Base ----------
FROM node:24-alpine AS base
# libc6-compat is needed by some Next.js native deps on Alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Build ----------
FROM base AS build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Public site URL (canonical / sitemap / Open Graph). NEXT_PUBLIC_* is inlined
# at build time, so pass it as a build arg in Coolify if you change the domain.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Runner ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as a non-root user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Static assets + the minimal standalone server.
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
