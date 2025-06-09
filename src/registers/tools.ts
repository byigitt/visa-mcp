import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { fetchAndFilterVisas } from "../utils";

export function registerTools(server: McpServer) {
  server.tool(
    "list_visas",
    {
      country_code: z
        .string()
        .optional()
        .describe("Filter by country code (e.g., 'tur', 'gbr')"),
      mission_code: z
        .string()
        .optional()
        .describe("Filter by mission code (e.g., 'bgr', 'fin')"),
      visa_category: z.string().optional().describe("Filter by visa category"),
      visa_type: z.string().optional().describe("Filter by visa type"),
      center: z.string().optional().describe("Filter by center"),
      status: z
        .string()
        .optional()
        .describe("Filter by status (e.g., 'open', 'closed')"),
    },
    async (filters) => {
      return fetchAndFilterVisas(filters);
    }
  );

  server.tool(
    "get_visas_by_country_code",
    {
      country_code: z
        .string()
        .describe("The country code to filter by (e.g., 'tur', 'gbr')"),
    },
    async ({ country_code }) => fetchAndFilterVisas({ country_code })
  );

  server.tool(
    "get_visas_by_status",
    {
      status: z.string().describe("The status to filter by (e.g., 'open', 'closed')"),
    },
    async ({ status }) => fetchAndFilterVisas({ status })
  );

  server.tool(
    "get_visas_by_mission_code",
    {
      mission_code: z
        .string()
        .describe("The mission code to filter by (e.g., 'bgr', 'fin')"),
    },
    async ({ mission_code }) => fetchAndFilterVisas({ mission_code })
  );

  server.tool(
    "get_visas_by_visa_category",
    { visa_category: z.string().describe("The visa category to filter by") },
    async ({ visa_category }) => fetchAndFilterVisas({ visa_category })
  );

  server.tool(
    "get_visas_by_visa_type",
    { visa_type: z.string().describe("The visa type to filter by") },
    async ({ visa_type }) => fetchAndFilterVisas({ visa_type })
  );

  server.tool(
    "get_visas_by_center",
    { center: z.string().describe("The application center to filter by") },
    async ({ center }) => fetchAndFilterVisas({ center })
  );
} 