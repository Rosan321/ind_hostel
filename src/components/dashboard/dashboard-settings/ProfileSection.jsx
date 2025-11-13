"use client";

import { useState } from "react";

export default function ProfileSection() {
  const [profile, setProfile] = useState({
    name: "Aaron Mehta",
    email: "aaron@example.com",
    phone: "+91 98765 43210",
    gender: "Male",
    location: "Pune, Maharashtra",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <img src="/images/pp.png" alt="Profile" className="object-cover w-24" />
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="md:col-span-2">
          <label className="font-medium text-sm">Full Name</label>
          <input
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Phone Number</label>
          <input
            name="phone"
            type="text"
            value={profile.phone}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Email Address</label>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Location</label>
          <input
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

      </div>

      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
          Save Changes
        </button>
        <button className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100">
          Cancel
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-3">
        Keep your contact info up to date for a smoother booking experience
      </p>
    </div>
  );
}
