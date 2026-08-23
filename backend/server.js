import express from "express";
import cors from "cors";
import orchestrator from "./orchestrator.js";

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Customer Escalation Autopilot"
  });
});

// Main resolution API
app.post("/api/resolve", async (req, res) => {
  try {
    const { customerId, complaint } = req.body;

    // Validate request
    if (!customerId) {
      return res.status(400).json({
        success: false,
        error: "customerId is required"
      });
    }

    if (!complaint) {
      return res.status(400).json({
        success: false,
        error: "complaint is required"
      });
    }

    console.log("\n=================================");
    console.log("NEW CUSTOMER COMPLAINT");
    console.log("=================================");

    console.log("Customer:", customerId);
    console.log("Complaint:", complaint);

    // Run complete agent workflow
    const result = await orchestrator(
      customerId,
      complaint
    );

    // Send result to frontend
    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Workflow Error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to process customer complaint",
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("\n=================================");
  console.log("CUSTOMER ESCALATION AUTOPILOT");
  console.log("=================================");
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("API: POST /api/resolve");
  console.log("=================================\n");
});