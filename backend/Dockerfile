FROM node:20-alpine AS builder
RUN apk add --no-cache openssl

WORKDIR /app

COPY prisma ./prisma
COPY package*.json ./
RUN npm install

RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

RUN mkdir /app/uploads && chown nestjs:nodejs /app/uploads

USER nestjs
EXPOSE 4000

CMD ["npm", "start"]
