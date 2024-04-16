import React, { ReactNode } from "react";

import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white lg:flex-row">
      <Sidebar />
      <MobileNav />

      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-10 w-full leading-snug">
          {children}
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
