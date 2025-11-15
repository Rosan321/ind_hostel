"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import SwiperButton from "@/lib/utils/swiperButton";
import { useState } from "react";

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
      <div className="mb-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Featured Properties
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Hand-picked Hostels, PGs, and Hotels verified for comfort and safety
        </p>
      </div>

      {/* Filters */}
      <div className="overflow-x-auto mb-8 no-scrollbar">
        <div className="flex gap-4 min-w-max md:justify-center">
          {["all", "budget", "premium", "luxury"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-semibold ${
                activeFilter === filter
                  ? "bg-[#C7D800]"
                  : "border border-gray-300 hover:bg-[#C7D800]"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        // loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
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
        {filtered.map((property) => (
          <SwiperSlide key={property.id}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col h-full my-3">
              {/* Image */}
              <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                <Image
                  src={property.images}
                  width={500}
                  height={500}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-sm text-[#00BFA6]">{property.location}</p>

                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {property.description}
                </p>

                <h4 className="font-semibold mt-3">{property.price}</h4>

                {/* Button */}
                <div className="mt-5">
                  <SwiperButton
                    id={property.id}
                    title="View Details"
                    className="w-full h-11 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center gap-2"
                    showIcon
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-20" />
      </Swiper>

      {/* Custom Pagination BELOW slider */}
      <div className="mt-6 flex justify-center">
        <div className="custom-pagination"></div>
      </div>

      {/* Pagination styling */}
      <style>
        {`
    .custom-pagination {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 8px;
      width: 100%;
    }

    .custom-pagination .swiper-pagination-bullet {
      background: #ccc;
      opacity: 1;
      width: 10px;
      height: 10px;
    }

    .custom-pagination .swiper-pagination-bullet-active {
      background: #C7D800;
      transform: scale(1.3);
    }
  `}
      </style>
    </section>
  );
};

export default FeaturedProperties;
