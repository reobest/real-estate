"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <div className="relative w-full flex flex-col gap-10 items-center mt-40 md:py-32 ">
      <div className="absolute z-30 inset-0 bg-black/50"></div>
      <Image
        src="/landing-call-to-action.jpg"
        alt="call to action page"
        fill
        className="w-full h-full object-cover object-center"
        priority
      />
      <h1 className="relative z-40 text-3xl font-bold text-white">
        Find your drem rental property
      </h1>
      <div className="relative z-50 flex flex-col items-center gap-4 text-white">
        <h3 className="text-base font-normal text-white/90">
          Discover a wide range of rental properties in your desirded location
        </h3>
        <div className="flex items-center gap-3">
         <Link href="/search"><button className="bg-white h-10 text-black w-32 rounded-md cursor-pointer focus:bg-white/60" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>Search</button></Link> 
          <Link href="/signup"><button className="bg-rose-500 text-white h-10 w-32 rounded-md cursor-pointer">Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
