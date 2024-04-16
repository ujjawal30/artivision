"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

import { connectToDatabase } from "@/lib/mongoose";
import Transaction, { ITransaction } from "@/lib/models/transaction.model";
import { updateCredits } from "@/lib/actions/user.actions";
import { handleError } from "@/lib/utils";

export const createCheckout = async (
  transaction: CheckoutTransactionParams
): Promise<void> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "INR",
          product_data: {
            name: transaction.plan,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      user: transaction.userId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
  });

  redirect(session.url!);
};

export const createTransaction = async (
  transaction: CreateTransactionParams
): Promise<ITransaction | undefined> => {
  try {
    await connectToDatabase();

    const newTransaction = await Transaction.create(transaction);

    await updateCredits(transaction.userId, transaction.credits);

    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    handleError(error);
  }
};
