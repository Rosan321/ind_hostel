"use client";

import { useState, useEffect } from "react";
import RevealOnScroll from "../animations/RevealOnScroll";

const RoomType = ({ filterNames = [], selected = [], onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState(selected);
  const LIMIT = 10;

  useEffect(() => {
    setSelectedRoomTypes(selected);
  }, [selected]);

  // Extract room type value properly
  const getRoomTypeValue = (item) => {
    if (typeof item === "string") return item;
    if (typeof item === "object" && item !== null) {
      return item.roomtype || item.name || item._id || "";
    }
    return "";
  };

  const handleCheckboxChange = (roomType, isChecked) => {
    let newSelected;
    if (isChecked) {
      newSelected = [...selectedRoomTypes, roomType];
    } else {
      newSelected = selectedRoomTypes.filter((type) => type !== roomType);
    }
    setSelectedRoomTypes(newSelected);
    onChange(newSelected);
  };

  const visibleItems = showAll ? filterNames : filterNames.slice(0, LIMIT);

  return (
    <RevealOnScroll delay={0.4}>
      {visibleItems && (
        <div className="space-y-1">
          <h4 className="font-bold mb-2 text-[#222222] text-lg">Room Type</h4>

          {visibleItems.map((item, idx) => {
            const value = getRoomTypeValue(item);
            if (!value) return null;

            return (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`roomtype-${value}`}
                  className="accent-[#44475A]"
                  checked={selectedRoomTypes.includes(value)}
                  onChange={(e) => handleCheckboxChange(value, e.target.checked)}
                />
                <label
                  htmlFor={`roomtype-${value}`}
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
              className="text-[#0D0BA8] text-sm font-semibold hover:underline cursor-pointer mt-2"
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

export default RoomType;
