import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

let client = null;
let transport = null;

async function connectMCP() {
  if (client) {
    return client;
  }

  transport = new StdioClientTransport({
    command: "node",
    args: ["backend/mcpServer.js"],
  });

  client = new Client({
    name: "escalation-autopilot",
    version: "1.0.0",
  });

  await client.connect(transport);

  console.log("MCP Client connected ✓");

  return client;
}

/* =========================
   CUSTOMER CONTEXT
========================= */

export async function getCustomerContext(customerId) {
  const mcp = await connectMCP();

  const result = await mcp.callTool({
    name: "get_customer_context",
    arguments: {
      customerId,
    },
  });

  return JSON.parse(
    result.content[0].text
  );
}

/* =========================
   PAYMENT INFORMATION
========================= */

export async function getPaymentInformation(
  customerId
) {
  const mcp = await connectMCP();

  const result = await mcp.callTool({
    name: "get_payment_information",
    arguments: {
      customerId,
    },
  });

  return JSON.parse(
    result.content[0].text
  );
}

/* =========================
   ACCOUNT STATUS
========================= */

export async function getAccountStatus(
  customerId
) {
  const mcp = await connectMCP();

  const result = await mcp.callTool({
    name: "get_account_status",
    arguments: {
      customerId,
    },
  });

  return JSON.parse(
    result.content[0].text
  );
}

/* =========================
   CUSTOMER NOTIFICATION
========================= */

export async function notifyCustomer(
  customerId,
  message
) {
  const mcp = await connectMCP();

  const result = await mcp.callTool({
    name: "notify_customer",
    arguments: {
      customerId,
      message,
    },
  });

  return JSON.parse(
    result.content[0].text
  );
}

/* =========================
   CLOSE MCP CONNECTION
========================= */

export async function closeMCP() {
  if (client) {
    await client.close();

    client = null;
    transport = null;

    console.log("MCP Client disconnected");
  }
}