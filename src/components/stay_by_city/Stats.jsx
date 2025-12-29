"use client";

import { Star } from "lucide-react";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";
import AnimatedCard from "../animations/AnimatedCard";

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">

      {/* Listings */}
      <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
        <ShuffleInOnScroll delay={0.3}>
          <AnimatedCard>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="text-lg lg:text-lg xl:text-xl font-bold text-[#1A1A1A]">
                {stats?.count || 0} stays
              </h4>
            </div>
            <p className="text-sm text-[#666666]">Listings</p>
          </AnimatedCard>
        </ShuffleInOnScroll>
      </div>

      {/* Avg Monthly */}
      <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
        <ShuffleInOnScroll delay={0.4}>
          <AnimatedCard>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="text-lg lg:text-lg xl:text-xl font-bold text-[#1A1A1A]">
                ₹{stats?.minPrice || 0} - ₹{stats?.maxPrice || 0}
              </h4>
            </div>
            <p className="text-sm text-[#666666]">Avg Monthly</p>
          </AnimatedCard>
        </ShuffleInOnScroll>
      </div>

      {/* Avg Rating */}
      <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
        <ShuffleInOnScroll delay={0.5}>
          <AnimatedCard>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="text-lg lg:text-lg xl:text-xl font-bold text-[#1A1A1A]">
                {stats?.averageRating || 0}
              </h4>
              <Star size={18} className="text-[#0D0BA8]" fill="#0D0BA8" />
            </div>
            <p className="text-sm text-[#666666]">Avg Rating</p>
          </AnimatedCard>
        </ShuffleInOnScroll>
      </div>

      {/* Total Ratings */}
      <div className="bg-white p-4 rounded-lg shadow text-center flex flex-col items-center justify-center">
        <ShuffleInOnScroll delay={0.6}>
          <AnimatedCard>
            <div className="flex items-center justify-center gap-2 mb-2">
              <h4 className="text-lg lg:text-lg xl:text-xl font-bold text-[#1A1A1A]">
                {stats?.totalRatings || 0}
              </h4>
            </div>
            <p className="text-sm text-[#666666]">Total Ratings</p>
          </AnimatedCard>
        </ShuffleInOnScroll>
      </div>

    </div>
  );
};

export default Stats;
