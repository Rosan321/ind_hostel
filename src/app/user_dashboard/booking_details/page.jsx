"use client";

import { Suspense } from "react";
import BookingPageClient from "./BookingPageClient";

export default function BookingDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50 px-6 py-8 w-full">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading booking details...
            </p>
          </div>
        </div>
      }
    >
      <BookingPageClient />
    </Suspense>
  );
}
