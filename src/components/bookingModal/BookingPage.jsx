// "use client";

// import Link from "next/link";
// import RevealOnScroll from "../animations/RevealOnScroll";
// import HoverLift from "../animations/HoverLift";
// import { useState, useEffect } from "react";
// import {
//   Wifi,
//   Shield,
//   Utensils,
//   Bed,
//   Car,
//   Camera,
//   CheckCircle,
//   Home,
//   Waves,
//   Bike,
//   Phone,
//   Star,
//   MapPin,
//   Clock,
//   Users,
//   Calendar,
//   ChevronRight,
//   AlertCircle,
// } from "lucide-react";

// // Amenity Icon Mapping - only for the given amenities
// const amenityIcons = {
//   // Given amenities from your data
//   wifi: <Wifi className="w-5 h-5 text-blue-600" />,
//   verified: <CheckCircle className="w-5 h-5 text-green-600" />,
//   "meals included": <Utensils className="w-5 h-5 text-blue-600" />,
//   "24/7 security": <Shield className="w-5 h-5 text-blue-600" />,
//   "comfortable beds": <Bed className="w-5 h-5 text-blue-600" />,
//   "laundry service": <Waves className="w-5 h-5 text-blue-600" />,
//   parking: <Car className="w-5 h-5 text-blue-600" />,
//   "cctv surveillance": <Camera className="w-5 h-5 text-blue-600" />,
//   auto: <Bike className="w-5 h-5 text-blue-600" />,

//   // Fallback for any other amenities
//   default: <CheckCircle className="w-5 h-5 text-gray-400" />,
// };

// // Function to get amenity icon
// const getAmenityIcon = (amenityName) => {
//   const lowerAmenity = amenityName?.toLowerCase()?.trim() || "";
//   return amenityIcons[lowerAmenity] || amenityIcons["default"];
// };

// export default function BookingPage({ id, propertyData, stayId }) {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const propertyImages = propertyData?.images_url || [];

//   // Find the specific room based on id match
//   useEffect(() => {
//     if (propertyData?.room_id && id) {
//       const matchedRoom = propertyData.room_id.find(
//         (room) => room._id === id
//       );
      
//       if (matchedRoom) {
//         setSelectedRoom(matchedRoom);
//         // Set the first room image as selected image if available
//         if (matchedRoom.room_images_url && matchedRoom.room_images_url.length > 0) {
//           setSelectedImage(matchedRoom.room_images_url[0]);
//         } else if (propertyImages.length > 0) {
//           setSelectedImage(propertyImages[0]);
//         }
//       }
//     }
//   }, [id, propertyData, propertyImages]);

//   // Get amenities from propertyData
//   const amenities = propertyData?.amenities || [];

//   // Create amenities array with icons
//   const amenitiesWithIcons = amenities
//     .filter((amenity) => amenity && typeof amenity === "string")
//     .map((amenity) => ({
//       name: amenity,
//       icon: getAmenityIcon(amenity),
//       label: amenity
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" "),
//     }));

//   // Get property details
//   const propertyName = propertyData?.property_name || "Property";
//   const propertyDescription = propertyData?.property_description || "";
//   const propertyType = propertyData?.property_type || "Accommodation";
//   const avgRating = propertyData?.avgRating || 0;
//   const totalRatings = propertyData?.totalRatings || 0;
//   const location = propertyData?.location || {};
//   const checkInTime = propertyData?.check_in_time || "Flexible";
//   const cancellationPolicy =
//     propertyData?.cancellation_policy || "Flexible cancellation available";

//   // Get room types if available
//   const roomTypes = propertyData?.room_types || [];

//   // Get room amenities for selected room
//   const roomAmenities = selectedRoom?.room_amenities || [];
//   const roomImages = selectedRoom?.room_images_url || [];
  
//   // Get pricing for selected room
//   const pricing = selectedRoom?.pricing_id?.pricing || [];
//   const mainPrice = pricing[0] || {};
//   const roomPrice = mainPrice.price || 0;
//   const priceType = mainPrice.price_type || "per month";

