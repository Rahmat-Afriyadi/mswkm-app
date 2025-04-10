# # frontend/Dockerfile
# FROM node:18-alpine

# WORKDIR /app
# COPY . .

# RUN npm install
# RUN npm run build


# EXPOSE 3002
# CMD ["npm", "start"]


# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build && rm -rf .next/cache

# ---------- Production Stage ----------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3002

CMD ["npm", "start"]
