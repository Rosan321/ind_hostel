// import { Circle, CircleSmall, House, Lock, Slice, Utensils, Wifi } from "lucide-react";
// import React from "react";

// const roomsData = [
//   {
//     id: 1,
//     title: "Single Bed – Mixed Dorm",
//     description: "Single room · 1 bed · 1 guest",
//     images: "/images/bedroom.png",
//     details:
//       "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
//     amenities: [
//       { name: "WIFI", available: false, icon: <Wifi size={16} /> },
//       { name: "Common kitchen", available: true, icon: <Slice size={16} /> },
//       { name: "Lockers", available: false, icon: <Lock size={16} /> },
//       {
//         name: "Daily housekeeping",
//         available: false,
//         icon: <House size={16} />,
//       },
//     ],
//     roomsAvailable: 6,
//     cancellation: "Free cancellation until 24 hrs before check-in",
//     price: "₹ 499 / night",
//     includes: "Includes taxes & hostel fees",
//     type: "monthly",
//   },
//   {
//     id: 2,
//     title: "Double Bed – Mixed Dorm",
//     description: "Double Shared room · 2 bed · 2 guest",
//     images: "/images/bedroom.png",
//     details:
//       "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
//     amenities: [
//       { name: "WIFI", available: false, icon: <Wifi size={16} /> },
//       { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
//       { name: "Lockers", available: false, icon: <Lock size={16} /> },
//       {
//         name: "Daily housekeeping",
//         available: false,
//         icon: <House size={16} />,
//       },
//     ],
//     roomsAvailable: 6,
//     cancellation: "Free cancellation until 24 hrs before check-in",
//     price: "₹ 799 / night",
//     includes: "Includes taxes & hostel fees",
//     type: "night",
//   },
//   {
//     id: 3,
//     title: "Single Bed – Mixed Dorm",
//     description: "Single room · 1 bed · 1 guest",
//     images: "/images/bedroom.png",
//     details:
//       "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
//     amenities: [
//       { name: "WIFI", available: false, icon: <Wifi size={16} /> },
//       { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
//       { name: "Lockers", available: false, icon: <Lock size={16} /> },
//       {
//         name: "Daily housekeeping",
//         available: false,
//         icon: <House size={16} />,
//       },
//     ],
//     roomsAvailable: 6,
//     cancellation: "Free cancellation until 24 hrs before check-in",
//     price: "₹ 499 / night",
//     includes: "Includes taxes & hostel fees",
//     type: "night",
//   },
// ];

// const TypesOfRoom = () => {
//   return (
//     <>
//       <div className="bg-white rounded-3xl p-6 shadow">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Types of Rooms Available
//           </h2>
//           <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
//         </div>

//         {/* Rooms List */}
//         <div className="space-y-6">
//           {roomsData.map((room) => (
//             <div key={room.id}>
//               {/* Room Card */}
//               <div
//                 className={`p-6 rounded-2xl border-2 flex flex-col lg:flex-row justify-between lg:items-center gap-4 ${
//                   room.type === "monthly"
//                     ? "bg-white border-gray-200"
//                     : "bg-white border-gray-100"
//                 }`}
//               >
//                 <div className="flex flex-col sm:flex-row gap-6">
//                   {/* Image Section */}
//                   <div className="flex-shrink-0">
//                     <img
//                       src={room.images}
//                       alt={room.title}
//                       className="w-full sm:w-full h-36 lg:w-40 lg:h-32 object-cover rounded-xl"
//                     />
//                   </div>

//                   {/* Content Section */}
//                   <div className="flex-1">
//                     {/* Room Header */}
//                     <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
//                           {room.title}
//                         </h3>
//                         <p className="text-[#1A1A1A] text-sm mb-2">
//                           {room.description}
//                         </p>
//                         {room.details && (
//                           <p className="text-[#666666] text-xs">
//                             {room.details}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Amenities */}
//                     {room.amenities && (
//                       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//                         {room.amenities.map((amenity, index) => (
//                           <div key={index} className="flex items-center">
//                             <div className="flex items-center gap-2 text-sm text-[#44475A] font-semibold">
//                               <span>{amenity.icon}</span>
//                               <span>{amenity.name}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}

//                     {/* Availability & Cancellation */}
//                     {room.roomsAvailable && (
//                       <div className="space-y-2 mt-4">
//                         <div className="flex items-center gap-1">
//                           <Circle size={14} fill="#079400" stroke="none" />
//                           {/* <Circle size={16} fill="#079400" stroke="none" /> */}
//                           <h4 className="font-bold text-[#666666] text-sm sm:text-lg">
//                             {room.roomsAvailable} Rooms available
//                           </h4>
//                         </div>
//                         <p className="text-xs sm:text-sm bg-[#666666] text-[#FFFFFF] px-4 py-2 rounded-full inline-block">
//                           {room.cancellation}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Price Section */}
//                 {room.price && (
//                   <div>
//                     <h4 className="text-lg md:text-xl font-bold text-gray-800">
//                       {room.price}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-500">{room.includes}</p>

//                     {/* Action Buttons */}
//                     <div className="mt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
//                       {room.type === "monthly" ? (
//                         <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-pointer">
//                           Book Now
//                         </button>
//                       ) : (
//                         <>
//                           <button className="flex-1 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-pointer">
//                             View Details
//                           </button>
//                           <button className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-pointer">
//                             Book Now
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TypesOfRoom;

