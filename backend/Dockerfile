FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM node:16-alpine AS production
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --omit=dev && npm i -g pm2
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ecosystem.config.js ./
EXPOSE 4000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]