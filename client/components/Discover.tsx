import Image from "next/image";
import React from "react";

const Discover = () => {
  const discoverHeading = [
    "Search for properties",
    "Book your rental",
    "Enjoy your new home",
  ];
  const discoverDescription = [
    "Browse through our extensive collection of rental properties in your desired location",
    "once you have found the perfect property,easily book it online with just a few clicks",
    "Move into your new rental property and start enjoying your dream home",
  ];
  return (
    <div className="w-full flex flex-col items-center gap-1">
      <h1 className="text-5xl font-bold">Discover</h1>
      <h3 className="text-2xl font-semibold">
        Find Your Dream rental property today
      </h3>
      <p className="text-xs font-medium text-black/70 text-center">
        Seraching for your dream prperty has never been esear.With our user
        friendly search feature you can <br />
        quickly find your perfect home that meet all your needs.Start your
        search today and discover your dream rental <br /> property.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mt-24 place-items-center py-3">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div key={index} className="h-full flex flex-col items-center w-[250px] shadow-md shadow-black/40 py-5">
              <Image
                width={250}
                height={250}
                src={`/landing-icon${index + 1}.png`}
                alt="discover-image"
                className="bg-black w-10 h-10 rounded-full p-2"
              />
              <div className="flex flex-col items-center gap-2 mt-3">
                <h3 className="text-lg text-black text-center font-semibold">
                  {discoverHeading[index]}
                </h3>
                <p className="text-xs text-black/80 text-center max-w-48">
                  {discoverDescription[index]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
