# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all files first
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy built files and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only (skip prepare script)
RUN npm install --omit=dev --ignore-scripts

# Run as non-root user
USER node

# Specify the default command
ENTRYPOINT ["node", "dist/index.js"] 