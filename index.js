import express from "express";

const app = express();
app.use(express.json());

app.post("/mock/agent/check-error", (req, res) => {
  const { error_code } = req.body;

  if (error_code === "PAYMENT_FAILED") {
    return res.json({
      found: true,
      reason: "BANK_REJECT",
      solution: "Please check your card limit and try again.",
      can_retry: true
    });
  }

  if (error_code === "APP_CRASH") {
    return res.json({
      found: true,
      reason: "APP_ERROR",
      solution: "Please update the app to the latest version.",
      can_retry: false
    });
  }

  return res.json({ found: false });
});

app.post("/mock/agent/get-user-status", (req, res) => {
  res.json({ status: "active" });
});

app.post("/mock/agent/check-transaction", (req, res) => {
  res.json({
    transaction_status: "failed",
    reason: "insufficient_funds"
  });
});

app.post("/mock/agent/create-ticket", (req, res) => {
  const { user_id, issue_type, description, priority } = req.body;

  res.json({
    ticket_id: "TICKET-" + Math.floor(Math.random() * 100000),
    status: "created",
    assigned_team: "support",
    priority: priority || "medium"
  });
});

app.listen(3000, () => {
  console.log("Mock API running on port 3000");
});
