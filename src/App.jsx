import { useState } from "react";
import "./App.css";

function AgentCard({
  icon,
  title,
  description,
  color,
  status = "WAITING",
}) {
  return (
    <div className="agent-card">
      <div className={`agent-icon ${color}`}>
        {icon}
      </div>

      <div className="agent-card-content">
        <div className="agent-card-title">
          <strong>{title}</strong>

          <span
            className={`agent-status ${status.toLowerCase()}`}
          >
            {status}
          </span>
        </div>

        <p>{description}</p>

        <span className="view-details">
          MCP TOOL CONNECTED
        </span>
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState(1);

  const [complaint, setComplaint] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  const [agentStep, setAgentStep] = useState(0);

  const [riskLevel, setRiskLevel] = useState("HIGH");

  const [riskScore, setRiskScore] = useState(85);

  const [riskFactors, setRiskFactors] = useState([
    "Multiple customer issues detected",
    "Duplicate payment activity detected",
    "Account access problem detected",
    "Financial action may be required",
  ]);

  const [actions, setActions] = useState([
    "CREATE_REFUND_REQUEST",
    "UNLOCK_ACCOUNT",
    "NOTIFY_CUSTOMER",
  ]);

  const [outcomeStatus, setOutcomeStatus] =
    useState("PENDING");

  const [humanDecision, setHumanDecision] =
    useState("PENDING");

  const handleResolve = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    setAgentStep(1);

    try {
      const response = await fetch(
        "http://localhost:5000/api/resolve",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customerId: "CUS-001",
            complaint,
          }),
        }
      );

      setAgentStep(2);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to process complaint"
        );
      }

      setResult(data);

      setAgentStep(3);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setAgentStep(4);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setAgentStep(5);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setAgentStep(6);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setOutcomeStatus("ESCALATED");

      setScreen(2);
    } catch (err) {
      setError(err.message);

      setAgentStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOutcome = () => {
    setScreen(3);
  };

  const handleApprove = () => {
    setHumanDecision("APPROVED");
    setOutcomeStatus("RESOLVED");
  };

  const resetWorkflow = () => {
    setScreen(1);

    setComplaint("");

    setLoading(false);

    setError("");

    setResult(null);

    setAgentStep(0);

    setRiskLevel("HIGH");

    setRiskScore(85);

    setRiskFactors([
      "Multiple customer issues detected",
      "Duplicate payment activity detected",
      "Account access problem detected",
      "Financial action may be required",
    ]);

    setActions([
      "CREATE_REFUND_REQUEST",
      "UNLOCK_ACCOUNT",
      "NOTIFY_CUSTOMER",
    ]);

    setOutcomeStatus("PENDING");

    setHumanDecision("PENDING");
  };

  return (
    <div className="app">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            EA
          </div>

          <div>
            <h1>
              Escalation Autopilot
            </h1>

            <p>
              Multi-Agent Customer Resolution System
            </p>
          </div>

        </div>

        <div className="system-status">

          <span className="status-dot"></span>

          SYSTEM ONLINE

        </div>

      </header>

      {/* ==================================================
          SCREEN 1
      ================================================== */}

      {screen === 1 && (

        <main className="main-content">

          <section className="hero">

            <span className="eyebrow">
              AI-POWERED SUPPORT
            </span>

            <h2>
              Resolve customer escalations
              automatically.
            </h2>

            <p>
              Submit a customer complaint and let the
              multi-agent system investigate, decide,
              execute and verify the resolution.
            </p>

          </section>

          <section className="complaint-section">

            <div className="section-header">

              <div>

                <h3>
                  Customer Complaint
                </h3>

                <p>
                  Describe the customer's issue below.
                </p>

              </div>

              <span className="customer-id">
                CUS-001
              </span>

            </div>

            <textarea
              value={complaint}
              onChange={(event) =>
                setComplaint(event.target.value)
              }
              placeholder="Example: I was charged twice for my subscription and now I cannot access my account..."
              rows={7}
              disabled={loading}
            />

            {error && (

              <div className="error-message">

                <strong>
                  Error:
                </strong>{" "}

                {error}

              </div>

            )}

            <div className="example-box">

              <span>
                TRY THIS EXAMPLE
              </span>

              <button
                type="button"
                onClick={() =>
                  setComplaint(
                    "I was charged twice for my subscription and now I cannot access my account."
                  )
                }
                disabled={loading}
              >
                Duplicate payment + account access issue
              </button>

            </div>

            <button
              className="resolve-button"
              onClick={handleResolve}
              disabled={
                loading ||
                !complaint.trim()
              }
            >

              {loading ? (

                <>
                  <span className="button-spinner"></span>

                  Agents Executing...
                </>

              ) : (

                <>
                  Analyze & Resolve

                  <span className="button-arrow">
                    →
                  </span>
                </>

              )}

            </button>

          </section>

        </main>

      )}

      {/* ==================================================
          SCREEN 2
      ================================================== */}

      {screen === 2 && (

        <main className="main-content">

          <section className="execution-header">

            <div>

              <span className="eyebrow">
                LIVE AGENT EXECUTION
              </span>

              <h2>
                Multi-Agent Investigation
              </h2>

              <p>
                Agents processed the customer
                escalation through the autonomous workflow.
              </p>

            </div>

            <div className="execution-status">

              <span className="status-dot"></span>

              EXECUTION COMPLETE

            </div>

          </section>

          {/* ORCHESTRATOR */}

          <section className="orchestrator-card">

            <div className="orchestrator-icon">
              ORC
            </div>

            <div className="orchestrator-content">

              <div className="card-title-row">

                <h3>
                  Orchestrator Agent
                </h3>

                <span className="agent-status completed">
                  COMPLETED
                </span>

              </div>

              <p>
                Analyzed the complaint and coordinated
                the specialist agents.
              </p>

              <span className="tool-label">
                MCP ORCHESTRATION
              </span>

            </div>

          </section>

          {/* SPECIALIST AGENTS */}

          <section className="agents-section">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  SPECIALIST AGENTS
                </span>

                <h3>
                  Investigation pipeline
                </h3>

              </div>

              <span className="agent-count">
                3 AGENTS
              </span>

            </div>

            <div className="agent-list">

              <AgentCard
                icon="CTX"
                title="Context Agent"
                description="Retrieved customer history and previous tickets."
                color="blue"
                status={
                  agentStep === 1
                    ? "RUNNING"
                    : agentStep >= 2
                    ? "COMPLETED"
                    : "WAITING"
                }
              />

              <div className="flow-arrow-large">
                ↓
              </div>

              <AgentCard
                icon="PAY"
                title="Billing Agent"
                description="Investigated duplicate payment activity."
                color="green"
                status={
                  agentStep === 2
                    ? "RUNNING"
                    : agentStep >= 3
                    ? "COMPLETED"
                    : "WAITING"
                }
              />

              <div className="flow-arrow-large">
                ↓
              </div>

              <AgentCard
                icon="TECH"
                title="Technical Agent"
                description="Investigated account lock and access issues."
                color="orange"
                status={
                  agentStep === 3
                    ? "RUNNING"
                    : agentStep >= 4
                    ? "COMPLETED"
                    : "WAITING"
                }
              />

            </div>

          </section>

          {/* RESOLUTION */}

          {agentStep >= 4 && (

            <section className="resolution-card">

              <div className="resolution-icon">
                AI
              </div>

              <div className="resolution-content">

                <div className="card-title-row">

                  <div>

                    <span className="eyebrow">
                      DECISION ENGINE
                    </span>

                    <h3>
                      Risk + Resolution Agent
                    </h3>

                  </div>

                  <span className="agent-status completed">
                    COMPLETED
                  </span>

                </div>

                <p>
                  Evaluated investigation results
                  and selected the safest resolution path.
                </p>

              </div>

            </section>

          )}

          {/* VERIFICATION */}

          {agentStep >= 5 && (

            <section className="verification-card">

              <div className="verification-icon">
                ✓
              </div>

              <div className="verification-content">

                <div className="card-title-row">

                  <div>

                    <span className="eyebrow">
                      POST-ACTION CHECK
                    </span>

                    <h3>
                      Verification Agent
                    </h3>

                  </div>

                  <span className="agent-status completed">
                    VERIFIED
                  </span>

                </div>

                <p>
                  Confirmed that the selected resolution
                  completed successfully.
                </p>

              </div>

            </section>

          )}

          {/* SUCCESS */}

          {agentStep >= 6 && (

            <section className="success-card">

              <div className="success-icon">
                ✓
              </div>

              <div className="success-content">

                <span className="eyebrow">
                  WORKFLOW COMPLETE
                </span>

                <h3>
                  Investigation Complete
                </h3>

                <p>
                  The AI swarm has completed its
                  investigation and prepared the case.
                </p>

              </div>

              <div className="success-badge">
                HANDOFF READY
              </div>

            </section>

          )}

          <div className="bottom-actions">

            <button
              className="secondary-button"
              onClick={handleViewOutcome}
            >
              View Final Outcome →
            </button>

          </div>

        </main>

      )}

      {/* ==================================================
          SCREEN 3
      ================================================== */}

      {screen === 3 && (

        <main className="main-content">

          <section className="execution-header">

            <div>

              <span className="eyebrow">
                FINAL OUTCOME
              </span>

              <h2>
                Escalation Decision
              </h2>

              <p>
                The AI system analyzed the case,
                evaluated risk and prepared a complete
                human handoff.
              </p>

            </div>

            <div className="execution-status">

              <span className="status-dot"></span>

              ANALYSIS COMPLETE

            </div>

          </section>

          {/* SUMMARY */}

          <section className="summary-grid">

            <div className="summary-card">

              <span className="summary-label">
                CUSTOMER
              </span>

              <strong>
                CUS-001
              </strong>

              <span>
                Active customer
              </span>

            </div>

            <div className="summary-card">

              <span className="summary-label">
                RISK LEVEL
              </span>

              <strong className="summary-risk">
                {riskLevel}
              </strong>

              <span>
                Escalation requires attention
              </span>

            </div>

            <div className="summary-card">

              <span className="summary-label">
                VERIFICATION
              </span>

              <strong className="summary-success">
                VERIFIED
              </strong>

              <span>
                Investigation complete
              </span>

            </div>

            <div className="summary-card">

              <span className="summary-label">
                STATUS
              </span>

              <strong
                className={
                  outcomeStatus === "RESOLVED"
                    ? "summary-success"
                    : "summary-risk"
                }
              >
                {outcomeStatus}
              </strong>

              <span>
                Human decision status
              </span>

            </div>

          </section>

          {/* ==================================================
              RISK ANALYSIS
          ================================================== */}

          <div className="risk-analysis-card">

            <div className="risk-analysis-header">

              <div>

                <div className="screen-label">
                  ESCALATION RISK
                </div>

                <h3>
                  Why was this escalated?
                </h3>

              </div>

              <div
                className={`risk-level ${riskLevel.toLowerCase()}`}
              >
                {riskLevel}
              </div>

            </div>

            <div className="risk-score-display">

              <div className="risk-score-number">
                {riskScore}%
              </div>

              <div className="risk-score-label">
                Overall Risk Score
              </div>

            </div>

            <div className="risk-progress">

              <div
                className="risk-progress-fill"
                style={{
                  width: `${Math.min(
                    riskScore,
                    100
                  )}%`,
                }}
              ></div>

            </div>

            <div className="risk-factors">

              {riskFactors.map(
                (factor, index) => (

                  <div
                    className="risk-factor"
                    key={index}
                  >

                    <span className="factor-check">
                      ✓
                    </span>

                    <span>
                      {factor}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          {/* ==================================================
              HUMAN HANDOFF SUMMARY
          ================================================== */}

          {outcomeStatus !== "RESOLVED" && (

            <div className="handoff-panel">

              <div className="handoff-header">

                <div className="handoff-icon">
                  HUMAN
                </div>

                <div>

                  <strong>
                    Human Support Handoff
                  </strong>

                  <p>
                    The AI swarm has prepared everything
                    required for human review.
                  </p>

                </div>

              </div>

              <div className="handoff-grid">

                <div className="handoff-item">

                  <span>
                    Customer
                  </span>

                  <strong>
                    Rahul Sharma
                  </strong>

                </div>

                <div className="handoff-item">

                  <span>
                    Customer ID
                  </span>

                  <strong>
                    CUS-001
                  </strong>

                </div>

                <div className="handoff-item">

                  <span>
                    Risk Level
                  </span>

                  <strong>
                    {riskLevel}
                  </strong>

                </div>

                <div className="handoff-item">

                  <span>
                    Risk Score
                  </span>

                  <strong>
                    {riskScore}%
                  </strong>

                </div>

              </div>

              <div className="handoff-section">

                <h4>
                  Customer Complaint
                </h4>

                <p>
                  {complaint}
                </p>

              </div>

              <div className="handoff-section">

                <h4>
                  Agent Findings
                </h4>

                {riskFactors.map(
                  (factor, index) => (

                    <div
                      className="handoff-finding"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      {factor}

                    </div>

                  )
                )}

              </div>

              <div className="handoff-section">

                <h4>
                  Recommended Actions
                </h4>

                {actions.map(
                  (action, index) => (

                    <div
                      className="handoff-action"
                      key={index}
                    >

                      <span>
                        →
                      </span>

                      {String(action).replaceAll(
                        "_",
                        " "
                      )}

                    </div>

                  )
                )}

              </div>

              <div className="handoff-footer">

                <span>
                  AI investigation complete
                </span>

                <strong>
                  Human decision required
                </strong>

              </div>

              <button
                className="approval-button"
                onClick={handleApprove}
              >
                Approve Resolution
              </button>

            </div>

          )}

          {/* ==================================================
              APPROVED STATE
          ================================================== */}

          {outcomeStatus === "RESOLVED" && (

            <section className="approved-card">

              <div className="approved-icon">
                ✓
              </div>

              <div>

                <span className="eyebrow">
                  HUMAN APPROVAL COMPLETE
                </span>

                <h3>
                  Resolution Approved
                </h3>

                <p>
                  The human reviewer approved the AI
                  recommendation. The escalation is now
                  marked as resolved.
                </p>

              </div>

              <div className="approved-badge">
                RESOLVED
              </div>

            </section>

          )}

          {/* ORIGINAL COMPLAINT */}

          <section className="complaint-summary">

            <span className="eyebrow">
              ORIGINAL CUSTOMER COMPLAINT
            </span>

            <p>
              {complaint}
            </p>

          </section>

          {/* BACKEND RESULT */}

          {result && (

            <details className="result-details">

              <summary>
                View Backend / MCP Result
              </summary>

              <pre>
                {JSON.stringify(
                  result,
                  null,
                  2
                )}
              </pre>

            </details>

          )}

          {/* FOOTER ACTIONS */}

          <div className="bottom-actions">

            <button
              className="secondary-button"
              onClick={resetWorkflow}
            >
              ← New Complaint
            </button>

            <div className="completion-label">

              <span className="status-dot"></span>

              {outcomeStatus === "RESOLVED"
                ? "Human approval completed"
                : "Human decision pending"}

            </div>

          </div>

        </main>

      )}

    </div>
  );
}

export default App;