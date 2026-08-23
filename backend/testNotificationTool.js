import notificationTool from "./tools/notificationTool.js";

function test() {
  console.log("Starting Notification Tool...");

  const result = notificationTool(
    "CUS-001",
    "Your customer issue has been investigated. Our support team will follow up shortly."
  );

  console.log("\nNotification Tool Result:");
  console.log(JSON.stringify(result, null, 2));
}

test();