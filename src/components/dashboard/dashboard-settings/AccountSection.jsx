"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AccountSection() {
  const [loading, setLoading] = useState(false);

  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.put(
        API_ENDPOINTS.USER.DEACTIVE_ACCOUNT
      );

      toast.success(res.data.message);
      console.log("Deactivate Response:", res.data);

    } catch (error) {
      console.error("Deactivate error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to deactivate account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8 w-full">
      <RevealOnScroll delay={0.3}>
        <h2 className="text-2xl text-[#1A1A1A] font-bold mb-4">Account</h2>
        <p className="text-[#666666] mb-4">
          Manage or delete your account
        </p>

        <div className="space-y-4 flex flex-col w-full sm:w-1/2 xl:w-1/4">
          <button
            onClick={handleDeactivateAccount}
            disabled={loading}
            className={`px-6 py-3 rounded-full text-white transition-colors
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D0BA8] hover:bg-blue-900 cursor-pointer"
              }`}
          >
            {loading ? "Deactivating..." : "Deactivate Account"}
          </button>
        </div>
      </RevealOnScroll>
    </div>
  );
}
