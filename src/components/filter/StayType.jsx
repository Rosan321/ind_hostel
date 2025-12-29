"use client";

import RevealOnScroll from "../animations/RevealOnScroll";
import { useEffect, useState } from "react";

const STATIC_STAY_TYPES = ["pgs", "hotels", "hostels"];

const StayType = ({ selected = [], onChange, type }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    if (type && STATIC_STAY_TYPES.includes(type)) {
      setSelectedTypes([type]);
    } else {
      setSelectedTypes(selected);
    }
  }, [type, selected]);

  const handleCheckboxChange = (staytype, isChecked) => {
    let newSelected;

    if (isChecked) {
      newSelected = [...selectedTypes, staytype];
    } else {
      newSelected = selectedTypes.filter((t) => t !== staytype);
    }

    setSelectedTypes(newSelected);
    onChange?.(newSelected);
  };

  return (
    <RevealOnScroll delay={0.2}>
      <div className="space-y-1">
        <h4 className="font-bold mb-2 text-[#222222] text-lg">Stay Type</h4>

        {STATIC_STAY_TYPES.map((staytype) => {
          const isDisabled = Boolean(type); // 🔒 lock all when type exists

          return (
            <div key={staytype} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`staytype-${staytype}`}
                className="accent-[#44475A] cursor-not-allowed"
                checked={selectedTypes.includes(staytype)}
                disabled={isDisabled}
                onChange={(e) =>
                  handleCheckboxChange(staytype, e.target.checked)
                }
              />

              <label
                htmlFor={`staytype-${staytype}`}
                className={`text-sm font-medium cursor-not-allowed opacity-60`}
              >
                {staytype.charAt(0).toUpperCase() + staytype.slice(1)}
              </label>
            </div>
          );
        })}
      </div>
    </RevealOnScroll>
  );
};

export default StayType;
