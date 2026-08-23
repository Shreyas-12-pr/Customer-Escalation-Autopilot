import billingAgent from "./agents/billingAgent.js";

async function test() {
  console.log("Starting Billing Agent...");

  const result = await billingAgent("CUS-001");

  console.log("\nBilling Agent Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();