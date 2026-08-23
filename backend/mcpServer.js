import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

import customerTool from "./tools/customerTool.js";
import paymentTool from "./tools/paymentTool.js";
import accountTool from "./tools/accountTool.js";
import notificationTool from "./tools/notificationTool.js";

function createMcpServer() {
  const server = new McpServer({
    name: "escalation-autopilot",
    version: "1.0.0",
    description:
      "MCP server for Customer Escalation Autopilot"
  });

  // ==========================================
  // CUSTOMER TOOL
  // ==========================================

  server.registerTool(
    "get_customer_context",
    {
      description:
        "Retrieve customer profile, support history, and account information.",
      inputSchema: z.object({
        customerId: z.string()
      })
    },
    async ({ customerId }) => {
      const result = await customerTool(customerId);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );

  // ==========================================
  // PAYMENT TOOL
  // ==========================================

  server.registerTool(
    "get_payment_information",
    {
      description:
        "Retrieve customer payments and identify duplicate payments.",
      inputSchema: z.object({
        customerId: z.string()
      })
    },
    async ({ customerId }) => {
      const result = await paymentTool(customerId);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );

  // ==========================================
  // ACCOUNT TOOL
  // ==========================================

  server.registerTool(
    "get_account_status",
    {
      description:
        "Retrieve customer account status, login failures, and unlock information.",
      inputSchema: z.object({
        customerId: z.string()
      })
    },
    async ({ customerId }) => {
      const result = await accountTool(customerId);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );

  // ==========================================
  // NOTIFICATION TOOL
  // ==========================================

  server.registerTool(
    "notify_customer",
    {
      description:
        "Send a simulated customer notification.",
      inputSchema: z.object({
        customerId: z.string(),
        message: z.string()
      })
    },
    async ({ customerId, message }) => {
      const result = notificationTool(
        customerId,
        message
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }
  );

  return server;
}

// MCP uses stdout for the protocol.
// Do not use console.log() in this server.
// Logging should go to stderr.
console.error(
  "Escalation Autopilot MCP Server starting..."
);

serveStdio(createMcpServer);