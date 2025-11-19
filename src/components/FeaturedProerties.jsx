"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import SwiperButton from "@/lib/utils/swiperButton";
import { useState } from "react";
import HoverLift from "./animations/HoverLift";
import ShuffleInOnScroll from "./animations/SuffleInOnScroll";

const FeaturedProperties = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const properties = [
    {
      id: 1,
      name: "Coxy Stay Hostel",
      location: "Mumbai, India",
      price: "₹8,000/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      images: "/images/coxy.png",
    },
    {
      id: 2,
      name: "Green Leaf Hostel",
      location: "Pune, India",
      price: "₹7,500/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      images: "/images/g-leaf.png",
    },
    {
      id: 3,
      name: "Blue Star Hostel",
      location: "Goa, India",
      price: "₹9,000/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "premium",
      images: "/images/g_leaf.png",
    },
    {
      id: 4,
      name: "Ocean View Hostel",
      location: "Hyderabad, India",
      price: "₹8,500/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "premium",
      images: "/images/ocean.png",
    },
    {
      id: 5,
      name: "Mountain View Hostel",
      location: "Bangalore, India",
      price: "₹8,200/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      images: "/images/3.png",
    },
    {
      id: 6,
      name: "City Center Hostel",
      location: "Delhi, India",
      price: "₹9,500/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "premium",
      images: "/images/city.png",
    },
    {
      id: 7,
      name: "Riverside Hostel",
      location: "Chennai, India",
      price: "₹7,800/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "budget",
      images: "/images/goa.png",
    },
    {
      id: 8,
      name: "Luxury Stay Hostel",
      location: "Kolkata, India",
      price: "₹11,000/month",
      description:
        "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
      category: "luxury",
      images: "/images/urban.png",
    },
  ];

  const filtered =
    activeFilter === "all"
      ? properties
      : properties.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-8 lg:px-20">
      {/* Header */}
      <ShuffleInOnScroll delay={0}>
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Hand-picked Hostels, PGs, and Hotels verified for comfort and safety
          </p>
        </div>
      </ShuffleInOnScroll>

      {/* Filters */}
      <ShuffleInOnScroll delay={0.1}>
        <div className="overflow-x-auto mb-8 no-scrollbar">
          <div className="flex gap-4 min-w-max md:justify-center">
            {["all", "budget", "premium", "luxury"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-[#2A32FF] text-[#ffffff]"
                    : "border border-gray-300 hover:bg-[#2A32FF] hover:border-[#2A32FF] hover:text-[#ffffff]"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </ShuffleInOnScroll>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        spaceBetween={25}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          480: { slidesPerView: 1.4 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-6 relative"
      >
        {filtered.map((property, index) => (
          <SwiperSlide key={property.id}>
            <ShuffleInOnScroll delay={index * 0.1}>
              <HoverLift scale={1.03} shadow="0px 12px 28px rgba(0,0,0,0.15)">
                <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={property.images}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">
                      {property.name}
                    </h3>
                    <p className="text-sm text-[#00BFA6] mt-1">
                      {property.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 flex-grow">
                      {property.description}
                    </p>
                    <h4 className="font-semibold mt-3 text-gray-900">
                      {property.price}
                    </h4>
                    <div className="mt-4 pt-2 border-t border-gray-100">
                      <SwiperButton
                        id={property.id}
                        title="View Details"
                        className="w-full h-11 rounded-full bg-white hover:bg-gray-50 border border-gray-200 flex items-center justify-center gap-2 transition-all duration-200 hover:border-gray-300"
                        showIcon
                      />
                    </div>
                  </div>
                </div>
              </HoverLift>
            </ShuffleInOnScroll>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="mt-6 flex justify-center">
        <div className="custom-pagination"></div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
