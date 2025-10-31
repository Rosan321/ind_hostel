"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 py-10 h-full">
      {/* Only show on homepage */}
      {isHomePage && (
        <>
          <h1 className="text-3xl md:text-5xl font-bold leading-snug max-w-3xl">
            Find Your Perfect Stay – Hostel, PG & OYO in One Place
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-200 max-w-xl">
            Book affordable stays with comfort and convenience across India
          </p>
        </>
      )}

      {/* Search Section */}
      <div className="bg-black/70 backdrop-blur-md rounded-3xl lg:rounded-full mt-8 w-full p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full">
          {/* --- md & below layout --- */}
          <div className="flex flex-col md:w-full lg:hidden w-full gap-4">
            {/* Location Input */}
            <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full w-full h-12">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Enter City or Area"
                className="outline-none w-full bg-transparent text-sm md:text-base"
              />
            </div>

            {/* Date Fields side by side on md */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Check-in Date */}
              <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full flex-1 h-12">
                <CalendarDays size={18} className="text-gray-600" />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  placeholderText="Check-in"
                  className="outline-none w-full bg-transparent text-sm md:text-base text-black"
                  dateFormat="dd MMM yyyy"
                  minDate={new Date()}
                />
              </div>

              {/* Check-out Date */}
              <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full flex-1 h-12">
                <CalendarDays size={18} className="text-gray-600" />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  placeholderText="Check-out"
                  className="outline-none w-full bg-transparent text-sm md:text-base text-black"
                  dateFormat="dd MMM yyyy"
                  minDate={checkInDate || new Date()}
                />
              </div>
            </div>

            {/* Search Button below on md */}
            <button className="btn-wiper-bg w-full h-12 rounded-full text-sm md:text-base transition-all">
              <span className="btn-wiper-bg-content flex items-center justify-center gap-2">
                <Search size={18} /> Find Stay
              </span>
            </button>
          </div>

          {/* --- lg layout (desktop) --- */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-4 w-full">
            {/* Common input styles */}
            <div className="flex items-center gap-2 bg-white text-black px-4 rounded-full h-12 w-full lg:flex-2">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Enter City or Area"
                className="outline-none w-full bg-transparent text-sm md:text-base"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex items-center gap-2 bg-white text-black px-4 rounded-full h-12 w-full lg:flex-1">
              <CalendarDays size={18} className="text-gray-600" />
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Check-in"
                className="outline-none w-full bg-transparent text-sm md:text-base text-black"
                dateFormat="dd MMM yyyy"
                minDate={new Date()}
              />
            </div>

            <ArrowRight className="text-gray-300" />

            {/* Check-out Date */}
            <div className="flex items-center gap-2 bg-white text-black px-4 rounded-full h-12 w-full lg:flex-1">
              <CalendarDays size={18} className="text-gray-600" />
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                placeholderText="Check-out"
                className="outline-none w-full bg-transparent text-sm md:text-base text-black"
                dateFormat="dd MMM yyyy"
                minDate={checkInDate || new Date()}
              />
            </div>

            {/* Search Button (same height as inputs) */}
            <button
              className={`btn-wiper-bg h-12 rounded-full text-sm md:text-base transition-all flex items-center justify-center px-6 whitespace-nowrap ${
                isHomePage ? "lg:w-36" : "lg:w-40"
              }`}
            >
              <span className="btn-wiper-bg-content flex items-center justify-center gap-2">
                <Search size={18} /> {isHomePage ? "Find Stay" : "Search Now"}
              </span>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-4">
          Find affordable Hostels, PGs & OYO in seconds
        </p>
      </div>
    </div>
  );
}
