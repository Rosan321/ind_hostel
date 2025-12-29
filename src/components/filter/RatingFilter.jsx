"use client";

import { Star } from "lucide-react";
import RevealOnScroll from "../animations/RevealOnScroll";
import { useState, useEffect } from "react";

const RatingFilter = ({ selected = null, onChange }) => {
  const [selectedRating, setSelectedRating] = useState(selected);

  useEffect(() => {
    setSelectedRating(selected);
  }, [selected]);

  const handleRatingClick = (rating) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    onChange(newRating);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex flex-col items-start gap-1">
        <section className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < rating
                  ? "fill-[#44475A] text-[#44475A]"
                  : "fill-gray-300 text-gray-300"
              }
            />
          ))}
        </section>
      </div>
    );
  };

  return (
    <RevealOnScroll delay={0.6}>
      <div className="space-y-1">
        <h4 className="font-bold mb-2 text-[#222222] text-lg">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left hover:bg-gray-100 transition-colors cursor-pointer ${
                selectedRating === rating
                  ? "bg-blue-50 border border-blue-200"
                  : ""
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedRating === rating
                    ? "bg-[#0D0BA8] border-[#0D0BA8]"
                    : "border-[#4F4F4F]"
                }`}
              >
                {selectedRating === rating && (
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                )}
              </div>
              {renderStars(rating)}
            </button>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default RatingFilter;
