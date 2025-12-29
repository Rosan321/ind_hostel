"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Circle,
  CheckCircle,
  MapPin,
  Hotel,
} from "lucide-react";
import BookingSummary from "./BookingSummary";
import RevealOnScroll from "./animations/RevealOnScroll";
import Image from "next/image";
import { getAmenityIcon, getAmenityLabel } from "@/lib/utils/amenitiesHelper";

export default function BookingConfirmation({
  roomData,
}) {
  // console.log("Room Data:", roomData);

  const [formData, setFormData] = useState({
    fullname: "",
    emailAddress: "",
    mobilenumber: "",
    gender: "male",
    agreed: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobilenumber") {
      // keep only digits
      const cleanedValue = value.replace(/[^\d]/g, "");

      setFormData((prev) => ({
        ...prev,
        mobilenumber: cleanedValue === "" ? "" : Number(cleanedValue), // convert to number
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // Here you would typically send the booking data to your backend
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="mx-auto px-4 lg:px-20">
        {/* Header */}
        <RevealOnScroll delay={0.2}>
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Complete Your Booking
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              You're booking{" "}
              <span className="font-semibold text-[#00BFA6]">
                {roomData?.room_type}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-[#44475A]">
                {roomData?.accommodation_id?.property_name}
              </span>
            </p>
          </div>
        </RevealOnScroll>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
            {/* Left Column - Guest Details */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Stay Details Card */}
              <RevealOnScroll delay={0.3}>
                <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="sm:flex lg:flex-col xl:flex-row gap-6">
                    {/* Room Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={
                          roomData?.room_images_url?.[0] ||
                          "/placeholder-room.jpg"
                        }
                        alt={roomData?.room_type || "Room"}
                        width={500}
                        height={500}
                        className="object-cover w-72 lg:w-full xl:w-72 h-48 lg:h-66 xl:h-48 rounded-xl"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-sm font-medium text-gray-900">
                          {roomData?.room_type}
                        </span>
                      </div>
                    </div>
                    {/* Property Information */}
                    <div className="mt-6 sm:mt-0 lg:mt-2 xl:mt-0">
                      <section className="flex items-center gap-2">
                        <Hotel size={22} stroke="green" />
                        <h3 className="font-bold text-2xl text-[#1A1A1A]">
                          {roomData?.accommodation_id?.property_name}
                        </h3>
                      </section>
                      <p className="text-sm text-gray-700 py-2">
                        {roomData?.room_description}
                      </p>
                      <p className="text-base font-medium text-[#1A1A1A] flex items-center gap-1">
                        <MapPin size={18} stroke="green" />
                        {roomData?.accommodation_id?.location?.area
                          ? roomData.accommodation_id.location.area
                              .charAt(0)
                              .toUpperCase() +
                            roomData.accommodation_id.location.area.slice(1)
                          : ""}
                        {roomData?.accommodation_id?.location?.city
                          ? ", " +
                            roomData.accommodation_id.location.city
                              .charAt(0)
                              .toUpperCase() +
                            roomData.accommodation_id.location.city.slice(1)
                          : ""}
                      </p>
                      <section className="flex gap-4 mt-3">
                        {roomData?.accommodation_id?.isverified && (
                          <h5 className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Verified
                          </h5>
                        )}
                        {roomData?.accommodation_id?.property_type && (
                          <h5 className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
                            {roomData?.accommodation_id?.property_type
                              ? roomData.accommodation_id.property_type
                                  .charAt(0)
                                  .toUpperCase() +
                                roomData.accommodation_id.property_type.slice(1)
                              : ""}
                          </h5>
                        )}
                      </section>
                    </div>
                  </div>

                  <div className="mt-8 sm:flex lg:flex-col xl:flex-row gap-6 w-full">
                    {/* Room Details */}
                    <div className="sm:w-1/2 lg:w-full xl:w-1/2">
                      <h3 className="font-bold text-xl text-[#1A1A1A] mb-6">
                        Room Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">Room Type</div>
                          <div className="font-semibold text-gray-900">
                            {roomData?.room_type ? roomData?.room_type.charAt(0).toUpperCase() + roomData?.room_type.slice(1) : ""}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">Category</div>
                          <div className="font-semibold text-gray-900">
                            {roomData?.accommodation_id?.category_name
                              ? roomData.accommodation_id.category_name
                                  .charAt(0)
                                  .toUpperCase() +
                                roomData.accommodation_id.category_name.slice(1)
                              : ""}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Guests Allowed
                          </div>
                          <div className="font-semibold text-gray-900">
                            {roomData?.no_of_guests}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600">
                            Rooms Available
                          </div>
                          <div className="font-semibold text-gray-900">
                            {roomData?.rooms_available}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room Amenities */}
                    <div className="sm:w-1/2 lg:w-full xl:w-1/2">
                      <h3 className="font-bold text-xl text-[#1A1A1A] mb-6">
                        Room Amenities
                      </h3>
                      {roomData?.room_amenities?.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {roomData.room_amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium flex items-center gap-2"
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                {getAmenityIcon(amenity)}
                              </div>
                              <span>{getAmenityLabel(amenity)}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-500 text-sm">
                            No specific amenities listed for this room
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Guest Information Card */}
              <RevealOnScroll delay={0.2}>
                <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#00BFA6]/10 rounded-lg">
                      <User className="h-6 w-6 text-[#00BFA6]" />
                    </div>
                    <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                      Guest Information
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-4">
                          {["male", "female", "other"].map((gender) => (
                            <label
                              key={gender}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <div className="relative">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  checked={formData.gender === gender}
                                  onChange={handleInputChange}
                                  required
                                  className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#00BFA6] group-hover:border-[#00BFA6] transition-all"></div>
                                <div
                                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${
                                    formData.gender === gender
                                      ? "bg-[#00BFA6]"
                                      : "bg-transparent"
                                  } transition-all`}
                                ></div>
                              </div>
                              <span className="text-gray-700 capitalize group-hover:text-gray-900 transition-colors">
                                {gender}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            name="mobilenumber"
                            value={formData.mobilenumber}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                            placeholder="your mobile number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 mt-8">
                    Terms & Conditions
                  </h3>

                  <div className="space-y-2 text-gray-600 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                      <p className="text-sm">
                        <span className="font-semibold">
                          Cancellation Policy:
                        </span>{" "}
                        {roomData?.accommodation_id?.cancellation_policy ||
                          "No cancellation allowed"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                      <p className="text-sm">
                        <span className="font-semibold">Tax:</span>{" "}
                        {roomData?.accommodation_id?.tax
                          ? `₹${
                              roomData?.accommodation_id?.tax_amount || 0
                            } applicable`
                          : "No tax"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                      <p className="text-sm">
                        <span className="font-semibold">Verified:</span>{" "}
                        {roomData?.accommodation_id?.isverified
                          ? "✓ Property is verified"
                          : "Property not verified"}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                      <p className="text-sm">
                        <span className="font-semibold">Check-in Time:</span>{" "}
                        {roomData?.accommodation_id?.check_in_time ||
                          "Flexible"}
                      </p>
                    </div>
                    {roomData?.accommodation_id?.property_type === "hotels" && roomData?.accommodation_id?.check_out_time !== "NA" && (
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                        <p className="text-sm">
                          <span className="font-semibold">Check-out Time:</span>{" "}
                          {roomData?.accommodation_id?.check_out_time}
                        </p>
                      </div>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleInputChange}
                        required
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#00BFA6] peer-checked:bg-[#00BFA6] group-hover:border-[#00BFA6] transition-all flex items-center justify-center">
                        {formData.agreed && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      I agree to the Terms & Conditions, Cancellation Policy,
                      and confirm that all the information provided is accurate.
                      I understand that{" "}
                      {roomData?.accommodation_id?.cancellation_policy ||
                        "cancellations are not allowed"}
                      .
                    </span>
                  </label>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <BookingSummary
                formData={formData}
                roomData={roomData}
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}