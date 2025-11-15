"use client";

import { Bed, HandPlatter, Users, WashingMachine, Wifi } from "lucide-react";
import { useState } from "react";

export default function BookingCard() {
  const images = [
    "/images/coxy.png",
    "/images/g-leaf.png",
    "/images/g_leaf.png",
    "/images/hero.png",
  ];

  const amenities = [
    { icon: <Bed className="w-4 h-4 text-blue-600" />, label: "1 Bed" },
    { icon: <Users className="w-4 h-4 text-blue-600" />, label: "2 Guests" },
    { icon: <Wifi className="w-4 h-4 text-blue-600" />, label: "Free Wi-Fi" },
    {
      icon: <HandPlatter className="w-4 h-4 text-blue-600" />,
      label: "Breakfast included",
    },
    {
      icon: <WashingMachine className="w-4 h-4 text-blue-600" />,
      label: "Laundry",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
      <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
        Single Bed — Mixed Dorm
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-4">Single room · 1 bed · 1 guest</p>

      {/* Main Image + Thumbnails */}
      <div className="flex flex-col gap-6">
        {/* Main Image */}
        <div className="w-full">
          <img
            src={selectedImage}
            alt="Selected Room"
            className="w-full md:h-[320px] lg:h-[350px] object-cover rounded-xl"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex items-center gap-3 w-full overflow-x-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-16 md:w-24 h-16 md:h-24 object-cover rounded-lg cursor-pointer border 
                ${
                  selectedImage === img
                    ? "border-blue-600"
                    : "border-transparent"
                }
              `}
              alt="Room thumbnail"
            />
          ))}
        </div>
      </div>
      {/* Amenities Section */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
        {amenities.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-[#666666]">
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
