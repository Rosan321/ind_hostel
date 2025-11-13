"use client";

import { cityHostels } from "@/lib/utils/cityHostels";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LocationExplorer = () => {
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const cities = [
    { name: "Mumbai", image: "/images/mum.png" },
    { name: "Hyderabad", image: "/images/hyderabad.jpg" },
    { name: "Pune", image: "/images/pune.jpg" },
    { name: "Goa", image: "/images/goa.jpg" },
    { name: "Jaipur", image: "/images/jaipur.jpg" },
    { name: "Delhi", image: "/images/delhi.jpg" },
  ];

  const currentHostels = cityHostels[selectedCity] || [];

  return (
    <section className="bg-gray-100 py-12 lg:py-24 px-4 sm:px-8 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Explore Our Locations
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Choose your city to find hostels near you
        </p>

        {/* Draggable City Buttons */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max md:justify-center">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => setSelectedCity(city.name)}
                className={`flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 text-[#1A1A1A] rounded-full text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  selectedCity === city.name
                    ? "bg-[#C7D800] shadow-lg"
                    : "border border-gray-300 hover:bg-[#cedf08]"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-12 items-start">
        {/* Left - City Image */}
        <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-96 lg:h-[480px] xl:h-[540px]">
          <Image
            src={
              cities.find((c) => c.name === selectedCity)?.image ||
              "/images/mum.png"
            }
            alt={selectedCity}
            width={600}
            height={400}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Right - Top Hostels */}
        <div className="rounded-2xl">
          <h3 className="text-2xl sm:text-2xl lg:text-4xl font-bold text-gray-800 mb-6">
            Top Hostels in {selectedCity}
          </h3>

          {/* Hostel List */}
          <div className="xl:space-y-6">
            {currentHostels.length > 0 ? (
              currentHostels.slice(0, 3).map((hostel) => (
                <div key={hostel.id}>
                  <div className="flex lg:gap-4 gap-6 items-start">
                    <Image
                      src={hostel.image}
                      alt={hostel.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="text-base lg:text-lg font-semibold text-gray-800">
                        {hostel.name}
                      </h4>
                      <p className="text-xs lg:text-base font-bold text-[#C7D800] my-2">
                        {hostel.price}
                      </p>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-2 lg:mb-4">
                        {hostel.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 text-[#00BFA6] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] lg:text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No hostels available in {selectedCity}
              </p>
            )}
          </div>

          {/* View All Button */}
          {currentHostels.length > 0 && (
            <div className="mt-4 lg:mt-0 xl:mt-4">
              <Link
                href="/data"
                className="lg:inline-block bg-[#00BFA6] hover:bg-[#11a793] text-white px-12 lg:px-5 py-2 lg:py-3 rounded-full font-semibold transition-colors duration-300"
              >
                View All
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LocationExplorer;
