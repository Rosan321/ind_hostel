"use client";

import {
  MapPin,
  Users,
  Briefcase,
  Train,
  Star,
  Search,
  GraduationCap,
  BriefcaseBusiness,
  Backpack,
  CircleSmall,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CarouselCard from "./Carousel"; // your carousel component

const listings = [
  {
    id: 1,
    title: "Campus Corner PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹5,000 / month",
    rating: 4.6,
    reviews: 128,
    image: ["/images/hero.png", "/images/coxy.png", "/images/ocean.png"],
  },
  {
    id: 2,
    title: "Ocean View PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹6,000 / month",
    rating: 4.7,
    reviews: 154,
    image: ["/images/ocean.png", "/images/coxy.png", "/images/hero.png"],
  },
  {
    id: 3,
    title: "Cozy Stay PG",
    distance: "Koramangala • 800 m to X University",
    price: "₹4,800 / month",
    rating: 4.5,
    reviews: 90,
    image: ["/images/coxy.png", "/images/ocean.png", "/images/hero.png"],
  },
];

const LocationWithExpect = () => {
  const [search, setSearch] = useState("");

  const neighborhoods = [
    {
      id: "students",
      title: "Best for Students",
      icon: GraduationCap,
      areas: ["Koramangala", "Indiranagar", "Jayanagar"],
      features: [
        "Close to universities & tuition centers (5–20 min commute)",
        "Affordable shared rooms: ₹3,500–₹6,000 / mo",
        "Lively cafes & co-study spaces",
      ],
      cta: "View student-friendly PGs",
    },
    {
      id: "professionals",
      title: "Best for Professionals",
      icon: BriefcaseBusiness,
      areas: ["MG Road", "CBD", "HSR Layout"],
      features: [
        "Fast commute to major offices (10–30 min)",
        "Private rooms & monthly leases common",
        "Quiet evenings & reliable cab availability",
      ],
      cta: "View monthly PGs & OYO",
    },
    {
      id: "travelers",
      title: "Budget Travelers & Short Stays",
      icon: Backpack,
      areas: ["New bus hubs", "main railway lines"],
      features: [
        "Hostels & dorms from ₹300 / night",
        "Good for short stays & social meetups",
        "Shared kitchens & events",
      ],
      cta: "View hostels & nightly stays",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="w-full mx-auto px-4 py-10 space-y-4">
      <div className="py-12 space-y-8">
        {/* Heading + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Find Stays In Mumbai
          </h2>

          <div className="relative w-full md:w-[520px]">
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search neighborhood"
              className="w-full border rounded-full py-2 pl-10 pr-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Main Split Section (2/3 : 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Map (2/3 width) */}
          <div className="lg:col-span-2 w-full h-full overflow-hidden rounded-2xl">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30456.667134248048!2d78.463169!3d17.4077852!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1761975563874!5m2!1sen!2sin"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right: Carousel Listings (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col gap-6 w-full border border-gray-300 p-4 rounded-2xl">
            {listings.map((item) => (
              <CarouselCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Local Guide Section */}
      <div>
        {/* Header */}
        <p className="text-sm font-semibold text-[#00BFA6]">Local Guide</p>
        <h2 className="text-[#1A1A1A] text-4xl font-bold my-2">
          Neighborhoods & Safety — What to expect
        </h2>

        <p className="text-[#666666] mb-6 text-base">
          Short local tips to help students, professionals & travelers pick the
          best spot
        </p>

        {/* Neighborhood Cards */}
        <div className="grid grid-cols-3 gap-6">
          {neighborhoods.map((neighborhood) => (
            <div
              key={neighborhood.id}
              className={`border border-gray-300 rounded-3xl p-4 flex gap-4 bg-white`}
            >
              <neighborhood.icon
                className={`h-10 w-10 bg-gray-200 p-2 rounded-full text-[#00BFA6] bg-[#00BFA6]`}
              />
              <div className="flex flex-col items-start justify-between gap-2 mb-3">
                <h3 className="font-bold text-xl text-[#1A1A1A]">
                  {neighborhood.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {neighborhood.areas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white rounded-full text-xs text-[#666666] font-medium border border-gray-300"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1 mb-3">
                  {neighborhood.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-[#666666]"
                    >
                      <span className="h-2 w-2 text-[#00BFA6] bg-[#00BFA6] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="text-base font-semibold text-[#1A1A1A] bg-[#F1FF51] px-6 py-3 rounded-full cursor-pointer">
                  {neighborhood.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationWithExpect;
