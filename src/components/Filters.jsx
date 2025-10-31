"use client";

import { Funnel } from "lucide-react";
import { useState } from "react";

export default function Filters() {
  const [budget, setBudget] = useState(8000);

  const min = 2000;
  const max = 15000;
  const percentage = ((budget - min) / (max - min)) * 100;

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 bg-white rounded-xl shadow p-5 space-y-6">
      {/* Header */}
      <section className="flex items-center gap-4 text-[#1A1A1A]">
        <Funnel />
        <h3 className="font-bold text-2xl">Filters</h3>
      </section>

      {/* Budget Range */}
      <div>
        <label className="font-bold text-[#222222] text-lg">Budget Range</label>

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
            className="w-full h-4 absolute top-1/2 left-0 transform -translate-y-1/2 appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00BFA6] [&::-webkit-slider-thumb]:border-2 
            [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg
            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#00BFA6] [&::-moz-range-thumb]:border-2 
            [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
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
        {["Hostel", "PG", "OYO"].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <input type="checkbox" id={type} className="accent-[#00BFA6]" />
            <label htmlFor={type} className="text-[#1A1A1A] text-sm font-medium">
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
            <label htmlFor={type} className="text-[#1A1A1A] text-sm font-medium">
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
            <input type="checkbox" id={amenity} className="accent-[#00BFA6]" />
            <label htmlFor={amenity} className="text-[#1A1A1A] text-sm font-medium">
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
      <label htmlFor={label} className="flex items-center space-x-1 cursor-pointer text-sm font-medium text-[#1A1A1A]">
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
        {/* <span>{label}</span> */}
      </label>
    </div>
  ))}
  <p className="text-xs text-[#666666] font-medium mt-2">Min Rating</p>
</div>


      {/* Location Zone */}
      <div>
        <h4 className="font-bold mb-1 text-[#222222] text-lg">Location Zone</h4>
        <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#1A1A1A] text-sm font-medium">
          <option value="">Select Zone</option>
          <option value="north">North Bangalore</option>
          <option value="south">South Bangalore</option>
          <option value="east">East Bangalore</option>
          <option value="west">West Bangalore</option>
          <option value="central">Central Bangalore</option>
        </select>
      </div>
    </aside>
  );
}
