FROM node:20-bookworm-slim AS build

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY . .
RUN npm install && npm run build

RUN apt-get remove --purge -y && apt-get autoremove -y && apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

FROM node:20-alpine3.20

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY prisma prisma

RUN npm install

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node ./dist/prisma/seeds/seed.js && node ./dist/src/main.js"]
