"use client";

import { Suspense } from "react";
import StayData from "./StayData";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">
              Loading accommodation details...
            </p>
          </div>
        </main>
      }
    >
      <StayData />
    </Suspense>
  );
}
