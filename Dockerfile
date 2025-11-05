# Node.js version
FROM node:20-alpine

# Install dependencies for building native modules
RUN apk add --no-cache python3 make g++ sqlite

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Create prisma directory if it doesn't exist
RUN mkdir -p prisma

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]


