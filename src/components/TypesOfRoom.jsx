// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Circle, House, Lock, Slice, Utensils, Wifi, X } from "lucide-react";
// import BookingPage from "./bookingModal/BookingPage";
// import RevealOnScroll from "./animations/RevealOnScroll";
// import AnimatedCard from "./animations/AnimatedCard";

// // ✅ Amenity Icon Mapping
// const amenityIcons = {
//   wifi: <Wifi size={16} className="text-[#0D0BA8]" />,
//   wiFi: <Wifi size={16} className="text-[#0D0BA8]" />,
//   "meals included": <Utensils size={16} className="text-[#0D0BA8]" />,
//   "24/7 security": <Lock size={16} className="text-[#0D0BA8]" />,
//   "comfortable beds": <House size={16} className="text-[#0D0BA8]" />,
//   "laundry service": <Slice size={16} className="text-[#0D0BA8]" />,
//   parking: (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//       />
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//     </svg>
//   ),
//   "self kitchen": (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//       />
//     </svg>
//   ),
//   "playing area": (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
//       />
//     </svg>
//   ),
//   "attached bathroom": (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
//       />
//     </svg>
//   ),
//   "bed with pillow": <House size={16} className="text-[#0D0BA8]" />,
//   "room cleaning every day": (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 10h11M9 21V10m-6 0V4a1 1 0 011-1h14a1 1 0 011 1v6m-1 11l-5-5m5 5l-5-5m5 5h-5"
//       />
//     </svg>
//   ),
//   fan: (
//     <svg
//       className="w-4 h-4 text-[#0D0BA8]"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
//       />
//     </svg>
//   ),
//   default: <Circle size={16} className="text-[#0D0BA8]" />,
// };

// // ✅ Image Slider Component (dots only)
// const ImageSlider = ({ images, autoSlideInterval = 3000 }) => {
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const timeoutRef = useRef(null);

//   // Auto slide functionality with pause control
//   useEffect(() => {
//     if (!images || images.length <= 1 || isPaused) return;

//     timeoutRef.current = setTimeout(() => {
//       setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, autoSlideInterval);

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [current, images?.length, autoSlideInterval, isPaused]);

//   const goToSlide = (index) => {
//     setCurrent(index);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   // Handle empty images
//   if (!images || images.length === 0) {
//     return (
//       <div className="w-full sm:w-full h-36 lg:w-40 lg:h-32 rounded-xl bg-gray-200 flex items-center justify-center">
//         <span className="text-gray-500">No images available</span>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center">
//       {/* Image Display */}
//       <div
//         className="relative w-full sm:w-full h-36 lg:w-40 lg:h-32 rounded-xl overflow-hidden group"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//       >
//         <img
//           src={images[current]}
//           alt={`Slide ${current + 1}`}
//           className="w-full h-full object-cover rounded-xl transition-all duration-500"
//         />

//         {/* Badge showing image number */}
//         <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
//           {current + 1}/{images.length}
//         </div>

//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={prevSlide}
//               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
//               aria-label="Previous image"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
//               aria-label="Next image"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </>
//         )}
//       </div>

//       {/* Dots Indicator */}
//       {images.length > 1 && (
//         <div className="flex justify-center items-center gap-1 mt-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`rounded-full transition-all duration-300 ${
//                 current === index
//                   ? "bg-[#44475A] w-3 h-3"
//                   : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
//               }`}
//               aria-label={`Go to image ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ✅ Modal Component for Booking Page
// const BookingModal = ({ isOpen, onClose, id, propertyData, stayId }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 h-full">
//       <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 cursor-pointer"
//         >
//           <X size={24} className="text-gray-700" />
//         </button>

//         {/* Modal Content */}
//         <div className="h-[90vh] xl:h-[80vh] overflow-y-auto no-scrollbar">
//           <BookingPage id={id} propertyData={propertyData} stayId={stayId} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ Main Component
// const TypesOfRoom = ({ id, data }) => {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // console.log("Received data:", data);

//   // Transform the data structure for easier use
//   const roomsData =
//     data?.room_id?.map((room) => {
//       // Get price from pricing_id
//       const priceInfo = room.pricing_id?.pricing?.[0] || {};
//       const price = priceInfo.price || 0;
//       const priceType = priceInfo.price_type || "per month";

//       // ✅ ONLY use room-specific amenities, not property amenities
//       const roomSpecificAmenities = room.room_amenities || [];

