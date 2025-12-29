"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import BookDetail from "./BookDetail";
import BookDetail_2 from "./BookDetail_2";
import { useSearchParams } from "next/navigation";

export default function BookingPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Set error state as null initially

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_ENDPOINTS.BOOKINGS.BOOKING}/${id}`
        );
        setBookData(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.message || err.response?.data?.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  } // Show loading indicator

  if (error) {
    return (
      <div className="bg-red-200 text-red-800 p-4 rounded-md">
        <strong>Error:</strong> {error}
      </div>
    ); // Display error message if there's an error
  }

  return (
    <div className="bg-gray-50 px-6 py-8 w-full xl:flex gap-8">
      <div className="w-full">
        <BookDetail bookDataDetails={bookData} />
      </div>
      <div className="xl:w-3/5">
        <BookDetail_2 bookDataDetails={bookData} />
      </div>
    </div>
  );
}
