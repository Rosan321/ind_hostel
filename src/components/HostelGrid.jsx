"use client";

import { useState } from "react";
import HostelCard from "./HostelCard";
import Pagination from "./Pagination";

const hostels = [
  {
    id: 1,
    title: "Urban Nest Hostel — Single Bed",
    location: "Koramangala, Bengaluru – 1.2 km from metro",
    rating: 4.6,
    price: 5000,
  },
  {
    id: 2,
    title: "ITC Kohinoor — Double Bed",
    location: "Banjara Hills, Hyderabad – 0.5 km from metro",
    rating: 4.8,
    price: 3500,
  },
  {
    id: 3,
    title: "Hotel Taz — Single Bed",
    location: "Kalpana, Bhubaneswar – 4 km from airport",
    rating: 4.3,
    price: 4000,
  },
  {
    id: 4,
    title: "Mayfair — Double Bed",
    location: "Near RK beach, Visakhapatnam – 1.2 km from RTC Complex",
    rating: 4.2,
    price: 4500,
  },
];

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
