import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full bg-claret-100">
      {children}
    </main>
  );
};

export default AuthLayout;
