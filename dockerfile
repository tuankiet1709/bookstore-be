# Stage 1: Install dependencies
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build the application
FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder /app .
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine
WORKDIR /app
COPY --from=final /app/dist ./dist
COPY --from=final /app/openapi.yaml ./openapi.yaml
COPY --from=final /app/node_modules ./node_modules

CMD [ "node", "./dist/index.js" ]
