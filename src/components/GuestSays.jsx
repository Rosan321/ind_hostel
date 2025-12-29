"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RevealOnScroll from "./animations/RevealOnScroll";
import AnimatedCard from "./animations/AnimatedCard";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";

export default function GuestsSay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {          // < sm (mobile)
        setSlidesPerView(1);
      } else if (width < 1280) {  // sm → < xl (tablet to desktop)
        setSlidesPerView(2);
      } else {                    // xl and above (large desktop)
        setSlidesPerView(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(reviews.length / slidesPerView);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.REVIEWS.REVIEWS_RANDOM);

      if (res?.data?.success) {
        const formatted = res.data?.data?.map((item) => ({
          text: item.aboutstay,
          name: item.user?.email?.split("@")[0] || "Guest",
          city: "Guest",
          img: item.user?.profileUrl || "/images/pp.png",
          rating: item.rating || 5,
        }));

        setReviews(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideReviews = () => {
    const start = currentIndex * slidesPerView;
    return reviews.slice(start, start + slidesPerView);
  };

  if (reviews.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto px-4 md:px-12 lg:px-32 text-center">
        {/* Header */}
        <RevealOnScroll delay={0}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-2 sm:mb-3">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 max-w-2xl mx-auto">
            Real stories from students and travelers who found their perfect
            stay
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <div className="relative">
            <ShuffleInOnScroll delay={0.6}>
              {/* Updated grid classes: 1 on mobile, 2 from sm to xl, 3 above xl */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 px-2 lg:px-4 h-72">
                {getCurrentSlideReviews().map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AnimatedCard>
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <Quote className="text-[#44475A] h-5 w-5 sm:h-6 sm:w-6 scale-x-[-1]" />

                        <div className="flex items-center gap-1 mx-4">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 sm:h-4 sm:w-4 fill-[#44475A] text-[#44475A]"
                            />
                          ))}
                        </div>

                        <span className="w-5 sm:w-6" />
                      </div>

                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed sm:leading-loose mb-4 sm:mb-6 flex-grow line-clamp-4">
                        {item.text}
                      </p>

                      <div className="flex items-center justify-center gap-3 mt-auto">
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-black text-sm sm:text-base">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">- {item.city}</p>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>
                ))}
              </div>
            </ShuffleInOnScroll>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
              <button
                onClick={prevReview}
                className="bg-[#44475A] text-white p-3 rounded-full shadow-lg hover:bg-gray-600 md:absolute md:-left-4 lg:-left-12 md:top-1/2 md:-translate-y-1/2"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex gap-2 mx-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                      i === currentIndex ? "bg-[#44475A]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                className="bg-[#44475A] text-white p-3 rounded-full shadow-lg hover:bg-gray-600 md:absolute md:-right-4 lg:-right-12 md:top-1/2 md:-translate-y-1/2"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
