import { Request, Response } from "express";
import { createPaymentIntent } from "../services/payment.service";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createPayment(req: AuthRequest, res: Response) {
  try {
    const { amount, idempotencyKey } = req.body;

    const userId = req.user?.userId as string;

    const result = await createPaymentIntent(amount, userId, idempotencyKey);

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
