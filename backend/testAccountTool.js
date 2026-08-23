import accountTool from "./tools/accountTool.js";

async function test() {
  console.log("Starting Account Tool...");

  const result = await accountTool("CUS-001");

  console.log("\nAccount Tool Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();