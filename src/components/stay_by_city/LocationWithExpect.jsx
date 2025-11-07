"use client";

import {
  Search,
  GraduationCap,
  BriefcaseBusiness,
  Backpack,
} from "lucide-react";
import { useState } from "react";
import CarouselCard from "./Carousel";

const listings = [
  {
    id: 1,
    title: "Campus Corner PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹5,000 / month",
    rating: 4.6,
    reviews: 128,
    image: ["/images/hero.png", "/images/coxy.png", "/images/ocean.png"],
  },
  {
    id: 2,
    title: "Ocean View PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹6,000 / month",
    rating: 4.7,
    reviews: 154,
    image: ["/images/ocean.png", "/images/coxy.png", "/images/hero.png"],
  },
  {
    id: 3,
    title: "Cozy Stay PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹4,800 / month",
    rating: 4.5,
    reviews: 90,
    image: ["/images/coxy.png", "/images/ocean.png", "/images/hero.png"],
  },
];

const neighborhoods = [
  {
    id: "students",
    title: "Best for Students",
    icon: GraduationCap,
    areas: ["Koramangala", "Indiranagar", "Jayanagar"],
    features: [
      "Close to universities & tuition centers (5–20 min commute)",
      "Affordable shared rooms: ₹3,500–₹6,000 / mo",
      "Lively cafes & co-study spaces",
    ],
    cta: "View student-friendly PGs",
  },
  {
    id: "professionals",
    title: "Best for Professionals",
    icon: BriefcaseBusiness,
    areas: ["MG Road", "CBD", "HSR Layout"],
    features: [
      "Fast commute to major offices (10–30 min)",
      "Private rooms & monthly leases common",
      "Quiet evenings & reliable cab availability",
    ],
    cta: "View monthly PGs & OYO",
  },
  {
    id: "travelers",
    title: "Budget Travelers & Short Stays",
    icon: Backpack,
    areas: ["New bus hubs", "main railway lines"],
    features: [
      "Hostels & dorms from ₹300 / night",
      "Good for short stays & social meetups",
      "Shared kitchens & events",
    ],
    cta: "View hostels & nightly stays",
  },
];

const LocationWithExpect = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full mx-auto pb-10 space-y-4">
      <div className="py-12 space-y-6 lg:space-y-8">
        {/* Heading + Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Find Stays In Mumbai
          </h2>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[520px]">
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search neighborhood"
              className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Main Split Section */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Map (2/3 width on large screens) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden mb-4 border border-gray-300">
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.667134248048!2d78.463169!3d17.4077852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1761975563874!5m2!1sen!2sin"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right: Listings */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col gap-4 sm:gap-6 border border-gray-200 p-4 rounded-2xl bg-white">
            {listings.map((item) => (
              <CarouselCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Local Guide Section */}
      <div>
        {/* Header */}
        <p className="text-xs sm:text-sm font-semibold text-[#00BFA6] ">
          Local Guide
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] my-2 ">
          Neighborhoods & Safety — What to expect
        </h2>

        <p className="text-[#666666] text-sm sm:text-base mb-6  max-w-2xl">
          Short local tips to help students, professionals & travelers pick the
          best spot
        </p>

        {/* Neighborhood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 bg-white hover:shadow-md transition-shadow duration-200"
            >
              {/* Icon */}
              <neighborhood.icon className="h-10 w-10 p-2 rounded-full text-white bg-[#00BFA6] flex-shrink-0 mx-auto sm:mx-0" />

              {/* Card Content */}
              <div className="flex flex-col justify-between gap-3 text-center sm:text-left">
                <h3 className="font-bold text-lg sm:text-xl text-[#1A1A1A]">
                  {neighborhood.title}
                </h3>

                {/* Areas Tags */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {neighborhood.areas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-xs sm:text-sm text-[#666666] font-medium border border-gray-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Features List */}
                <ul className="space-y-1">
                  {neighborhood.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#666666]"
                    >
                      <span className="h-2 w-2 bg-[#00BFA6] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="text-sm sm:text-base font-semibold text-[#1A1A1A] bg-[#F1FF51] px-6 py-3 rounded-full mt-2 hover:bg-[#e8f847] transition-colors duration-200">
                  {neighborhood.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationWithExpect;
