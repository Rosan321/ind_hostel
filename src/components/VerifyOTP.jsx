"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function VerifyOTP({ isOpen, onClose, onVerify, email, otpForUI }) {
  const [otp, setOtp] = useState("");
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-2">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600 text-sm">
          Enter the 4-digit OTP sent to: <strong className="text-[#0D0BA8] italic">{otpForUI}</strong>
        </p>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full mt-6 border border-gray-300 rounded-md px-4 py-3 text-center tracking-widest text-lg"
        />

        <div className="flex justify-center items-center">
          <button
            className="w-1/2 mt-6 bg-[#0D0BA8] text-white py-3 rounded-lg font-semibold hover:bg-[#2A32FF] transition"
            onClick={() => onVerify(otp)}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}
