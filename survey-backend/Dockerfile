FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

ENV npm_config_build_from_source=sqlite3

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server.ts ./

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server.ts"]