//   // Show room images if available, otherwise property images
//   const displayImages = roomImages.length > 0 ? roomImages : propertyImages;
//   const mainDisplayImage = selectedImage || displayImages[0] || "";

//   if (!selectedRoom) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">
//             Room Not Found
//           </h2>
//           <p className="text-gray-500">The selected room is not available.</p>
//           <Link 
//             href="/"
//             className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
//           >
//             <ChevronRight className="w-4 h-4 rotate-180" />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-8 px-4 sm:px-6">
//         {/* Left Column - Property Details */}
//         <div className="lg:col-span-4">
//           <div className="p-6 mb-6">
//             {/* Property Header */}
//             <div className="mb-6">
//               <div className="flex items-start justify-between mb-3">
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
//                     {propertyName} - {selectedRoom.room_type}
//                   </h1>
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
//                       {propertyType.toUpperCase()}
//                     </span>
//                     {selectedRoom.rooms_available > 0 ? (
//                       <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                         {selectedRoom.rooms_available} Rooms Available
//                       </span>
//                     ) : (
//                       <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
//                         Fully Booked
//                       </span>
//                     )}
//                     {propertyData?.isverified && (
//                       <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
//                         <CheckCircle className="w-4 h-4" />
//                         Verified
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 {/* Rating Badge */}
//                 {avgRating > 0 && (
//                   <div className="text-right">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
//                       <span className="text-lg font-bold">
//                         {avgRating.toFixed(1)}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       {totalRatings} reviews
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <p className="text-gray-600 text-sm sm:text-base mb-4">
//                 {propertyDescription}
//               </p>
              
//               {/* Room Description */}
//               {selectedRoom.room_description && (
//                 <div className="p-4 bg-blue-50 rounded-lg">
//                   <h3 className="font-semibold text-gray-800 mb-2">
//                     Room Features
//                   </h3>
//                   <p className="text-gray-700 text-sm">
//                     {selectedRoom.room_description}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Image Gallery - Show room specific images */}
//             <div className="flex flex-col gap-4 mb-8">
//               {/* Main Image */}
//               <RevealOnScroll delay={0.2} className="w-full">
//                 <HoverLift>
//                   <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
//                     <img
//                       src={mainDisplayImage}
//                       alt={`${propertyName} - ${selectedRoom.room_type}`}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop";
//                       }}
//                     />
//                     {/* Image Counter */}
//                     {displayImages.length > 0 && (
//                       <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
//                         {(displayImages.findIndex((img) => img === mainDisplayImage) + 1)}/
//                         {displayImages.length}
//                       </div>
//                     )}
//                   </div>
//                 </HoverLift>
//               </RevealOnScroll>

//               {/* Thumbnail Images - Show only room specific images */}
//               {displayImages.length > 1 && (
//                 <RevealOnScroll delay={0.2}>
//                   <div className="flex items-center gap-3 overflow-x-auto pb-2 pl-2">
//                     {displayImages.map((img, index) => (
//                       <HoverLift key={index}>
//                         <button
//                           onClick={() => setSelectedImage(img)}
//                           className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all
//                             ${
//                               mainDisplayImage === img
//                                 ? "border-blue-600 scale-105"
//                                 : "border-gray-200 hover:border-blue-400"
//                             }
//                           `}
//                         >
//                           <img
//                             src={img}
//                             alt={`${selectedRoom.room_type} view ${index + 1}`}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src =
//                                 "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop";
//                             }}
//                           />
//                         </button>
//                       </HoverLift>
//                     ))}
//                   </div>
//                 </RevealOnScroll>
//               )}
              
//               {/* Message if no room specific images */}
//               {roomImages.length === 0 && displayImages.length > 0 && (
//                 <div className="text-sm text-gray-500 italic text-center">
//                   Showing property images (no specific room images available)
//                 </div>
//               )}
//             </div>

//             {/* Room Details */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Room Details
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium text-gray-700">Occupancy</p>
//                     <p className="text-sm text-gray-600">
//                       {selectedRoom.no_of_guests} guest{selectedRoom.no_of_guests > 1 ? 's' : ''} · {selectedRoom.beds_available} bed{selectedRoom.beds_available > 1 ? 's' : ''}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Home className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium text-gray-700">Availability</p>
//                     <p className="text-sm text-gray-600">
//                       {selectedRoom.rooms_available > 0 
//                         ? `${selectedRoom.rooms_available} room${selectedRoom.rooms_available > 1 ? 's' : ''} available`
//                         : 'Currently unavailable'}
//                     </p>
//                   </div>
//                 </div>

