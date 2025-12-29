"use client";

import { Suspense } from "react";
import BookCompleted from "./BookCompleted";
import AuthGuard from "@/components/AuthGuard";

export default function BookingCompletedPage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-96 space-y-3">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">
              Loading booking details...
            </p>
          </div>
        }
      >
        <BookCompleted />
      </Suspense>
    </AuthGuard>
  );
}

