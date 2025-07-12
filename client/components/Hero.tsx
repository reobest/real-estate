"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFilters } from "../state";
const Hero = () => {
    const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLocationSearch = async () => {
    try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmedQuery
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lat, lng],
          })
        );
        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng,
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };
  return (
    <div className="w-full relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="landing page"
        fill
        className="w-full h-full object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{opacity:1,y:0}}
        transition={{duration:1}}
        className="w-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="max-w-5xl mx-auto px-16 sm:px-12 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-center  mb-4">
            Start your journy to finding the perfect place to call home
          </h1>
          <p className="text-xl text-white/80 text-center mb-8">
            Explore our wide range of rental properties tailored to fit your
            life style and needs
          </p>
        </div>
        <div className="flex justify-center">
          <Input
            type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, neighborhood or address"
            className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
          />
          <Button
            onClick={handleLocationSearch}
            className="bg-rose-500 text-white rounded-none rounded-r-xl border-none hover:bg-rose-300 h-12"
          >
            Search
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
