import { prisma } from "../config/prisma";

export async function getTransactionHistory(
  userId: string,
  page: number = 1,
  limit: number = 10,
) {
  return prisma.payment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}
