"use client";

import HostelCard from "@/components/HostelCard";
import Hero from "@/components/stay_by_city/Hero";
import LocationWithExpect from "@/components/stay_by_city/LocationWithExpect";
import Stats from "@/components/stay_by_city/Stats";
import { Tabs } from "@/components/stay_by_city/Tabs";
import React, { useEffect, useState } from "react";

const tabs = [
  { id: 1, label: "Koramangala", count: 320 },
  { id: 2, label: "Indiranagar", count: 210 },
  { id: 3, label: "MG Road", count: 180 },
  { id: 4, label: "Whitefield", count: 150 },
  { id: 5, label: "Electronic City", count: 95 },
  { id: 6, label: "Electronic City", count: 95 },
  { id: 7, label: "Electronic City", count: 95 },
  { id: 8, label: "Electronic City", count: 95 },
];

const StayListing = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [priceFilter, setPriceFilter] = useState("");
  const [stayType, setStayType] = useState("");
  const [loading, setLoading] = useState(true);

  const listings = [
    {
      id: 1,
      title: "Urban Nest Hostel — Single Bed",
      location: "Koramangala, Bengaluru · 1.2 km from metro",
      area: "Koramangala",
      price: 5000,
      rating: 4.6,
      reviews: 128,
      type: "Hostel",
    },
    {
      id: 2,
      title: "Urban Nest PG — Double Sharing",
      location: "Koramangala, Bengaluru · 1.5 km from bus stop",
      area: "Koramangala",
      price: 7000,
      rating: 4.4,
      reviews: 90,
      type: "PG",
    },
    {
      id: 3,
      title: "GreenStay Hostel",
      location: "Indiranagar, Bengaluru · 500m from metro",
      area: "Indiranagar",
      price: 8000,
      rating: 4.7,
      reviews: 150,
      type: "Hostel",
    },
  ];

  // Find the label of the currently active tab
  const activeArea = tabs.find((tab) => tab.id === activeTab)?.label;

  const filteredListings = listings.filter((item) => {
    const matchesArea = item.area === activeArea;
    const matchesPrice = priceFilter ? item.price <= Number(priceFilter) : true;
    const matchesStayType = stayType ? item.type === stayType : true;
    return matchesArea && matchesPrice && matchesStayType;
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-100">
      <Hero />
      <section className="px-4 lg:px-20">
        <Stats />
        <div className="flex items-center gap-10">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            stayType={stayType}
            setStayType={setStayType}
          />
        </div>

        <div className="mt-8 lg:mt-10">
          {/* Section header */}
          <p className="text-sm text-[#00BFA6] font-semibold">
            Featured in Mumbai
          </p>

          <h3 className="text-2xl text-[#1A1A1A] font-bold py-2">
            Top picks this week
          </h3>

          <p className="text-[#666666] text-base mb-8">
            Verified stays with great reviews and exclusive offers
          </p>

          {/* Listings grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <HostelCard key={item.id} {...item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-sm sm:text-base">
                No stays found in {activeArea}.
              </p>
            )}
          </div>
        </div>

        <LocationWithExpect />
      </section>
    </div>
  );
};

export default StayListing;