//                 {location?.address && (
//                   <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                     <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-700">Location</p>
//                       <p className="text-sm text-gray-600">
//                         {location.address}
//                       </p>
//                       {location.area && (
//                         <p className="text-sm text-gray-600">
//                           {location.area}, {location.city}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {checkInTime && checkInTime !== "NA" && (
//                   <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                     <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <p className="font-medium text-gray-700">Check-in Time</p>
//                       <p className="text-sm text-gray-600">{checkInTime}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Room Amenities */}
//             {roomAmenities.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   Room Amenities
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {roomAmenities.map((amenity, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all"
//                     >
//                       <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
//                       <span className="text-sm font-medium text-gray-700">
//                         {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Cancellation Policy */}
//             <div className="p-4 bg-blue-50 rounded-xl">
//               <div className="flex items-center gap-2 mb-2">
//                 <Shield className="w-5 h-5 text-blue-600" />
//                 <h4 className="font-semibold text-gray-800">
//                   Cancellation Policy
//                 </h4>
//               </div>
//               <p className="text-sm text-gray-700">{cancellationPolicy}</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Booking Summary */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">
//               Booking Summary
//             </h3>

//             {/* Selected Room Info */}
//             <div className="mb-6 p-4 bg-blue-50 rounded-xl">
//               <div className="flex justify-between items-center mb-3">
//                 <div>
//                   <h4 className="font-semibold text-lg text-gray-800">
//                     {selectedRoom.room_type}
//                   </h4>
//                   {/* <p className="text-sm text-gray-600 mt-1">
//                     {selectedRoom.beds_available} bed · {selectedRoom.no_of_guests} guest
//                     {selectedRoom.rooms_available > 0 &&
//                       ` · ${selectedRoom.rooms_available} available`}
//                   </p> */}
//                 </div>
//                 <div className="text-right">
//                   <div className="text-xl font-bold text-blue-700">
//                     ₹{roomPrice.toLocaleString()}
//                   </div>
//                   <p className="text-sm text-gray-500">{priceType}</p>
//                 </div>
//               </div>

//               {/* Availability Warning */}
//               {selectedRoom.rooms_available === 0 && (
//                 <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-sm text-red-700 font-medium flex items-center gap-1">
//                     <AlertCircle className="w-4 h-4" />
//                     This room type is currently fully booked
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Price Breakdown */}
//             <div className="border-t border-gray-200 pt-6 mb-6">
//               <h4 className="font-semibold text-lg text-gray-800 mb-4">
//                 Price Breakdown
//               </h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Room Price</span>
//                   <span className="font-semibold">
//                     ₹{roomPrice.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="border-t border-gray-200 pt-3">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-gray-800">Total</span>
//                     <h4 className="text-2xl font-bold text-blue-700">
//                       ₹{roomPrice.toLocaleString()}
//                     </h4>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Inclusive of all taxes
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Book Now Button */}
//             <Link 
//               href={`/checkout/${id}`}
//               className={`w-full flex items-center justify-center gap-2 text-white font-medium text-lg p-4 rounded-xl transition-all ${
//                 selectedRoom.rooms_available === 0
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//               onClick={(e) => {
//                 if (selectedRoom.rooms_available === 0) {
//                   e.preventDefault();
//                 }
//               }}
//             >
//                 <>
//                   Book Now
//                   <ChevronRight className="w-5 h-5" />
//                 </>
//             </Link>

//             {/* Trust Badges */}
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-sm font-medium text-gray-700 mb-3">
//                 Why book with us?
//               </p>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="flex items-center gap-2">
//                   <Shield className="w-4 h-4 text-green-600" />
//                   <span className="text-xs text-gray-600">Secure Booking</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-600" />
//                   <span className="text-xs text-gray-600">
//                     Verified Property
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-blue-600" />
//                   <span className="text-xs text-gray-600">24/7 Support</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-blue-600" />
//                   <span className="text-xs text-gray-600">Flexible Stay</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////


"use client";

import Link from "next/link";
import RevealOnScroll from "../animations/RevealOnScroll";
import HoverLift from "../animations/HoverLift";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  Home,
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  AlertCircle,
  Shield,
  Phone,
} from "lucide-react";
import { getAmenityIcon, getAmenityLabel } from "@/lib/utils/amenitiesHelper";

