import React from "react";
import { redirect } from "next/navigation";
import { SignedIn, auth } from "@clerk/nextjs";
import { CheckCircleIcon, XCircle, ZapIcon } from "lucide-react";

import { plans } from "@/constants";
import { getUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import Header from "@/components/miscellaneous/Header";
import Checkout from "@/components/forms/Checkout";

const CreditsPage = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUser(userId);
  if (!user) redirect("/");

  return (
    <div>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="w-full rounded-2xl border-2 border-claret-200/20 bg-white p-8 shadow-xl shadow-claret-200/20 lg:max-w-none"
            >
              <div className="flex justify-center items-center flex-col gap-3">
                <ZapIcon
                  size={64}
                  className="text-claret-500 bg-claret-100 rounded-full p-2 border-8 border-claret-200"
                />
                <p className="text-xl font-semibold mt-2 text-claret-500">
                  {plan.name}
                </p>
                <p className="text-4xl font-semibold sm:text-[44px] text-gray-600">
                  &#x20B9;{plan.price.toLocaleString("en-IN")}
                </p>
                <p>{plan.credits.toLocaleString("en-IN")} Credits</p>
              </div>

              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    {inclusion.isIncluded ? (
                      <CheckCircleIcon
                        size={24}
                        className="text-green-800 bg-green-100 rounded-full"
                      />
                    ) : (
                      <XCircle
                        size={24}
                        className="text-red-800 bg-red-100 rounded-full"
                      />
                    )}
                    <p>{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button
                  variant="outline"
                  className="w-full rounded-2xl bg-claret-100 bg-cover text-claret-500 hover:text-claret-500"
                >
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    userId={user._id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CreditsPage;
