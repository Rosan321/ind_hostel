// "use client";

// import SearchBar from "@/components/SearchBar";
// import HostelCard from "@/components/StayCard";
// import RevealOnScroll from "@/components/animations/RevealOnScroll";
// import Hero from "@/components/stay_by_city/Hero";
// import LocationWithExpect from "@/components/stay_by_city/LocationWithExpect";
// import Stats from "@/components/stay_by_city/Stats";
// import { Tabs } from "@/components/stay_by_city/Tabs";
// import { getAllAccomodationByCity } from "@/lib/store/actions/accomodationActions";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const StayListing = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [priceFilter, setPriceFilter] = useState("");
//   const [stayType, setStayType] = useState("");
//   const { accomodationByCityData, loading } = useSelector(
//     (state) => state.accomodationByCity
//   );
//   const searchParams = useSearchParams();
//   const dispatch = useDispatch();
//   const paramsObj = Object.fromEntries(searchParams.entries());

//   useEffect(() => {
//     const { mode, ...filteredParams } = paramsObj;

//     if (Object.keys(filteredParams).length > 0) {
//       dispatch(getAllAccomodationByCity(filteredParams));
//     } else if (Object.keys(paramsObj).length === 1 && paramsObj.mode) {
//       console.log("Only mode parameter present, skipping dispatch");
//     }
//   }, [searchParams, dispatch]);

//   const resData = accomodationByCityData || [];
//   // console.log("ResData:", resData);

//   // Create dynamic tabs from resData
//   const dynamicTabs = useMemo(() => {
//     return resData.map((areaData, index) => ({
//       id: index,
//       label: areaData._id
//         ? areaData._id.charAt(0).toUpperCase() + areaData._id.slice(1)
//         : `Area ${index + 1}`,
//       count: areaData.count || 0,
//       data: areaData,
//     }));
//   }, [resData]);

//   // Get accommodations for the active tab
//   const activeAreaData = dynamicTabs[activeTab]?.data;
//   const activeAreaAccommodations = activeAreaData?.accommodations || [];

//   // Helper function to safely create location string
//   const createLocationString = (accommodation, areaName) => {
//     // If accommodation has a location object, handle it properly
//     if (accommodation.location && typeof accommodation.location === "object") {
//       const { city, area, address } = accommodation.location;
//       const parts = [];
//       if (area) parts.push(area);
//       if (city) parts.push(city);
//       if (address) parts.push(address);
//       return parts.join(", ");
//     }

//     // Otherwise build from available fields
//     const parts = [];
//     if (areaName) parts.push(areaName);
//     if (accommodation.city) parts.push(accommodation.city);
//     if (accommodation.address) parts.push(accommodation.address);

//     return parts.length > 0 ? parts.join(", ") : "Location not specified";
//   };

//   const dynamicListings = useMemo(() => {
//     return activeAreaAccommodations.map((accommodation, index) => {
//       const locationString = createLocationString(
//         accommodation,
//         activeAreaData?._id
//       );
//       // console.log(accommodation)

//       return {
//         id: accommodation._id || `acc-${index}`,
//         title:
//           accommodation.property_name ||
//           accommodation.name ||
//           `Accommodation ${index + 1}`,
//         location: locationString,
//         area: activeAreaData?._id || "",
//         price:
//           Number(accommodation.price) ||
//           Number(accommodation.startingPrice) ||
//           0,
//         rating: Number(accommodation.averageRating) || 0,
//         reviews:
//           Number(accommodation.totalReviews) ||
//           Number(accommodation.reviewCount) ||
//           0,
//         type: accommodation.type || accommodation.category || "Unknown",
//         imgs:
//           Array.isArray(accommodation.images) && accommodation.images.length > 0
//             ? accommodation.images[0]
//             : "/images/default-stay.png",
//         rawData: accommodation,
//       };
//     });
//   }, [activeAreaAccommodations, activeAreaData]);

//   // Find the label of the currently active tab
//   const activeArea = dynamicTabs[activeTab]?.label;

//   // Filter listings based on filters
//   const filteredListings = dynamicListings.filter((item) => {
//     const matchesPrice = priceFilter ? item.price <= Number(priceFilter) : true;
//     const matchesStayType = stayType ? item.type === stayType : true;
//     return matchesPrice && matchesStayType;
//   });