//       return {
//         id: room._id,
//         roomId: room._id,
//         accommodationId: room.accommodation_id,
//         title: room.room_type,
//         description:
//           room.room_description || "Comfortable room with all basic amenities",
//         images: room.room_images_url || [],
//         amenities: roomSpecificAmenities.map((amenity) => ({
//           name: amenity,
//           icon: amenityIcons[amenity.toLowerCase()] || amenityIcons.default,
//         })),
//         roomsAvailable: room.rooms_available || 0,
//         bedsAvailable: room.beds_available || 0,
//         maxGuests: room.no_of_guests || 2,
//         price: `₹${price.toLocaleString()}/${priceType}`,
//         priceDetails: {
//           amount: price,
//           type: priceType,
//           taxIncluded: data.tax || false,
//           taxAmount: data.tax_amount || 0,
//         },
//         includes: "All amenities included",
//         cancellation:
//           data.cancellation_policy || "Flexible cancellation policy",
//         // Pass additional data needed for booking
//         propertyDetails: {
//           propertyName: data.property_name,
//           propertyType: data.property_type,
//           address: data.location?.address || "",
//           area: data.location?.area || "",
//           city: data.location?.city || "",
//           checkInTime: data.check_in_time,
//           checkOutTime: data.check_out_time,
//           hostContact: data.host_contact,
//           isVerified: data.isverified,
//           avgRating: data.avgRating,
//           totalRatings: data.totalRatings,
//         },
//       };
//     }) || [];

//   const handleViewDetails = (id) => {
//     setSelectedRoom(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRoom(null);
//   };

//   // If no rooms data
//   if (!data || !data.room_id || data.room_id.length === 0) {
//     return (
//       <div className="bg-white rounded-3xl p-6 shadow">
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Types of Rooms Available
//           </h2>
//           <div className="w-12 h-1 bg-[#0D0BA8] rounded-full"></div>
//         </div>
//         <div className="text-center py-8">
//           <p className="text-gray-500">No rooms available at the moment.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-white rounded-3xl p-4 sm:p-6 shadow">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Types of Rooms Available
//           </h2>
//           <div className="w-12 h-1 bg-[#0D0BA8] rounded-full"></div>
//         </div>

//         {/* Room List */}
//         <div className="space-y-6">
//           {roomsData.map((room) => (
//             <AnimatedCard key={room?.id}>
//               <div
//                 className={`p-6 rounded-2xl border-2 flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-4 ${
//                   room?.priceDetails?.type === "per month"
//                     ? "bg-white border-gray-200"
//                     : "bg-white border-gray-100"
//                 }`}
//               >
//                 <RevealOnScroll delay={0.2}>
//                   <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
//                     {/* Image Slider */}
//                     <div className="flex-shrink-0">
//                       <ImageSlider
//                         images={
//                           Array.isArray(room?.images)
//                             ? room?.images
//                             : [room?.images]
//                         }
//                       />
//                     </div>

//                     {/* Room Info */}
//                     <div className="flex-1">
//                       <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
//                             {room.title}
//                           </h3>
//                           <p className="text-[#1A1A1A] text-sm mb-2">
//                             {room.description}
//                           </p>
//                           <div className="flex flex-wrap gap-2 mb-2">
//                             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                               {room.bedsAvailable} beds available
//                             </span>
//                             <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
//                               Max {room.maxGuests} guests per room
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* ✅ Room-Specific Amenities Only */}
//                       {room.amenities && room.amenities.length > 0 ? (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
//                           {room?.amenities?.slice(0, 8).map((amenity, index) => (
//                             <div
//                               key={index}
//                               className="flex items-center gap-2 text-sm text-[#44475A] font-semibold"
//                             >
//                               {amenity.icon}
//                               <span className="truncate">{amenity.name}</span>
//                             </div>
//                           ))}
//                           {room?.amenities?.length > 8 && (
//                             <div className="flex items-center gap-2 text-sm text-gray-500">
//                               <span>+{room?.amenities?.length - 8} more</span>
//                             </div>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="text-sm text-gray-500 italic">
//                           No specific amenities listed for this room
//                         </div>
//                       )}
//                       {/* Availability & Cancellation */}
//                       {room?.roomsAvailable > 0 && room?.bedsAvailable > 0 ? (
//                         <div className="space-y-2 mt-4">
//                           <div className="flex items-center gap-1">
//                             <Circle size={14} fill="#079400" stroke="none" />
//                             <h4 className="font-bold text-[#666666] text-sm lg:text-lg">
//                               {room?.roomsAvailable} Rooms available
//                             </h4>
//                           </div>
//                           <p className="text-xs lg:text-sm bg-[#666666] text-[#FFFFFF] px-2 lg:px-4 py-1 lg:py-2 rounded-full inline-block">
//                             Cancelation available {room?.cancellation}
//                           </p>
//                         </div>
//                       )
//                       : (
//                         <div className="space-y-2 mt-4">
//                           <div className="flex items-center gap-1">
//                             <Circle size={14} fill="red" stroke="none" />
//                             <h4 className="font-bold text-[#666666] text-sm sm:text-lg">
//                               No rooms available
//                             </h4>
//                           </div>
//                           <p className="text-xs sm:text-sm bg-[#666666] text-[#FFFFFF] px-4 py-2 rounded-full inline-block">
//                             {room?.cancellation}
//                           </p>
//                         </div>
//                       )
//                     }
//                     </div>
//                   </div>
//                 </RevealOnScroll>

