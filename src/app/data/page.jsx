"use client";

import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import Filters from "@/components/filter/Filters";
import SearchBar from "@/components/SearchBar";
import StayGrid from "@/components/StayGrid";
import { ArrowDownWideNarrow, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function HostelListingPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="bg-gray-100 px-4 sm:px-8 lg:px-20">
      <div className="w-full mx-auto">
        <SearchBar />

        <div className="flex flex-col lg:flex-row gap-6 pt-6 lg:pt-12 pb-12 lg:pb-24">
          <Filters isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />

          <div className="flex-1">
            {/* Header Section */}
            <ShuffleInOnScroll delay={0.2}>
              <div className="flex flex-col gap-4 mb-4">
                {/* Top Row: Filters / Heading / Sort */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
                  {/* Filters Button (mobile only) */}
                  <div className="lg:hidden z-30 order-1">
                    <button
                      onClick={() => setFiltersOpen(true)}
                      className="text-base sm:text-lg text-[#1A1A1A] border rounded-lg px-4 py-2 shadow-lg flex items-center gap-4 font-bold"
                    >
                      <SlidersHorizontal size={20} />
                      <span>Filters</span>
                    </button>
                  </div>

                  {/* Heading (moves position based on screen size) */}
                  <h2 className="text-lg text-center lg:text-start font-semibold text-gray-800 order-3 lg:order-1 w-full lg:w-auto">
                    Showing results for{" "}
                    <span className="text-[#2A32FF]">Bangalore</span> – 25
                    stays available
                  </h2>

                  {/* Sort Section */}
                  <div className="flex items-center gap-2 lg:gap-4 order-2 lg:order-2 sm:ml-auto">
                    <section className="flex items-center gap-2">
                      <p className="text-base font-semibold">Sort By</p>
                      <ArrowDownWideNarrow />
                    </section>
                    <select className="border rounded-lg px-2 py-2 text-sm">
                      <option>Default Sorting</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </ShuffleInOnScroll>
            <ShuffleInOnScroll delay={0.4}>
              <StayGrid />
            </ShuffleInOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
