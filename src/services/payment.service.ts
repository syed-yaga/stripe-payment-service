import { stripe } from "../config/stripe";
import { prisma } from "../config/prisma";
import { randomUUID } from "crypto";

export const createPaymentIntent = async (
  amount: number,
  userId: string,
  idempotencyKey: string,
) => {
  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      currency: "inr",

      automatic_payment_methods: {
        enabled: true,
      },
    },
    {
      idempotencyKey,
    },
  );

  const payment = await prisma.payment.create({
    data: {
      amount,
      currency: "inr",
      status: paymentIntent.status,
      stripePaymentId: paymentIntent.id,
      userId,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment.id,
    idempotencyKey,
  };
};
