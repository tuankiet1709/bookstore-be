# Stage 1: Build TypeScript
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY /app/openapi.yaml ./openapi.yaml
ENV NODE_ENV=production
EXPOSE 3000

CMD [ "node", "./dist/index.js" ]
