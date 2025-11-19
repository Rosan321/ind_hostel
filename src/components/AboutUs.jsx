"use client";

import { dotsSix } from "@/lib/utils/svgS";
import { Building2, CircleCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "./animations/RevealOnScroll";

const AboutUs = () => {
  return (
    <div className="lg:py-12 xl:py-24 px-4 sm:px-8 lg:px-20 bg-gray-100">
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-18 xl:gap-4 items-center justify-center mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-6 py-8 lg:py-12 max-w-7xl">
            {/* Heading Section */}
            <RevealOnScroll delay={0}>
              <div className="space-y-4">
                <h2 className="text-base lg:text-lg font-semibold text-[#44475A] tracking-wide">
                  ABOUT US
                </h2>

                <h3 className="text-[28px] sm:text-[32px] lg:text-[40px] font-bold text-[#1A1A1A] leading-snug">
                  Making Stays Simpler, Safer, and Smarter
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  At IND Hostel, we bring together verified hostels, PGs, and OYO
                  rooms on one seamless platform. Our mission is to make finding
                  the right stay easy — whether you're a student searching for a
                  budget-friendly PG, a traveler looking for a hostel, or a
                  professional booking an OYO for work. Every property listed is
                  verified for safety, affordability, and comfort, so you can book
                  with confidence.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <Link
                href="/about"
                className="text-[#ffffff] bg-[#0D0BA8] hover:bg-[#2A32FF] px-8 py-3 rounded-full font-semibold text-base transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </RevealOnScroll>
          </div>

          {/* Right Side - Image + Stats */}
          <div className="relative">
            {/* Main Image */}
            <RevealOnScroll delay={0.25}>
              <div className="relative absolute right-0">
                <img
                  src="/images/abt.png"
                  alt="About image"
                  className="w-2/3 sm:w-8/12 lg:w-11/12 h-[300px] sm:h-[500px] lg:h-[600px] ml-28 sm:ml-48 lg:ml-12 object-cover rounded-lg"
                />
                
                {/* Stats Card positioned on top of image */}
                <RevealOnScroll delay={0.3}>
                  <div className="absolute -bottom-6 left-0 lg:-bottom-8 lg:-left-8 bg-[#1A1A1A] text-white p-6 lg:p-8 rounded-lg shadow-2xl max-w-[280px] lg:max-w-[320px]">
                    <div className="flex flex-col gap-6">
                      {/* 1 */}
                      <section className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <CircleCheck className="text-white w-6 h-6 lg:w-7 lg:h-7" />
                        </div>
                        <h6 className="text-sm lg:text-base font-semibold text-left">
                          50K+ Verified Stays
                        </h6>
                      </section>

                      {/* 2 */}
                      <section className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <ShieldCheck className="text-white w-6 h-6 lg:w-7 lg:h-7" />
                        </div>
                        <h6 className="text-sm lg:text-base font-semibold text-left">
                          Trusted by 20K+ Students & Travelers
                        </h6>
                      </section>

                      {/* 3 */}
                      <section className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <Building2 className="text-white w-6 h-6 lg:w-7 lg:h-7" />
                        </div>
                        <h6 className="text-sm lg:text-base font-semibold text-left">
                          Serving 100+ Cities in India
                        </h6>
                      </section>
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Dots positioned top right */}
                <RevealOnScroll delay={0.2}>
                  <div className="absolute top-0 left-0 lg:-top-8 lg:-left-8">
                    {dotsSix}
                  </div>
                </RevealOnScroll>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;