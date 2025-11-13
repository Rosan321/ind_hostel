"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

export default function SearchBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-10 h-full gap-24 px-4 sm:px-6 lg:px-20">
      {/* Only show on homepage */}
      {isHomePage && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug max-w-3xl">
            Find Your Perfect Stay – Hostel, PG & Hotels in One Place
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-200 max-w-xl">
            Book affordable stays with comfort and convenience across India
          </p>
        </div>
      )}

      {/* Search Section */}
      <div className="bg-black/70 backdrop-blur-md rounded-3xl lg:rounded-full py-8 xl:py-12 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto w-full">
          {/* --- Mobile & Tablet Layout (hidden on lg+) --- */}
          <div className="flex flex-col w-full lg:hidden gap-4 sm:gap-5 md:gap-6">
            {/* Location Input */}
            <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full w-full h-12">
              <MapPin size={18} />
              <input
                type="text"
                placeholder="Enter City or Area"
                className="outline-none w-full bg-transparent text-sm md:text-base placeholder-gray-500"
              />
            </div>

            {/* Date Fields - side by side on md, stacked on smaller */}
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
              {/* Check-in Date */}
              <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full w-full md:flex-1 h-12">
                <CalendarDays size={18} className="text-gray-600" />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  placeholderText="Check-in"
                  className="outline-none w-full bg-transparent text-sm md:text-base text-black placeholder-gray-500"
                  dateFormat="dd MMM yyyy"
                  minDate={new Date()}
                />
              </div>

              {/* Arrow */}
              <ArrowRight size={28} className="text-gray-300 flex-shrink-0" />

              {/* Check-out Date */}
              <div className="flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full w-full md:flex-1 h-12">
                <CalendarDays size={18} className="text-gray-600" />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  placeholderText="Check-out"
                  className="outline-none w-full bg-transparent text-sm md:text-base text-black placeholder-gray-500"
                  dateFormat="dd MMM yyyy"
                  minDate={checkInDate || new Date()}
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="btn-wiper-bg sm:w-2/3 mx-auto h-12 rounded-full text-sm md:text-base transition-all hover:scale-105 active:scale-95">
              <span className="btn-wiper-bg-content flex items-center justify-center gap-2 font-semibold">
                <Search size={18} /> Find Stay
              </span>
            </button>
          </div>

          {/* --- Desktop Layout (hidden on lg-) --- */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-4 xl:gap-6 w-full">
            {/* Location Input */}
            <div className="flex items-center gap-3 bg-white text-black px-4 xl:px-6 rounded-full h-12 flex-1 min-w-0">
              <MapPin size={20} className="flex-shrink-0" />
              <input
                type="text"
                placeholder="Enter City or Area"
                className="outline-none w-full bg-transparent text-base xl:text-lg placeholder-gray-500 truncate"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex items-center gap-3 bg-white text-black px-4 xl:px-6 rounded-full h-12 flex-1 min-w-0">
              <CalendarDays size={20} className="text-gray-600 flex-shrink-0" />
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                placeholderText="Check-in"
                className="outline-none w-full bg-transparent text-base xl:text-lg text-black placeholder-gray-500"
                dateFormat="dd MMM yyyy"
                minDate={new Date()}
              />
            </div>

            {/* Arrow */}
            <ArrowRight size={20} className="text-gray-300 flex-shrink-0" />

            {/* Check-out Date */}
            <div className="flex items-center gap-3 bg-white text-black px-4 xl:px-6 rounded-full h-12 flex-1 min-w-0">
              <CalendarDays size={20} className="text-gray-600 flex-shrink-0" />
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                placeholderText="Check-out"
                className="outline-none w-full bg-transparent text-base xl:text-lg text-black placeholder-gray-500"
                dateFormat="dd MMM yyyy"
                minDate={checkInDate || new Date()}
              />
            </div>

            {/* Search Button */}
            <Link
              href={`/location`}
              className={`btn-wiper-bg h-12 rounded-full text-base xl:text-lg transition-all flex items-center justify-center px-6 xl:px-8 whitespace-nowrap flex-shrink-0 hover:scale-105 active:scale-95 ${
                isHomePage ? "w-32 xl:w-36" : "w-36 xl:w-40"
              }`}
            >
              <span className="btn-wiper-bg-content flex items-center justify-center gap-2 font-medium">
                <Search size={20} /> {isHomePage ? "Find Stay" : "Search Now"}
              </span>
            </Link>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 mt-4 text-center">
          Find affordable Hostels, PGs & Hotels in seconds
        </p>
      </div>
    </div>
  );
}
