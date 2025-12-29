"use client";

import { Funnel, SlidersHorizontal, X } from "lucide-react";
import SearchFilter from "./SearchFilter";
import PriceFilter from "./PriceFilter";
import StayType from "./StayType";
import RoomType from "./RoomType";
import AmentiesFilter from "./AmentiesFilter";
import RatingFilter from "./RatingFilter";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";

export default function Filters({
  filterNames,
  isOpen,
  onClose,
  appliedFilters,
  onFilterChange,
  onResetFilters,
  type,
}) {
  // console.log(type);

  const handleLocationChange = (location) => {
    onFilterChange("location", location);
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange("priceRange", priceRange);
  };

  const handleStayTypeChange = (stayTypes) => {
    onFilterChange("stayType", stayTypes);
  };

  const handleRoomTypeChange = (roomTypes) => {
    onFilterChange("roomType", roomTypes);
  };

  const handleAmenitiesChange = (amenities) => {
    onFilterChange("amenities", amenities);
  };

  const handleRatingChange = (rating) => {
    onFilterChange("rating", rating);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        } ${!isOpen ? "lg:block hidden" : "block"} 
  bg-white rounded-l-xl lg:rounded-xl shadow p-5 space-y-6 
  transform transition-transform duration-500 ease-in-out z-50
  fixed top-0 right-0 h-full w-4/5 max-w-sm md:w-3/4 
  lg:static lg:h-auto lg:w-1/4 lg:z-auto lg:transform-none`}
      >
        <ShuffleInOnScroll delay={0} className="space-y-6">
          <section className="flex items-center justify-between text-[#1A1A1A] mb-4 sticky top-0 bg-white pt-2 z-10">
            <div className="flex items-center gap-4">
              <SlidersHorizontal className="block lg:hidden" size={20} />
              <Funnel className="hidden lg:block" size={20} />
              <h3 className="font-bold text-2xl">Filters</h3>
            </div>
            <button
              onClick={onResetFilters}
              className="text-sm text-[#0D0BA8] hover:underline cursor-pointer"
            >
              Reset all
            </button>
          </section>
          <SearchFilter
            filterNames={filterNames?.location}
            selected={appliedFilters.location}
            onChange={handleLocationChange}
          />
          <PriceFilter
            filterNames={filterNames}
            value={appliedFilters.priceRange}
            onChange={handlePriceChange}
          />
          <StayType
            filterNames={filterNames?.staytypes}
            selected={appliedFilters.stayType}
            onChange={handleStayTypeChange}
            type={type}
          />
          <RoomType
            filterNames={filterNames?.room_types}
            selected={appliedFilters.roomType}
            onChange={handleRoomTypeChange}
          />
          <AmentiesFilter
            filterNames={filterNames?.amenities}
            selected={appliedFilters.amenities}
            onChange={handleAmenitiesChange}
          />
          <RatingFilter
            selected={appliedFilters.rating}
            onChange={handleRatingChange}
          />
        </ShuffleInOnScroll>
      </aside>
    </>
  );
}
