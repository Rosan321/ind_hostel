"use client";

import BookingPage from "@/components/dashboard/dashboard-bookings/BookingPage";
import { useEffect, useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import Pagination from "@/components/Pagination";

export default function BookingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAllBookingDetails = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_ENDPOINTS.BOOKINGS.MY_BOOKING}?page=${currentPage}&limit=10`
        );

        // console.log(res.data.data)

        setBookings(res.data.data);
        setTotalPages(res.data.totalpages);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    getAllBookingDetails();
  }, [currentPage]);

  return (
    <section className="lg:pr-12 pb-8">
      <RevealOnScroll delay={0.2}>
        <h1 className="text-2xl font-semibold mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-6">
          Manage all your hostel, PG, and hotel stays in one place
        </p>
      </RevealOnScroll>

      {/* BOOKING CARDS */}
      <ShuffleInOnScroll delay={0.2}>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((item) => (
            <BookingPage key={item._id} booking={item} />
          ))}
        </div>
      </ShuffleInOnScroll>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
