"use client";

import { useState, useEffect } from "react";
import RevealOnScroll from "../animations/RevealOnScroll";

const AmentiesFilter = ({ filterNames = [], selected = [], onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(selected);
  const LIMIT = 10;

  useEffect(() => {
    setSelectedAmenities(selected);
  }, [selected]);

  const getAmenityValue = (item) => {
    if (typeof item === "string") return item;
    if (typeof item === "object" && item !== null) {
      return item.amenity || item.name || item._id || "";
    }
    return "";
  };

  const handleCheckboxChange = (amenity, isChecked) => {
    let newSelected;
    if (isChecked) {
      newSelected = [...selectedAmenities, amenity];
    } else {
      newSelected = selectedAmenities.filter((a) => a !== amenity);
    }
    setSelectedAmenities(newSelected);
    onChange(newSelected);
  };

  const visibleItems = showAll ? filterNames : filterNames.slice(0, LIMIT);

  return (
    <RevealOnScroll delay={0.4}>
      {visibleItems && (
        <div className="space-y-1">
          <h4 className="font-bold mb-2 text-[#222222] text-lg">Amenities</h4>

          {visibleItems.map((item, idx) => {
            const value = getAmenityValue(item);
            if (!value) return null;

            return (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`amenity-${value}`}
                  className="accent-[#44475A]"
                  checked={selectedAmenities.includes(value)}
                  onChange={(e) =>
                    handleCheckboxChange(value, e.target.checked)
                  }
                />
                <label
                  htmlFor={`amenity-${value}`}
                  className="text-[#1A1A1A] text-sm font-medium"
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </label>
              </div>
            );
          })}

          {filterNames.length > LIMIT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#0D0BA8] text-sm font-semibold mt-2 hover:underline"
            >
              {showAll
                ? "Show Less"
                : `Show More (${filterNames.length - LIMIT})`}
            </button>
          )}
        </div>
      )}
    </RevealOnScroll>
  );
};

export default AmentiesFilter;
