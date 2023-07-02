# Stage 1: Build TypeScript
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Create production image
FROM node:18-alpine

WORKDIR /app

# Copy built JavaScript files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/openapi.yaml ./openapi.yaml
RUN echo "MONGO_URL=mongodb+srv://bookstore:bookstore@bookstore.ulmwsvd.mongodb.net/" >> .env

# Set environment variables
ENV NODE_ENV=production

# Expose the application port (if needed)
EXPOSE 3000

# Start the application
CMD [ "node", "./dist/index.js" ]
