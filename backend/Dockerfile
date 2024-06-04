
FROM node:21.6.0-alpine3.19 AS builder

RUN npm install -g pnpm


WORKDIR /app


COPY package.json pnpm-lock.yaml* ./


RUN pnpm install


COPY . .


RUN pnpm build


FROM node:21.6.0-alpine3.19


WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./


EXPOSE 3001


CMD ["node", "dist/main"]
