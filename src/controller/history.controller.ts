import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getTransactionHistory } from "../services/history.service";

export async function getHistory(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId as string;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const history = await getTransactionHistory(userId, page, limit);

    return res.status(200).json({
      count: history.length,
      transactions: history,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
