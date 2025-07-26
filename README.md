# MCP Server for JQ

[![npm version](https://badge.fury.io/js/@247arjun%2Fmcp-jq.svg)](https://badge.fury.io/js/@247arjun%2Fmcp-jq)
[![npm downloads](https://img.shields.io/npm/dm/@247arjun/mcp-jq.svg)](https://www.npmjs.com/package/@247arjun/mcp-jq)

A Model Context Protocol (MCP) server that provides a wrapper around the `jq` command-line utility for querying and manipulating JSON data.

## Features

- **JSON Querying**: Query JSON files and data using jq syntax
- **Data Formatting**: Parse and format JSON data
- **Complex Operations**: Support for complex jq filters and operations
- **File Processing**: Stream processing for large JSON files
- **Validation**: JSON validation and key extraction
- **Security**: Safe subprocess execution with input validation

## Prerequisites

- Node.js 18 or higher
- `jq` command-line utility installed on your system

### Installing jq

**macOS:**
```bash
brew install jq
```

**Ubuntu/Debian:**
```bash
sudo apt-get install jq
```

**Windows:**
Download from https://jqlang.github.io/jq/download/

## Installation

### Method 1: NPM Installation (Recommended)

```bash
# Install globally
npm install -g @247arjun/mcp-jq

# Or install locally in your project
npm install @247arjun/mcp-jq
```

### Method 2: From Source

```bash
# Clone the repository
git clone https://github.com/247arjun/mcp-jq.git
cd mcp-jq

# Install dependencies
npm install

# Build the project
npm run build

# Optional: Link globally
npm link
```

### Method 3: Direct from GitHub

```bash
# Install directly from GitHub
npm install -g git+https://github.com/247arjun/mcp-jq.git
```

## Configuration

### Claude Desktop Setup

Add to your Claude Desktop configuration file:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "mcp-jq": {
      "command": "mcp-jq",
      "args": []
    }
  }
}
```

**Alternative: Using npx (no global install needed)**
```json
{
  "mcpServers": {
    "mcp-jq": {
      "command": "npx",
      "args": ["@247arjun/mcp-jq"]
    }
  }
}
```

**Local Development Setup**
```json
{
  "mcpServers": {
    "mcp-jq": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-jq/build/index.js"]
    }
  }
}
```

After adding the configuration, restart Claude Desktop to load the MCP server.

## Available Tools

### 1. `jq_query`
Query JSON data using jq syntax.

**Parameters:**
- `json_data` (string): The JSON data to query
- `filter` (string): The jq filter expression
- `raw_output` (boolean, optional): Return raw output instead of JSON (default: false)

**Example:**
```json
{
  "json_data": "{\"users\": [{\"name\": \"John\", \"age\": 30}]}",
  "filter": ".users[0].name"
}
```

### 2. `jq_query_file`
Query a JSON file using jq syntax.

**Parameters:**
- `file_path` (string): Path to the JSON file
- `filter` (string): The jq filter expression
- `raw_output` (boolean, optional): Return raw output instead of JSON (default: false)

**Example:**
```json
{
  "file_path": "./data/users.json",
  "filter": ".users | length"
}
```

### 3. `jq_format`
Format and prettify JSON data.

**Parameters:**
- `json_data` (string): The JSON data to format

**Example:**
```json
{
  "json_data": "{\"name\":\"John\",\"age\":30}"
}
```

### 4. `jq_validate`
Validate if a string is valid JSON.

**Parameters:**
- `json_data` (string): The JSON data to validate

**Example:**
```json
{
  "json_data": "{\"name\": \"John\", \"age\": 30}"
}
```

### 5. `jq_keys`
Get all keys from a JSON object or array of objects.

**Parameters:**
- `json_data` (string): The JSON data to extract keys from
- `recursive` (boolean, optional): Get keys recursively (default: false)

**Example:**
```json
{
  "json_data": "{\"user\": {\"name\": \"John\", \"details\": {\"age\": 30}}}",
  "recursive": true
}
```

## Usage Examples

### Query user names from JSON
```json
{
  "tool": "jq_query",
  "json_data": "{\"users\": [{\"name\": \"John\"}, {\"name\": \"Jane\"}]}",
  "filter": ".users[].name"
}
```

### Format JSON data
```json
{
  "tool": "jq_format",
  "json_data": "{\"name\":\"John\",\"age\":30,\"city\":\"NYC\"}"
}
```

### Query a JSON file
```json
{
  "tool": "jq_query_file",
  "file_path": "./data/config.json",
  "filter": ".database.host"
}
```

## Development

### Build and Run
```bash
# Development with auto-rebuild
npm run dev

# Production build
npm run build

# Start the server
npm start
```

### Testing
```bash
# Run tests
npm test
```

### Project Structure

```
mcp-jq/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (after build)
├── examples/             # Sample JSON files for testing
│   ├── users.json
│   └── company.json
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── install.sh           # Installation script
├── test.js              # Test script
└── README.md            # This file
```

## Verification

Test that the server is working:

```bash
# Test the built server
node build/index.js

# Should show: "JQ MCP Server running on stdio"
# Press Ctrl+C to exit
```

## Troubleshooting

### Common Issues

1. **"Command not found" error**
   - Ensure mcp-jq is installed globally: `npm install -g @247arjun/mcp-jq`
   - Or use npx: `"command": "npx", "args": ["@247arjun/mcp-jq"]`

2. **"Permission denied" error**
   - Check file permissions: `chmod +x build/index.js`
   - Rebuild the project: `npm run build`

3. **MCP server not appearing in Claude**
   - Verify JSON syntax in configuration file
   - Restart Claude Desktop completely
   - Check that the command path is correct

4. **"jq command not found"**
   - Install jq on your system using the instructions above
   - Verify installation: `jq --version`

### Debugging

Enable verbose logging by setting environment variable:
```bash
# For development
DEBUG=1 node build/index.js

# Test with sample input
echo '{"jsonrpc": "2.0", "method": "initialize", "params": {}}' | node build/index.js
```

## Security Notes

- Safe subprocess execution using spawn instead of shell
- Input validation for all jq commands and file paths
- No arbitrary shell command execution
- Path validation and sanitization for file operations
- Input validation with Zod schemas
