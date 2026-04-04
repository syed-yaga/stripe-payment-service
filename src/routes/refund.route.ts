import { Router } from "express";

import { refundPayment } from "../controller/refund.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/payments/refund:
 *   post:
 *     summary: Refund a successful payment
 *     description: Initiates a refund for a previously successful Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             paymentId: "your-db-id"
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       400:
 *         description: Invalid request or payment not refundable
 *       401:
 *         description: Unauthorized (Missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.post("/refund", authenticateToken, refundPayment);

export default router;
