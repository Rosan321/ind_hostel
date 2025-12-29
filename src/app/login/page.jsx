import { Suspense } from "react";
import Login from "./Login";
import GuestGuard from "@/components/GuestGuard";

export default function LocationPage() {
  return (
    <GuestGuard>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
          </div>
        }
      >
        <Login />
      </Suspense>
    </GuestGuard>
  );
}
