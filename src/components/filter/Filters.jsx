"use client";

import { Funnel, SlidersHorizontal, X } from "lucide-react";
import SearchFilter from "./SearchFilter";
import PriceFilter from "./PriceFilter";
import StayType from "./StayType";
import RoomType from "./RoomType";
import AmentiesFilter from "./AmentiesFilter";
import RatingFilter from "./RatingFilter";
import CategoryFilter from "./CategoryFilter";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";

export default function Filters({
  filterNames,
  isOpen,
  onClose,
  appliedFilters,
  onFilterChange,
  onResetFilters,
  type,
  hiddenFilters = [],
}) {
  // console.log(type);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50 h-full
          w-4/5 max-w-sm md:w-3/4
          bg-white rounded-l-xl shadow
          transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto lg:overflow-visible no-scrollbar
          lg:static lg:translate-x-0 lg:h-auto lg:w-1/4 xl:w-1/5 lg:rounded-xl lg:z-auto
        `}
      >
        <ShuffleInOnScroll delay={0} className="space-y-5 p-5">
          {/* HEADER */}
          <section className="flex items-center justify-between sticky top-0 bg-white z-10 pb-4">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="block lg:hidden" size={20} />
              <Funnel className="hidden lg:block" size={20} />
              <h3 className="font-bold text-2xl">Filters</h3>
            </div>

            {/* RESET */}
            <button
              onClick={onResetFilters}
              className="text-sm text-[#0D0BA8] hover:underline text-right w-full"
            >
              Reset all
            </button>
          </section>

          {!hiddenFilters.includes("location") && (
            <SearchFilter
              filterNames={filterNames?.location}
              selected={appliedFilters.location}
              onChange={(v) => onFilterChange("location", v)}
            />
          )}

          {!hiddenFilters.includes("price") && (
            <PriceFilter
              filterNames={filterNames}
              value={appliedFilters.priceRange}
              onChange={(v) => onFilterChange("priceRange", v)}
            />
          )}

          <hr className="text-gray-300" />

          <CategoryFilter
            categories={filterNames?.category}
            selected={appliedFilters.categories || []}
            onChange={(v) => onFilterChange("categories", v)}
          />

          <hr className="text-gray-300" />

          {!hiddenFilters.includes("stayType") && (
            <>
              <StayType
                filterNames={filterNames?.staytypes}
                selected={appliedFilters.stayType}
                onChange={(v) => onFilterChange("stayType", v)}
                type={type}
              />
              <hr className="text-gray-300" />
            </>
          )}

          <RoomType
            filterNames={filterNames?.room_types}
            selected={appliedFilters.roomType}
            onChange={(v) => onFilterChange("roomType", v)}
          />

          <hr className="text-gray-300" />

          <AmentiesFilter
            filterNames={filterNames?.amenities}
            selected={appliedFilters.amenities}
            onChange={(v) => onFilterChange("amenities", v)}
          />

          <hr className="text-gray-300" />

          <RatingFilter
            selected={appliedFilters.rating}
            onChange={(v) => onFilterChange("rating", v)}
          />
        </ShuffleInOnScroll>
      </aside>
    </>
  );
}
