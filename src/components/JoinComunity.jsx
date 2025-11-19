"use client";

import Image from "next/image";
import RevealOnScroll from "./animations/RevealOnScroll";

export default function JoinCommunity() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-20">
      <div
        className="rounded-2xl sm:rounded-3xl pt-10 sm:pt-12 lg:pt-16 pb-10 sm:pb-12 lg:pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #44475A 0%, #373A4B 100%)",
        }}
      >
        {/* HEADER */}
        <RevealOnScroll delay={0}>
          <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white mb-2 sm:mb-3">
              Join Our Growing Community
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl">
              Be part of thousands of verified stays, hosts, and happy guests
            </p>
          </div>
        </RevealOnScroll>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-10 lg:gap-16 px-4 sm:px-8 lg:px-20 text-white">
          {/* LEFT IMAGE */}
          <RevealOnScroll>
            <div className="relative h-[240px] sm:h-[320px] md:h-[360px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden">
              <Image
                fill
                src="/images/join.png"
                alt="community"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </RevealOnScroll>

          {/* RIGHT CONTENT */}
          <RevealOnScroll>
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 lg:mb-6">
                Why Join Us?
              </h4>

              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                {[
                  "Access verified listings",
                  "Flexible stay durations",
                  "24×7 support team",
                  "Exclusive member discounts",
                  "12,000+ members already exploring with us!",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 text-lg">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 sm:mt-10">
                <button className="bg-[#0D0BA8] hover:bg-[#2A32FF] transition text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base w-full md:w-auto">
                  Join Now
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