export default function BookingPage({ id, propertyData, stayId }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const propertyImages = propertyData?.images_url || [];

  // Find the specific room based on id match
  useEffect(() => {
    if (propertyData?.room_id && id) {
      const matchedRoom = propertyData.room_id.find(
        (room) => room._id === id
      );
      
      if (matchedRoom) {
        setSelectedRoom(matchedRoom);
        // Set the first room image as selected image if available
        if (matchedRoom.room_images_url && matchedRoom.room_images_url.length > 0) {
          setSelectedImage(matchedRoom.room_images_url[0]);
        } else if (propertyImages.length > 0) {
          setSelectedImage(propertyImages[0]);
        }
      }
    }
  }, [id, propertyData, propertyImages]);

  // Get amenities from propertyData
  const amenities = propertyData?.amenities || [];

  // Create amenities array using helper functions
  const amenitiesWithIcons = amenities
    .filter((amenity) => amenity && typeof amenity === "string")
    .map((amenity) => ({
      name: amenity,
      icon: getAmenityIcon(amenity),
      label: getAmenityLabel(amenity),
    }));

  // Get property details
  const propertyName = propertyData?.property_name || "Property";
  const propertyDescription = propertyData?.property_description || "";
  const propertyType = propertyData?.property_type || "Accommodation";
  const avgRating = propertyData?.avgRating || 0;
  const totalRatings = propertyData?.totalRatings || 0;
  const location = propertyData?.location || {};
  const checkInTime = propertyData?.check_in_time || "Flexible";
  const cancellationPolicy =
    propertyData?.cancellation_policy || "Flexible cancellation available";

  // Get room types if available
  const roomTypes = propertyData?.room_types || [];

  // Get room amenities for selected room
  const roomAmenities = selectedRoom?.room_amenities || [];
  const roomImages = selectedRoom?.room_images_url || [];
  
  // Get pricing for selected room
  const pricing = selectedRoom?.pricing_id?.pricing || [];
  const mainPrice = pricing[0] || {};
  const roomPrice = mainPrice.price || 0;
  const priceType = mainPrice.price_type || "per month";

  // Show room images if available, otherwise property images
  const displayImages = roomImages.length > 0 ? roomImages : propertyImages;
  const mainDisplayImage = selectedImage || displayImages[0] || "";

  if (!selectedRoom) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Room Not Found
          </h2>
          <p className="text-gray-500">The selected room is not available.</p>
          <Link 
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-8 px-4 sm:px-6">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-4">
          <div className="p-6 mb-6">
            {/* Property Header */}
            <div className="lg:mb-6">
              <div className="flex flex-col items-start justify-between mb-3 space-y-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {propertyName} - {selectedRoom.room_type}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                      {propertyType.toUpperCase()}
                    </span>
                    {selectedRoom.rooms_available > 0 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full">
                        {selectedRoom.rooms_available} Rooms Available
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-xs sm:text-sm font-medium rounded-full">
                        Fully Booked
                      </span>
                    )}
                    {propertyData?.isverified && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                {/* Rating Badge */}
                {avgRating > 0 && (
                  <div className="text-right flex flex-row items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <h4 className="text-lg text-[#1A1A1A] font-bold">
                        {avgRating.toFixed(1)}
                      </h4>
                    </div>
                    <h4 className="text-sm text-[#666666]">
                      {totalRatings} reviews
                    </h4>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm sm:text-base mb-4">
                {propertyDescription}
              </p>
              
              {/* Room Description */}
              {selectedRoom.room_description && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Room Features
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {selectedRoom.room_description}
                  </p>
                </div>
              )}
            </div>

            {/* Image Gallery - Show room specific images */}
            <div className="flex flex-col gap-4 lg:mb-8">
              {/* Main Image */}
              <RevealOnScroll delay={0.2} className="w-full">
                <HoverLift>
                  <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
                    <img
                      src={mainDisplayImage}
                      alt={`${propertyName} - ${selectedRoom.room_type}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop";
                      }}
                    />
                    {/* Image Counter */}
                    {displayImages.length > 0 && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        {(displayImages.findIndex((img) => img === mainDisplayImage) + 1)}/
                        {displayImages.length}
                      </div>
                    )}
                  </div>
                </HoverLift>
              </RevealOnScroll>

              {/* Thumbnail Images - Show only room specific images */}
              {displayImages.length > 1 && (
                <RevealOnScroll delay={0.2}>
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 pl-2">
                    {displayImages.map((img, index) => (
                      <HoverLift key={index}>
                        <button
                          onClick={() => setSelectedImage(img)}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all
                            ${
                              mainDisplayImage === img
                                ? "border-blue-600 scale-105"
                                : "border-gray-200 hover:border-blue-400"
                            }
                          `}
                        >
                          <img
                            src={img}
                            alt={`${selectedRoom.room_type} view ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop";
                            }}
                          />
                        </button>
                      </HoverLift>
                    ))}
                  </div>
                </RevealOnScroll>
              )}
              
              {/* Message if no room specific images */}
              {roomImages.length === 0 && displayImages.length > 0 && (
                <div className="text-sm text-gray-500 italic text-center">
                  Showing property images (no specific room images available)
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="lg:mb-8">
              <h3 className="text-lg font-semibold text-gray-800 lg:mb-4">
                Room Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Occupancy</p>
                    <p className="text-sm text-gray-600">
                      {selectedRoom.no_of_guests} guest{selectedRoom.no_of_guests > 1 ? 's' : ''} · {selectedRoom.beds_available} bed{selectedRoom.beds_available > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Home className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Availability</p>
                    <p className="text-sm text-gray-600">
                      {selectedRoom.rooms_available > 0 
                        ? `${selectedRoom.rooms_available} room${selectedRoom.rooms_available > 1 ? 's' : ''} available`
                        : 'Currently unavailable'}
                    </p>
                  </div>
                </div>

                {location?.address && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-600">
                        {location.address}
                      </p>
                      {location.area && (
                        <p className="text-sm text-gray-600">
                          {location.area}, {location.city}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {checkInTime && checkInTime !== "NA" && (
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Check-in Time</p>
                      <p className="text-sm text-gray-600">{checkInTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Room Amenities - Using helper functions */}
            {roomAmenities.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Room Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {roomAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {getAmenityLabel(amenity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Amenities - Using helper functions */}
            {/* {amenitiesWithIcons.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Property Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenitiesWithIcons.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all"
                    >
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {amenity.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Cancellation Policy */}
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-800">
                  Cancellation Policy
                </h4>
              </div>
              <p className="text-sm text-gray-700">{cancellationPolicy}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Booking Summary
            </h3>

            {/* Selected Room Info */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    {selectedRoom.room_type}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-blue-700">
                    ₹{roomPrice.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">{priceType}</p>
                </div>
              </div>

              {/* Availability Warning */}
              {selectedRoom.rooms_available === 0 && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    This room type is currently fully booked
                  </p>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-4">
                Price Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Room Price</span>
                  <span className="font-semibold">
                    ₹{roomPrice.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Total</span>
                    <h4 className="text-2xl font-bold text-blue-700">
                      ₹{roomPrice.toLocaleString()}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <Link 
              href={`/checkout?id=${id}`}
              className={`w-full flex items-center justify-center gap-2 text-white font-medium text-lg p-4 rounded-xl transition-all ${
                selectedRoom.rooms_available === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={(e) => {
                if (selectedRoom.rooms_available === 0) {
                  e.preventDefault();
                }
              }}
            >
                <>
                  Book Now
                  <ChevronRight className="w-5 h-5" />
                </>
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Why book with us?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Secure Booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">
                    Verified Property
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-600">Flexible Stay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

