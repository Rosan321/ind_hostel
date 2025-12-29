"use client";

import BookingCompleted from "@/components/BookingCompleted";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BookCompleted() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { isAuth } = useSelector((state)=>state.auth);

  useEffect(() => {
    if (!bookingId) return;

    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_ENDPOINTS.BOOKING.GETBY_ID}/${bookingId}`
        );
        setBookingData(res.data.data);
      } catch (err) {
        if (err.response.status === 401 && !isAuth) {
          router.push("/login");
        }
        console.error("Booking completed API error:", err);
        setError(err.message || err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-200 text-red-800 p-4 rounded-md">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return <BookingCompleted bookingData={bookingData} />;
}
