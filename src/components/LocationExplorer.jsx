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
  const { toplocationData, loading } = useSelector((state) => state.toplocation);
  const { filterNamesData } = useSelector((state) => state.filterNames);
  
  // Get cities from filterNamesData
  const cities = filterNamesData?.locations?.map((item) => ({
    name: item._id,
    image: item.image || "/images/mum.png"
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
      dispatch(getTopLocationByCity({ 
        city: selectedCity 
      }));
    }
  }, [selectedCity, dispatch]);
  
  // Helper function to get random dates
  const getRandomDates = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    // Format as YYYY-MM-DD
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    return {
      checkin: formatDate(today),
      checkout: formatDate(nextMonth)
    };
  };

  // Helper function to get lowest price from pricingData
  const getLowestPrice = (pricingData) => {
    if (!pricingData || !Array.isArray(pricingData)) return "Price not available";
    
    let lowestPrice = Infinity;
    pricingData.forEach(pricingItem => {
      if (pricingItem.pricing && Array.isArray(pricingItem.pricing)) {
        pricingItem.pricing.forEach(price => {
          if (price.price && price.price < lowestPrice) {
            lowestPrice = price.price;
          }
        });
      }
    });
    
    return lowestPrice === Infinity ? "Price not available" : `₹${lowestPrice}/month`;
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
        <div className="text-center mb-8 lg:mb-12">
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
                    className={`flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 rounded-full text-base font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      selectedCity === city.name
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-12 items-start">
            {/* Left - City Image */}
            <ShuffleInOnScroll intensity={70} delay={0.1}>
              <div className="rounded-2xl overflow-hidden w-full h-64 sm:h-[520px] lg:h-[420px] xl:h-[540px] transform transition duration-300 hover:scale-102">
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
            </ShuffleInOnScroll>

            {/* Right - Top Hostels */}
            <div className="rounded-2xl">
              <h3 className="text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 mb-4 xl:mb-6">
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  `Top Hostels in ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`
                )}
              </h3>

              {/* Hostel List */}
              <div className="xl:space-y-6">
                {loading ? (
                  <>
                    <SkeletonLoader />
                  </>
                ) : hostels.length > 0 ? (
                  // Display actual hostels
                  hostels.slice(0, 3).map((hostel, index) => (
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
                            {hostel.property_name ? hostel.property_name.charAt(0).toUpperCase() + hostel.property_name.slice(1) : "Unnamed Hostel"}
                          </h4>
                          
                          {/* Price */}
                          <p className="text-base lg:text-lg font-bold text-[#2A32FF] xl:my-2">
                            {getLowestPrice(hostel.pricingData)}
                          </p>
                          
                          {/* Amenities - Show up to 3 */}
                          {hostel.amenities && hostel.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2 my-1 xl:mb-4">
                              {hostel.amenities.slice(0, 3).map((amenity, idx) => (
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
                  ))
                ) : (
                  <p className="text-gray-500">
                    No hostels available in {selectedCity}
                  </p>
                )}
              </div>

              {/* View All Button */}
              {!loading && hostels.length > 0 && (
                <div className="mt-4 lg:mt-0 xl:mt-4">
                  <Link
                    href={`/location?type=hostels&city=${selectedCity.toLowerCase()}&checkIn=${dates.checkin}&checkOut=${dates.checkout}`}
                    className="lg:inline-block bg-[#44475A] hover:bg-[#33364b] text-white px-12 lg:px-5 py-2 lg:py-3 rounded-full font-semibold transition-colors duration-300"
                  >
                    View Deals
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </RevealOnScroll>
  );
};

export default LocationExplorer;