import contextAgent from "./agents/contextAgent.js";

async function test() {
  console.log("Starting Context Agent...");

  const result = await contextAgent("CUS-001");

  console.log("\nContext Agent Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();