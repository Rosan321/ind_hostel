"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";
import BookingSummary from "../BookingSummary";

export default function BookingPage() {

  return (
    <div className="bg-gray-50 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-8 px-6">
          {/* Left Column - Room Details & Tabs */}
          <div className="lg:col-span-4">
            <BookingCard />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-3">
            <BookingSummary />
          </div>
        </div>
    </div>
  );
}