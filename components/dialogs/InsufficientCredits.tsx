"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BadgeIndianRupeeIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const InsufficientCredits = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="!rounded-3xl">
        <AlertDialogHeader>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-dark-400">Insufficient Credits</p>
            <AlertDialogCancel
              className="border-0 p-0 hover:bg-transparent text-dark-400"
              onClick={() => router.push("/profile")}
            >
              <BadgeIndianRupeeIcon size={24} />
            </AlertDialogCancel>
          </div>

          <Image
            src="/stacked-coins.png"
            alt="credit coins"
            width={462}
            height={122}
          />

          <AlertDialogTitle className="text-2xl font-bold text-dark-600">
            Oops.... Looks like you&#39;ve ran out of free credits!
          </AlertDialogTitle>

          <AlertDialogDescription className="py-3">
            No worries, though - you can keep enjoying our services by grabbing
            more credits.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="rounded-2xl py-4 px-6 h-12 md:h-14 font-semibold w-full bg-claret-100 text-dark-600"
            onClick={() => router.push("/profile")}
          >
            No, Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gradient-to-r from-claret-500 to-flamingo-500 rounded-2xl py-4 px-6 h-12 md:h-14 font-semibold w-full bg-cover"
            onClick={() => router.push("/credits")}
          >
            Yes, Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InsufficientCredits;
