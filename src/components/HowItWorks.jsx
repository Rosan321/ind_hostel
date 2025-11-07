"use client";

import { Calendar, Headphones, Search, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-12">
      <div className="px-4 sm:px-8 lg:px-20 mx-auto">
        {/* Heading Center */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-3">
            How It Works
          </h2>
          <p className="text-gray-600">
            Simple, secure, and fast — from search to check-in
          </p>
        </div>

        {/* 4 STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* 1 */}
          <StepCard
            number={1}
            icon={<Search />}
            title="Search"
            desc="Find verified stays by city, neighborhood, or preference"
          />

          {/* 2 */}
          <StepCard
            number={2}
            icon={<ShieldCheck />}
            title="Verify"
            desc="Every listing is ID-verified and personally inspected for comfort"
          />

          {/* 3 */}
          <StepCard
            number={3}
            icon={<Calendar />}
            title="Book"
            desc="Instant confirmation or flexible monthly plans in a few click"
          />

          {/* 4 */}
          <StepCard
            number={4}
            icon={<Headphones />}
            title="Stay & Support"
            desc="24/7 on-ground and in-app assistance during your stay"
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({ number, icon, title, desc }) {
  return (
    <div className="relative bg-white rounded-3xl shadow-lg px-8 py-12 flex flex-col items-center text-center">
      {/* number circle */}
      <div className="absolute top-6 left-6 h-9 w-9 flex items-center justify-center text-white bg-[#00BFA6] rounded-full text-sm font-semibold">
        {number}
      </div>

      {/* icon */}
      <div className="flex flex-col justify-center items-center gap-2 mt-8">
        <p className="text-[#00BFA6] bg-gray-200 rounded-full p-2">{icon}</p>
        <h3 className="font-semibold text-lg text-black mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
