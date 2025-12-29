"use client";

import { useState, useEffect, useRef } from "react";
import RevealOnScroll from "../animations/RevealOnScroll";

const PriceFilter = ({
  filterNames,
  value = { min: 0, max: 10000 },
  onChange,
}) => {
  const [budget, setBudget] = useState(value.max);
  const [isDragging, setIsDragging] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (filterNames?.min_price && filterNames?.max_price) {
      setBudget(value.max || filterNames.max_price);
    }
  }, [filterNames, value]);

  const min = Array.isArray(filterNames?.min_price)
    ? filterNames?.min_price
    : filterNames?.min_price || 0;
  const max = Array.isArray(filterNames?.max_price)
    ? filterNames?.max_price
    : filterNames?.max_price || 0;

  const percentage = max > min ? 100 : 0;

  const debouncedOnChange = (newBudget) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange({ min: min, max: newBudget });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handlePriceChange = (newBudget) => {
    setBudget(newBudget);

    if (isDragging) {
      debouncedOnChange(newBudget);
    } else {
      onChange({ min: min, max: newBudget });
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      onChange({ min: min, max: budget });
    }
  };

  return (
    <div onMouseLeave={handleMouseUpOrLeave}>
      <RevealOnScroll delay={0.2}>
        <label className="font-bold text-[#222222] text-lg">Budget Range</label>
        <div className="relative mt-2 py-2">
          <div
            className="h-1.5 bg-[#44475A] rounded-full absolute top-1/2 left-0 transform -translate-y-1/2 z-0"
            style={{ width: "100%" }}
          ></div>
          <div
            className="h-1.5 bg-[#44475A] rounded-full absolute top-1/2 left-0 transform -translate-y-1/2"
            style={{ width: `calc(${percentage}% + 0px)` }}
          ></div>
          <input
            type="range"
            min={min}
            max={max}
            value={budget}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            className="w-full h-4 absolute top-1/2 left-0 transform -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#44475A] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#44475A] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹{min}</span>
          <section className="flex items-center gap-1">
            <span className="text-xs font-semibold">({budget})</span>
            <span>₹{max}</span>
          </section>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default PriceFilter;
