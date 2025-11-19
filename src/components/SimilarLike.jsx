import React from "react";
import HostelCard from "./StayCard";
import { hostels } from "@/lib/utils/hotels";
import Link from "next/link";
import RevealOnScroll from "./animations/RevealOnScroll";

const SimilarLike = () => {
  return (
    <div className="mt-6">
      <RevealOnScroll delay={0.2}>
        <section className="flex items-center justify-between">
          <h1 className="text-[#000000] text-2xl lg:text-[40px] font-bold">
            Similar Stays You Might Like
          </h1>
          <Link
            href="/data"
            className="bg-[#0D0BA8] hover:bg-[#2A32FF] text-[#FFF] text-sm sm:text-base font-semibold rounded-full px-6 py-3"
          >
            View All
          </Link>
        </section>
      </RevealOnScroll>
      <RevealOnScroll delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {hostels.slice(0, 4).map((hostel) => (
            <HostelCard key={hostel.id} {...hostel} />
          ))}
        </div>
      </RevealOnScroll>
      {/* <HostelCard title={"Urban Nest Hostel — Single Bed"} location={"Urban Nest Hostel — Single Bed"} rating={"4.2"} price={4999} /> */}
    </div>
  );
};

export default SimilarLike;
