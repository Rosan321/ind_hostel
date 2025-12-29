"use client"

import AuthGuard from "@/components/AuthGuard";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { getProfileById } from "@/lib/store/actions/profileActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById());
  }, [])

  return (
    <main className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <AuthGuard>
        <DashboardSidebar />
        <section className="flex-1 p-4 sm:p-8 space-y-6">{children}</section>
      </AuthGuard>
    </main>
  );
}
