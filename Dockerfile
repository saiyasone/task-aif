
# Stage 1: Build the application
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files first
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine as runtime

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for vite preview)
RUN npm ci

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.ts ./vite.config.ts

# Expose the port
EXPOSE 4173

# Use the preview command to serve the built application
CMD ["npm", "run", "preview"]