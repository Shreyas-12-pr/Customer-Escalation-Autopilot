import paymentTool from "./tools/paymentTool.js";

async function test() {
  console.log("Starting Payment Tool...");

  const result = await paymentTool("CUS-001");

  console.log("\nPayment Tool Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();