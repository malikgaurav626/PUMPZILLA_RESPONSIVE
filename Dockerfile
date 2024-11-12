# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json, package-lock.json, and next.config.mjs for dependency installation
COPY package*.json next.config.mjs ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code, including src directory
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install production dependencies
COPY package*.json next.config.mjs ./
RUN npm ci --only=production

# Copy the built files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Expose port 3000
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
