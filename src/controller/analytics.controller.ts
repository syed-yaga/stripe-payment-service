import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getPaymentAnalytics } from "../services/analytics.service";

export async function getAnalytics(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId as string;

    const analytics = await getPaymentAnalytics(userId);

    return res.status(200).json(analytics);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
