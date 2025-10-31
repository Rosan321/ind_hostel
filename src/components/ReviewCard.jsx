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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#00BFA6]">
          <ArrowRight size={15} />
          <h3 className="text-sm font-semibold tracking-wide">REVIEWS</h3>
        </div>
        <div className="flex items-center gap-2 text-base">
          <section className="flex items-center gap-2 font-semibold">
            <p>Sort By</p>
            <ArrowDownWideNarrow />
          </section>
          <select className="border rounded-lg px-2 py-2">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[#1A1A1A]">
        Guest Reviews (
        {reviews.reduce((a, r) => a + r.rating, 0) / reviews.length} / 5)
      </h2>

      <hr className="text-gray-300" />

      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={review.avatar}
                width={48}
                height={48}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex-1 flex gap-1">
                <p className="font-bold text-[#1A1A1A] text-xl">
                  {review.name}
                </p>
                —
                <p className="text-xs text-gray-500 flex items-center gap-6">
                  {review.location} <li>{review.date}</li>
                </p>
              </div>

              <div className="flex items-center gap-1 text-[#F1FF51]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-base font-medium text-[#1A1A1A]">
                ({review.rating})
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {review.text}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {review.tags.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-[#1A1A1A] text-xs px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 font-medium text-xs text-[#0099FF] cursor-pointer mt-2">
              <ThumbsUp size={14} /> Helpful ({review.helpful}) / Report
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
