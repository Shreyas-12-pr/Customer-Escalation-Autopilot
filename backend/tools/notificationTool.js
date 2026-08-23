function notificationTool(customerId, message) {
  console.log("\nNotification Tool");
  console.log("Customer:", customerId);
  console.log("Message:", message);

  return {
    success: true,
    customerId,
    channel: "email",
    message,
    status: "sent",
    timestamp: new Date().toISOString()
  };
}

export default notificationTool;