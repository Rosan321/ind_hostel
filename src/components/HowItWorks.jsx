"use client";

import { Calendar, Headphones, Search, ShieldCheck } from "lucide-react";
import RevealOnScroll from "./animations/RevealOnScroll";
import AnimatedCard from "./animations/AnimatedCard";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-12">
      <div className="px-4 sm:px-8 lg:px-20 mx-auto">
        {/* Heading Center */}
        <ShuffleInOnScroll delay={0.2}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-3">
            How It Works
          </h2>
          <p className="text-gray-600">
            Simple, secure, and fast — from search to check-in
          </p>
        </div>
        </ShuffleInOnScroll>

        {/* 4 STEPS */}
        <RevealOnScroll delay={0.6}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <AnimatedCard>
          {/* 1 */}
          <StepCard
            number={1}
            icon={<Search />}
            title="Search"
            desc="Find verified stays by city, neighborhood, or preference"
          />
          </AnimatedCard>

          
            <AnimatedCard>
          {/* 2 */}
          <StepCard
            number={2}
            icon={<ShieldCheck />}
            title="Verify"
            desc="Every listing is ID-verified and personally inspected for comfort"
          />
          </AnimatedCard>

          
            <AnimatedCard>
          {/* 3 */}
          <StepCard
            number={3}
            icon={<Calendar />}
            title="Book"
            desc="Instant confirmation or flexible monthly plans in a few click"
          />
          </AnimatedCard>

          
            <AnimatedCard>
          {/* 4 */}
          <StepCard
            number={4}
            icon={<Headphones />}
            title="Stay & Support"
            desc="24/7 on-ground and in-app assistance during your stay"
          />
          </AnimatedCard>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function StepCard({ number, icon, title, desc }) {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg px-8 py-12 flex flex-col items-center text-center">
      {/* number circle */}
      <div className="absolute top-6 left-6 h-9 w-9 flex items-center justify-center text-white bg-[#44475A] rounded-full text-sm font-semibold">
        {number}
      </div>

      {/* icon */}
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        <p className="text-[#44475A] bg-[#E0F7F4] rounded-full p-2">{icon}</p>
        <h3 className="font-bold text-lg lg:text-xl text-[#1A1A1A] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
