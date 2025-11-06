"use client";

import Filters from "@/components/Filters";
import HostelGrid from "@/components/HostelGrid";
import SearchBar from "@/components/SearchBar";
import { ArrowDownWideNarrow } from "lucide-react";

export default function HostelListingPage() {
  return (
    <div className="bg-gray-100 px-4 sm:px-8 lg:px-20">
      <div className="w-full mx-auto">
        <SearchBar />

        <div className="flex flex-col md:flex-row gap-6 py-12">
          <Filters />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Showing results for <span className="text-yellow-500">Bangalore</span> – 25 stays available
              </h2>
              <div className="flex items-center gap-2 lg:gap-4">
                <section className="flex items-center gap-2">
                    <p>Sort By</p>
                    <ArrowDownWideNarrow />
                </section>
                <select className="border rounded-lg px-2 py-2 text-sm">
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <HostelGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
