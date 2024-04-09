"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { navLinks, userNavLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import Logo from "@/components/miscellaneous/Logo";
import NavLink from "@/components/miscellaneous/NavLink";

const Sidebar = () => {
  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-claret-200/50 lg:flex">
      <div className="flex size-full flex-col gap-6">
        <Logo />

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <div className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}
            </div>

            <div className="hidden w-full flex-col items-start gap-2 md:flex">
              {userNavLinks.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}
              <div className="flex items-center justify-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <Button
              asChild
              className="py-4 px-6 flex-center gap-3 rounded-full font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
