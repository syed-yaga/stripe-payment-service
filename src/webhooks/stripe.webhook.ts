import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { prisma } from "../config/prisma";
import Stripe from "stripe";

export async function stripeWebhookHandler(req: Request, res: Response) {
  console.log("🔥 Webhook received!");
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (error: any) {
    console.log("Webhook signature verification failed.", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const payment = await prisma.payment.findUnique({
      where: { stripePaymentId: paymentIntent.id },
    });

    if (!payment) {
      console.log("Payment not found in DB:", paymentIntent.id);
      return res.json({ received: true });
    }

    await prisma.payment.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "succeeded" },
    });

    console.log("Payment succeeded:", paymentIntent.id);
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    await prisma.payment.update({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "failed" },
    });

    console.log("Payment failed:", paymentIntent.id);
  }

  res.json({ received: true });
}
