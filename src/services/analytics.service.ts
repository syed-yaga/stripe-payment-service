import { prisma } from "../config/prisma";

export async function getPaymentAnalytics(userId: string) {
  const totalTransactions = await prisma.payment.count({
    where: { userId },
  });

  const successfulPayments = await prisma.payment.count({
    where: {
      userId,
      status: "succeeded",
    },
  });

  const failedPayments = await prisma.payment.count({
    where: {
      userId,
      status: "failed",
    },
  });

  const refundedPayments = await prisma.payment.count({
    where: {
      userId,
      refundStatus: "succeeded",
    },
  });

  const revenueResult = await prisma.payment.aggregate({
    where: {
      userId,
      status: "succeeded",
    },
    _sum: {
      amount: true,
    },
  });

  const refundResult = await prisma.payment.aggregate({
    where: {
      userId,
      refundStatus: "succeeded",
    },
    _sum: {
      amount: true,
    },
  });

  return {
    totalTransactions,
    successfulPayments,
    failedPayments,
    refundedPayments,
    totalRevenue: revenueResult._sum.amount || 0,
    totalRefunded: refundResult._sum.amount || 0,
  };
}
