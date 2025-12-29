import BookingConfirmation from "@/components/BookingConfirmation";
import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckoutData = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION}/room/${id}`
        );
        setRoomData(res.data.roomdetails);
      } catch (err) {
        console.error("Checkout API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The property you're trying to book doesn't exist or is no longer
            available.
          </p>
          <a
            href="/"
            className="inline-block bg-[#0D0BA8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A32FF] transition-all"
          >
            Browse Properties
          </a>
        </div>
      </div>
    );
  }
  return <BookingConfirmation roomData={roomData} />;
};

export default CheckoutData;
