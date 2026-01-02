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
