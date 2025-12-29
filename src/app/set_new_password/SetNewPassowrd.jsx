"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPassword } from "@/lib/store/actions/authActions";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function SetNewPasswordPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [password, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async () => {
    if (!password.trim()) {
      toast.warn("Please enter a new password");
      return;
    }

    if (!validatePassword(password)) {
      toast.warn(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character"
      );
      return;
    }

    try {
      setLoading(true);

      const payload = { email, password };
      const res = await dispatch(setPassword(payload)).unwrap();

      toast.success(res?.message || "Password updated successfully!");
      setPasswordInput("");
    } catch (err) {
        console.log(err)
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <LockKeyhole />
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Set New Password
        </h1>

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="text"
            value={email}
            readOnly
            className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 cursor-not-allowed"
          />
        </div>

        {/* New Password */}
        <div className="mt-4 relative">
          <label className="text-sm text-gray-600">Enter New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-600 focus:ring-blue-200 outline-none"
          />
          <span
            className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold cursor-pointer 
            ${loading ? "bg-[#2A32FF] cursor-not-allowed" : "bg-[#0D0BA8] hover:bg-[#2A32FF]"}`}
        >
          {loading ? "Updating..." : "Save New Password"}
        </button>
      </div>
    </div>
  );
}