//                 {/* Price Section */}
//                 <RevealOnScroll delay={0.1}>
//                   <div className="flex lg:flex-col justify-between items-center lg:items-start mt-2">
//                     <h4 className="text-lg md:text-xl font-bold text-gray-800">
//                       {room?.price}
//                     </h4>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {room?.includes}
//                     </p>
//                     {room?.priceDetails.taxIncluded && (
//                       <p className="text-xs text-green-600 mt-1">
//                         + ₹{room?.priceDetails?.taxAmount} tax
//                       </p>
//                     )}

//                     {/* Buttons */}
//                     <div className="lg:mt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
//                       {room?.roomsAvailable > 0 ? (
//                         <button
//                           onClick={() => handleViewDetails(room?.id)}
//                           className="flex-1 bg-[#0D0BA8] hover:bg-[#2A32FF] text-white text-sm md:text-base font-semibold py-2 px-4 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-pointer"
//                         >
//                           View Details
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleViewDetails(room?.id)}
//                           disabled
//                           className="flex-1 bg-gray-400 text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-2 xl:px-4 rounded-full transition-colors cursor-not-allowed"
//                         >
//                           Not available
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </RevealOnScroll>
//               </div>
//             </AnimatedCard>
//           ))}
//         </div>
//       </div>

//       {/* Booking Modal */}
//       <BookingModal
//         id={selectedRoom}
//         stayId={id}
//         room={selectedRoom}
//         propertyData={data}
//         isOpen={isModalOpen}
//         onClose={closeModal}
//       />
//     </>
//   );
// };

// export default TypesOfRoom;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Circle, X } from "lucide-react";
import BookingPage from "./bookingModal/BookingPage";
import RevealOnScroll from "./animations/RevealOnScroll";
import AnimatedCard from "./animations/AnimatedCard";
import { getAmenityIcon, getAmenityLabel } from "@/lib/utils/amenitiesHelper";

