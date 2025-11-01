"use client";

import { useState } from "react";
import HostelCard from "./HostelCard";
import Pagination from "./Pagination";
import { hostels } from "@/lib/utils/hotels";

export default function HostelGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedHostels = hostels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedHostels.map((hostel) => (
          <HostelCard key={hostel.id} {...hostel} />
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
