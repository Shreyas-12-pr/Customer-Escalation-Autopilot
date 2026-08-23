import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

async function main() {
  console.log("Starting MCP Client...");

  const transport = new StdioClientTransport({
    command: "node",
    args: ["backend/mcpServer.js"],
  });

  const client = new Client({
    name: "escalation-autopilot-test-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  console.log("Connected to MCP Server ✓");

  const tools = await client.listTools();

  console.log("\nAvailable MCP Tools:");

  for (const tool of tools.tools) {
    console.log(`- ${tool.name}`);
  }

  console.log("\nTesting customer tool...");

  const result = await client.callTool({
    name: "get_customer_context",
    arguments: {
      customerId: "CUS-001",
    },
  });

  console.log("\nCustomer Tool Result:");
  console.log(
    JSON.stringify(result, null, 2)
  );

  await client.close();

  console.log("\nMCP test completed ✓");
}

main().catch((error) => {
  console.error("\nMCP test failed:");
  console.error(error);
  process.exit(1);
});