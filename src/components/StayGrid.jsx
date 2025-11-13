"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import { hostels } from "@/lib/utils/hotels";
import StayCard from "./StayCard";

export default function StayGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedHostels = hostels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedHostels.map((hostel) => (
          <StayCard key={hostel.id} {...hostel} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
