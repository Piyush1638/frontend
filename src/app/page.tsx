"use client";
import Image from "next/image";
import React from "react";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";
import Logo from "@/components/Logo";

const page = () => {
  return (
    <main className="min-h-screen w-full bg-[url(/white_theme.jpg)] dark:bg-[url(/dark3.png)] bg-center bg-no-repeat bg-cover">
      <div className="w-full flex justify-between p-4 sm:p-6">
        <Logo />
        <ThemeToggler />
      </div>

      {/* Hero Section */}
      <div className="w-full min-h-screen px-4 sm:px-6 md:px-10 py-8 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold dark:text-white leading-tight">
              AI Powered-Robust
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold dark:text-white leading-tight">
              Human Detection
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-lg dark:text-gray-300">
            Upload an image and let our AI model detect humans in seconds. Fast,
            reliable, and privacy-focused.
          </p>
          <Link
            href="/detection"
            className="bg-green-600 font-semibold text-lg sm:text-xl hover:bg-green-700 text-white rounded-xl w-fit px-6 py-3"
          >
            Try Now
          </Link>
        </div>

        {/* Right Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-1/2">
          <Image
            src="/thumbnail_2.png"
            alt="hero"
            height={500}
            width={300}
            className="rounded-3xl w-full h-auto object-cover"
          />
          <Image
            src="/thumbnail.png"
            alt="thumbnail"
            height={300}
            width={300}
            className="rounded-3xl w-full h-auto object-cover"
          />

          <div className="sm:col-span-2 w-full flex justify-center sm:justify-end pt-4 sm:pt-10">
            <Image
              src="/thumbnail_img.png"
              alt="hero"
              height={500}
              width={300}
              className="rounded-3xl w-full sm:w-2/3 h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
