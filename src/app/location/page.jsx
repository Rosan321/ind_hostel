import { Suspense } from "react";
import StayListing from "./StayListing";

export default function LocationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      }
    >
      <StayListing />
    </Suspense>
  );
}
