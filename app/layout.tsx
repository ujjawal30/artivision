import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "ArtiVision",
  description: "AI-powered art creation platform",
};

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#7b1c44" },
      }}
    >
      <html lang="en">
        <body className={cn("antialiased", inter.className)}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
