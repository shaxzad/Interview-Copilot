#!/bin/bash

# Build script for Interview Copilot
# Builds all packages and apps

set -e

echo "🏗️  Building Interview Copilot..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Build shared packages first
echo "📚 Building shared packages..."
pnpm --filter shared-types build
pnpm --filter ai-schemas build

# Build apps
echo "🖥️  Building desktop app..."
pnpm --filter @interview-copilot/desktop build

echo "⚙️  Building API server..."
pnpm --filter @interview-copilot/api build

echo ""
echo "✅ Build complete!"
