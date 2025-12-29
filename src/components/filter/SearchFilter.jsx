"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SearchFilter = ({ filterNames = [], selected = "", onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = filterNames.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value) => {
    onChange(value);
    setSearch("");
    setIsDropdownOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setSearch("");
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
    <div ref={dropdownRef} className="relative w-full mb-4">
      <div className="flex items-center border border-gray-300 rounded-md bg-white">
        <span className="pl-3 text-[#666666]">
          <MapPin size={16} />
        </span>

        <input
          type="text"
          value={isDropdownOpen ? search : selected}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownOpen(true);
          }}
          placeholder="Search location..."
          className="w-full px-3 py-2 focus:outline-none text-gray-800 lg:text-sm text-base"
          onFocus={() => setIsDropdownOpen(true)}
        />

        {selected && (
          <button
            onClick={handleClear}
            className="px-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center px-3 py-2 border-l text-gray-700 cursor-pointer"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-200 rounded-md shadow-md z-20 max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                  selected === option
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-[#0D0BA8]"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
