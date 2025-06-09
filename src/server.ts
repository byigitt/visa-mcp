#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express from "express";
import { registerRoutes } from "./registers/routes";
import { registerTools } from "./registers/tools";

async function main() {
  const server = new McpServer({
    name: "Schengen Visa MCP Server",
    version: "1.0.3",
  });

  registerTools(server);

  if (process.argv.includes("--stdio")) {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    console.error("MCP server started and listening on stdio.");
  } else {
    const app = express();
    app.use(express.json());

    registerRoutes(app, server);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.error(`MCP server listening on http://localhost:${port}/mcp`);
    });
  }
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
}); 