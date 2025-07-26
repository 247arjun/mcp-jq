#!/bin/bash

# @247arjun/mcp-jq Installation Script

echo "🚀 Installing @247arjun/mcp-jq..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq is not installed. Installing jq..."
    
    # Detect OS and install jq
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install jq
        else
            echo "❌ Homebrew not found. Please install jq manually:"
            echo "   brew install jq"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y jq
        elif command -v yum &> /dev/null; then
            sudo yum install -y jq
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y jq
        else
            echo "❌ Package manager not found. Please install jq manually."
            exit 1
        fi
    else
        echo "❌ Unsupported OS. Please install jq manually."
        echo "   Visit: https://jqlang.github.io/jq/download/"
        exit 1
    fi
fi

echo "✅ jq $(jq --version) found"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build the project"
    exit 1
fi

# Run tests
echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📚 Quick Start:"
echo "   1. Start the server: npm start"
echo "   2. Configure your MCP client to use this server"
echo "   3. See EXAMPLES.md for usage examples"
echo ""
echo "⚙️  MCP Configuration:"
echo "   Add this to your MCP client configuration:"
echo "   {"
echo "     \"jq\": {"
echo "       \"command\": \"node\","
echo "       \"args\": [\"$(pwd)/build/index.js\"]"
echo "     }"
echo "   }"
