import { Router } from "express";
import { createPayment } from "../controller/payment.controller";
import { createUser } from "../controller/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-payment", authenticateToken, createPayment);
router.post("/create-user", createUser);

export default router;
