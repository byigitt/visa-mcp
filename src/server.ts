#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import { registerRoutes } from "./registers/routes";
import { registerTools } from "./registers/tools";

const server = new McpServer({
  name: "Schengen Visa MCP Server",
  version: "1.0.1",
});

registerTools(server);

const app = express();
app.use(express.json());

registerRoutes(app, server);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP server listening on http://localhost:${port}/mcp`);
}); 