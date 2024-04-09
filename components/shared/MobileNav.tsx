"use client";

import React, { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";

import { navLinks, userNavLinks } from "@/constants";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Logo from "@/components/miscellaneous/Logo";
import NavLink from "@/components/miscellaneous/NavLink";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center fixed w-full border-b-4 border-claret-100 bg-white p-5 lg:hidden">
      <Logo />

      <nav className="flex gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <MenuIcon size={32} />
            </SheetTrigger>
            <SheetContent className="w-72 sm:w-64 flex flex-col gap-6">
              <Logo />

              <nav className="h-full flex flex-col justify-between gap-4">
                <div className="flex w-full flex-col items-start gap-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      {...link}
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  ))}
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  {userNavLinks.map((link) => (
                    <NavLink key={link.label} {...link} />
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
};

export default MobileNav;
