import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { headingArray,buttonArray,DescriptionArray } from "../lib/constants";
const Features = () => {

  return (
    <div className="w-full px-8 py-12">
      <div className="px-4 flex justify-center">
        <h4 className="text-3xl font-semibold text-center">
          Quickly find the home you want using our effective search filters
        </h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 mt-14 place-items-center">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index} className="flex flex-col items-center w-[250px]">
              <Image
                width={250}
                height={250}
                src={`/landing-search${index + 1}.png`}
                alt="features-image"
              />
              <div className="flex flex-col items-center gap-2 mt-3">
                <h3 className="text-lg text-black text-center font-semibold">{headingArray[index]}</h3>
                <p className="text-sm text-black/80 text-center">
                 {DescriptionArray[index]}
                </p>
                <Link href={`/${buttonArray[index]}`}>
                  <Button className="bg-white text-black border border-black hover:text-white cursor-pointer px-6 py-3">{buttonArray[index]}</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
