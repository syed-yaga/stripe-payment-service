import express from "express";
import dotenv from "dotenv";
import paymentRoute from "./routes/payment.route";
import refundRoute from "./routes/refund.route";
import { stripeWebhookHandler } from "./webhooks/stripe.webhook";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

export const app = express();

app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stripe Payment API",
      version: "1.0.0",
      description:
        "Payment microservice with Stripe integration, webhooks, refunds, and analytics",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://stripe-payment-service-net0.onrender.com"
            : "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler,
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/payments", paymentRoute);
app.use("/api/payments", refundRoute);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

if (require.main === module) {
  const PORT = Number(process.env.PORT) || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
