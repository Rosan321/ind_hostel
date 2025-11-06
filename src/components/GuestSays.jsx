"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GuestsSay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const reviews = [
    {
      text: "As a college student, finding a safe and affordable PG was tough — until I used this site. Verified listings made it stress-free!",
      name: "Priya Sharma",
      city: "Pune",
      img: "/images/pp.png",
    },
    {
      text: "Loved the flexibility! I could pay monthly and switch plans anytime. Perfect for my job transfers",
      name: "Rohan Mehta",
      city: "Bangalore",
      img: "/images/pp1.png",
    },
    {
      text: "I booked a hostel for 2 weeks in Delhi — instant confirmation, great price, and super clean rooms!",
      name: "Aditi Verma",
      city: "Delhi",
      img: "/images/pp2.png",
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto px-4 md:px-12 lg:px-32 text-center">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-2 sm:mb-3">
          What Our Guests Say
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 max-w-2xl mx-auto">
          Real stories from students and travelers who found their perfect stay
        </p>

        {/* Single Layout - Cards Container */}
        <div className="relative">
          {/* Cards Grid/Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 px-2 lg:px-4">
            {reviews.map((item, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 ${
                  // On mobile, only show current card, on desktop show all
                  index === currentIndex ? 'block lg:block' : 'hidden lg:block'
                }`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <Quote className="text-[#00BFA6] h-5 w-5 sm:h-6 sm:w-6 scale-x-[-1] flex-shrink-0" />
                  <div className="flex items-center gap-1 mx-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 sm:h-4 sm:w-4 fill-[#00BFA6] text-[#00BFA6]"
                      />
                    ))}
                  </div>
                  <span className="w-5 sm:w-6 flex-shrink-0" />
                </div>

                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed sm:leading-loose mb-4 sm:mb-6 flex-grow">
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
              </div>
            ))}
          </div>

          {/* Navigation - Single set of controls */}
          <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
            {/* Left Arrow - Always visible but positioned differently */}
            <button 
              onClick={prevReview}
              className="bg-[#00BFA6] text-white p-3 rounded-full shadow-lg hover:bg-[#00a38c] transition-colors duration-200 md:absolute md:-left-4 lg:-left-12 md:top-1/2 md:-translate-y-1/2"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2 mx-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                    i === currentIndex ? 'bg-[#00BFA6]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow - Always visible but positioned differently */}
            <button 
              onClick={nextReview}
              className="bg-[#00BFA6] text-white p-3 rounded-full shadow-lg hover:bg-[#00a38c] transition-colors duration-200 md:absolute md:-right-4 lg:-right-12 md:top-1/2 md:-translate-y-1/2"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}