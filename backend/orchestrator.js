import {
  getCustomerContext,
  getPaymentInformation,
  getAccountStatus,
  notifyCustomer,
  closeMCP
} from "./mcpClient.js";

import riskResolutionAgent from "./agents/riskResolutionAgent.js";
import verificationAgent from "./agents/verificationAgent.js";
import handoffAgent from "./agents/handoffAgent.js";

async function orchestrator(customerId, complaint) {
  console.log("\n=================================");
  console.log("ORCHESTRATOR STARTED");
  console.log("=================================");

  console.log("\nCustomer Complaint:");
  console.log(complaint);

  try {
    // --------------------------------
    // 1. Context Agent via MCP
    // --------------------------------

    console.log("\n[1/6] Running Context Agent via MCP...");

    const context = await getCustomerContext(
      customerId
    );

    console.log("Context Agent completed ✓");

    // --------------------------------
    // 2. Billing Agent via MCP
    // --------------------------------

    console.log("\n[2/6] Running Billing Agent via MCP...");

    const billing = await getPaymentInformation(
      customerId
    );

    console.log("Billing Agent completed ✓");

    // --------------------------------
    // 3. Technical Agent via MCP
    // --------------------------------

    console.log(
      "\n[3/6] Running Technical Agent via MCP..."
    );

    const account = await getAccountStatus(
      customerId
    );

    const technical = {
      success: account.success,

      accountStatus:
        account.account?.status || null,

      issue:
        account.account?.status === "locked"
          ? "Account is locked"
          : "No account access issue detected",

      reason:
        account.account?.reason || null,

      failedLoginAttempts:
        account.account?.failedLoginAttempts || 0,

      canUnlock:
        account.account?.canUnlock || false,

      technicalRisk:
        account.account?.status === "locked"
          ? "HIGH"
          : "LOW"
    };

    console.log("Technical Agent completed ✓");

    // --------------------------------
    // Combine investigation
    // --------------------------------

    const investigation = {
      context,
      billing,
      technical
    };

    console.log("\n=================================");
    console.log("INVESTIGATION COMPLETE");
    console.log("=================================");

    // --------------------------------
    // 4. Risk + Resolution Agent
    // --------------------------------

    console.log(
      "\n[4/6] Running Risk + Resolution Agent..."
    );

    const decision = riskResolutionAgent(
      investigation
    );

    console.log(
      "Risk + Resolution completed ✓"
    );

    console.log("\nRisk Score:");
    console.log(decision.risk.score);

    console.log("Risk Level:");
    console.log(decision.risk.level);

    console.log("Human Required:");
    console.log(
      decision.resolution.humanRequired
    );

    console.log("Planned Actions:");
    console.log(
      decision.resolution.actions
    );

    // --------------------------------
    // 5. Verification Agent
    // --------------------------------

    console.log(
      "\n[5/6] Running Verification Agent..."
    );

    const verification =
      verificationAgent(decision);

    console.log(
      "Verification completed ✓"
    );

    console.log("\nVerification Status:");
    console.log(verification.status);

    console.log("All Actions Verified:");
    console.log(
      verification.allVerified
    );

    // --------------------------------
    // 6. Final Outcome
    // --------------------------------

    console.log(
      "\n[6/6] Determining Final Outcome..."
    );

    const outcome = handoffAgent(
      decision,
      verification
    );

    console.log(
      "Final Outcome:",
      outcome.status
    );

    // --------------------------------
    // MCP Customer Notification
    // --------------------------------

    console.log(
      "\nSending customer notification through MCP..."
    );

    const notificationMessage =
      outcome.status === "RESOLVED"
        ? "Your issue has been investigated and resolved."
        : "Your issue has been investigated and requires review by a support specialist.";

    const notification =
      await notifyCustomer(
        customerId,
        notificationMessage
      );

    console.log(
      "Customer notification completed ✓"
    );

    console.log("\n=================================");
    console.log("WORKFLOW COMPLETE");
    console.log("=================================");

    console.log("\nFinal Status:");
    console.log(outcome.status);

    console.log("Reason:");
    console.log(outcome.reason);

    // --------------------------------
    // Close MCP connection
    // --------------------------------

    await closeMCP();

    // --------------------------------
    // Return complete result
    // --------------------------------

    return {
      customerId,
      complaint,

      investigation: {
        context,
        billing,
        technical
      },

      decision: {
        risk: decision.risk,
        resolution: decision.resolution
      },

      verification,

      outcome,

      notification
    };

  } catch (error) {
    console.error(
      "\nORCHESTRATOR ERROR:"
    );

    console.error(error);

    await closeMCP();

    return {
      success: false,
      customerId,
      complaint,
      error: error.message
    };
  }
}

export default orchestrator;