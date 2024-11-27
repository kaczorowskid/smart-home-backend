FROM node:20

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 4200

CMD ["sh", "-c", "npx prisma migrate deploy && node ./dist/main.js"]
