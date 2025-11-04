"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";

export default function GuestsSay() {
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

  return (
    <section className="w-full py-12 bg-white">
      <div className="px-18 lg:px-34 mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-2">
          What Our Guests Say
        </h2>
        <p className="text-gray-600 mb-10">
          Real stories from students and travelers who found their perfect stay
        </p>

        {/* CARDS SCROLLER */}
        <div className="relative">
          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 px-4 py-4">
            {reviews.map((item, i) => (
              <div
                key={i}
                className="min-w-[300px] md:min-w-[360px] bg-white border border-gray-200 rounded-3xl p-8 snap-center flex flex-col shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <Quote className="text-[#00BFA6] h-6 w-6 scale-x-[-1]" />
                  <div className="flex items-center gap-1 mx-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#00BFA6] text-[#00BFA6]"
                      />
                    ))}
                  </div>
                  <span className="w-6" /> {/* balance */}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {item.text}
                </p>

                <div className="flex items-center justify-center gap-3 mt-auto">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-black text-sm">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">-{item.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* left & right arrows (sticky like screenshot) */}
          <button className="hidden md:block absolute -left-14 top-1/2 -translate-y-1/2 bg-[#00BFA6] text-white p-3 rounded-full">
            <ChevronLeft />
          </button>
          <button className="hidden md:block absolute -right-14 top-1/2 -translate-y-1/2 bg-[#00BFA6] text-white p-3 rounded-full">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
