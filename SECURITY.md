# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in MCP jq Server, please report it privately.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report vulnerabilities by:

1. **Email**: Send details to [your-email@example.com] with subject "Security Vulnerability - MCP jq Server"
2. **GitHub Security Advisory**: Use GitHub's private vulnerability reporting feature

### What to Include

Please include the following information in your report:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity, typically within 30 days

### Security Considerations

This project involves:

- **Command execution**: The server executes `jq` commands with user input
- **File system access**: The server can read JSON files from the file system
- **Input validation**: User JSON data and jq filters are processed

### Best Practices for Users

When deploying MCP jq Server:

1. **Restrict file access**: Limit the directories the server can access
2. **Validate input**: Consider additional input validation for untrusted sources
3. **Run with minimal privileges**: Use a dedicated user account with limited permissions
4. **Monitor usage**: Log and monitor jq command execution
5. **Keep dependencies updated**: Regularly update Node.js and npm packages

### Known Limitations

- The server executes jq commands directly - complex or malicious jq expressions could potentially impact performance
- File paths are validated but should be restricted to expected directories in production
- No built-in rate limiting - consider implementing this at the client level

Thank you for helping keep MCP jq Server secure!
