import { Router } from "express";

import { refundPayment } from "../controller/refund.controller";

const router = Router();

router.post("/refund", refundPayment);

export default router;
