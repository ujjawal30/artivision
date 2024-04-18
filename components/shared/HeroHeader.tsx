"use client";

import React from "react";
import Link from "next/link";

import { navLinks } from "@/constants";
import { fetchIcon } from "@/constants/icons";

const HeroHeader = () => {
  return (
    <section className="bg-gradient-to-br from-claret-500 to-flamingo-500 sm:flex items-center justify-center hidden h-72 flex-col gap-8 rounded-2xl p-10">
      <h1 className="text-[40px] font-semibold flex-wrap text-center text-white shadow-sm">
        Unleash your creativity with Artivision
      </h1>
      <ul className="flex items-center justify-center w-full gap-16">
        {navLinks.slice(1, 5).map((link) => {
          const Icon = fetchIcon(link.icon);
          return (
            <Link
              key={link.label}
              href={link.route}
              className="flex items-center justify-center flex-col gap-2"
            >
              <li className="flex justify-center items-center rounded-full bg-white p-4">
                <Icon size={24} className="text-gray-600" />
              </li>
              <p className="font-medium text-center text-white">{link.label}</p>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default HeroHeader;
