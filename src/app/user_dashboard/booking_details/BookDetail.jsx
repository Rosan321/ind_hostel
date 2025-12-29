"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CheckInComponent from "./CheckInComponent";

const steps = [
  {
    title: "Booking Confirmed",
    date: "10 Nov 2025 · 09:12 AM",
    completed: true,
  },
  {
    title: "Payment Received",
    date: "10 Nov 2025 · 09:13 AM",
    completed: false,
  },
  {
    title: "Host Acknowledged",
    date: "11 Nov 2025 · 02:20 PM",
    completed: false,
  },
  {
    title: "Check-in Scheduled",
    date: "12 Nov 2025 · After 2:00 PM",
    completed: false,
  },
];

const BookDetail = ({ bookDataDetails }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // console.log(bookDataDetails)

  // Get all image URLs - add null check
  const images = bookDataDetails?.accommodationId?.images_url || [];
  const mainImage = images[selectedImageIndex] || null; // Changed from "" to null

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  // Mouse event handlers for drag scrolling
  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Scroll to selected thumbnail on index change
  useEffect(() => {
    if (scrollContainerRef.current && images.length > 0) {
      const container = scrollContainerRef.current;
      const thumbnails = container.children;
      if (thumbnails[selectedImageIndex]) {
        const selectedThumb = thumbnails[selectedImageIndex];
        const containerWidth = container.offsetWidth;
        const thumbLeft = selectedThumb.offsetLeft;
        const thumbWidth = selectedThumb.offsetWidth;

        // Center the selected thumbnail
        container.scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
      }
    }
  }, [selectedImageIndex, images.length]);

  // Add null check for bookDataDetails
  if (!bookDataDetails) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden space-y-8 pb-12">
      {/* Property Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {bookDataDetails?.accommodationId?.property_name || "Property Name"}
        </h1>
        <p className="text-gray-600 mb-4">
          {bookDataDetails?.accommodationId?.room_type || "Room Type"}
        </p>
        <div className="lg:flex items-center gap-1">
          <p className="text-gray-500">
            {bookDataDetails?.accommodationId?.location?.address
              ? bookDataDetails?.accommodationId?.location?.address
                  .charAt(0)
                  .toUpperCase() +
                bookDataDetails?.accommodationId?.location?.address.slice(1)
              : "Address"}
            ,
          </p>
          <p className="text-gray-500">
            {bookDataDetails?.accommodationId?.location?.area
              ? bookDataDetails?.accommodationId?.location?.area
                  .charAt(0)
                  .toUpperCase() +
                bookDataDetails?.accommodationId?.location?.area.slice(1)
              : "Area"}
          </p>
        </div>
        <p className="text-gray-500">
          {bookDataDetails?.accommodationId?.location?.city
            ? bookDataDetails?.accommodationId?.location?.city
                .slice(0, 1)
                .toUpperCase() +
              bookDataDetails?.accommodationId?.location?.city.slice(1)
            : "City"}
        </p>

        {/* Main Large Image */}
        <div className="relative">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`${
                bookDataDetails?.accommodationId?.property_name || "Property"
              } - View ${selectedImageIndex + 1}`}
              width={450}
              height={450}
              className="w-full h-80 mt-6 object-cover rounded-lg"
              priority
            />
          ) : (
            <div className="w-full h-80 mt-6 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
          {/* Image counter indicator */}
          {images.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Banner with Drag Scrolling */}
        {images.length > 0 && (
          <section
            ref={scrollContainerRef}
            className="flex items-center gap-4 px-4 mt-4 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((item, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={item}
                  alt={`Thumbnail ${index + 1}`}
                  width={112}
                  height={96}
                  className={`w-28 h-24 object-cover rounded-lg transition-transform ${
                    selectedImageIndex === index
                      ? "scale-105"
                      : "hover:scale-102"
                  }`}
                />
              </button>
            ))}
          </section>
        )}
      </div>

      {/* Verified Property Section */}
      <div className="flex items-center justify-evenly">
        {bookDataDetails?.accommodationId?.amenities?.length > 0 ? (
          bookDataDetails?.accommodationId?.amenities
            ?.slice(0, 3)
            .map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-700">
                  {item.slice(0, 1).toUpperCase() + item.slice(1)}
                </span>
              </div>
            ))
        ) : (
          <p className="text-gray-500">No amenities available</p>
        )}
      </div>

      {/* Timeline by Dash */}
      <div className="relative pl-12 bg-white rounded-2xl shadow-lg p-6">
        {/* Vertical Dotted Line */}
        <div className="absolute left-6 top-0 h-64 mt-9 border-l-2 border-dashed border-gray-400"></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            {/* Dot */}
            <div
              className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full flex items-center justify-center
              ${
                step.completed
                  ? "bg-[#0D0BA8]"
                  : "border-2 border-gray-300 bg-white"
              }`}
            >
              {step.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Text */}
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {step.title}
              </p>
              <p className="text-gray-500 text-sm mt-1">{step.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description & Amenities */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg">
        <h3 className="font-medium mb-3">Description</h3>
        <p className="text-gray-600 mb-6">
          {bookDataDetails?.accommodationId?.property_description ||
            "Experience a comfortable, peaceful stay in the heart of the city. This fully furnished room includes modern interior design, high-speed WiFi, home-style meals, and 24/7 security. Perfect for students and working professionals."}
        </p>

        {bookDataDetails?.accommodationId?.amenities?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bookDataDetails?.accommodationId?.amenities.map(
              (amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-[#0D0BA8] rounded-full mr-2"></span>
                  <span className="text-gray-700">
                    {amenity
                      ? amenity.slice(0, 1).toUpperCase() + amenity.slice(1)
                      : ""}
                  </span>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500">No amenities listed</p>
        )}
      </div>

      <CheckInComponent bookDataDetails={bookDataDetails} />
    </div>
  );
};

export default BookDetail;
