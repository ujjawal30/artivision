"use client";

import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-dark-600">{title}</h2>
      {subtitle && <p className="mt-4">{subtitle}</p>}
    </div>
  );
};

export default Header;
