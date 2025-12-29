import { Suspense } from "react";
import SetNewPasswordPage from "./SetNewPassowrd";

export default function LocationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      }
    >
      <SetNewPasswordPage />
    </Suspense>
  );
}
