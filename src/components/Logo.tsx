import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center justify-center">
      <Image src={"/brand.png"} alt="Logo" height={50} width={50} />
      <h1 className="text-2xl font-bold dark:text-white">ClarityAI</h1>
    </Link>
  );
};

export default Logo;
