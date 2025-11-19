"use client";

import { Funnel, SlidersHorizontal, X } from "lucide-react";
import SearchFilter from "./SearchFilter";
import PriceFilter from "./PriceFilter";
import StayType from "./StayType";
import RoomType from "./RoomType";
import AmentiesFilter from "./AmentiesFilter";
import RatingFilter from "./RatingFilter";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";

export default function Filters({ isOpen = false, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Filters Sidebar */}
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
          {/* Header with Close Button for Mobile */}
          <section className="flex items-center justify-between text-[#1A1A1A] mb-4">
            <div className="flex items-center gap-4">
              {/* SlidersHorizontal visible below lg */}
              <SlidersHorizontal className="block lg:hidden" size={20} />

              {/* Funnel visible lg and above */}
              <Funnel className="hidden lg:block" size={20} />

              <h3 className="font-bold text-2xl">Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X size={24} />
            </button>
          </section>

          {/* Filter */}
          <SearchFilter />

          {/* Price Range */}
          <PriceFilter />

          {/* Stay Type */}
          <StayType />

          {/* Room Type */}
          <RoomType />

          {/* Amenities */}
          <AmentiesFilter />

          {/* Rating */}
          <RatingFilter />
        </ShuffleInOnScroll>
      </aside>
    </>
  );
}
