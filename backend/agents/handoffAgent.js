function handoffAgent(decision, verification) {
  // Verification failed
  if (!verification.allVerified) {
    return {
      status: "HUMAN_HANDOFF",
      reason: "Resolution verification failed",
      message:
        "The system could not verify that all resolution actions were completed.",
      humanRequired: true
    };
  }

  // High-risk case requiring human approval
  if (decision.resolution.humanRequired) {
    return {
      status: "HUMAN_HANDOFF",
      reason: "High-risk case requires human approval",
      message:
        "The investigation is complete, but human approval is required before final resolution.",
      humanRequired: true
    };
  }

  // Everything verified and no human required
  return {
    status: "RESOLVED",
    reason: "All resolution actions verified",
    message:
      "The customer issue has been successfully resolved.",
    humanRequired: false
  };
}

export default handoffAgent;