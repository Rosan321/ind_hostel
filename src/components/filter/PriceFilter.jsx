"use client";

import { useState } from "react";

const PriceFilter = () => {
  const [budget, setBudget] = useState(8000);

  const min = 2000;
  const max = 15000;
  const percentage = ((budget - min) / (max - min)) * 100;

  return (
    <>
      {/* Budget Range */}
      <div>
        <label className="font-bold text-[#222222] text-lg">Budget Range</label>
        <div className="relative mt-4 py-2">
          <div className="h-1.5 bg-gray-200 rounded-full w-full absolute top-1/2 left-0 transform -translate-y-1/2"></div>
          <div
            className="h-1.5 bg-[#44475A] rounded-full absolute top-1/2 left-0 transform -translate-y-1/2"
            style={{ width: `calc(${percentage}% + 0px)` }}
          ></div>
          <input
            type="range"
            min={min}
            max={max}
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-4 absolute top-1/2 left-0 transform -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#44475A] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#44475A] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹{min}</span>
          <span>₹{budget ? budget : max}</span>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
