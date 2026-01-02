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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const city = params?.city;

  const fetchSearch = async (cityParam, areaParam) => {
    try {
      setLoading(true);
      setError("");

      const paramsData = {};

      if (cityParam) paramsData.city = cityParam;
      if (areaParam && areaParam.trim() !== "") {
        paramsData.area = areaParam;
      }

      if (Object.keys(paramsData).length === 0) return;

      const res = await axiosInstance.get(
        API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_SEARCH,
        { params: paramsData }
      );

      setSearchData(res?.data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again after some time.");
      setSearchData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchSearch(city, "");
    }
  }, [city]);

  const handleSearch = () => {
    if (city || query.trim() !== "") {
      fetchSearch(city, query);
    }
  };

  return (
    <div className="w-full mx-auto pb-10 space-y-4 lg:space-y-8">
      <div className="py-12 space-y-6 lg:space-y-8">
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Find Stays In{" "}
              {city ? city.slice(0, 1).toUpperCase() + city.slice(1) : "City"}
            </h2>

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
                  if (e.key === "Enter") handleSearch();
                }}
              />
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
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6 xl:col-span-7 h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden mb-4 lg:mb-0 border border-gray-300">
              <iframe
                className="w-full h-full rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.667134248048!2d78.463169!3d17.4077852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1761975563874!5m2!1sen!2sin"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>

            <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col gap-4 sm:gap-6 border border-gray-200 p-4 rounded-2xl bg-white min-h-[300px]">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0D0BA8] border-t-transparent" />
                </div>
              )}

              {!loading && error && (
                <div className="flex items-center justify-center h-full text-center text-red-600 font-medium px-4">
                  {error}
                </div>
              )}

              {!loading && !error && searchData?.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500 text-center px-4">
                  No accommodations found. Try a different search.
                </div>
              )}

              {!loading &&
                !error &&
                searchData?.length > 0 &&
                searchData.map((item) => (
                  <CarouselCard key={item._id} item={item} />
                ))}
            </div>
          </div>
        </ShuffleInOnScroll>
      </div>

      <div>
        <RevealOnScroll delay={0.2}>
          <p className="text-xs sm:text-sm font-semibold text-[#44475A]">
            Local Guide
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] my-2">
            Neighborhoods & Safety — What to expect
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <p className="text-[#666666] text-sm sm:text-base mb-6 max-w-2xl">
            Short local tips to help students, professionals & travelers pick
            the best spot
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((neighborhood) => (
              <AnimatedCard
                key={neighborhood.id}
                className="border border-gray-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 bg-white hover:shadow-md transition-shadow duration-200"
              >
                <neighborhood.icon className="h-10 w-10 p-2 rounded-full text-[#44475A] bg-[#44475A14]" />

                <div className="flex flex-col justify-between gap-3 text-center sm:text-left">
                  <h3 className="font-bold text-lg sm:text-xl text-[#1A1A1A]">
                    {neighborhood.title}
                  </h3>

                  <ul className="space-y-1">
                    {neighborhood.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center sm:justify-start gap-2 text-sm text-[#666666]"
                      >
                        <span className="h-2 w-2 bg-[#44475A] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default LocationWithExpect;
