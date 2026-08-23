import accountTool from "../tools/accountTool.js";

async function technicalAgent(customerId) {
  console.log("Technical Agent → Account Tool");

  const accountData = await accountTool(customerId);

  if (!accountData.success) {
    return {
      success: false,
      error: accountData.error
    };
  }

  const account = accountData.account;

  return {
    success: true,

    accountStatus: account.status,

    issue:
      account.status === "locked"
        ? "Account is locked"
        : "No account access issue detected",

    reason: account.reason,

    failedLoginAttempts: account.failedLoginAttempts,

    canUnlock: account.canUnlock,

    technicalRisk:
      account.status === "locked"
        ? "HIGH"
        : "LOW"
  };
}

export default technicalAgent;