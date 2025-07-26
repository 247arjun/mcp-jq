# Contributing to MCP jq Server

Thank you for your interest in contributing to MCP jq Server! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mcp-jq.git
   cd mcp-jq
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Build the project**:
   ```bash
   npm run build
   ```
5. **Run tests**:
   ```bash
   npm test
   ```

## Development Process

### Setting Up Development Environment

1. Ensure you have Node.js 18+ installed
2. Install the `jq` command-line utility:
   - macOS: `brew install jq`
   - Ubuntu: `sudo apt-get install jq`
   - Windows: Download from https://jqlang.github.io/jq/download/

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards:
   - Use TypeScript for all new code
   - Follow existing code formatting and style
   - Add appropriate error handling
   - Include JSDoc comments for new functions

3. **Test your changes**:
   ```bash
   npm run build
   npm test
   ```

4. **Update documentation** if needed:
   - Update README.md for new features
   - Add examples to EXAMPLES.md
   - Update INTEGRATION.md for client-related changes

### Code Style

- Use TypeScript strict mode
- Use camelCase for variables and functions
- Use PascalCase for classes
- Include proper error handling
- Add JSDoc comments for public methods
- Keep functions focused and single-purpose

### Adding New Tools

To add a new jq tool:

1. **Add tool definition** to the `ListToolsRequestSchema` handler in `src/index.ts`
2. **Add case handler** to the `CallToolRequestSchema` handler
3. **Implement the handler method** following the existing pattern
4. **Add tests** to `test.js`
5. **Update documentation** in EXAMPLES.md and README.md

Example tool structure:
```typescript
{
  name: "jq_new_tool",
  description: "Description of what the tool does",
  inputSchema: {
    type: "object",
    properties: {
      // Define parameters here
    },
    required: ["required_param"]
  }
}
```

### Testing

- All changes must pass existing tests
- Add new tests for new functionality  
- Test with various JSON data types and edge cases
- Verify error handling works correctly

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add new jq tool for array manipulation`
- `fix: handle empty JSON objects correctly`
- `docs: update integration guide for VS Code`
- `test: add tests for edge cases in jq_query`

## Submitting Changes

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference any related issues
   - List of changes made
   - Testing performed

3. **Respond to feedback** and make any requested changes

## Bug Reports

When reporting bugs, please include:

- **Environment details**: OS, Node.js version, jq version
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Error messages** or logs
- **Sample JSON data** that causes the issue (if applicable)

Use the GitHub issue template for bug reports.

## Feature Requests

For new features:

- **Describe the use case** and why it's needed
- **Provide examples** of how it would be used
- **Consider backwards compatibility**
- **Check if it can be implemented** with existing jq functionality

## Documentation

Help improve documentation by:

- Fixing typos or unclear instructions
- Adding more examples
- Improving setup guides
- Adding troubleshooting information

## Questions?

- Check existing GitHub issues
- Review the documentation (README.md, EXAMPLES.md, INTEGRATION.md)
- Create a new issue with the "question" label

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

Thank you for contributing to MCP jq Server! 🎉
