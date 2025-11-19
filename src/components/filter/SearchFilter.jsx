"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const options = ["All", "Hostel", "PG", "Hotels"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsDropdownOpen(false);
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-xs mb-4"
    >
      {/* Input + Button */}
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
        <span className="pl-3 text-[#666666]">
          <MapPin size={16} />
        </span>
        <input
          type="text"
          value={selected && selected !== "All" ? `${selected}` : search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelected("");
          }}
          placeholder="Search..."
          className="flex-1 px-3 py-2 focus:outline-none text-gray-800 text-sm sm:text-base"
        />
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md z-20">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                selected === option
                  ? "bg-gray-50 text-[#00BFA6]"
                  : "text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
