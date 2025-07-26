#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  CallToolRequest,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promises as fs } from "fs";
import { promisify } from "util";

const execAsync = promisify(exec);

/**
 * MCP Server that wraps the jq command-line utility
 */
class JqServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "mcp-jq",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "jq_query",
            description: "Query JSON data using jq syntax",
            inputSchema: {
              type: "object",
              properties: {
                json_data: {
                  type: "string",
                  description: "The JSON data to query",
                },
                filter: {
                  type: "string",
                  description: "The jq filter expression",
                },
                raw_output: {
                  type: "boolean",
                  description: "Return raw output instead of JSON (default: false)",
                  default: false,
                },
              },
              required: ["json_data", "filter"],
            },
          },
          {
            name: "jq_query_file",
            description: "Query a JSON file using jq syntax",
            inputSchema: {
              type: "object",
              properties: {
                file_path: {
                  type: "string",
                  description: "Path to the JSON file",
                },
                filter: {
                  type: "string",
                  description: "The jq filter expression",
                },
                raw_output: {
                  type: "boolean",
                  description: "Return raw output instead of JSON (default: false)",
                  default: false,
                },
              },
              required: ["file_path", "filter"],
            },
          },
          {
            name: "jq_format",
            description: "Format and prettify JSON data",
            inputSchema: {
              type: "object",
              properties: {
                json_data: {
                  type: "string",
                  description: "The JSON data to format",
                },
              },
              required: ["json_data"],
            },
          },
          {
            name: "jq_validate",
            description: "Validate if a string is valid JSON",
            inputSchema: {
              type: "object",
              properties: {
                json_data: {
                  type: "string",
                  description: "The JSON data to validate",
                },
              },
              required: ["json_data"],
            },
          },
          {
            name: "jq_keys",
            description: "Get all keys from a JSON object or array of objects",
            inputSchema: {
              type: "object",
              properties: {
                json_data: {
                  type: "string",
                  description: "The JSON data to extract keys from",
                },
                recursive: {
                  type: "boolean",
                  description: "Get keys recursively (default: false)",
                  default: false,
                },
              },
              required: ["json_data"],
            },
          },
        ] as Tool[],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "jq_query":
          return this.handleJqQuery(args);
        case "jq_query_file":
          return this.handleJqQueryFile(args);
        case "jq_format":
          return this.handleJqFormat(args);
        case "jq_validate":
          return this.handleJqValidate(args);
        case "jq_keys":
          return this.handleJqKeys(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async handleJqQuery(args: any) {
    const { json_data, filter, raw_output = false } = args;

    try {
      // Validate JSON data
      JSON.parse(json_data);

      // Construct jq command
      const jqArgs = raw_output ? ["-r", filter] : [filter];
      const command = `echo '${json_data.replace(/'/g, "'\\''")}' | jq ${jqArgs.map(arg => `'${arg}'`).join(" ")}`;

      const { stdout, stderr } = await execAsync(command);

      if (stderr) {
        return {
          content: [
            {
              type: "text",
              text: `Error executing jq: ${stderr}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: stdout.trim(),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }

  private async handleJqQueryFile(args: any) {
    const { file_path, filter, raw_output = false } = args;

    try {
      // Check if file exists
      await fs.access(file_path);

      // Construct jq command
      const jqArgs = raw_output ? ["-r", filter] : [filter];
      const command = `jq ${jqArgs.map(arg => `'${arg}'`).join(" ")} '${file_path}'`;

      const { stdout, stderr } = await execAsync(command);

      if (stderr) {
        return {
          content: [
            {
              type: "text",
              text: `Error executing jq: ${stderr}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: stdout.trim(),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }

  private async handleJqFormat(args: any) {
    const { json_data } = args;

    try {
      // Validate JSON data
      JSON.parse(json_data);

      // Format using jq
      const command = `echo '${json_data.replace(/'/g, "'\\''")}' | jq '.'`;
      const { stdout, stderr } = await execAsync(command);

      if (stderr) {
        return {
          content: [
            {
              type: "text",
              text: `Error formatting JSON: ${stderr}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: stdout.trim(),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }

  private async handleJqValidate(args: any) {
    const { json_data } = args;

    try {
      // Try to parse the JSON
      JSON.parse(json_data);
      
      return {
        content: [
          {
            type: "text",
            text: "✅ Valid JSON",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }

  private async handleJqKeys(args: any) {
    const { json_data, recursive = false } = args;

    try {
      // Validate JSON data
      JSON.parse(json_data);

      // Get keys using jq
      const filter = recursive ? ".. | keys?" : "keys";
      const command = `echo '${json_data.replace(/'/g, "'\\''")}' | jq '${filter}'`;
      const { stdout, stderr } = await execAsync(command);

      if (stderr) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting keys: ${stderr}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: stdout.trim(),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP jq server running on stdio");
  }
}

// Start the server
const server = new JqServer();
server.run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
