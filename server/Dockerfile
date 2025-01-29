# Backend Dockerfile
FROM node:20
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy environment file
ARG ENV_FILE=.env
COPY $ENV_FILE .env

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]