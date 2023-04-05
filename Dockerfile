FROM node:16-alpine AS builder

WORKDIR /var/www/chat-app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build




FROM node:16-alpine AS production

WORKDIR /var/www/chat-production

COPY --from=builder /var/www/chat-app/package.json /var/www/chat-app/package-lock.json ./

RUN npm install --omit=dev

COPY --from=builder /var/www/chat-app/dist ./dist
COPY --from=builder /var/www/chat-app/server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
