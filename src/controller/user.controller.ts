import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { generateToken } from "../utils/jwt";

export async function createUser(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
      },
    });

    const token = generateToken(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
