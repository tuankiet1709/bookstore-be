FROM node:18-alpine AS install
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM install AS builder
COPY . .
RUN npm install && npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=install ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/openapi.yaml ./openapi.yaml
CMD [ "node", "dist/index.js" ]

# docker run -e MONGO_URL=mongodb+srv://bookstore:bookstore@bookstore.ulmwsvd.mongodb.net/ -e PORT=3080 -p 3080:3080 server