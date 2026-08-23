import customerTool from "../tools/customerTool.js";

async function contextAgent(customerId) {
  console.log("Context Agent → Customer Tool");

  const customerData = await customerTool(customerId);

  if (!customerData.success) {
    return {
      success: false,
      error: customerData.error
    };
  }

  return {
    success: true,

    customer: customerData.customer,

    supportHistory: {
      totalTickets: customerData.tickets.length,

      unresolvedTickets: customerData.tickets.filter(
        (ticket) => ticket.status === "unresolved"
      ).length,

      tickets: customerData.tickets
    },

    accountHistory: {
      status: customerData.account.status,
      reason: customerData.account.reason
    }
  };
}

export default contextAgent;