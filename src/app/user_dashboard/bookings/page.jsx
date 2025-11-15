"use client";

import BookingPage from "@/components/dashboard/dashboard-bookings/BookingPage";
import BookingFilters from "@/components/dashboard/dashboard-bookings/BookingFilters";
import { useMemo, useState } from "react";

export default function BookingsPage() {
  const [bookingType, setBookingType] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  const bookings = [
    {
      id: 1,
      title: "UrbanNest Hostel – Pune",
      type: "Hostel",
      status: "Active",
      checkIn: "Nov 5, 2025",
      checkOut: "Nov 30, 2025",
      price: "7,500",
      per: "Month",
      image: "/images/coxy.png",
    },
    {
      id: 2,
      title: "SunView PG – Mumbai",
      type: "PG",
      status: "Upcoming",
      checkIn: "Dec 2, 2025",
      checkOut: "Jan 2, 2026",
      price: "8,200",
      per: "Month",
      image: "/images/g-leaf.png",
    },
    {
      id: 3,
      title: "BlueSky Hotel – Delhi",
      type: "Hotel",
      status: "Completed",
      checkIn: "Oct 22, 2025",
      checkOut: "Oct 25, 2025",
      price: "3,600",
      per: "Night",
      image: "/images/g_leaf.png",
    },
  ];

  const filteredBookings = useMemo(() => {
    let data = [...bookings];

    if (bookingType !== "All") {
      data = data.filter((b) => b.type === bookingType);
    }

    if (status !== "All") {
      data = data.filter((b) => b.status === status);
    }

    if (sortBy === "priceLow") {
      data.sort(
        (a, b) =>
          Number(a.price.replace(",", "")) - Number(b.price.replace(",", ""))
      );
    }

    if (sortBy === "priceHigh") {
      data.sort(
        (a, b) =>
          Number(b.price.replace(",", "")) - Number(a.price.replace(",", ""))
      );
    }

    return data;
  }, [bookingType, status, sortBy]);

  return (
    <section className="lg:pr-12 pb-8">
      <h1 className="text-2xl font-semibold mb-2">My Bookings</h1>
      <p className="text-gray-600 mb-6">
        Manage all your hostel, PG, and hotel stays in one place
      </p>

      {/* Filters */}
      <BookingFilters
        bookingType={bookingType}
        setBookingType={setBookingType}
        status={status}
        setStatus={setStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBookings.map((item) => (
          <BookingPage key={item.id} booking={item} />
        ))}
      </div>
    </section>
  );
}
