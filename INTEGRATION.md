# MCP Client Integration Guide

This guide explains how to integrate the MCP jq Server with various MCP clients.

## Claude Desktop Integration

To use this server with Claude Desktop, add the following configuration to your Claude Desktop configuration file:

### Configuration Location

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Configuration

```json
{
  "mcpServers": {
    "jq": {
      "command": "node",
      "args": [
        "/absolute/path/to/mcp-jq/build/index.js"
      ],
      "description": "JSON querying with jq"
    }
  }
}
```

Replace `/absolute/path/to/mcp-jq` with the actual path to your mcp-jq installation.

## VS Code MCP Extension Integration

If using a VS Code MCP extension, add the server configuration to your settings:

```json
{
  "mcp.servers": {
    "jq": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-jq/build/index.js"],
      "description": "JSON querying with jq"
    }
  }
}
```

## Generic MCP Client Integration

For any MCP client that supports server configuration:

```json
{
  "name": "jq",
  "command": "node",
  "args": ["/absolute/path/to/mcp-jq/build/index.js"],
  "description": "JSON querying with jq",
  "capabilities": ["tools"]
}
```

## Testing the Integration

Once configured, you should see the following tools available in your MCP client:

1. **jq_query** - Query JSON data directly
2. **jq_query_file** - Query JSON files
3. **jq_format** - Format and prettify JSON
4. **jq_validate** - Validate JSON syntax
5. **jq_keys** - Extract keys from JSON objects

## Usage Examples in Chat

Here are some example conversations you can have with your MCP client:

### Basic JSON Query
**You:** "I have this JSON data: `[{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]`. Can you extract just the names?"

**Assistant:** I'll use the jq_query tool to extract the names from your JSON data.

### File Query
**You:** "Can you analyze the users.json file and show me all users older than 28?"

**Assistant:** I'll query the users.json file to find users older than 28.

### Format JSON
**You:** "Can you prettify this JSON: `{\"name\":\"Alice\",\"age\":30}`?"

**Assistant:** I'll format that JSON to make it more readable.

## Troubleshooting

### Server Not Found
- Ensure the path in your configuration is absolute and correct
- Verify that `npm run build` has been executed
- Check that Node.js is accessible from your system PATH

### jq Command Not Found
- Install jq on your system:
  - macOS: `brew install jq`
  - Ubuntu: `sudo apt-get install jq`
  - Windows: Download from https://jqlang.github.io/jq/download/

### Permission Errors
- Ensure the MCP client has permission to execute Node.js
- On macOS/Linux, you may need to make the script executable: `chmod +x install.sh && ./install.sh`

### JSON Parsing Errors
- Verify your JSON is valid using the `jq_validate` tool
- Escape special characters properly in your JSON strings

## Advanced Configuration

### Environment Variables
You can set environment variables for the server:

```json
{
  "mcpServers": {
    "jq": {
      "command": "node",
      "args": ["/path/to/mcp-jq/build/index.js"],
      "env": {
        "JQ_TIMEOUT": "30000",
        "MAX_FILE_SIZE": "10MB"
      }
    }
  }
}
```

### Resource Limits
For production use, consider setting resource limits:

```json
{
  "mcpServers": {
    "jq": {
      "command": "node",
      "args": [
        "--max-old-space-size=512",
        "/path/to/mcp-jq/build/index.js"
      ]
    }
  }
}
```

## Security Considerations

- The server can read files accessible to the user running it
- jq expressions are executed directly - validate input in production
- Consider running in a sandboxed environment for untrusted queries
- File paths are validated but should be restricted to expected directories

## Performance Tips

- Use `raw_output: true` for large datasets to reduce JSON parsing overhead
- Break complex queries into smaller, focused operations
- Consider file size limits for `jq_query_file` operations

## Contributing

To extend the server with additional tools:

1. Add the tool definition to the `ListToolsRequestSchema` handler
2. Add a case to the `CallToolRequestSchema` handler
3. Implement the handler method following the existing pattern
4. Update tests and documentation
5. Rebuild with `npm run build`
