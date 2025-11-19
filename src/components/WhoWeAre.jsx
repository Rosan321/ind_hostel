"use client";

import Image from "next/image";
import Hero from "./stay_by_city/Hero";
import HowItWorks from "./HowItWorks";
import RevealOnScroll from "./animations/RevealOnScroll";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";
import { ArrowDownWideNarrow, CircleCheck, Headset } from "lucide-react";

export default function WhoWeAre() {
  return (
    <div>
      <Hero />
      <div className="bg-gray-100 py-20">
        <div className="grid lg:grid-cols-2 gap-6 items-start w-full px-4 sm:px-8 lg:px-20 pb-12">
          {/* LEFT TEXT */}
          <div>
            <RevealOnScroll delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6">
              Who we are
            </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
            <p className="text-gray-600 mb-4 leading-relaxed">
              IndHostel started with a simple idea: to make safe, affordable and
              verified shared living options discoverable across India. From
              students looking for monthly PGs to travelers seeking affordable
              hostels, we bring listings, verification and seamless bookings
              under one roof
            </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe good living shouldn’t be expensive. Our mission is to
              enable comfortable, affordable and trusted stays across India —
              whether you need a dorm for a night or a PG for a semester
            </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.6}>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 border border-[#44475A] rounded-full text-sm text-[#44475A] font-medium flex items-center gap-2">
                <CircleCheck size={16} />
                Verified
              </span>
              <span className="px-4 py-2 border border-[#44475A] rounded-full text-sm text-[#44475A] font-medium flex items-center gap-2">
                <ArrowDownWideNarrow size={16} />
                Flexible bookings
              </span>
              <span className="px-4 py-2 border border-[#44475A] rounded-full text-sm text-[#44475A] font-medium flex items-center gap-2">
                <Headset size={16} />
                Verified
              </span>
            </div>
            </RevealOnScroll>
          </div>

          {/* RIGHT IMAGES GRID */}
          <div className="space-y-4 md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-4">
            {/* BIG IMAGE */}
            <ShuffleInOnScroll delay={0.2}>
            <div className="relative h-96 lg:h-[460px] xl:h-[520px] rounded-3xl overflow-hidden">
              <Image
                src="/images/1.png"
                alt="Bunk Beds"
                fill
                className="object-cover"
              />
            </div>
            </ShuffleInOnScroll>
            
            {/* RIGHT SIDE FOR md+ */}
            <div className="hidden md:flex flex-col gap-4">
            <ShuffleInOnScroll delay={0.4}>
              <div className="relative h-full lg:h-[259px] xl:h-[325px] rounded-xl overflow-hidden">
                <Image
                  src="/images/2.png"
                  alt="People"
                  fill
                  className="object-cover"
                />
              </div>
              </ShuffleInOnScroll>
            <ShuffleInOnScroll delay={0.6}>
              <div className="relative h-[180px] rounded-xl overflow-hidden">
                <Image
                  src="/images/3.png"
                  alt="City"
                  fill
                  className="object-cover"
                />
              </div>
              </ShuffleInOnScroll>
            </div>

            {/* mobile two images side by side */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              <div className="relative h-[120px] rounded-xl overflow-hidden">
                <Image
                  src="/images/2.png"
                  alt="People"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[120px] rounded-xl overflow-hidden">
                <Image
                  src="/images/3.png"
                  alt="City"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
