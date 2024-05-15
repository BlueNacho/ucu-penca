# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install 'wait-for-it' to ensure PostgreSQL is up before starting the app
RUN apk add --no-cache bash

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
