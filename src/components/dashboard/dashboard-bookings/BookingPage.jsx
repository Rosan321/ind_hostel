"use client";

import AnimatedCard from "@/components/animations/AnimatedCard";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { formattedDate } from "@/lib/utils/fromattedDate";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { confirmToast } from "@/lib/utils/confirmToast";

export default function BookingPage({ booking }) {
  const [isCanceling, setIsCanceling] = useState(false);

  const cancelBooking = async (id) => {
    setIsCanceling(true);

    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.BOOKINGS.CANCEL_BOOKING}/${id}`
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to cancel booking. Please try again."
      );
    } finally {
      setIsCanceling(false);
    }
  };

  const handleCancelBooking = (id) => {
    confirmToast({
      message: "Are you sure you want to cancel this booking?",
      onConfirm: () => cancelBooking(id),
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-300 hover:shadow-md transition flex flex-col pb-4">
      {/* Image */}
      <div className="relative h-52 rounded-t-lg overflow-hidden">
        <AnimatedCard>
          <img
            src={booking?.accommodationId?.images_url?.[0]}
            alt={booking?.accommodationId?.property_name}
            className="object-cover w-full h-full"
          />
        </AnimatedCard>

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
        <h3 className="font-semibold text-lg">
          {booking?.accommodationId?.property_name}
        </h3>

        <div className="text-sm text-[#666666] font-semibold mt-2 space-y-1">
          <p>
            Check-in: {formattedDate(booking?.guestdetails?.stayinfo?.check_in)}
          </p>
          <p>
            Check-out:{" "}
            {formattedDate(booking?.guestdetails?.stayinfo?.check_out)}
          </p>
        </div>

        <h4 className="mt-2 text-lg font-semibold">
          ₹{booking?.bookingamount}
        </h4>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mt-4">
          <Link
            href={`/user_dashboard/booking_details?id=${booking?.bookingId}`}
            className="px-3 py-2 rounded-full bg-[#0D0BA8] text-white font-semibold text-center"
          >
            View Details
          </Link>

          {booking.status !== "Completed" && (
            <button
              onClick={() => handleCancelBooking(booking?._id)}
              disabled={isCanceling}
              className={`px-3 py-2 rounded-full border border-[#0D0BA8] font-semibold transition ${
                isCanceling
                  ? "opacity-50 cursor-not-allowed"
                  : "text-[#0D0BA8] hover:bg-[#0D0BA8] hover:text-white"
              }`}
            >
              {isCanceling ? "Cancelling..." : "Cancel Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
