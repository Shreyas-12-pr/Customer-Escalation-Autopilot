import customerTool from "./tools/customerTool.js";

async function test() {
  console.log("Starting Customer Tool...");

  const result = await customerTool("CUS-001");

  console.log("\nCustomer Tool Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();