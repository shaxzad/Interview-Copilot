#!/bin/bash

# Initialize Interview Copilot Project
# This script sets up a fresh development environment

set -e

echo "🚀 Setting up Interview Copilot..."

# Check for required tools
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Install with: npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration"
fi

# Build shared packages
echo "🔨 Building shared packages..."
pnpm build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Run 'pnpm dev' to start development servers"
echo ""
echo "For more info, see docs/SETUP.md"
