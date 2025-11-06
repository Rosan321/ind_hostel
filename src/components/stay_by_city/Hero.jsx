"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CircleCheck } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-full">
      <Image
        src="/images/city.png"
        alt="City"
        fill
        className="object-cover brightness-[.40]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">

        {/* breadcrumbs */}
        <div className="absolute top-8 sm:top-12 flex items-center text-xs sm:text-base text-gray-200 space-x-1">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          <Link href="/data" className="hover:text-white transition">
            Explore
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-[#00BFA6] font-medium">PG's / Hostel</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-6 sm:mt-0 text-center lg:text-left">

          <section className="max-w-[700px]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Find Hostels, PGs & Hotels Rooms in Mumbai
            </h1>
            <p className="mt-2 text-sm sm:text-base">
              Verified stays, flexible booking — for students & professionals
            </p>
          </section>

          <section className="flex items-center gap-2 bg-[#00BFA6] px-5 py-2 rounded-full w-fit">
            <CircleCheck className="w-5 h-5" />
            <p className="text-sm sm:text-base font-medium">Verified</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Hero;
