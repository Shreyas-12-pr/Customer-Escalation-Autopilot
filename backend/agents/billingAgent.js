import paymentTool from "../tools/paymentTool.js";

async function billingAgent(customerId) {
  console.log("Billing Agent → Payment Tool");

  const paymentData = await paymentTool(customerId);

  if (!paymentData.success) {
    return {
      success: false,
      error: paymentData.error || "Unable to retrieve payment information"
    };
  }

  const payments = paymentData.payments || [];
  const duplicates = paymentData.duplicatePayments || [];

  return {
    success: true,

    paymentSummary: {
      totalPayments: payments.length,
      duplicatePayments: duplicates.length
    },

    payments,

    duplicatePayments: duplicates,

    billingRisk:
      duplicates.length > 0
        ? "HIGH"
        : "LOW"
  };
}

export default billingAgent;