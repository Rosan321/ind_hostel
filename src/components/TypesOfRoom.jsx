import { Check, Lock, Sparkles, Utensils, Wifi, X } from "lucide-react";
import React from "react";

const roomsData = [
  {
    id: 1,
    title: "Single Bed – Mixed Dorm",
    description: "Single room · 1 bed · 1 guest",
    images: "/images/bedroom.png",
    details:
      "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
    amenities: [
      { name: "WIFI", available: false, icon: <Wifi size={16} /> },
      { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
      { name: "Lockers", available: false, icon: <Lock size={16} /> },
      {
        name: "Daily housekeeping",
        available: false,
        icon: <Sparkles size={16} />,
      },
    ],
    roomsAvailable: 6,
    cancellation: "Free cancellation until 24 hrs before check-in",
    price: "499 / night",
    includes: "Includes taxes & hostel fees",
    type: "monthly",
  },
  {
    id: 2,
    title: "Double Bed – Mixed Dorm",
    description: "Double Shared room · 2 bed · 2 guest",
    images: "/images/bedroom.png",
    details:
      "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
    amenities: [
      { name: "WIFI", available: false, icon: <Wifi size={16} /> },
      { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
      { name: "Lockers", available: false, icon: <Lock size={16} /> },
      {
        name: "Daily housekeeping",
        available: false,
        icon: <Sparkles size={16} />,
      },
    ],
    roomsAvailable: 6,
    cancellation: "Free cancellation until 24 hrs before check-in",
    price: "799 / night",
    includes: "Includes taxes & hostel fees",
    type: "night",
  },
  {
    id: 3,
    title: "Single Bed – Mixed Dorm",
    description: "Single room · 1 bed · 1 guest",
    images: "/images/bedroom.png",
    details:
      "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
    amenities: [
      { name: "WIFI", available: false, icon: <Wifi size={16} /> },
      { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
      { name: "Lockers", available: false, icon: <Lock size={16} /> },
      {
        name: "Daily housekeeping",
        available: false,
        icon: <Sparkles size={16} />,
      },
    ],
    roomsAvailable: 6,
    cancellation: "Free cancellation until 24 hrs before check-in",
    price: "499 / night",
    includes: "Includes taxes & hostel fees",
    type: "night",
  },
];

const TypesOfRoom = () => {
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Types of Rooms Available
          </h2>
          <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        {/* Rooms List */}
        <div className="space-y-6">
          {roomsData.map((room) => (
            <div key={room.id}>
              {/* Room Card */}
              <div
                className={`p-6 rounded-2xl border-2 flex justify-between gap-4 ${
                  room.type === "monthly"
                    ? "bg-gray-50 border-gray-200"
                    : "bg-white border-gray-100 hover:border-emerald-200 transition-colors"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Section */}
                  <div className="flex-shrink-0">
                    <img
                      src={room.images}
                      alt={room.title}
                      className="w-32 h-24 lg:w-40 lg:h-28 object-cover rounded-xl"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    {/* Room Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {room.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {room.description}
                        </p>
                        {room.details && (
                          <p className="text-gray-700 text-sm">
                            {room.details}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Amenities */}
                    {room.amenities && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {room.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center ${
                                amenity.available
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {amenity.available ? (
                                <Check size={14} />
                              ) : (
                                <X size={14} />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              {amenity.icon}
                              <span>{amenity.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Availability & Cancellation */}
                    {room.roomsAvailable && (
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h4 className="font-semibold text-gray-800 text-sm">
                            {room.roomsAvailable} Rooms available
                          </h4>
                        </div>
                        <p className="text-sm text-gray-500">
                          {room.cancellation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Section */}
                {room.price && (
                  <div className="">
                    <div className="text-xl font-bold text-gray-800">
                      {room.price}
                    </div>
                    <div className="text-sm text-gray-500">{room.includes}</div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-col gap-3">
                      {room.type === "monthly" ? (
                        <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-full transition-colors">
                          Book Now
                        </button>
                      ) : (
                        <>
                          <button className="flex-1 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold py-3 px-4 rounded-full transition-colors">
                            View Details
                          </button>
                          <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-full transition-colors">
                            Book Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TypesOfRoom;
