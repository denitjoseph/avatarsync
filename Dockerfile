# Use Node.js 20 on Debian Bookworm Slim as base image
FROM node:20-bookworm-slim

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies required by Electron, Chromium, WebGL, and MediaPipe
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    libx11-xcb1 \
    libxshmfence1 \
    xvfb \
    mesa-utils \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    v4l-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests first for optimal layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy application source files
COPY . .

# Ensure entrypoint script is executable
RUN chmod +x /app/docker-entrypoint.sh

# Expose ports for WebXR / Socket.IO streaming server
EXPOSE 8080 8443

# Environment variables
ENV ELECTRON_DISABLE_SANDBOX=1

# Use entrypoint script to handle display forwarding or virtual framebuffer
ENTRYPOINT ["/app/docker-entrypoint.sh"]
