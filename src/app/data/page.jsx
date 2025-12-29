// This code returns everything fine but not reset the filters when sortby selected

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
// import Filters from "@/components/filter/Filters";
// import SearchBar from "@/components/SearchBar";
// import StayGrid from "@/components/StayGrid";

// import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";

// import { getAllFilteredData } from "@/lib/store/actions/filterActions";
// import { getSortData } from "@/lib/store/actions/accomodationActions";
// import { setCurrentPage } from "@/lib/store/reducers/filterSlice";

// export default function HostelListingPage() {
//   const dispatch = useDispatch();
//   const searchParams = useSearchParams();

//   const type = searchParams.get("type");
//   const category = searchParams.get("category");

//   const {
//     filterData = {},
//     currentPage = 1,
//     totalPages = 1,
//     loading,
//   } = useSelector((state) => state.filterData);

//   /* ---------------- UI STATE ---------------- */
//   const [filtersOpen, setFiltersOpen] = useState(false);
//   const [sortBy, setSortBy] = useState("default");
//   const [appliedFilters, setAppliedFilters] = useState({
//     location: "",
//     stayType: [],
//     roomType: [],
//     amenities: [],
//     priceRange: { min: 0, max: 10000 },
//     rating: null,
//   });

//   /* ---------------- FILTER API ---------------- */
//   const fetchAccomodations = useCallback(() => {
//     if (!type || !category) return;

//     const params = {
//       category_name: category,
//       page: currentPage,
//       limit: 10,
//       location: appliedFilters.location,
//       stayType: appliedFilters.stayType,
//       roomType: appliedFilters.roomType,
//       amenities: appliedFilters.amenities,
//       priceRange: appliedFilters.priceRange,
//       rating: appliedFilters.rating,
//     };

//     dispatch(getAllFilteredData(params));
//   }, [type, category, currentPage, appliedFilters, dispatch]);

//   /* 🔥 FILTER EFFECT (NO SORT HERE) */
//   useEffect(() => {
//     fetchAccomodations();
//   }, [fetchAccomodations]);

//   /* ---------------- HANDLERS ---------------- */
//   const handleFilterChange = (filterType, value) => {
//     setAppliedFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//     dispatch(setCurrentPage(1));
//     setSortBy("default");
//   };

//   const handleSortChange = (e) => {
//     const value = e.target.value;
//     setSortBy(value);
//     dispatch(setCurrentPage(1));

//     // 🔁 Default sorting → back to filter API
//     if (value === "default") {
//       fetchAccomodations();
//       return;
//     }

//     if (!category) return;

//     dispatch(
//       getSortData({
//         category,
//         hightolow: value === "hightolow",
//         lowtohigh: value === "lowtohigh",
//       })
//     );
//   };

//   const handleResetFilters = () => {
//     setAppliedFilters({
//       location: "",
//       stayType: [],
//       roomType: [],
//       amenities: [],
//       priceRange: { min: 0, max: 10000 },
//       rating: null,
//     });
//     setSortBy("default");
//     dispatch(setCurrentPage(1));
//   };

//   /* ---------------- HELPERS ---------------- */
//   const formatCategory = (cat) =>
//     cat
//       ?.replace(/([A-Z])/g, " $1")
//       .replace(/\+/g, " ")
//       .replace(/\s+/g, " ")
//       .trim();

//   const activeFilterCount = [
//     appliedFilters.location,
//     ...appliedFilters.stayType,
//     ...appliedFilters.roomType,
//     ...appliedFilters.amenities,
//     appliedFilters.rating,
//   ].filter(Boolean).length;

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="bg-gray-100 px-4 sm:px-8 lg:px-20">
//       <SearchBar />

//       <div className="flex flex-col lg:flex-row gap-6 pt-6 lg:pt-12 pb-12 lg:pb-24">
//         {/* Filters */}
//         <Filters
//           isOpen={filtersOpen}
//           onClose={() => setFiltersOpen(false)}
//           filterNames={filterData?.filters}
//           appliedFilters={appliedFilters}
//           onFilterChange={handleFilterChange}
//           onResetFilters={handleResetFilters}
//           type={type}
//         />

