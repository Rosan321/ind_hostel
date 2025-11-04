"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const CarouselCard = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const touchStart = useRef(null);

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
    setCurrentIndex((prev) => (prev + 1) % item.image.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? item.image.length - 1 : prev - 1));
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

  return (
    <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row gap-4 last:border-b-0">
      <div>
        {/* Carousel */}
        <div
          className="relative w-full sm:w-48 overflow-hidden rounded-lg select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {item.image.map((img, i) => (
              <div className="flex-shrink-0 w-full" key={i}>
                <Image
                  src={img}
                  alt={`${item.title} image ${i + 1}`}
                  width={300}
                  height={200}
                  className="object-cover w-full h-32 sm:h-40 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {item.image.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentIndex === i ? "bg-gray-700 scale-110" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-[#1A1A1A]">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.distance}</p>
        <div className="flex items-center justify-between py-4">
          <h6 className="text-[#00BFA6] font-semibold text-sm">{item.price}</h6>
          <div className="flex items-center gap-1 text-sm">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-[#F1FF51]" /> {item.rating}
            </span>
            <span className="text-[#1A1A1A]">({item.reviews} reviews)</span>
          </div>
        </div>

        <Link href={`/stay/${1}`} className="bg-[#F1FF51] hover:bg-[#dfeb4f] text-[#1A1A1A] font-semibold px-8 py-2 rounded-full self-end">
          Book
        </Link>
      </div>
    </div>
  );
};

export default CarouselCard;
