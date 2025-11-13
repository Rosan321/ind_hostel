"use client";

export default function BookingPage({ booking }) {
  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden border hover:shadow-md transition p-4 flex flex-col">
      {/* Image */}
      <div className="relative h-40 rounded-lg overflow-hidden">
        <img src={booking.image} alt={booking.title} className="object-cover" />

        {/* Status Badge */}
        <span
          className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-lg text-white ${
            booking.status === "Active"
              ? "bg-green-600"
              : booking.status === "Upcoming"
              ? "bg-blue-600"
              : "bg-yellow-500"
          }`}
        >
          {booking.status}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4">
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
            <button className="px-2 lg:px-4 py-2 sm:py-3 rounded-full bg-blue-700 text-white text-base font-semibold hover:bg-blue-800 transition">
              View Receipt
            </button>
          ) : booking.status === "Active" ? (
            <>
              <button className="px-2 lg:px-4 py-2 sm:py-3 rounded-full border border-blue-700 bg-blue-700 text-base text-white font-semibold transition">
                View Details
              </button>
              <button className="px-2 lg:px-4 py-2 sm:py-3 rounded-full border border-blue-700 text-blue-700 text-base font-semibold hover:bg-blue-700 hover:text-white transition">
                Contact Hostel
              </button>
            </>
          ) : (
            <>
              <button className="px-2 lg:px-4 py-2 sm:py-3 rounded-full border border-blue-700 bg-blue-700 text-base text-white font-semibold transition">
                View Details
              </button>
              <button className="px-2 lg:px-4 py-2 sm:py-3 rounded-full border border-blue-700 text-blue-700 text-base font-semibold hover:bg-blue-700 hover:text-white transition">
                Cancel Booking
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
