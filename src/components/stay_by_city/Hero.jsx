"use client";

import Link from "next/link";
import { ChevronRight, CircleCheck, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";
import RevealOnScroll from "../animations/RevealOnScroll";

const Hero = ({ name, location, verify, paramsObj }) => {
  const pathname = usePathname();
  const isStay = pathname.startsWith("/stay");

  const stayName = `${name}, ${location}`;

  return (
    <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-full">
      <img
        src={
          pathname === "/location"
            ? "/images/city.png"
            : pathname === "/about"
            ? "/images/abt1.png"
            : isStay
            ? "/images/stay.png"
            : ""
        }
        alt="City"
        className="object-cover brightness-[.40] w-full h-80 sm:h-96 lg:h-[420px]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        {/* ✔ Breadcrumbs */}
        <div className="absolute top-8 sm:top-12 flex items-center text-xs sm:text-base text-gray-200 space-x-1">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>

          {/* Only for location page */}
          {pathname === "/about" && (
            <>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <Link href="/data" className="hover:text-white transition">
                About
              </Link>
            </>
          )}

          {/* Only for location page */}
          {pathname === "/location" && (
            <>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              {/* <Link href="/data" className="hover:text-white transition"> */}
                Location
              {/* </Link> */}
            </>
          )}

          {/* Stay Page Breadcrumbs */}
          {isStay && (
            <>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hover:text-white transition">
                {location ? location : ""}
              </span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-[#B0B3C6] font-medium">{stayName}</span>
            </>
          )}
        </div>

        {/* ✔ Main Text Section */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-6 sm:mt-0 text-center lg:text-left">
          <RevealOnScroll delay={0.4}>
            <section className="max-w-[700px] flex flex-col justify-center items-center sm:gap-4 lg:gap-0">
              {/* Headings */}
              <h1 className="text-2xl sm:text-[40px] lg:5xl font-bold text-center">
                {pathname === "/location" &&
                  `Find ${paramsObj?.type || "stays"} in ${paramsObj?.city || "your city"}`
}
                {pathname === "/about" &&
                  "We make city stays simple for students, professionals & travelers"}
                {isStay && (
                  <div className="flex items-center">
                    <p>{name ? name.charAt(0).toUpperCase() + name.slice(1) : "Name"},</p>
                    <p>{location ? location.charAt(0).toUpperCase() + location.slice(1) : "Name"}</p>
                  </div>
                )}
              </h1>

              {/* Subtext */}
              <p className="mt-2 text-sm lg:text-base">
                {pathname === "/location" &&
                  "Verified stays, flexible booking — for students & professionals"}

                {pathname === "/about" &&
                  "Discover verified Hostels, budget PGs and Hotels rooms — all in one place"}

                {isStay &&
                  "Affordable, safe & modern living spaces for students and professionals"}
              </p>

              {/* {pathname === "/about" && (
                <Link href="/data" className="bg-[#0D0BA8] text-white px-6 py-3 rounded-full font-semibold mt-2 sm:mt-0">
                  Explore Stays
                </Link>
              )} */}
            </section>
          </RevealOnScroll>

          {/* ✔ Right-side Verified Badge for Stay Page */}
          <ShuffleInOnScroll delay={0.5}>
            {isStay && (
              <section className="flex items-center gap-2 bg-[#44475A] px-5 py-2 rounded-full w-fit backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <p className="text-sm sm:text-base font-medium text-white">
                  Verified Stay
                </p>
              </section>
            )}
          </ShuffleInOnScroll>
            {/* {pathname === "/location" && (
              <section className="flex items-center gap-2 bg-[#00BFA6] px-5 py-2 rounded-full w-fit">
                <CircleCheck className="w-5 h-5" />
                <p className="text-sm sm:text-base font-medium">Verified</p>
              </section>
            )}
          </ShuffleInOnScroll> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