//   // Handle loading state
//   if (loading) {
//     return (
//       <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading accommodations...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100">
//       <Hero paramsObj={paramsObj} />
//       <SearchBar initialParams={paramsObj} />
//       <section className="px-4 sm:px-8 lg:px-20 pb-12 space-y-4 lg:space-y-8">
//         <Stats stats={activeAreaData} />

//         {dynamicTabs.length > 0 ? (
//           <>
//             <RevealOnScroll delay={0.2}>
//               <Tabs
//                 tabs={dynamicTabs}
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//                 priceFilter={priceFilter}
//                 setPriceFilter={setPriceFilter}
//                 stayType={stayType}
//                 setStayType={setStayType}
//               />
//             </RevealOnScroll>

//             <div className="mt-8 lg:mt-10">
//               <RevealOnScroll delay={0.3}>
//                 {/* Dynamic section header */}
//                 <p className="text-sm text-[#44475A] font-semibold">
//                   Featured in{" "}
//                   {paramsObj.city
//                     ? paramsObj.city.charAt(0).toUpperCase() +
//                       paramsObj.city.slice(1)
//                     : "Your City"}
//                 </p>

//                 <h3 className="text-2xl text-[#1A1A1A] font-bold py-2">
//                   Top picks in {activeArea || "this area"}
//                 </h3>

//                 <p className="text-[#666666] text-base mb-4">
//                   {activeAreaData?.count || 0} verified stays with great reviews
//                 </p>
//               </RevealOnScroll>

//               {/* Listings grid */}
//               {/* {console.log(filteredListings)} */}
//               <RevealOnScroll delay={0.4}>
//                 {filteredListings.length > 0 ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {filteredListings.map((item) => (
//                       <HostelCard
//                         key={item.id}
//                         {...item}
//                         paramsObj={paramsObj}
//                       />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <p className="text-gray-500 text-lg mb-2">
//                       No stays found in {activeArea} with current filters.
//                     </p>
//                     <button
//                       onClick={() => {
//                         setPriceFilter("");
//                         setStayType("");
//                       }}
//                       className="text-blue-600 hover:text-blue-800 font-medium"
//                     >
//                       Clear filters
//                     </button>
//                   </div>
//                 )}
//               </RevealOnScroll>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg mb-4">
//               No accommodations found for your search.
//             </p>
//             <p className="text-gray-400">
//               Try adjusting your search criteria or explore different areas.
//             </p>
//           </div>
//         )}

//         <LocationWithExpect params={paramsObj} />
//       </section>
//     </div>
//   );
// };

// export default StayListing;

/////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import SearchBar from "@/components/SearchBar";
import HostelCard from "@/components/StayCard";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Hero from "@/components/stay_by_city/Hero";
import LocationWithExpect from "@/components/stay_by_city/LocationWithExpect";
import Stats from "@/components/stay_by_city/Stats";
import { Tabs } from "@/components/stay_by_city/Tabs";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Home,
  History,
  Heart,
  Flame,
  SlidersHorizontal,
} from "lucide-react";
import Filters from "@/components/filter/Filters";
import {
  getFilteredAccomodationByArea,
  getFilterNames,
} from "@/lib/store/actions/accomodationActions";
import { setCurrentPage } from "@/lib/store/reducers/filterSlice";
import DataPagination from "@/components/Pagination";

