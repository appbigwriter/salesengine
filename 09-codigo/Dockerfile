# ==============================================================================
# Dockerfile para Deploy em VPS / Easypanel — FBR Sales Engine (Next.js 15)
# Target: vps2 | Project: sistemas | Service: sales | Port: 3400
# ==============================================================================

# 1. Base image
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Argumentos de build para variáveis públicas
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG CONTROL_TOWER_PROJECT_ID
ARG CONTROL_TOWER_SCHEMA_NAME

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
ENV CONTROL_TOWER_PROJECT_ID=$CONTROL_TOWER_PROJECT_ID
ENV CONTROL_TOWER_SCHEMA_NAME=$CONTROL_TOWER_SCHEMA_NAME
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV APP_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3400
ENV HOST=0.0.0.0
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os assets públicos e o bundle standalone otimizado
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3400

CMD ["node", "server.js"]
