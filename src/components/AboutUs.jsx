"use client";

import { dotsSix } from "@/lib/utils/svgS";
import { Building2, CircleCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="lg:py-12 lg:pt-12 xl:py-24 px-4 sm:px-8 lg:px-20 bg-gray-100">
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-6 py-8 lg:py-12 max-w-7xl">
            {/* Heading Section */}
            <div className="space-y-4">
              <h2 className="text-base lg:text-lg font-semibold text-[#00BFA6] tracking-wide">
                ABOUT US
              </h2>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-snug">
                Making Stays Simpler, Safer, and Smarter
              </h3>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                At NIO Hostel, we bring together verified hostels, PGs, and OYO
                rooms on one seamless platform. Our mission is to make finding
                the right stay simple — whether you're a student searching for a
                budget-friendly PG, a traveler looking for a hostel, or a
                professional booking an OYO for work. Every property listed is
                verified for safety, affordability, and comfort, so you can book
                with confidence.
              </p>
            </div>

            <Link
              href="/about"
              className="bg-[#F1FF51] hover:bg-[#dde953] px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="relative flex flex-col items-center lg:items-end gap-6">
            {/* DotsSix - only visible on lg and above */}
            <section className="hidden sm:block absolute top-0 left-0 lg:-top-8 lg:-left-8">
              {dotsSix}
            </section>

            {/* Image */}
            <Image
              src="/images/abt.png"
              alt="About image"
              width={500}
              height={500}
              className="w-full sm:w-3/4 lg:w-4/5 h-auto lg:h-[620px] object-cover rounded-lg"
            />

            {/* Stats Card */}
            <div className="absolute bottom-0 xl:right-3/9 flex flex-col text-center gap-4 text-white bg-[#1A1A1A] w-56 p-6"></div>
            <div
              className="
    flex flex-col items-center text-center gap-6 text-white bg-[#1A1A1A]
    w-3/4 md:w-2/3 lg:w-56 p-6 rounded-lg
    shadow-lg transition-all duration-300
    relative lg:absolute lg:bottom-[-48] lg:right-52 xl:bottom-[-80] xl:right-96
  "
            >
              {/* 1 */}
              <section className="flex flex-col items-center gap-3">
                <CircleCheck className="text-white w-5 h-5" />
                <h6 className="text-xs sm:text-sm font-semibold">
                  50K+ Verified Stays
                </h6>
              </section>

              {/* 2 */}
              <section className="flex flex-col items-center gap-3">
                <ShieldCheck className="text-white w-5 h-5" />
                <h6 className="text-xs sm:text-sm font-semibold">
                  Trusted by 20K+ Students & Travelers
                </h6>
              </section>

              {/* 3 */}
              <section className="flex flex-col items-center gap-3">
                <Building2 className="text-white w-5 h-5" />
                <h6 className="text-xs sm:text-sm font-semibold">
                  Serving 100+ Cities in India
                </h6>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
