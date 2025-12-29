"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { API_ENDPOINTS } from "@/lib/api/api";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

export default function SecuritySection() {
  const [security, setSecurity] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
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
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!security.newpassword) {
      newErrors.newpassword = "New password is required";
    } else if (!passwordRegex.test(security.newpassword)) {
      newErrors.newpassword =
        "Password must be at least 8 characters, include 1 uppercase and 1 special symbol";
    }

    if (!security.confirmpassword) {
      newErrors.confirmpassword = "Please confirm your new password";
    } else if (security.newpassword !== security.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
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
      const response = await axiosInstance.post(
        API_ENDPOINTS.USER.CHANGE_PASSWORD,
        security
      );
      toast.success(response?.data?.message);
      setSuccess(response?.data?.message);

      // Reset the fields after successful password update
      setSecurity({
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
      setErrors({});
      setSuccess("");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setErrors({ api: err.response?.data?.message || "Something went wrong" });
    }
  };

  const toggleShow = (field) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <RevealOnScroll delay={0.2}>
        <h2 className="text-2xl font-bold mb-4">Security</h2>
        <p className="text-[#666666] mb-4">
          Protect your account and stay secure
        </p>
      </RevealOnScroll>

      <div className="space-y-4">
        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Current Password</label>
          <div className="relative">
            <input
              type={show.old ? "text" : "password"}
              name="oldpassword"
              value={security.oldpassword}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => toggleShow("old")}
            >
              {show.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">New Password</label>
          <div className="relative">
            <input
              type={show.new ? "text" : "password"}
              name="newpassword"
              value={security.newpassword}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => toggleShow("new")}
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.newpassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newpassword}</p>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Confirm New Password</label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              name="confirmpassword"
              value={security.confirmpassword}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 px-4 py-3 rounded-xl"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => toggleShow("confirm")}
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.confirmpassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmpassword}
            </p>
          )}
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.2}>
        <p className="text-sm text-[#666666] mt-2 flex justify-center">
          Use at least 8 characters, one uppercase letter, and one special
          symbol
        </p>
      </RevealOnScroll>

      {errors.api && (
        <p className="text-red-500 text-sm mt-2 text-center">{errors.api}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mt-2 text-center">{success}</p>
      )}

      <RevealOnScroll delay={0.2}>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-5 px-12 py-2 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </RevealOnScroll>
    </div>
  );
}
