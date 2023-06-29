# Use a base image with Node.js pre-installed
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV MONGO_URL=mongodb+srv://bookstore:bookstore@bookstore.ulmwsvd.mongodb.net/
ENV PORT=3080

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm ci --production

# Copy the application code to the container
COPY . .

# Expose the port that your Node.js application listens on
EXPOSE 3080

# Start the Node.js application
CMD ["npm", "start"]
