"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import RevealOnScroll from "../animations/RevealOnScroll";
import AnimatedCard from "../animations/AnimatedCard";

const CarouselCard = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStart = useRef(null);

  // Get the lowest price from pricing data
  const getLowestPrice = () => {
    if (!item?.pricingdata || !Array.isArray(item.pricingdata)) return "N/A";

    let lowestPrice = Infinity;
    item.pricingdata.forEach((pricing) => {
      if (pricing?.pricing && Array.isArray(pricing.pricing)) {
        pricing.pricing.forEach((priceItem) => {
          if (priceItem.price < lowestPrice) {
            lowestPrice = priceItem.price;
          }
        });
      }
    });

    return lowestPrice !== Infinity
      ? `₹${lowestPrice.toLocaleString()} / month`
      : "N/A";
  };

  // Get distance/area text
  const getLocationText = () => {
    if (!item?.location) return "";

    const { area, city, address } = item.location;
    return `${area}, ${city}`;
  };

  // Get room types available
  const getRoomTypesCount = () => {
    if (!item?.pricingdata || !Array.isArray(item.pricingdata)) return "";
    return `${item.pricingdata.length} room types available`;
  };

  // --- Auto Scroll ---
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleNext = () => {
    const images = item?.images_url || [];
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    const images = item?.images_url || [];
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // --- Touch & Mouse Gestures ---
  const handleTouchStart = (e) => {
    stopAutoSlide();
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    startAutoSlide();
    touchStart.current = null;
  };

  const handleMouseDown = (e) => {
    stopAutoSlide();
    touchStart.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    startAutoSlide();
    touchStart.current = null;
  };

  const images = item?.images_url || [];
  const locationText = getLocationText();
  const priceText = getLowestPrice();
  const roomTypesText = getRoomTypesCount();

  return (
    <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row gap-4 last:border-b-0">
      <AnimatedCard
        delay={0.2}
        className="flex flex-col sm:flex-row gap-4 w-full"
      >
        <div className="flex-shrink-0">
          {/* Carousel */}
          <div
            className="relative w-full sm:w-48 lg:w-32 xl:w-48 h-32 sm:h-40 overflow-hidden rounded-lg select-none"
            onTouchStart={images.length > 1 ? handleTouchStart : undefined}
            onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
            onMouseDown={images.length > 1 ? handleMouseDown : undefined}
            onMouseUp={images.length > 1 ? handleMouseUp : undefined}
          >
            {images.length > 0 ? (
              <>
                <div
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {images.map((img, i) => (
                    <div className="flex-shrink-0 w-full h-full" key={i}>
                      <img
                        src={img}
                        alt={`${item?.property_name || "Property"} image ${
                          i + 1
                        }`}
                        className="object-cover w-full h-full rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows (only show if multiple images) */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full"
                    >
                      ›
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No images</span>
              </div>
            )}
          </div>

          {/* Dots (only show if multiple images) */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === i ? "bg-gray-700 scale-110" : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="font-bold text-[#1A1A1A] text-lg truncate">
            {item?.property_name || "Unnamed Property"}
          </h3>

          {locationText && (
            <p className="text-sm text-gray-500 mt-1 truncate">
              {locationText}
            </p>
          )}

          {roomTypesText && (
            <p className="text-xs text-gray-400 mt-1">{roomTypesText}</p>
          )}

          <div className="flex items-center justify-between py-3 mt-1">
            <div>
              <h6 className="text-[#44475A] font-semibold text-base">
                {priceText}
              </h6>
            </div>

            <div className="flex items-center gap-1">
              {item?.rating !== null && (
                <div className="flex items-center gap-1 text-sm bg-blue-50 px-2 py-1 rounded">
                  <Star size={14} className="text-[#0D0BA8]" fill="#0D0BA8" />
                  <span className="font-semibold">
                    {item?.rating?.toFixed(1)}
                  </span>
                </div>
              )}
              {item?.reviewCount > 0 && (
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  ({item.reviewCount}{" "}
                  {item.reviewCount === 1 ? "review" : "reviews"})
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto pt-2 flex justify-center sm:justify-start ">
            <Link
              href={`/stay?id=${item?._id || "1"}`}
              className="inline-block bg-[#0D0BA8] hover:bg-[#2A32FF] text-white font-semibold text-sm px-6 py-2 rounded-full transition-colors duration-200 text-center w-auto"
            >
              View Details
            </Link>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CarouselCard;
