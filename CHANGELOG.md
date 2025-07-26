# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-26

### Added
- Initial release of @247arjun/mcp-jq Server
- Complete MCP protocol implementation using `@modelcontextprotocol/sdk`
- Five core tools for JSON querying and manipulation:
  - `jq_query` - Query JSON data directly using jq syntax
  - `jq_query_file` - Query JSON files using jq syntax
  - `jq_format` - Format and prettify JSON data
  - `jq_validate` - Validate JSON syntax
  - `jq_keys` - Extract keys from JSON objects (with recursive option)
- TypeScript implementation with full type safety
- Comprehensive test suite
- Automated installation script (`install.sh`)
- Complete documentation:
  - README.md with setup instructions
  - EXAMPLES.md with usage examples
  - INTEGRATION.md with MCP client integration guide
  - PROJECT_SUMMARY.md with project overview
- Example JSON files for testing and demonstration
- MCP client configuration templates
- Error handling and validation
- Support for raw output and large datasets
- Cross-platform compatibility (macOS, Linux, Windows)

### Prerequisites
- Node.js 18+ 
- jq command-line utility

### Supported MCP Clients
- Claude Desktop
- VS Code MCP extensions
- Generic MCP clients
