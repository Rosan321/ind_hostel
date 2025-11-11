"use client";
import {
  ChevronDown,
  Funnel,
  MapPin,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import SearchFilter from "./SearchFilter";

export default function Filters({ isOpen = false, onClose }) {
  const [budget, setBudget] = useState(8000);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selected, setSelected] = useState("All");
  // const [search, setSearch] = useState("");

  const options = ["All", "Hostel", "PG", "OYO", "Suite"];

  // const handleSelect = (option) => {
  //   setSelected(option);
  //   setIsDropdownOpen(false);
  // };

  const min = 2000;
  const max = 15000;
  const percentage = ((budget - min) / (max - min)) * 100;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filters Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } ${!isOpen ? "lg:block hidden" : "block"} 
  bg-white rounded-l-xl lg:rounded-xl shadow p-5 space-y-6 
  transform transition-transform duration-500 ease-in-out z-50
  fixed top-0 right-0 h-full w-4/5 max-w-sm md:w-3/4 
  lg:static lg:h-auto lg:w-1/4 lg:z-auto lg:transform-none`}
      >
        {/* Header with Close Button for Mobile */}
        <section className="flex items-center justify-between text-[#1A1A1A]">
          <div className="flex items-center gap-4">
            {/* SlidersHorizontal visible below lg */}
            <SlidersHorizontal className="block lg:hidden" size={20} />

            {/* Funnel visible lg and above */}
            <Funnel className="hidden lg:block" size={20} />

            <h3 className="font-bold text-2xl">Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </section>

        {/* Filter */}
        <SearchFilter />
        {/* <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-xs mb-4">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
            <span className="pl-3 text-gray-500">
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
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
        </div> */}
        
        {/* Budget Range */}
        <div>
          <label className="font-bold text-[#222222] text-lg">
            Budget Range
          </label>
          <div className="relative mt-4 py-2">
            <div className="h-1.5 bg-gray-200 rounded-full w-full absolute top-1/2 left-0 transform -translate-y-1/2"></div>
            <div
              className="h-1.5 bg-[#00BFA6] rounded-full absolute top-1/2 left-0 transform -translate-y-1/2"
              style={{ width: `calc(${percentage}% + 0px)` }}
            ></div>
            <input
              type="range"
              min={min}
              max={max}
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-4 absolute top-1/2 left-0 transform -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00BFA6] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00BFA6] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹{min}</span>
            <span>₹{budget ? budget : max}</span>
          </div>
        </div>

        {/* Stay Type */}
        <div>
          <h4 className="font-bold mb-1 text-[#222222] text-lg">Stay Type</h4>
          {["Hostel", "PG", "Hotel"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input type="checkbox" id={type} className="accent-[#00BFA6]" />
              <label
                htmlFor={type}
                className="text-[#1A1A1A] text-sm font-medium"
              >
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Room Type */}
        <div>
          <h4 className="font-bold mb-1 text-[#222222] text-lg">Room Type</h4>
          {["Single", "Shared", "Suite"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input type="checkbox" id={type} className="accent-[#00BFA6]" />
              <label
                htmlFor={type}
                className="text-[#1A1A1A] text-sm font-medium"
              >
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-bold mb-1 text-[#222222] text-lg">Amenities</h4>
          {["WiFi", "AC", "Parking", "Laundry"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={amenity}
                className="accent-[#00BFA6]"
              />
              <label
                htmlFor={amenity}
                className="text-[#1A1A1A] text-sm font-medium"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div>
          <h4 className="font-bold mb-2 text-[#222222] text-lg">Rating</h4>
          {[
            { label: "5 Stars & Above", stars: 5 },
            { label: "4 Stars & Above", stars: 4 },
            { label: "3 Stars & Above", stars: 3 },
            { label: "2 Stars & Above", stars: 2 },
            { label: "1 Star & Above", stars: 1 },
          ].map(({ label, stars }) => (
            <div key={label} className="flex items-center space-x-2 mb-1">
              <input type="checkbox" id={label} className="accent-[#00BFA6]" />
              <label
                htmlFor={label}
                className="flex items-center space-x-1 cursor-pointer text-sm font-medium text-[#1A1A1A]"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={i < stars ? "#00BFA6" : "#E5E7EB"}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.036 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
                    </svg>
                  ))}
                </div>
              </label>
            </div>
          ))}
          <p className="text-xs text-[#666666] font-medium mt-2">Min Rating</p>
        </div>
      </aside>
    </>
  );
}
