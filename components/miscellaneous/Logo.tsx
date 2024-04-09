import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 md:py-2">
      <Image src="/logo.png" alt="logo" width={40} height={40} />
      <h1 className="font-bold text-3xl bg-gradient-to-r from-claret-500 to-flamingo-500 bg-cover bg-clip-text text-transparent">
        ArtiVision
      </h1>
    </Link>
  );
};

export default Logo;
