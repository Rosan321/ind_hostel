"use client";

import { useState } from "react";

export default function SecuritySection() {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Security</h2>
      <p className="text-sm text-gray-500 mb-4">
        Protect your account and stay secure
      </p>

      <div className="space-y-4">

        <div>
          <label className="font-medium text-sm">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">New Password</label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

      </div>

      <p classname="text-xs text-gray-500 mt-2">
        Use at least 8 characters, one uppercase letter, and one special symbol
      </p>

      <button className="mt-5 px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
        Update Password
      </button>
    </div>
  );
}
