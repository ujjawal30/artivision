"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { createCheckout } from "@/lib/actions/transaction.actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface CheckoutProps {
  plan: string;
  amount: number;
  credits: number;
  userId: string;
}

const Checkout = ({ plan, amount, credits, userId }: CheckoutProps) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "bg-green-100 text-green-900",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "bg-red-100 text-red-900",
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction: CheckoutTransactionParams = {
      plan,
      amount,
      credits,
      userId,
    };

    await createCheckout(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-2xl bg-gradient-to-r from-claret-500 to-flamingo-500"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
