import orchestrator from "./orchestrator.js";

async function test() {
  const complaint =
    "I've been charged twice, my account is still locked, and nobody has fixed this for 3 days.";

  const result = await orchestrator(
    "CUS-001",
    complaint
  );

  console.log("\n=================================");
  console.log("FINAL INVESTIGATION");
  console.log("=================================");

  console.log(
    JSON.stringify(result, null, 2)
  );
}

test();