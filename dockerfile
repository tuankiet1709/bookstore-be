FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Set npm registry
RUN npm config set registry https://registry.npm.taobao.org/

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]