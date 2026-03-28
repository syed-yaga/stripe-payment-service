import { Request, Response } from "express";
import { createRefund } from "../services/refund.service";

export async function refundPayment(req: Request, res: Response) {
  try {
    const { paymentId } = req.body;

    const refund = await createRefund(paymentId);

    return res.status(200).json(refund);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
