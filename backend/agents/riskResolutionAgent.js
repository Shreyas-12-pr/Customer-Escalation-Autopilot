import notificationTool from "../tools/notificationTool.js";

function riskResolutionAgent(investigation) {
  let riskScore = 0;
  const factors = [];

  // Customer risk
  if (
    investigation.context?.customer?.risk === "high"
  ) {
    riskScore += 30;
    factors.push("Customer is classified as high risk");
  }

  // Unresolved tickets
  const unresolved =
    investigation.context?.supportHistory
      ?.unresolvedTickets || 0;

  if (unresolved >= 3) {
    riskScore += 25;
    factors.push(
      "Multiple unresolved support tickets"
    );
  }

  // Billing risk
  const duplicatePayments =
    investigation.billing?.duplicatePayments
      ?.length || 0;

  if (duplicatePayments > 0) {
    riskScore += 25;
    factors.push(
      "Duplicate payment detected"
    );
  }

  // Technical risk
  if (
    investigation.technical?.accountStatus ===
    "locked"
  ) {
    riskScore += 20;
    factors.push(
      "Customer account is locked"
    );
  }

  // Keep score within 100
  riskScore = Math.min(riskScore, 100);

  const riskLevel =
    riskScore >= 70
      ? "HIGH"
      : riskScore >= 40
      ? "MEDIUM"
      : "LOW";

  const humanRequired = riskLevel === "HIGH";

  const actions = [];

  // Billing action
  if (duplicatePayments > 0) {
    actions.push("CREATE_REFUND_REQUEST");
  }

  // Technical action
  if (
    investigation.technical?.canUnlock === true
  ) {
    actions.push("UNLOCK_ACCOUNT");
  }

  // Notification action
  actions.push("NOTIFY_CUSTOMER");

  // Perform notification only as a simulated action
  const notification = notificationTool(
    investigation.context.customer.id,
    humanRequired
      ? "Your issue has been investigated and requires review by a support specialist."
      : "Your issue has been investigated and resolved."
  );

  return {
    risk: {
      score: riskScore,
      level: riskLevel,
      factors
    },

    resolution: {
      actions,
      humanRequired,

      notification
    }
  };
}

export default riskResolutionAgent;