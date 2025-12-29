"use client";

import {
  Search,
  GraduationCap,
  BriefcaseBusiness,
  Backpack,
} from "lucide-react";
import { useEffect, useState } from "react";
import CarouselCard from "./Carousel";
import Link from "next/link";
import RevealOnScroll from "../animations/RevealOnScroll";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";
import AnimatedCard from "../animations/AnimatedCard";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";

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
    cta: "View monthly PGs & hostels",
  },
  {
    id: "travelers",
    title: "Budget Travelers & Short Stays",
    icon: Backpack,
    areas: ["New bus hubs", "main railway lines"],
    features: [
      "All accomodations at best price",
      "Good for short stays & social meetups",
      "Shared kitchens & events",
    ],
    cta: "View hotels & nightly stays",
  },
];

const LocationWithExpect = ({ params }) => {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const city = params?.city;

  const fetchSearch = async (cityParam, areaParam) => {
    try {
      // Build params object dynamically based on what's available
      const paramsData = {};

      if (cityParam) {
        paramsData.city = cityParam;
      }

      if (areaParam && areaParam.trim() !== "") {
        paramsData.area = areaParam;
      }

      // Only fetch if we have at least one parameter
      if (Object.keys(paramsData).length > 0) {
        const res = await axiosInstance.get(
          API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_SEARCH,
          { params: paramsData } // ✅ Fixed: pass as 'params' not 'paramsData'
        );
        // console.log("Search results:", res.data);
        setSearchData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // 🔥 Initial Search when page loads (with city only)
  useEffect(() => {
    if (city) {
      fetchSearch(city, "");
    }
  }, [city]); // Only depend on city for initial load

  // 🔥 Fetch when user searches by area (Enter key or separate search button)
  const handleSearch = () => {
    if (city || query.trim() !== "") {
      fetchSearch(city, query);
    }
  };

  // If you want to auto-search on query change (debounced), you could add:
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (city || query.trim() !== "") {
  //       fetchSearch(city, query);
  //     }
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [query]);

  return (
    <div className="w-full mx-auto pb-10 space-y-4 lg:space-y-8">
      <div className="py-12 space-y-6 lg:space-y-8">
        {/* Heading + Search */}
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Find Stays In{" "}
              {city ? city.slice(0, 1).toUpperCase() + city.slice(1) : "City"}
            </h2>

            {/* Search Bar */}
            <div className="relative w-full lg:w-[520px]">
              <Search
                className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search neighborhood by Area"
                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              {/* Optional: Add a search button */}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0D0BA8] text-white px-4 py-1 rounded-full hover:bg-[#2A32FF] transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <ShuffleInOnScroll delay={0.2}>
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

            {/* Right: Listings - Display actual search results if available */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col gap-4 sm:gap-6 border border-gray-200 p-4 rounded-2xl bg-white">
              {searchData && searchData.length > 0 ? (
                // Display actual search results
                searchData.map((item) => (
                  <CarouselCard key={item._id} item={item} />
                ))
              ) : (
                // No results found
                <div className="text-center py-10 text-gray-500">
                  No accommodations found. Try a different search.
                </div>
              )}
            </div>
          </div>
        </ShuffleInOnScroll>
      </div>

      {/* Local Guide Section */}
      <div>
        {/* Header */}
        <RevealOnScroll delay={0.2}>
          <p className="text-xs sm:text-sm font-semibold text-[#44475A] ">
            Local Guide
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] my-2 ">
            Neighborhoods & Safety — What to expect
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <p className="text-[#666666] text-sm sm:text-base mb-6  max-w-2xl">
            Short local tips to help students, professionals & travelers pick
            the best spot
          </p>
        </RevealOnScroll>

        {/* Neighborhood Cards Grid */}
        <RevealOnScroll delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood) => (
              <AnimatedCard
                key={neighborhood.id}
                className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 bg-white hover:shadow-md transition-shadow duration-200"
              >
                <RevealOnScroll delay={0.6}>
                  {/* Icon */}
                  <neighborhood.icon className="h-10 w-10 p-2 rounded-full text-[#44475A] bg-[#44475A14] flex-shrink-0 mx-auto sm:mx-0" />
                </RevealOnScroll>
                <RevealOnScroll delay={0.6}>
                  {/* Card Content */}
                  <div className="flex flex-col justify-between gap-3 text-center sm:text-left">
                    <h3 className="font-bold text-lg sm:text-xl text-[#1A1A1A]">
                      {neighborhood.title}
                    </h3>

                    {/* Areas Tags */}
                    <div className="flex flex-wrap gap-2">
                      {searchData &&
                        searchData.slice(0, 3).map((item) => (
                          <span
                            key={item._id}
                            className="px-3 py-1 bg-white rounded-full text-xs sm:text-sm text-[#666666] font-medium border border-gray-300"
                          >
                            {item.location?.area
                            ? item.location?.area?.charAt(0).toUpperCase() + item.location?.area.slice(1)
                            : "Unknown Area"}
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
                          <span className="h-2 w-2 bg-[#44475A] rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    {/* <Link
                      href="/data"
                      className="text-sm lg:text-base font-semibold text-[#FFFFFF] bg-[#0D0BA8] px-6 py-3 rounded-full mt-2 hover:bg-[#2A32FF] transition-colors duration-200"
                    >
                      {neighborhood.cta}
                    </Link> */}
                  </div>
                </RevealOnScroll>
              </AnimatedCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default LocationWithExpect;
