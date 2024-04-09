"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink as NavLinkProps } from "@/types";
import { cn } from "@/lib/utils";

const NavLink = ({ label, route, icon: Icon }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = route === pathname;

  return (
    <div
      key={route}
      className={cn(
        "flex justify-center items-center font-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-claret-100 hover:shadow-inner",
        isActive
          ? "bg-gradient-to-r from-claret-500 to-flamingo-500 text-white"
          : "text-gray-700"
      )}
    >
      <Link className="flex size-full gap-4 p-4 font-semibold" href={route}>
        <Icon size={24} />
        {label}
      </Link>
    </div>
  );
};

export default NavLink;
