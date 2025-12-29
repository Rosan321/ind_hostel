"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthFromSession } from "@/lib/store/reducers/authSlice";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // ✅ sessionStorage is the ONLY source of truth
    const token = sessionStorage.getItem("token");
    const userInfo = sessionStorage.getItem("userInfo");

    if (token && userInfo) {
      // (optional) hydrate redux for UI usage
      dispatch(
        setAuthFromSession({
          token,
          userInfo: JSON.parse(userInfo),
        })
      );

      setAuthorized(true);
    } else {
      router.replace("/login");
    }

    setChecking(false);
  }, [dispatch, router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return children;
}

