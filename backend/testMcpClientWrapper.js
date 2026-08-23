import {
  getCustomerContext,
  getPaymentInformation,
  getAccountStatus,
  notifyCustomer,
  closeMCP
} from "./mcpClient.js";

async function test() {
  console.log("Starting MCP Client Wrapper...\n");

  const customer =
    await getCustomerContext("CUS-001");

  console.log("CUSTOMER:");
  console.log(
    JSON.stringify(customer, null, 2)
  );

  const payments =
    await getPaymentInformation("CUS-001");

  console.log("\nPAYMENTS:");
  console.log(
    JSON.stringify(payments, null, 2)
  );

  const account =
    await getAccountStatus("CUS-001");

  console.log("\nACCOUNT:");
  console.log(
    JSON.stringify(account, null, 2)
  );

  const notification =
    await notifyCustomer(
      "CUS-001",
      "Your case has been investigated and requires support review."
    );

  console.log("\nNOTIFICATION:");
  console.log(
    JSON.stringify(notification, null, 2)
  );

  await closeMCP();

  console.log(
    "\nMCP Client Wrapper Test Complete ✓"
  );
}

test().catch(async (error) => {
  console.error("\nMCP Client Test Failed:");
  console.error(error);

  await closeMCP();

  process.exit(1);
});