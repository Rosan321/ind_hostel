"use client";

import { dotsSix } from "@/lib/utils/svgS";
import SwiperButton from "@/lib/utils/swiperButton";
import { ChevronsRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import RevealOnScroll from "./animations/RevealOnScroll";

const WhyChooseUs = () => {
  const features = [
    "Verified & Trusted Listings",
    "Hassle-Free Online Booking",
    "Affordable Pricing Options",
    "24/7 Customer Support",
  ];

  return (
    <div className="py-12 sm:pt-18 xl:pt-0 lg:py-24 bg-gray-100">
      <section className="py-16 px-4 sm:px-8 lg:px-20 bg-[#1A1A1A] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-end mx-auto">
          {/* Left Side - Image/Stats */}
          <div className="space-y-6">
            <RevealOnScroll delay={0}>
            <div className="space-y-4">
              <h2 className="text-base lg:text-lg font-semibold text-[#44475A]">
                WHY CHOOSE US?
              </h2>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Why We're the Best Choice for Your Stay
              </h3>

              <p className="text-base text-white leading-relaxed">
                Whether you're a student, working professional, or traveler, our
                platform brings together hostels, PGs, and hotels in one place.
                Compare, choose, and book your stay instantly — with full
                transparency, affordable rates, and 24/7 support.
              </p>
            </div>
            </RevealOnScroll>

            {/* Features List */}
            <RevealOnScroll delay={0.15}>
              <div className="grid md:grid-cols-2 items-center gap-3 md:space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ChevronsRight className="text-white" size={24} />
                    <span className="text-base text-white font-bold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
            <hr className="text-white" />

            {/* Note Box */}
            {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4"> */}
            <p className="text-xs md:text-sm flex items-center gap-2 font-base text-white mt-6 sm">
              <CircleCheck className="w-4 h-4 text-white" /> These features
              ensure comfort, safety, and convenience
            </p>
            </RevealOnScroll>
            {/* </div> */}

            {/* Explore Now Button */}
            {/* <button className="bg-[#F1FF51] hover:bg-[#dde953] text-[#1A1A1A] px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl mt-6 cursor-pointer">
              Explore Now
            </button> */}
            <RevealOnScroll delay={0.45}>
            <SwiperButton
              title="Explore Now"
              className="w-44 h-13 flex items-center justify-center font-semibold md:text-lg text-[#1A1A1A] xl:mt-24"
              rt={"/about"}
            />
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll delay={0.5}>
              <div className="flex justify-between gap-20 relative">
                <section>{dotsSix}</section>
                <Image
                  src="/images/why.png"
                  alt="abt"
                  width={500}
                  height={500}
                  className="w-3/5 h-4/5"
                />
              </div>
            </RevealOnScroll>
            <div className="absolute bottom-16 xl:right-4/12 flex flex-col text-center gap-4 bg-[#0D0BA8] text-[#ffffff] w-32 md:w-56 p-4 md:p-6 transform transition duration-300 hover:scale-105">
              <RevealOnScroll delay={0.6}>
                <section className="flex flex-col items-start gap-3">
                  {/* <CircleCheck className="text-white w-5 h-5" /> */}
                  <h6 className="sm:text-2xl lg:text-4xl font-bold md:h-20">
                    50<span>K+</span>
                  </h6>
                  <section className="flex md:mb-4">
                    <Image
                      src="/images/pp.png"
                      alt="abt"
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                    <Image
                      src="/images/pp1.png"
                      alt="abt"
                      width={100}
                      height={100}
                      className="ml-[-18] w-full h-full"
                    />
                    <Image
                      src="/images/pp2.png"
                      alt="abt"
                      width={100}
                      height={100}
                      className="ml-[-18] w-full h-full"
                    />
                  </section>
                  {/* <ShieldCheck className="text-white w-5 h-5" /> */}
                  <h6 className="text-xs sm:text-sm lg:text-base text-start font-medium">
                    Happy Customers booked through us
                  </h6>
                </section>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
