"use client";

import SearchBar from "@/components/SearchBar";
import HostelCard from "@/components/StayCard";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Hero from "@/components/stay_by_city/Hero";
import LocationWithExpect from "@/components/stay_by_city/LocationWithExpect";
import Stats from "@/components/stay_by_city/Stats";
import { Tabs } from "@/components/stay_by_city/Tabs";
import { getAllAccomodationByCity } from "@/lib/store/actions/accomodationActions";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const StayListing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [priceFilter, setPriceFilter] = useState("");
  const [stayType, setStayType] = useState("");
  const { accomodationByCityData, loading } = useSelector(
    (state) => state.accomodationByCity
  );
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const paramsObj = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    const { mode, ...filteredParams } = paramsObj;

    if (Object.keys(filteredParams).length > 0) {
      dispatch(getAllAccomodationByCity(filteredParams));
    } else if (Object.keys(paramsObj).length === 1 && paramsObj.mode) {
      console.log("Only mode parameter present, skipping dispatch");
    }
  }, [searchParams, dispatch]);

  const resData = accomodationByCityData || [];
  // console.log("ResData:", resData);

  // Create dynamic tabs from resData
  const dynamicTabs = useMemo(() => {
    return resData.map((areaData, index) => ({
      id: index,
      label: areaData._id
        ? areaData._id.charAt(0).toUpperCase() + areaData._id.slice(1)
        : `Area ${index + 1}`,
      count: areaData.count || 0,
      data: areaData,
    }));
  }, [resData]);

  // Get accommodations for the active tab
  const activeAreaData = dynamicTabs[activeTab]?.data;
  const activeAreaAccommodations = activeAreaData?.accommodations || [];

  // Helper function to safely create location string
  const createLocationString = (accommodation, areaName) => {
    // If accommodation has a location object, handle it properly
    if (accommodation.location && typeof accommodation.location === "object") {
      const { city, area, address } = accommodation.location;
      const parts = [];
      if (area) parts.push(area);
      if (city) parts.push(city);
      if (address) parts.push(address);
      return parts.join(", ");
    }

    // Otherwise build from available fields
    const parts = [];
    if (areaName) parts.push(areaName);
    if (accommodation.city) parts.push(accommodation.city);
    if (accommodation.address) parts.push(accommodation.address);

    return parts.length > 0 ? parts.join(", ") : "Location not specified";
  };

  const dynamicListings = useMemo(() => {
    return activeAreaAccommodations.map((accommodation, index) => {
      const locationString = createLocationString(
        accommodation,
        activeAreaData?._id
      );
      // console.log(accommodation)

      return {
        id: accommodation._id || `acc-${index}`,
        title:
          accommodation.property_name ||
          accommodation.name ||
          `Accommodation ${index + 1}`,
        location: locationString,
        area: activeAreaData?._id || "",
        price:
          Number(accommodation.price) ||
          Number(accommodation.startingPrice) ||
          0,
        rating: Number(accommodation.averageRating) || 0,
        reviews:
          Number(accommodation.totalReviews) ||
          Number(accommodation.reviewCount) ||
          0,
        type: accommodation.type || accommodation.category || "Unknown",
        imgs:
          Array.isArray(accommodation.images) && accommodation.images.length > 0
            ? accommodation.images[0]
            : "/images/default-stay.png",
        rawData: accommodation,
      };
    });
  }, [activeAreaAccommodations, activeAreaData]);

  // Find the label of the currently active tab
  const activeArea = dynamicTabs[activeTab]?.label;

  // Filter listings based on filters
  const filteredListings = dynamicListings.filter((item) => {
    const matchesPrice = priceFilter ? item.price <= Number(priceFilter) : true;
    const matchesStayType = stayType ? item.type === stayType : true;
    return matchesPrice && matchesStayType;
  });

  // Handle loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accommodations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Hero paramsObj={paramsObj} />
      <SearchBar initialParams={paramsObj} />
      <section className="px-4 sm:px-8 lg:px-20 pb-12 space-y-4 lg:space-y-8">
        <Stats stats={activeAreaData} />

        {dynamicTabs.length > 0 ? (
          <>
            <RevealOnScroll delay={0.2}>
              <Tabs
                tabs={dynamicTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                stayType={stayType}
                setStayType={setStayType}
              />
            </RevealOnScroll>

            <div className="mt-8 lg:mt-10">
              <RevealOnScroll delay={0.3}>
                {/* Dynamic section header */}
                <p className="text-sm text-[#44475A] font-semibold">
                  Featured in{" "}
                  {paramsObj.city
                    ? paramsObj.city.charAt(0).toUpperCase() +
                      paramsObj.city.slice(1)
                    : "Your City"}
                </p>

                <h3 className="text-2xl text-[#1A1A1A] font-bold py-2">
                  Top picks in {activeArea || "this area"}
                </h3>

                <p className="text-[#666666] text-base mb-4">
                  {activeAreaData?.count || 0} verified stays with great reviews
                </p>
              </RevealOnScroll>

              {/* Listings grid */}
              {/* {console.log(filteredListings)} */}
              <RevealOnScroll delay={0.4}>
                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredListings.map((item) => (
                      <HostelCard
                        key={item.id}
                        {...item}
                        paramsObj={paramsObj}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-2">
                      No stays found in {activeArea} with current filters.
                    </p>
                    <button
                      onClick={() => {
                        setPriceFilter("");
                        setStayType("");
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </RevealOnScroll>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No accommodations found for your search.
            </p>
            <p className="text-gray-400">
              Try adjusting your search criteria or explore different areas.
            </p>
          </div>
        )}

        <LocationWithExpect params={paramsObj} />
      </section>
    </div>
  );
};

export default StayListing;
