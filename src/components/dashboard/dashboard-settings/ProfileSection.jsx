"use client";

import { SquarePen } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import ShuffleInOnScroll from "@/components/animations/SuffleInOnScroll";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import { toast } from "react-toastify";
import { updateProfileImage } from "@/lib/store/reducers/profileSlice";

export default function ProfileSection() {
  const fileInputRef = useRef(null);
  const { userData, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    location: "",
    image: "/images/pp.png",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!userData) return;
    // console.log(userData);
    setProfile((prev) => ({
      ...prev,
      fullname: userData?.fullname ?? "",
      email: userData?.email ?? "",
      phone: userData?.phone ?? "",
      gender: userData?.gender ?? "",
      location: userData?.location ?? "",
      image: userData?.profileUrl ?? prev.image,
    }));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!["fullname", "location", "gender"].includes(name)) return;
    setProfile((p) => ({ ...p, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const localPreview = URL.createObjectURL(file);

    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.USER.PROFILE_PIC,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProfile((p) => ({ ...p, image: localPreview }));
      dispatch(updateProfileImage(localPreview));
      toast.success(res?.data?.message ?? "Profile picture updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!profile.fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!profile.location.trim()) newErrors.location = "Location is required.";
    if (!profile.gender.trim()) newErrors.gender = "Gender is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      fullname: profile.fullname.trim(),
      location: profile.location.trim(),
      gender: profile.gender.trim(),
    };

    try {
      const res = await axiosInstance.put(
        API_ENDPOINTS.USER.PROFILE_UPDATE,
        payload
      );
      toast.success(res?.data?.message ?? "Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-8">
      <RevealOnScroll delay={0.2}>
        <h2 className="text-2xl text-[#000000] font-bold mb-4">Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full border-2 border-[#0D0BA8] overflow-hidden">
              <img
                src={profile.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <div
              className="absolute -bottom-2 right-2 bg-[#0D0BA8] rounded-full p-2 cursor-pointer shadow-lg"
              onClick={() => fileInputRef.current.click()}
            >
              <SquarePen size={18} className="stroke-white" />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </RevealOnScroll>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShuffleInOnScroll delay={0.2}>
          <div className="md:col-span-2">
            <label className="text-[#1A1A1A] text-sm">Full Name</label>
            <input
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={profile.fullname}
              onChange={handleChange}
              className={`w-full mt-1 border px-4 py-3 rounded-xl ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
            )}
          </div>
        </ShuffleInOnScroll>

        <ShuffleInOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={profile.phone}
            readOnly
            className="w-full mt-1 border px-4 py-3 rounded-xl bg-gray-50 cursor-not-allowed"
          />
        </ShuffleInOnScroll>

        <ShuffleInOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={profile.email}
            readOnly
            className="w-full mt-1 border px-4 py-3 rounded-xl bg-gray-50 cursor-not-allowed"
          />
        </ShuffleInOnScroll>

        <ShuffleInOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Enter your location"
            value={profile.location}
            onChange={handleChange}
            className={`w-full mt-1 border px-4 py-3 rounded-xl ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </ShuffleInOnScroll>

        <ShuffleInOnScroll delay={0.2}>
          <label className="text-[#1A1A1A] text-sm">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-3 rounded-xl border-gray-300 bg-white cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </ShuffleInOnScroll>
      </div>

      <ShuffleInOnScroll delay={0.2}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="px-12 py-2 bg-[#0D0BA8] text-white rounded-full hover:bg-blue-800 cursor-pointer"
            >
              Save Changes
            </button>

            <button
              onClick={() => {
                setProfile((p) => ({
                  ...p,
                  fullname: userData?.fullname ?? "",
                  location: userData?.location ?? "",
                  gender: userData?.gender ?? "",
                }));
                setErrors({});
              }}
              className="px-12 py-2 border-2 border-[#0D0BA8] text-[#0D0BA8] rounded-full hover:bg-[#0D0BA8] hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <p className="text-[#666666] text-sm mt-3 text-center">
            Keep your contact info up to date for a smoother booking experience
          </p>
        </div>
      </ShuffleInOnScroll>
    </div>
  );
}
