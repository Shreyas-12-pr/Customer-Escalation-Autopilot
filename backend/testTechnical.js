import technicalAgent from "./agents/technicalAgent.js";

async function test() {
  console.log("Starting Technical Agent...");

  const result = await technicalAgent("CUS-001");

  console.log("\nTechnical Agent Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();