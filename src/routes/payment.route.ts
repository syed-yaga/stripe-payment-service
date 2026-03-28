import { Router } from "express";
import { createPayment } from "../controller/payment.controller";
import { createUser } from "../controller/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { getHistory } from "../controller/history.controller";
import { getAnalytics } from "../controller/analytics.controller";

const router = Router();

router.post("/create-payment", authenticateToken, createPayment);
router.post("/create-user", createUser);
router.get("/history", authenticateToken, getHistory);
router.get("/analytics", authenticateToken, getAnalytics);

export default router;
