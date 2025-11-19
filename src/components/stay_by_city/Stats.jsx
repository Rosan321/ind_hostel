"use client";

import { Star } from "lucide-react";
import RevealOnScroll from "../animations/RevealOnScroll";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";

const Stats = () => {
  const statsData = [
    { label: "Listings", value: "8,540 stays" },
    { label: "Avg Monthly", value: "₹4,000 - ₹8,000" },
    {
      label: "Avg Rating",
      value: "4.6",
      rate: <Star size={18} className="text-yellow-400" />,
    },
    { label: "Popular", value: "PGs for Students" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 mt-8">
      {statsData.map((item) => (
        <div
          key={item.label}
          className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center"
        >
          <ShuffleInOnScroll delay={0.6}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h4 className="text-lg lg:text-lg xl:text-xl font-bold text-[#1A1A1A]">
              {item.value}
            </h4>
            {item.rate && <span>{item.rate}</span>}
          </div>
          <p className="text-sm text-[#666666]">{item.label}</p>
          </ShuffleInOnScroll>
        </div>
      ))}
    </div>
  );
};

export default Stats;