//////////////////////////////////////////

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Circle, House, Lock, Slice, Utensils, Wifi, X } from "lucide-react";
import BookingPage from "./bookingModal/BookingPage";
import RevealOnScroll from "./animations/RevealOnScroll";
import AnimatedCard from "./animations/AnimatedCard";

// ✅ Room Data
const roomsData = [
  {
    id: 1,
    title: "Single Bed – Mixed Dorm",
    description: "Single room · 1 bed · 1 guest",
    images: [
      "/images/bedroom.png",
      "/images/bedroom2.png",
      "/images/bedroom3.png",
    ],
    details:
      "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
    amenities: [
      { name: "WIFI", available: false, icon: <Wifi size={16} /> },
      { name: "Common kitchen", available: true, icon: <Slice size={16} /> },
      { name: "Lockers", available: false, icon: <Lock size={16} /> },
      {
        name: "Daily housekeeping",
        available: false,
        icon: <House size={16} />,
      },
    ],
    roomsAvailable: 6,
    cancellation: "Free cancellation until 24 hrs before check-in",
    price: "₹ 499 / night",
    includes: "Includes taxes & hostel fees",
  },
  {
    id: 2,
    title: "Double Bed – Mixed Dorm",
    description: "Double Shared room · 2 bed · 2 guest",
    images: ["/images/bedroom.png", "/images/bedroom2.png"],
    details:
      "Affordable bed in a 6-bed dorm with lockers and common kitchen. Great for short stays",
    amenities: [
      { name: "WIFI", available: false, icon: <Wifi size={16} /> },
      { name: "Common kitchen", available: true, icon: <Utensils size={16} /> },
      { name: "Lockers", available: false, icon: <Lock size={16} /> },
      {
        name: "Daily housekeeping",
        available: false,
        icon: <House size={16} />,
      },
    ],
    roomsAvailable: 6,
    cancellation: "Free cancellation until 24 hrs before check-in",
    price: "₹ 799 / night",
    includes: "Includes taxes & hostel fees",
  },
];

// ✅ Image Slider Component (dots only)
const ImageSlider = ({ images, autoSlideInterval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Auto slide functionality with pause control
  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, images.length, autoSlideInterval, isPaused]);

  const goToSlide = (index) => {
    setCurrent(index);
    // Reset timer when manually navigating
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image Display */}
      <div
        className="relative w-full sm:w-full h-36 lg:w-40 lg:h-32 rounded-xl overflow-hidden group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover rounded-xl transition-all duration-500"
        />

        {/* Badge showing image number */}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {current + 1}/{images.length}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-1 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-[#44475A] w-3 h-3"
                  : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Modal Component for Booking Page
const BookingModal = ({ room, isOpen, onClose, id }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 h-full">
      <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 cursor-pointer"
        >
          <X size={24} className="text-gray-700" />
        </button>

        {/* Modal Content */}
        <div className="h-[90vh] xl:h-[80vh] overflow-y-auto no-scrollbar">
          <BookingPage room={room} id={id} />
        </div>
      </div>
    </div>
  );
};

// ✅ Main Component
const TypesOfRoom = ({ id }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Types of Rooms Available
          </h2>
          <div className="w-12 h-1 bg-[#0D0BA8] rounded-full"></div>
        </div>

        {/* Room List */}
        <div className="space-y-6">
          {roomsData.map((room) => (
            <AnimatedCard key={room.id}>
              <div
                className={`p-6 rounded-2xl border-2 flex flex-col lg:flex-row justify-between lg:items-center gap-4 ${
                  room.type === "monthly"
                    ? "bg-white border-gray-200"
                    : "bg-white border-gray-100"
                }`}
              >
                <RevealOnScroll delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image Slider */}
                    <div className="flex-shrink-0">
                      <ImageSlider
                        images={
                          Array.isArray(room.images)
                            ? room.images
                            : [room.images]
                        }
                      />
                    </div>

                    {/* Room Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
                            {room.title}
                          </h3>
                          <p className="text-[#1A1A1A] text-sm mb-2">
                            {room.description}
                          </p>
                          {room.details && (
                            <p className="text-[#666666] text-xs">
                              {room.details}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Amenities */}
                      {room.amenities && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                          {room.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-[#44475A] font-semibold"
                            >
                              {amenity.icon}
                              <span>{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Availability & Cancellation */}
                      {room.roomsAvailable && (
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center gap-1">
                            <Circle size={14} fill="#079400" stroke="none" />
                            <h4 className="font-bold text-[#666666] text-sm sm:text-lg">
                              {room.roomsAvailable} Rooms available
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm bg-[#666666] text-[#FFFFFF] px-4 py-2 rounded-full inline-block">
                            {room.cancellation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Price Section */}
                <RevealOnScroll delay={0.1}>
                  <h4 className="text-lg md:text-xl font-bold text-gray-800">
                    {room.price}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">
                    {room.includes}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <button
                      onClick={() => handleViewDetails(room)}
                      className="flex-1 bg-[#0D0BA8] hover:bg-[#2A32FF] text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </RevealOnScroll>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        id={id}
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TypesOfRoom;