//         {/* Content */}
//         <div className="flex-1">
//           <ShuffleInOnScroll delay={0.2}>
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//               {/* Mobile Filters */}
//               <div className="lg:hidden flex items-center gap-2">
//                 <button
//                   onClick={() => setFiltersOpen(true)}
//                   className="border rounded-lg px-4 py-2 flex items-center gap-2 font-bold"
//                 >
//                   <SlidersHorizontal size={18} />
//                   Filters
//                   {activeFilterCount > 0 && (
//                     <span className="ml-2 bg-blue-600 text-white text-xs px-2 rounded-full">
//                       {activeFilterCount}
//                     </span>
//                   )}
//                 </button>

//                 {activeFilterCount > 0 && (
//                   <button
//                     onClick={handleResetFilters}
//                     className="text-sm text-blue-600"
//                   >
//                     Clear all
//                   </button>
//                 )}
//               </div>

//               {/* Heading */}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Showing results for{" "}
//                   <span className="text-blue-600 capitalize">
//                     {type} - {formatCategory(category)}
//                   </span>
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {filterData?.pagination?.count || 0} properties found
//                 </p>
//               </div>

//               {/* Sort */}
//               <div className="flex items-center gap-3">
//                 <ArrowDownWideNarrow />
//                 <select
//                   className="border rounded-lg px-3 py-2 text-sm bg-white"
//                   value={sortBy}
//                   onChange={handleSortChange}
//                 >
//                   <option value="default">Default Sorting</option>
//                   <option value="lowtohigh">Price: Low to High</option>
//                   <option value="hightolow">Price: High to Low</option>
//                 </select>
//               </div>
//             </div>
//           </ShuffleInOnScroll>

//           <ShuffleInOnScroll delay={0.4}>
//             <StayGrid
//               stays={filterData?.data || []}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               loading={loading}
//               totalItems={filterData?.total}
//             />
//           </ShuffleInOnScroll>
//         </div>
//       </div>
//     </div>
//   );
// }


//////////////////////////////////////////////////////////////////////////////////////

// This works awesome but initally calling 3 time the filter api 

"use client";

import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import Filters from "@/components/filter/Filters";
import SearchBar from "@/components/SearchBar";
import StayGrid from "@/components/StayGrid";

import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";

import { getAllFilteredData } from "@/lib/store/actions/filterActions";
import { getSortData } from "@/lib/store/actions/accomodationActions";
import { setCurrentPage } from "@/lib/store/reducers/filterSlice";

function HostelListingContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const category = searchParams.get("category");

  const {
    filterData = {},
    currentPage = 1,
    totalPages = 1,
    loading,
  } = useSelector((state) => state.filterData);

  /* ---------------- STATE ---------------- */
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [appliedFilters, setAppliedFilters] = useState({
    location: "",
    stayType: [],
    roomType: [],
    amenities: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
  });

  // Track the last action type
  const lastActionRef = useRef("filter"); // 'filter' or 'sort'

  /* ---------------- DEFAULT FILTERS ---------------- */
  const defaultFilters = {
    location: "",
    stayType: [],
    roomType: [],
    amenities: [],
    priceRange: { min: 0, max: 10000 },
    rating: null,
  };

  /* ---------------- FILTER API ---------------- */
  const fetchAccomodations = useCallback(() => {
    if (!type || !category) return;

    const params = {
      category_name: category,
      page: currentPage,
      limit: 10,
      location: appliedFilters.location,
      stayType: appliedFilters.stayType,
      roomType: appliedFilters.roomType,
      amenities: appliedFilters.amenities,
      priceRange: appliedFilters.priceRange,
      rating: appliedFilters.rating,
    };

    lastActionRef.current = "filter";
    dispatch(getAllFilteredData(params));
  }, [type, category, currentPage, appliedFilters, dispatch]);

  /* ---------------- SORT API ---------------- */
  const fetchSortedData = useCallback(() => {
    if (!category || sortBy === "default") return;

    dispatch(
      getSortData({
        category,
        hightolow: sortBy === "hightolow",
        lowtohigh: sortBy === "lowtohigh",
        page: currentPage,
        limit: 10,
      })
    );
    lastActionRef.current = "sort";
  }, [category, sortBy, currentPage, dispatch]);

  /* ---------------- EFFECTS ---------------- */
  // Effect for filters (only runs when filters change)
  useEffect(() => {
    if (lastActionRef.current === "filter") {
      fetchAccomodations();
    }
  }, [fetchAccomodations]);

  // Effect for sorting (only runs when sort changes)
  useEffect(() => {
    if (lastActionRef.current === "sort" || sortBy !== "default") {
      fetchSortedData();
    }
  }, [fetchSortedData]);

  // Initial load
  useEffect(() => {
    if (type && category) {
      lastActionRef.current = "filter";
      fetchAccomodations();
    }
  }, [type, category]);

  // Effect for page changes
  useEffect(() => {
    if (lastActionRef.current === "filter") {
      fetchAccomodations();
    } else if (lastActionRef.current === "sort") {
      fetchSortedData();
    }
  }, [currentPage]);

  /* ---------------- HANDLERS ---------------- */
  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...appliedFilters,
      [filterType]: value,
    };
    
    setAppliedFilters(newFilters);
    lastActionRef.current = "filter";
    dispatch(setCurrentPage(1));
    setSortBy("default");
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    dispatch(setCurrentPage(1));

    if (value === "default") {
      // When going back to default, use current filters
      lastActionRef.current = "filter";
      fetchAccomodations();
    } else {
      // For sorting, reset filters
      setAppliedFilters(defaultFilters);
      lastActionRef.current = "sort";
    }
  };

  const handleResetFilters = () => {
    setAppliedFilters(defaultFilters);
    setSortBy("default");
    dispatch(setCurrentPage(1));
    lastActionRef.current = "filter";
  };

  /* ---------------- HELPERS ---------------- */
  const formatCategory = (cat) =>
    cat
      ?.replace(/([A-Z])/g, " $1")
      .replace(/\+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const activeFilterCount = [
    appliedFilters.location,
    ...appliedFilters.stayType,
    ...appliedFilters.roomType,
    ...appliedFilters.amenities,
    appliedFilters.rating,
  ].filter(Boolean).length;

  // Determine which data to display based on last action
  const displayData = lastActionRef.current === "sort" 
    ? (filterData?.sortedData || filterData?.data || [])
    : (filterData?.data || []);

  const displayCount = lastActionRef.current === "sort"
    ? (filterData?.sortedCount || filterData?.pagination?.count || 0)
    : (filterData?.pagination?.count || 0);

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-gray-100 px-4 sm:px-8 lg:px-20">
      <SearchBar />

      <div className="flex flex-col lg:flex-row gap-6 pt-6 lg:pt-12 pb-12 lg:pb-24">
        {/* Filters */}
        <Filters
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filterNames={filterData?.filters}
          appliedFilters={appliedFilters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          type={type}
          disabled={sortBy !== "default"}
        />

        {/* Content */}
        <div className="flex-1">
          <ShuffleInOnScroll delay={0.2}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              {/* Mobile Filters */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className={`border rounded-lg px-4 py-2 flex items-center gap-2 font-bold ${
                    sortBy !== "default" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={sortBy !== "default"}
                >
                  <SlidersHorizontal size={18} />
                  Filters
                  {activeFilterCount > 0 && sortBy === "default" && (
                    <span className="ml-2 bg-blue-600 text-white text-xs px-2 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {activeFilterCount > 0 && sortBy === "default" && (
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-blue-600"
                  >
                    Clear all
                  </button>
                )}
                
                {sortBy !== "default" && (
                  <span className="text-sm text-gray-500">
                    Filters disabled while sorting
                  </span>
                )}
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Showing results for{" "}
                  <span className="text-blue-600 capitalize">
                    {type} - {formatCategory(category)}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
                  {displayCount} properties found
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <ArrowDownWideNarrow />
                <select
                  className="border rounded-lg px-3 py-2 text-sm bg-white"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="default">Default Sorting</option>
                  <option value="lowtohigh">Price: Low to High</option>
                  <option value="hightolow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </ShuffleInOnScroll>

          <ShuffleInOnScroll delay={0.4}>
            <StayGrid
              stays={displayData}
              currentPage={currentPage}
              totalPages={totalPages}
              loading={loading}
              totalItems={displayCount}
            />
          </ShuffleInOnScroll>
        </div>
      </div>
    </div>
  );
}

export default function HostelListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading filters...</div>
      </div>
    }>
      <HostelListingContent />
    </Suspense>
  );
}

