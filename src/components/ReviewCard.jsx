"use client";

import Image from "next/image";
import { ArrowDownWideNarrow, ArrowRight, Star, ThumbsUp } from "lucide-react";
import React from "react";

const reviews = [
  {
    name: "Priya S.",
    location: "Mumbai",
    date: "Jun 2025",
    rating: 5.0,
    avatar: "/images/pp1.png",
    text: "UrbanNest PG felt like home from day one. Rooms are spotless, WiFi is fast, and the staff is super helpful. Recommended for students!",
    tags: ["Verified stay", "Stayed: 1 week", "Room: Single"],
    helpful: 12,
  },
  {
    name: "Rahul K.",
    location: "Bengaluru",
    date: "Apr 2025",
    rating: 5.0,
    avatar: "/images/pp2.png",
    text: "Great location near metro. Perfect for group study. Little noisy weekends but value for money.",
    tags: ["Verified stay", "Stayed: 1 month", "Shared Room"],
    helpful: 9,
  },
  {
    name: "Ananya M.",
    location: "Pune",
    date: "May 2025",
    rating: 5.0,
    avatar: "/images/pp.png",
    text: "Friendly staff and quick check-in. Security measures made me feel safe. Laundry service saved me time!",
    tags: ["Verified stay", "Stayed: 2 weeks", "OYO Deluxe"],
    helpful: 12,
  },
];

export function ReviewCard() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6 mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#00BFA6]">
          <ArrowRight size={15} />
          <h3 className="text-sm sm:text-base font-semibold tracking-wide">
            REVIEWS
          </h3>
        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base flex-wrap">
          <section className="flex items-center gap-2 font-semibold">
            <p>Sort By</p>
            <ArrowDownWideNarrow size={16} />
          </section>
          <select className="border rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-sm">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
        Guest Reviews (
        {(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)}/5)
      </h2>

      <hr className="text-gray-300" />

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-6 rounded-xl shadow-md border border-gray-100"
          >
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <Image
                  src={review.avatar}
                  width={48}
                  height={48}
                  alt="avatar"
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-[#1A1A1A] text-base sm:text-lg">
                    {review.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-2">
                    <span>{review.location}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{review.date}</span>
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 stroke-yellow-400"
                  />
                ))}
                <span className="text-sm font-medium text-[#1A1A1A] ml-1">
                  ({review.rating})
                </span>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {review.text}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-3">
              {review.tags.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-[#1A1A1A] text-xs sm:text-sm px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Helpful / Report */}
            <div className="flex items-center justify-end gap-2 font-medium text-xs sm:text-sm text-[#0099FF] cursor-pointer mt-3">
              <ThumbsUp size={14} />
              <span>Helpful ({review.helpful})</span> / <span>Report</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
