import express from "express";
import dotenv from "dotenv";
import paymentRoute from "./routes/payment.route";
import refundRoute from "./routes/refund.route";
import { stripeWebhookHandler } from "./webhooks/stripe.webhook";

dotenv.config();

const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler,
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.use("/api/payments", paymentRoute);
app.use("/api/payments", refundRoute);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
