"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink as NavLinkProps } from "@/constants";
import { cn } from "@/lib/utils";

interface INavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const NavLink = ({ label, route, icon: Icon, onClick }: INavLinkProps) => {
  const pathname = usePathname();

  const isActive = route === pathname;

  return (
    <div
      key={route}
      onClick={onClick}
      className={cn(
        "flex justify-center items-center font-semibold w-full whitespace-nowrap rounded-2xl bg-cover transition-all hover:bg-claret-100 hover:shadow-inner",
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
