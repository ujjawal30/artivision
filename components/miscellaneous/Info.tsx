"use client";

import React from "react";

interface InfoProps {
  title: string;
  text: string;
  optional?: boolean;
}

const Info = ({ title, text, optional = false }: InfoProps) => {
  return (
    <div className="flex items-center gap-2">
      {optional && <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>}
      <div className="text-sm font-medium flex gap-2 ">
        <p className="text-dark-600">{title}:</p>
        <p className=" capitalize text-claret-400">{text}</p>
      </div>
    </div>
  );
};

export default Info;