// Helper function to transform raw accommodation data to listing format
const transformToListing = (accommodation, index) => {
  const locationObj = accommodation.location || {};
  const city = locationObj.city || accommodation.city || "";
  const area = locationObj.area || accommodation.area || "";
  const address = locationObj.address || accommodation.address || "";

  const locationString =
    [area, city, address].filter(Boolean).join(", ") ||
    "Location not specified";

  return {
    id: accommodation._id || `acc-${index}`,
    title:
      accommodation.property_name ||
      accommodation.name ||
      `Accommodation ${index + 1}`,
    location: locationString,
    area: area,
    price:
      Number(accommodation.price) ||
      Number(accommodation.startingPrice) ||
      (accommodation.pricing_ids &&
        accommodation.pricing_ids[0]?.pricing &&
        Number(accommodation.pricing_ids[0].pricing[0]?.price)) ||
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
};

const StayListing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [priceFilter, setPriceFilter] = useState("");
  const [stayType, setStayType] = useState("");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const paramsObj = Object.fromEntries(searchParams.entries());

  // New States for additional sections
  const [activeFeatureTab, setActiveFeatureTab] = useState("all");
  const [featureStays, setFeatureStays] = useState([]);
  const [featurePage, setFeaturePage] = useState(1);
  const [featureTotalPages, setFeatureTotalPages] = useState(1);
  const [dealsInCity, setDealsInCity] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [likedStays, setLikedStays] = useState([]);
  // const [fetchingExtra, setFetchingExtra] = useState(false);
  const [fetchingFeatures, setFetchingFeatures] = useState(false);

  // Filter States
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortPrice, setSortPrice] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    location: "",
    stayType: [],
    categories: [],
    roomType: [],
    amenities: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
  });

  const {
    filterData,
    loading: filterLoading,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.filterData);
  const { filterNamesData } = useSelector((state) => state.filterNames);

  const defaultFilters = {
    location: "",
    stayType: [],
    categories: [],
    roomType: [],
    amenities: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
  };

  useEffect(() => {
    dispatch(getFilterNames());
  }, [dispatch]);

  const activeFilterCount = [
    ...appliedFilters.stayType,
    ...(appliedFilters.categories || []),
    ...appliedFilters.roomType,
    ...appliedFilters.amenities,
    appliedFilters.rating,
  ].filter(Boolean).length;

  const fetchFilteredAccomodations = useCallback(() => {
    const params = {
      category:
        appliedFilters.categories.length > 0
          ? appliedFilters.categories
          : paramsObj.category || "",
      location: paramsObj.city || "", // Use current city as base location
      page: currentPage,
      limit: 10,
      roomtype: appliedFilters.roomType,
      amenities: appliedFilters.amenities,
      rating: appliedFilters.rating,
      checkIn: paramsObj.checkIn,
      checkOut: paramsObj.checkOut,
      price: sortPrice, // Add sorting param
    };

    dispatch(getFilteredAccomodationByArea(params));
  }, [
    currentPage,
    appliedFilters,
    sortPrice,
    paramsObj.city,
    paramsObj.category,
    paramsObj.checkIn,
    paramsObj.checkOut,
    dispatch,
  ]);

  useEffect(() => {
    fetchFilteredAccomodations();
  }, [fetchFilteredAccomodations]);

  const handleFilterChange = (filterType, value) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    dispatch(setCurrentPage(1));
  };

  const handleResetFilters = () => {
    setAppliedFilters(defaultFilters);
    dispatch(setCurrentPage(1));
  };

  // Fetch extra sections (Deals, Liked, and Recently Viewed) on city change
  useEffect(() => {
    const fetchExtraData = async () => {
      const city = paramsObj.city || "";

      // Use Promise.allSettled to ensure all APIs are called independently
      // If one fails, the others will still execute and display their data
      const results = await Promise.allSettled([
        axiosInstance.get(
          API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_DEALSINCITY,
          { params: { city } },
        ),
        axiosInstance.get(
          API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_RECENTLY_VIEWS,
        ),
        axiosInstance.get(
          API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_USER_LIKED,
          { params: { city } },
        ),
      ]);

      // Handle Deals
      if (results[0].status === "fulfilled") {
        const dealsRes = results[0].value;
        setDealsInCity(dealsRes.data?.deals || dealsRes.data?.data || []);
      } else {
        console.error("Error fetching deals:", results[0].reason);
      }

      // Handle Recently Viewed
      if (results[1].status === "fulfilled") {
        const recentlyRes = results[1].value;
        setRecentlyViewed(recentlyRes.data?.data || []);
      } else {
        console.error("Error fetching recently viewed:", results[2].reason);
      }

      // Handle Liked Stays
      if (results[2].status === "fulfilled") {
        const likedRes = results[2].value;
        setLikedStays(likedRes.data?.data || []);
      } else {
        console.error("Error fetching liked stays:", results[1].reason);
      }
    };

    fetchExtraData();
  }, [paramsObj.city]);

  // Reset page when tab or city changes
  useEffect(() => {
    setFeaturePage(1);
  }, [activeFeatureTab, paramsObj.city]);

  // Fetch Features based on activeFeatureTab and featurePage
  useEffect(() => {
    const fetchFeatures = async () => {
      setFetchingFeatures(true);
      const city = paramsObj.city || "";
      try {
        const res = await axiosInstance.get(
          API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_FEATURES,
          {
            params: {
              page: featurePage,
              limit: 10,
              city,
              type: activeFeatureTab,
            },
          },
        );
        const newData = res.data?.data || [];
        if (featurePage === 1) {
          setFeatureStays(newData);
        } else {
          setFeatureStays((prev) => [...prev, ...newData]);
        }
        setFeatureTotalPages(res.data?.totalPages || 1);
      } catch (err) {
        console.error(`Error fetching ${activeFeatureTab} features:`, err);
        setFeatureStays([]);
      } finally {
        setFetchingFeatures(false);
      }
    };

    fetchFeatures();
  }, [activeFeatureTab, paramsObj.city, featurePage]);

  // Create dynamic tabs from filterData.data
  const dynamicTabs = useMemo(() => {
    const rawData = filterData?.data || {};
    if (Array.isArray(rawData)) return [];

    return Object.keys(rawData).map((areaName, index) => {
      const areaData = rawData[areaName];
      const accs = areaData.accommodations || [];
      const prices = accs
        .map(
          (a) =>
            Number(a.price) ||
            Number(a.startingPrice) ||
            (a.pricing_ids && a.pricing_ids[0]?.pricing[0]?.price) ||
            0,
        )
        .filter((p) => p > 0);

      return {
        id: index,
        label: areaName.charAt(0).toUpperCase() + areaName.slice(1),
        count: areaData.accommodationCount || 0,
        data: {
          _id: areaName,
          ...areaData,
          count: areaData.accommodationCount || 0,
          totalRatings: areaData.totalRating || 0,
          minPrice: prices.length > 0 ? Math.min(...prices) : 0,
          maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
        },
      };
    });
  }, [filterData?.data]);

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
        activeAreaData?._id,
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

  const displayListings = useMemo(() => {
    const rawData = filterData?.data || {};
    let accommodations = [];
    const currentAreaId = dynamicTabs[activeTab]?.data?._id || "";

    if (Array.isArray(rawData)) {
      accommodations = rawData;
    } else if (typeof rawData === "object" && rawData !== null) {
      // Try to find the exact area matching current tab ID if available
      if (currentAreaId && rawData[currentAreaId]) {
        accommodations = rawData[currentAreaId].accommodations || [];
      } else {
        // Fallback to the first area if no match found or just flatten?
        // Better to flatten if we want to show everything, or just show the current tab.
        // If dynamicTabs has items, currentAreaId should represent the active tab.
        accommodations = Object.values(rawData).flatMap(
          (area) => area.accommodations || [],
        );
      }
    }

    // Local filters (price/type)
    return accommodations
      .map((item, idx) => transformToListing(item, idx))
      .filter((item) => {
        const matchesPrice = priceFilter
          ? item.price <= Number(priceFilter)
          : true;
        const matchesStayType = stayType ? item.type === stayType : true;
        return matchesPrice && matchesStayType;
      });
  }, [filterData?.data, activeTab, dynamicTabs, priceFilter, stayType]);

  const displayLoading = filterLoading;
  const displayCount = totalItems || 0;

  // Handle loading state
  if (filterLoading && !filterData?.data) {
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
      <section
        id="top-picks-section"
        className="px-4 sm:px-8 lg:px-20 pb-12 space-y-4 lg:space-y-8"
      >
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-start gap-4 py-1">
                  <div className="lg:flex items-center gap-3">
                    <section className="flex items-center gap-3">
                      <Sparkles
                        className="text-amber-500 fill-amber-500"
                        size={24}
                      />
                      <h3 className="text-2xl text-[#1A1A1A] font-bold">
                        Top picks in {activeArea || "this area"}
                      </h3>
                    </section>

                    <p className="text-[#666666] text-base">
                      ({displayCount} verified stays with great reviews)
                    </p>
                  </div>

                  <section className="flex items-center gap-3">
                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                      <span className="text-sm font-medium text-gray-500">
                        Sort :
                      </span>
                      <select
                        value={sortPrice}
                        onChange={(e) => {
                          setSortPrice(e.target.value);
                          dispatch(setCurrentPage(1));
                        }}
                        className="text-sm font-semibold text-[#44475A] bg-transparent outline-none cursor-pointer"
                      >
                        <option value="">Default</option>
                        <option value="lowtohigh">Low to High</option>
                        <option value="hightolow">High to Low</option>
                      </select>
                    </div>

                    <button
                      onClick={() => setFiltersOpen(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-[#44475A] hover:bg-gray-50 transition-all shadow-sm"
                    >
                      <SlidersHorizontal size={18} />
                      Filters{" "}
                      {activeFilterCount > 0 && (
                        <span className="bg-[#0D0BA8] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">
                          {activeFilterCount}
                        </span>
                      )}
                    </button>
                  </section>
                </div>
              </RevealOnScroll>

              <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
                {/* Filters Sidebar/Column */}
                <Filters
                  isOpen={filtersOpen}
                  onClose={() => setFiltersOpen(false)}
                  filterNames={filterData?.filters || filterNamesData}
                  appliedFilters={appliedFilters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  type={paramsObj.category || "hostels"}
                  hiddenFilters={["location", "price", "stayType"]}
                />

                {/* Listings grid */}
                <div className="flex-1 w-full">
                  <RevealOnScroll delay={0.4}>
                    {displayLoading ? (
                      <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0D0BA8]"></div>
                      </div>
                    ) : displayListings.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {displayListings.map((item) => (
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
                          onClick={handleResetFilters}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Clear all filters
                        </button>
                      </div>
                    )}
                  </RevealOnScroll>

                  {/* Pagination Section */}
                  {displayListings.length > 0 && totalPages > 1 && (
                    <div className="mt-10 border-t border-gray-100 pt-8">
                      <DataPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                          dispatch(setCurrentPage(page));
                          // Smooth scroll to top of listing section
                          const listingSection =
                            document.getElementById("top-picks-section");
                          if (listingSection) {
                            listingSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
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

        {/* Feature Stays with Tabs - Kept on original gray background */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Home className="text-blue-600" size={24} />
              <h3 className="text-2xl text-[#1A1A1A] font-bold">
                Browse By Property Type
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "budget", "premium", "luxury"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFeatureTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeFeatureTab === tab
                      ? "bg-[#1A1A1A] text-white shadow-lg scale-105"
                      : "bg-white text-[#44475A] border border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <RevealOnScroll delay={0.1}>
            {fetchingFeatures && featurePage === 1 ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : featureStays.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featureStays.map((item, idx) => (
                    <HostelCard
                      key={item._id || idx}
                      {...transformToListing(item, idx)}
                      paramsObj={paramsObj}
                      cardBg="bg-white"
                    />
                  ))}
                </div>

                {fetchingFeatures && featurePage > 1 && (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                )}

                {/* Pagination Buttons */}
                {featureTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      type="button"
                      onClick={() => {
                        // Reset to page 1 and clear if needed?
                        // User said click next show new with existing.
                        // Previous doesn't make much sense in "append" mode unless we just mean scroll.
                        // But for now let's just keep previous as is (though it might be weird if we append).
                        setFeaturePage((prev) => Math.max(prev - 1, 1));
                      }}
                      disabled={featurePage === 1}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                        featurePage === 1
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-white text-[#1A1A1A] border-gray-300 hover:bg-gray-50 hover:border-gray-900 shadow-sm cursor-pointer"
                      }`}
                    >
                      Previous
                    </button>

                    <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                      <span className="text-sm font-medium text-[#44475A]">
                        Page{" "}
                        <span className="text-[#1A1A1A] font-bold">
                          {featurePage}
                        </span>{" "}
                        of {featureTotalPages}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setFeaturePage((prev) =>
                          Math.min(prev + 1, featureTotalPages),
                        )
                      }
                      disabled={featurePage === featureTotalPages}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                        featurePage === featureTotalPages
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-black shadow-md cursor-pointer"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">
                  No {activeFeatureTab.toLowerCase()} stays found in this
                  location.
                </p>
              </div>
            )}
          </RevealOnScroll>
        </div>

        {/* Slider Sections with Reverse Style (White Background Container) */}
        <div className="bg-white -mx-4 sm:-mx-8 lg:-mx-20 px-4 sm:px-8 lg:px-20 py-16 mt-16 border-y border-gray-100">
          <div className="mx-auto space-y-20">
            {/* Deals Section */}
            {dealsInCity.length > 0 && (
              <RevealOnScroll delay={0.1}>
                <div className="">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 italic">
                      <Flame className="text-red-600 fill-red-600" size={20} />
                    </div>
                    <h3 className="text-2xl text-[#1A1A1A] font-bold">
                      Deals in Your City
                    </h3>
                  </div>
                  <div className="max-w-[1400px] mx-auto relative group px-1">
                    {/* Custom Navigation Buttons */}
                    <button className="deals-prev absolute -left-4 lg:-left-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronLeft size={24} />
                    </button>
                    <button className="deals-next absolute -right-4 lg:-right-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronRight size={24} />
                    </button>

                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={24}
                      slidesPerView={1}
                      navigation={{
                        prevEl: ".deals-prev",
                        nextEl: ".deals-next",
                      }}
                      pagination={{
                        clickable: true,
                        el: ".deals-pagination",
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                      }}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 4 },
                      }}
                      className="pb-16"
                    >
                      {dealsInCity.map((item, idx) => (
                        <SwiperSlide key={item._id || idx} className="py-2">
                          <HostelCard
                            {...transformToListing(item, idx)}
                            paramsObj={paramsObj}
                            cardBg="bg-gray-100"
                          />
                        </SwiperSlide>
                      ))}
                      <div className="deals-pagination custom-pagination mt-10"></div>
                    </Swiper>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Recently Viewed Section */}
            {recentlyViewed.length > 0 && (
              <RevealOnScroll delay={0.1}>
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <History className="text-gray-600" size={28} />
                    <h3 className="text-2xl text-[#1A1A1A] font-bold">
                      Recently Viewed
                    </h3>
                  </div>
                  <div className="max-w-[1400px] mx-auto relative group px-1">
                    {/* Custom Navigation Buttons */}
                    <button className="recent-prev absolute -left-4 lg:-left-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronLeft size={24} />
                    </button>
                    <button className="recent-next absolute -right-4 lg:-right-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronRight size={24} />
                    </button>

                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={24}
                      slidesPerView={1}
                      navigation={{
                        prevEl: ".recent-prev",
                        nextEl: ".recent-next",
                      }}
                      pagination={{
                        clickable: true,
                        el: ".recent-pagination",
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                      }}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 4 },
                      }}
                      className="pb-16"
                    >
                      {recentlyViewed.map((item, idx) => (
                        <SwiperSlide key={item._id || idx} className="py-2">
                          <HostelCard
                            {...transformToListing(item, idx)}
                            paramsObj={paramsObj}
                            cardBg="bg-gray-100"
                          />
                        </SwiperSlide>
                      ))}
                      <div className="recent-pagination custom-pagination mt-10"></div>
                    </Swiper>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* User Liked Section */}
            {likedStays.length > 0 && (
              <RevealOnScroll delay={0.1}>
                <div className="">
                  <div className="flex items-center gap-3 mb-8">
                    <Heart className="text-red-500 fill-red-500" size={28} />
                    <h3 className="text-2xl text-[#1A1A1A] font-bold">
                      Properties You Liked
                    </h3>
                  </div>
                  <div className="relative group px-1 max-w-[1400px] mx-auto">
                    {/* Custom Navigation Buttons */}
                    <button className="liked-prev absolute -left-4 lg:-left-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronLeft size={24} />
                    </button>
                    <button className="liked-next absolute -right-4 lg:-right-12 top-[40%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#0D0BA8] shadow-xl flex items-center justify-center text-white hover:bg-[#2A32FF] transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hidden lg:flex">
                      <ChevronRight size={24} />
                    </button>

                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={24}
                      slidesPerView={1}
                      navigation={{
                        prevEl: ".liked-prev",
                        nextEl: ".liked-next",
                      }}
                      pagination={{
                        clickable: true,
                        el: ".liked-pagination",
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                      }}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 4 },
                      }}
                      className="pb-16"
                    >
                      {likedStays.map((item, idx) => (
                        <SwiperSlide key={item._id || idx} className="py-2">
                          <HostelCard
                            {...transformToListing(item, idx)}
                            paramsObj={paramsObj}
                            cardBg="bg-gray-100"
                          />
                        </SwiperSlide>
                      ))}
                      <div className="liked-pagination custom-pagination mt-10"></div>
                    </Swiper>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>

        <LocationWithExpect params={paramsObj} />
      </section>
    </div>
  );
};

export default StayListing;
