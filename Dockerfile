FROM node:20-bookworm-slim AS build

WORKDIR /build

COPY survey-frontend/package.json survey-frontend/package-lock.json ./survey-frontend/
RUN cd survey-frontend && npm ci
COPY survey-frontend/ ./survey-frontend/
RUN cd survey-frontend && npm run build

COPY survey-admin/package.json survey-admin/package-lock.json ./survey-admin/
RUN cd survey-admin && npm ci
COPY survey-admin/ ./survey-admin/
RUN cd survey-admin && npm run build

COPY survey-business/package.json survey-business/package-lock.json ./survey-business/
RUN cd survey-business && npm ci
COPY survey-business/ ./survey-business/
RUN cd survey-business && npm run build


FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

ENV npm_config_build_from_source=sqlite3

COPY survey-backend/package.json survey-backend/package-lock.json ./
RUN npm ci --omit=dev

COPY survey-backend/server.ts ./

COPY --from=build /build/survey-frontend/dist ./public/frontend
COPY --from=build /build/survey-admin/dist ./public/admin
COPY --from=build /build/survey-business/dist ./public/business

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.ts"]

