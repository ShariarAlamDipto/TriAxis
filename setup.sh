#!/bin/bash

# Setup script for Past Papers Archive

echo "🚀 Setting up Past Papers Archive..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm is installed: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local and add your credentials"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase and bKash credentials"
echo "2. Set up Supabase database (see DEPLOYMENT.md)"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