// ✅ Image Slider Component (dots only)
const ImageSlider = ({ images, autoSlideInterval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Auto slide functionality with pause control
  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, images?.length, autoSlideInterval, isPaused]);

  const goToSlide = (index) => {
    setCurrent(index);
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

  // Handle empty images
  if (!images || images.length === 0) {
    return (
      <div className="w-full sm:w-full h-36 lg:w-40 lg:h-32 rounded-xl bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

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
const BookingModal = ({ isOpen, onClose, id, propertyData, stayId }) => {
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
          <BookingPage id={id} propertyData={propertyData} stayId={stayId} />
        </div>
      </div>
    </div>
  );
};

// ✅ Main Component
const TypesOfRoom = ({ id, data }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(data)

  // Transform the data structure for easier use
  const roomsData =
    data?.room_id?.map((room) => {
      // Get price from pricing_id
      const priceInfo = room.pricing_id?.pricing?.[0] || {};
      const price = priceInfo.price || 0;
      const priceType = priceInfo.price_type || "per month";

      // ✅ Use the helper functions for room-specific amenities
      const roomSpecificAmenities = room.room_amenities || [];

      return {
        id: room._id,
        roomId: room._id,
        accommodationId: room.accommodation_id,
        title: room.room_type,
        description:
          room.room_description || "Comfortable room with all basic amenities",
        images: room.room_images_url || [],
        amenities: roomSpecificAmenities,
        roomsAvailable: room.rooms_available || 0,
        bedsAvailable: room.beds_available || 0,
        maxGuests: room.no_of_guests || 2,
        price: `₹${price.toLocaleString()}/${priceType}`,
        priceDetails: {
          amount: price,
          type: priceType,
          taxIncluded: data.tax || false,
          taxAmount: data.tax_amount || 0,
        },
        includes: "All amenities included",
        cancellation:
          data.cancellation_policy || "Flexible cancellation policy",
        // Pass additional data needed for booking
        propertyDetails: {
          propertyName: data.property_name,
          propertyType: data.property_type,
          address: data.location?.address || "",
          area: data.location?.area || "",
          city: data.location?.city || "",
          checkInTime: data.check_in_time,
          checkOutTime: data.check_out_time,
          hostContact: data.host_contact,
          isVerified: data.isverified,
          avgRating: data.avgRating,
          totalRatings: data.totalRatings,
        },
      };
    }) || [];

  const handleViewDetails = (roomId) => {
    setSelectedRoom(roomId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // If no rooms data
  if (!data || !data.room_id || data.room_id.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Types of Rooms Available
          </h2>
          <div className="w-12 h-1 bg-[#0D0BA8] rounded-full"></div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No rooms available at the moment.</p>
        </div>
      </div>
    );
  }

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
                className={`p-6 rounded-2xl border-2 flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-4 ${
                  room.priceDetails.type === "per month"
                    ? "bg-white border-gray-200"
                    : "bg-white border-gray-100"
                }`}
              >
                <RevealOnScroll delay={0.2}>
                  <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
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
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">
                            {room.title}
                          </h3>
                          <p className="text-[#1A1A1A] text-sm mb-2">
                            {room.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {room.bedsAvailable} beds available
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Max {room.maxGuests} guests per room
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ✅ Room-Specific Amenities Using Helper Functions */}
                      {room.amenities && room.amenities.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                          {room.amenities.slice(0, 8).map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-[#44475A] font-semibold"
                            >
                              <div className="w-5 h-5 flex items-center justify-center">
                                {getAmenityIcon(amenity)}
                              </div>
                              <span className="truncate">
                                {getAmenityLabel(amenity)}
                              </span>
                            </div>
                          ))}
                          {room.amenities.length > 8 && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>+{room.amenities.length - 8} more</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          No specific amenities listed for this room
                        </div>
                      )}

                      {/* Availability & Cancellation */}
                      <div className="space-y-2 mt-4">
                        {room.roomsAvailable > 0 && room.bedsAvailable > 0 ? (
                          <>
                            <div className="flex items-center gap-1">
                              <Circle size={14} fill="#079400" stroke="none" />
                              <h4 className="font-bold text-[#666666] text-sm lg:text-lg">
                                {room.roomsAvailable} Rooms available
                              </h4>
                            </div>
                            <p className="text-xs lg:text-sm bg-[#666666] text-[#FFFFFF] px-2 lg:px-4 py-1 lg:py-2 rounded-full inline-block">
                              Cancellation available {room.cancellation}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-1">
                              <Circle size={14} fill="red" stroke="none" />
                              <h4 className="font-bold text-[#666666] text-sm sm:text-lg">
                                No rooms available
                              </h4>
                            </div>
                            <p className="text-xs sm:text-sm bg-[#666666] text-[#FFFFFF] px-4 py-2 rounded-full inline-block">
                              {room.cancellation}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>

                {/* Price Section */}
                <RevealOnScroll delay={0.1}>
                  <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-center lg:items-start mt-2">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">
                      {room.price}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-500">
                      {room.includes}
                    </p>
                    {room.priceDetails.taxIncluded && (
                      <p className="text-xs text-green-600 mt-1">
                        + ₹{room.priceDetails.taxAmount} tax
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="lg:mt-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                      {room.roomsAvailable > 0 ? (
                        <button
                          onClick={() => handleViewDetails(room.id)}
                          className="flex-1 bg-[#0D0BA8] hover:bg-[#2A32FF] text-white text-sm md:text-base font-semibold py-2 px-4 xl:py-3 xl:px-4 rounded-full transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewDetails(room.id)}
                          disabled
                          className="flex-1 bg-gray-400 text-white text-sm md:text-base font-semibold py-2 xl:py-3 px-4 rounded-full transition-colors cursor-not-allowed"
                        >
                          Not available
                        </button>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        id={selectedRoom}
        stayId={id}
        propertyData={data}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TypesOfRoom;
