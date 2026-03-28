import { stripe } from "../config/stripe";
import { prisma } from "../config/prisma";
import { ref } from "node:process";

export async function createRefund(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const refund = await stripe.refunds.create({
    payment_intent: payment.stripePaymentId,
  });

  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      refundStatus: refund.status,
    },
  });

  return refund;
}
