import { Router } from "express";
import { createPayment } from "../controller/payment.controller";
import { createUser } from "../controller/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { getHistory } from "../controller/history.controller";
import { getAnalytics } from "../controller/analytics.controller";

const router = Router();

/**
 * @swagger
 * /api/payments/create-user:
 *   post:
 *     summary: Create a new user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "user@example.com"
 *     responses:
 *       201:
 *         description: User created successfully with JWT token
 *       400:
 *         description: Invalid input
 */

router.post("/create-user", createUser);

/**
 * @swagger
 * /api/payments/create-payment:
 *   post:
 *     summary: Create a Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 50000
 *             idempotencyKey: "payment-001"
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *       401:
 *         description: Unauthorized (Missing or invalid token)
 */
router.post("/create-payment", authenticateToken, createPayment);

/**
 * @swagger
 * /api/payments/history:
 *   get:
 *     summary: Get transaction history of the logged-in user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
router.get("/history", authenticateToken, getHistory);

/**
 * @swagger
 * /api/payments/analytics:
 *   get:
 *     summary: Get payment analytics for the logged-in user
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment analytics data
 *       401:
 *         description: Unauthorized
 */
router.get("/analytics", authenticateToken, getAnalytics);

export default router;
