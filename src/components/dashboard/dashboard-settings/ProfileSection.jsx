// "use client";

// import { SquarePen } from "lucide-react";
// import { useState } from "react";

// const locations = ["New York", "Los Angeles", "Chicago", "London", "Toronto"];

// export default function ProfileSection() {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     gender: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow mb-8">
//       <h2 className="text-2xl text-[#000000] font-bold mb-4">Profile</h2>

//       <div className="flex flex-col items-center mb-6">
//         <div className="relative w-18 h-18 rounded-full border-2 border-[#0D0BA8] flex items-center justify-center">
//           <img
//             src="/images/pp.png"
//             alt="Profile"
//             className="object-cover w-24"
//           />

//           {/* Icon */}
//           <SquarePen
//             size={20}
//             className="absolute bottom-[-5] left-4/5 -translate-x-4/5 bg-[#0D0BA8] stroke-white rounded-full p-1"
//           />
//         </div>
//       </div>

//       {/* Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="md:col-span-2">
//           <label className="font-medium text-sm">Full Name</label>
//           <input
//             name="name"
//             type="text"
//             value={profile.name}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="font-medium text-sm">Phone Number</label>
//           <input
//             name="phone"
//             type="text"
//             value={profile.phone}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="font-medium text-sm">Email Address</label>
//           <input
//             name="email"
//             type="email"
//             value={profile.email}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg"
//           />
//         </div>

//         <div>
//           <label className="font-medium text-sm">Location</label>
//           <select
//             name="location"
//             value={profile.location}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg"
//           >
//             <option value="">Select location</option>
//             {locations.map((loc) => (
//               <option key={loc} value={loc}>
//                 {loc}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="font-medium text-sm">Gender</label>
//           <select
//             name="gender"
//             value={profile.gender}
//             onChange={handleChange}
//             className="w-full mt-1 border px-4 py-2 rounded-lg"
//           >
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex gap-4 mt-6">
//         <button className="px-6 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
//           Save Changes
//         </button>
//         <button className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100">
//           Cancel
//         </button>
//       </div>

//       <p className="text-gray-500 text-sm mt-3">
//         Keep your contact info up to date for a smoother booking experience
//       </p>
//     </div>
//   );
// }

////////////////////////////////////////////////////////////////////////

"use client";

import { SquarePen } from "lucide-react";
import axios from "axios";
import { useRef, useState } from "react";

export default function ProfileSection() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    image: "/images/pp.png",
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile({ ...profile, image: res.data.url });
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!profile.name.trim()) newErrors.name = "Full Name is required.";
    if (!profile.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(profile.email)) newErrors.email = "Email is invalid.";
    if (!profile.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10,15}$/.test(profile.phone.replace(/\D/g, ""))) newErrors.phone = "Phone number is invalid.";
    if (!profile.location.trim()) newErrors.location = "Location is required.";
    if (!profile.gender.trim()) newErrors.gender = "Please select a gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post("/api/update-profile", profile);
      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <h2 className="text-2xl text-[#000000] font-bold mb-4">Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-20 h-20 rounded-full border-2 border-[#0D0BA8]">
          <img
            src={profile.image}
            alt="Profile"
            className="object-cover w-full h-full"
          />
          <SquarePen
            size={22}
            className="absolute -bottom-2 left-2/3 -translate-x-2/3 bg-[#0D0BA8] stroke-white rounded-full p-1 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="text-[#1A1A1A] text-sm">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-[#1A1A1A] text-sm">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            value={profile.phone}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            maxLength={10}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-[#1A1A1A] text-sm">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={profile.email}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-[#1A1A1A] text-sm">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Enter your location"
            value={profile.location}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${errors.location ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="text-[#1A1A1A] text-sm">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${errors.gender ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-12 py-2 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 cursor-pointer"
          >
            Save Changes
          </button>

          <button className="px-12 py-2 border-2 border-[#0D0BA8] text-[#0D0BA8] rounded-full hover:bg-[#0D0BA8] hover:text-white cursor-pointer">
            Cancel
          </button>
        </div>

        <p className="text-[#666666] text-sm mt-3 text-center">
          Keep your contact info up to date for a smoother booking experience
        </p>
      </div>
    </div>
  );
}

