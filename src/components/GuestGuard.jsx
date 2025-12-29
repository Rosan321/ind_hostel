"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // ✅ single source of truth
    const token = sessionStorage.getItem("token");
    const userInfo = sessionStorage.getItem("userInfo");

    if (token && userInfo) {
      // already logged in → redirect
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return children;
}
