"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[320px] w-full">
      {/* Background Image */}
      <Image
        src="/images/city.png"
        alt="City"
        fill
        className="object-cover brightness-40"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        {/* Breadcrumbs */}
        <div className="absolute top-12 flex items-center text-base text-gray-200 space-x-1">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/data" className="hover:text-white transition">
            Explore
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#00BFA6] font-medium">PG's / Hostel</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl font-bold w-2xl">
          Find Hostels, PGs & OYO Rooms in Mumbai
        </h1>
        <p className="mt-2 text-base">
          Verified stays, flexible booking — for students & professionals
        </p>
      </div>
    </div>
  );
};

export default Hero;
