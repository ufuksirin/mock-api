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

app.post("/mock/agent/create-ticket", express.json(), (req, res) => {
  const {
    user_id,
    issue_type,
    description,
    priority = "medium",
    language = "en"
  } = req.body;

  console.log("Create ticket:", {
    user_id,
    issue_type,
    priority
  });

  res.json({
    ticket_id: "TICKET-" + Math.floor(10000 + Math.random() * 90000),
    status: "created",
    assigned_team: "support",
    priority,
    message:
      language === "tr"
        ? "Destek talebiniz oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz."
        : "Your support ticket has been created. Our support team will contact you shortly."
  });
});

app.post("/mock/agent/get-user-profile-by-phone", (req, res) => {
  const { phone_number } = req.body;

  // MOCK USER DATABASE
  const users = {
    "+905551112233": {
      first_name: "Canan",
      last_name: "Şirin",
      gender: "female",
      email: "canan.sisirn@gmail.com",
      preferred_language: "tr"
    },
    "+905551119999": {
      first_name: "Ufuk",
      last_name: "Şirin",
      gender: "male",
      email: "usirin@gmail.com",
      preferred_language: "tr"
    }
  };

  const user = users[phone_number];

  if (!user) {
    return res.json({
      user_found: false,
      gender: "unknown"
    });
  }

  res.json({
    user_found: true,
    first_name: user.first_name,
    last_name: user.last_name,
    gender: user.gender,
    email: user.email,
    preferred_language: user.preferred_language
  });
});


app.listen(3000, () => {
  console.log("Mock API running on port 3000");
});
