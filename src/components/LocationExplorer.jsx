"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RevealOnScroll from "./animations/RevealOnScroll";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";
import { useDispatch, useSelector } from "react-redux";
import { getTopLocationByCity } from "@/lib/store/actions/accomodationActions";
import { SkeletonLoader } from "./loader/SkeletonLoader";
import { SpinnerLoader } from "./loader/SpinnerLoader";

const LocationExplorer = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const dispatch = useDispatch();
  const { toplocationData, loading } = useSelector(
    (state) => state.toplocation,
  );
  const { filterNamesData } = useSelector((state) => state.filterNames);

  // Get cities from filterNamesData
  const cities =
    filterNamesData?.locations?.map((item) => ({
      name: item._id,
      image: item.image || "/images/mum.png",
    })) || [];

  // Set initial selected city when cities data is available
  useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[0].name);
    }
  }, [cities, selectedCity]);

  // Fetch accommodations when selected city changes
  useEffect(() => {
    if (selectedCity) {
      // console.log("Dispatching action for city:", selectedCity);
      dispatch(
        getTopLocationByCity({
          city: selectedCity,
        }),
      );
    }
  }, [selectedCity, dispatch]);

  // Helper function to get random dates
  const getRandomDates = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    // Format as YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    return {
      checkin: formatDate(today),
      checkout: formatDate(nextMonth),
    };
  };

  // Helper function to get lowest price from pricingData
  const getLowestPrice = (pricingData) => {
    if (!pricingData || !Array.isArray(pricingData))
      return "Price not available";

    let lowestPrice = Infinity;
    pricingData.forEach((pricingItem) => {
      if (pricingItem.pricing && Array.isArray(pricingItem.pricing)) {
        pricingItem.pricing.forEach((price) => {
          if (price.price && price.price < lowestPrice) {
            lowestPrice = price.price;
          }
        });
      }
    });

    return lowestPrice === Infinity
      ? "Price not available"
      : `₹${lowestPrice}/month`;
  };

  // Get hostels data from API response
  const getHostelsData = () => {
    if (!toplocationData) return [];

    // Handle different response structures
    if (Array.isArray(toplocationData)) {
      return toplocationData;
    }

    if (toplocationData.data && Array.isArray(toplocationData.data)) {
      return toplocationData.data;
    }

    return [];
  };

  const hostels = getHostelsData();
  const dates = getRandomDates();

  return (
    <RevealOnScroll>
      <section className="bg-gray-100 py-12 xl:py-24 px-4 sm:px-8 lg:px-20">
        {/* Header Section */}
        <div className="text-center md:mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Explore Our Locations
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose your city to find hostels near you
          </p>

          {/* City Buttons */}
          {cities.length > 0 ? (
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex gap-4 min-w-max md:justify-center mb-4">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setSelectedCity(city.name)}
                    className={`flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 rounded-full text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${selectedCity === city.name
                        ? "bg-[#2A32FF] text-white shadow-lg"
                        : "border border-gray-300 text-gray-800 hover:bg-[#2A32FF] hover:text-white"
                      }`}
                  >
                    {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <SpinnerLoader />
            </>
          )}
        </div>

        {/* Main Content */}
        {selectedCity && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT - Top Hostels */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Top Hostels in {selectedCity?.charAt(0).toUpperCase() + selectedCity?.slice(1)}
              </h3>

              <div className="flex flex-col gap-6 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {hostels.map((hostel, index) => (
                  <ShuffleInOnScroll
                      key={hostel._id || index}
                      delay={0.15 * index}
                      intensity={50}
                    >
                      <div className="flex gap-4 items-start transform transition duration-300 hover:scale-102 space-y-4">
                        {/* Hostel Image */}
                        <div className="relative w-28 h-28 lg:w-28 lg:h-28 flex-shrink-0">
                          <Image
                            src={
                              hostel.images_url?.[0] ||
                              hostel.images?.[0] ||
                              "/images/default-hostel.jpg"
                            }
                            alt={hostel.property_name || "Hostel"}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100px, 112px"
                          />
                        </div>

                        {/* Hostel Details */}
                        <div className="flex-1 min-w-0">
                          {/* Hostel Name */}
                          <h4 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
                            {hostel.property_name
                              ? hostel.property_name.charAt(0).toUpperCase() +
                                hostel.property_name.slice(1)
                              : "Unnamed Hostel"}
                          </h4>

                          {/* Price */}
                          <p className="text-base lg:text-lg font-bold text-[#2A32FF] xl:my-2">
                            {getLowestPrice(hostel.pricingData)}
                          </p>

                          {/* Amenities - Show up to 3 */}
                          {hostel.amenities && hostel.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2 my-1 xl:mb-4">
                              {hostel.amenities
                                .slice(0, 3)
                                .map((amenity, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-white border border-gray-300 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium capitalize"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                            </div>
                          )}

                          {/* Verified Badge */}
                          {hostel.isverified && (
                            <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Verified
                            </div>
                          )}
                        </div>
                      </div>
                    </ShuffleInOnScroll>
                ))}
              </div>

              {!loading && hostels.length > 0 && (
                <div className="mt-4 xl:mt-4">
                  <Link
                    href={`/location?type=hostels&city=${selectedCity.toLowerCase()}&checkIn=${dates.checkin}&checkOut=${dates.checkout}`}
                    className="lg:inline-block bg-[#44475A] hover:bg-[#33364b] text-white px-12 lg:px-5 py-2 lg:py-3 rounded-full font-semibold transition-colors duration-300"
                  >
                    See All
                  </Link>
                </div>
              )}
            </div>

            {/* CENTER - Big City Image */}
            <div className="hidden lg:block relative rounded-3xl overflow-hidden h-[500px] shadow-xl">
              <Image
                src={
                  cities.find((c) => c.name === selectedCity)?.image ||
                  "/images/mum.png"
                }
                alt={selectedCity}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 text-white" />
            </div>

            {/* RIGHT - Ads Section */}
            <div className="space-y-6">
              {/* Ad Card */}
              <div className="bg-white rounded-2xl shadow-md p-4">
                <p className="text-xs text-gray-400 text-right font-semibold pb-4">Sponsored</p>
                <div className="h-1 bg-gradient-to-r from-[#00BFA6] to-[#0D0BA8]" />
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <p className="font-semibold text-xl text-[#1A1A1A] mt-2">
                    Find Hotels in {selectedCity}
                  </p>
                  <p className="text-sm text-[#666666] mb-4">
                    Compare Top Travel Sites
                  </p>
                  <button className="w-full bg-[#0D0BA8] text-white py-3 rounded-xl font-semibold">
                    Visit Site
                  </button>
                </div>
                <section className="flex items-center justify-evenly mt-6">
                  <p>Ad</p>
                  <Image
                    src="/images/GoogleAd.png"
                    alt="close"
                    width={86}
                    height={56}
                    className="cursor-pointer object-cover"
                  />
                </section>
              </div>

              {/* Offer Card */}
              <div className="rounded-2xl p-6 bg-gradient-to-r from-[#0D0BA8] to-[#00BFA6] text-white">
                <h4 className="font-semibold text-lg">
                  Festive Offer - Save 20%
                </h4>
                <p className="text-base font-semibold text-end mt-6">Explore Deals →</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </RevealOnScroll>
  );
};

export default LocationExplorer;
