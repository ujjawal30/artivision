import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { createTransaction } from "@/lib/actions/transaction.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

  if (!WEBHOOK_SECRET)
    return new NextResponse(
      "[STRIPE_WEBHOOK_ERROR]: Please define the STRIPE_WEBHOOK_SECRET_KEY environment variable inside .env.local",
      { status: 500 }
    );

  const signature = headers().get("Stripe-Signature") as string;
  if (!signature)
    return new NextResponse(
      "[STRIPE_WEBHOOK_ERROR]: Stripe signature headers not found!!!",
      { status: 400 }
    );

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
  } catch (error: any) {
    return new NextResponse(
      "[STRIPE_WEBHOOK_ERROR]: Error verifying signature",
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type == "checkout.session.completed") {
    const { id, amount_total, metadata } = session;

    const transaction: CreateTransactionParams = {
      stripeId: id,
      amount: amount_total ? amount_total / 100 : 0,
      plan: metadata?.plan || "",
      credits: Number(metadata?.credits) || 0,
      user: metadata?.user || "",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);
    if (!newTransaction) {
      return new NextResponse(
        "[STRIPE_WEBHOOK_ERROR]: Transaction not created",
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "OK", transaction: newTransaction });
  }

  return new NextResponse(null, { status: 200 });
}
