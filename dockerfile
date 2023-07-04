FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/openapi.yaml ./openapi.yaml
COPY package.json .
RUN npm install --production
CMD [ "node", "dist/index.js" ]

# docker run -e MONGO_URL=mongodb+srv://bookstore:bookstore@bookstore.ulmwsvd.mongodb.net/ -e PORT=3080 -p 3080:3080 server