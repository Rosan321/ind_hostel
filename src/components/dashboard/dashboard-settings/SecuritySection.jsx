"use client";

import { useState } from "react";
import axios from "axios";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";

export default function SecuritySection() {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!security.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (!passwordRegex.test(security.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters, include 1 uppercase and 1 special symbol";
    }

    if (!security.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (security.newPassword !== security.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("/api/update-password", {
        newPassword: security.newPassword,
      });

      if (response.status === 200) {
        setSuccess("Password updated successfully!");
        setSecurity({ ...security, newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <RevealOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <p className="text-[#666666] mb-4">Protect your account and stay secure</p>
      </RevealOnScroll>

      <div className="space-y-4">
        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={security.currentPassword}
            readOnly
            className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={security.newPassword}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={security.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.2}>
        <p className="text-sm text-[#666666] mt-2 flex justify-center">
          Use at least 8 characters, one uppercase letter, and one special symbol
        </p>
      </RevealOnScroll>

      {errors.api && (
        <p className="text-red-500 text-sm mt-2 text-center">{errors.api}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mt-2 text-center">{success}</p>
      )}

      <RevealOnScroll delay={0.2}>
        <button
          onClick={handleSubmit}
          className="mt-5 px-12 py-2 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 cursor-pointer"
        >
          Update Password
        </button>
      </RevealOnScroll>
    </div>
  );
}
