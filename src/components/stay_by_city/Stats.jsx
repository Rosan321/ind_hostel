"use client"

import { Star } from "lucide-react";

const Stats = () => {
  const statsData = [
    { label: "Listings", value: "8,540 stays" },
    { label: "Avg Monthly", value: "₹4,000 - ₹8,000" },
    { label: "Avg Rating", value: "4.6", rate: <Star size={18} /> },
    { label: "Popular", value: "PGs for Students" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mx-auto mt-8">
      {statsData.map((item) => (
        <div
          key={item.label}
          className="bg-white p-4 rounded-lg shadow text-center"
        >
            <section className="flex items-center justify-center gap-2 mb-2">
            <h4 className="text-xl text-[#1A1A1A] font-bold">{item.value}</h4>
            {item.rate}
          </section>
          <p className="text-sm text-[#666666]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Stats