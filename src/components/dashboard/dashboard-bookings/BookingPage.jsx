"use client";

import AnimatedCard from "@/components/animations/AnimatedCard";

export default function BookingPage({ booking }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-300 hover:shadow-md transition flex flex-col pb-4">
      {/* Image */}
      <AnimatedCard>
      <div className="relative h-52 rounded-t-lg overflow-hidden">
        <img src={booking.image} alt={booking.title} className="object-cover" />

        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-lg ${
            booking.status === "Active"
              ? "bg-[#00883C] text-white"
              : booking.status === "Upcoming"
              ? "bg-[#00A6EE] text-white"
              : "bg-[#EDE620] text-[#1A1A1A]"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{booking.title}</h3>
        <p className="text-gray-600">{booking.type}</p>

        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p>Check-in: {booking.checkIn}</p>
          <p>Check-out: {booking.checkOut}</p>
        </div>

        <p className="mt-2 font-semibold">
          ₹{booking.price}{" "}
          <span className="text-gray-600 text-sm">/ {booking.per}</span>
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 justify-center gap-2 mt-4">
          {booking.status === "Completed" ? (
            <button className="px-2 lg:px-4 py-2 rounded-full bg-[#0D0BA8] text-white text-base font-semibold hover:bg-blue-900 transition cursor-pointer">
              View Receipt
            </button>
          ) : booking.status === "Active" ? (
            <>
              <button className="px-3 py-2 rounded-full bg-[#0D0BA8] text-base text-white font-semibold hover:bg-blue-900 transition cursor-pointer">
                View Details
              </button>
              <button className="px-3 py-2 rounded-full border border-[#0D0BA8] text-[#0D0BA8] text-base font-semibold hover:bg-[#0D0BA8] hover:text-white transition cursor-pointer">
                Contact Hostel
              </button>
            </>
          ) : (
            <>
              <button className="px-3 py-2 rounded-full bg-[#0D0BA8] text-base text-white font-semibold hover:bg-blue-900 transition cursor-pointer">
                View Details
              </button>
              <button className="px-3 py-2 rounded-full border border-[#0D0BA8] text-[#0D0BA8] text-base font-semibold hover:bg-[#0D0BA8] hover:text-white transition cursor-pointer">
                Cancel Booking
              </button>
            </>
          )}
        </div>
      </div>
      </AnimatedCard>
    </div>
  );
}
