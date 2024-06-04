# Use a smaller base image for production
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package.json and yarn.lock (if using Yarn) to optimize caching
COPY package*.json ./
COPY yarn*.lock ./

# Install dependencies in a separate stage for efficiency
RUN npm ci --production  # Use npm ci for deterministic installs

# Create a slimmer production image
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./
COPY . .

# Build the React app in a separate stage
RUN npm run build

RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build"]
