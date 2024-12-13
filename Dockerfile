FROM node:20-alpine3.20

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node ./dist/src/main.js"]
