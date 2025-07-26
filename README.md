# MCP jq Server

An MCP (Model Context Protocol) server that provides a wrapper around the `jq` command-line utility for querying JSON data.

## Features

- Query JSON files using jq syntax
- Parse and format JSON data
- Support for complex jq filters and operations
- Stream processing for large JSON files

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

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

Alternatively, use the installation script:
```bash
chmod +x install.sh && ./install.sh
```

## MCP Client Configuration

Add this to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "jq": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-jq/build/index.js"],
      "description": "JSON querying with jq"
    }
  }
}
```

## Documentation

- **[EXAMPLES.md](EXAMPLES.md)** - Usage examples and advanced jq queries
- **[INTEGRATION.md](INTEGRATION.md)** - Detailed integration guide for MCP clients

## Project Structure

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

## Available Tools

The server exposes the following tools:

### `jq_query`
Query JSON data using jq syntax.

**Parameters:**
- `json_data` (string): The JSON data to query
- `filter` (string): The jq filter expression
- `raw_output` (boolean, optional): Return raw output instead of JSON

### `jq_query_file`
Query a JSON file using jq syntax.

**Parameters:**
- `file_path` (string): Path to the JSON file
- `filter` (string): The jq filter expression
- `raw_output` (boolean, optional): Return raw output instead of JSON

### `jq_format`
Format and prettify JSON data.

**Parameters:**
- `json_data` (string): The JSON data to format

### `jq_validate`
Validate if a string is valid JSON.

**Parameters:**
- `json_data` (string): The JSON data to validate

### `jq_keys`
Get all keys from a JSON object or array of objects.

**Parameters:**
- `json_data` (string): The JSON data to extract keys from
- `recursive` (boolean, optional): Get keys recursively (default: false)

## Development

Run in development mode with auto-rebuild:
```bash
npm run dev
```

## License

MIT
