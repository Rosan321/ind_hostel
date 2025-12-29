import React from "react";
import HostelCard from "./StayCard";
import Link from "next/link";
import RevealOnScroll from "./animations/RevealOnScroll";

const SimilarLike = ({ similar }) => {
  // console.log(similar)
  return (
    <div className="mt-6">
      <RevealOnScroll delay={0.2}>
        <section className="flex items-center justify-between">
          <h1 className="text-[#000000] text-2xl lg:text-[40px] font-bold border-b-1 border-[#666666]">
            Similar Stays You Might Like
          </h1>
          {
            similar.length > 0 &&(
            <Link
              href="/data"
              className="bg-[#0D0BA8] hover:bg-[#2A32FF] text-[#FFF] text-sm sm:text-base font-semibold rounded-full px-6 py-3"
            >
              View All
            </Link>
          )}
        </section>
      </RevealOnScroll>
      <RevealOnScroll delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {similar.length > 0 ? (
            similar
              .slice(0, 4)
              .map((hostel) => <HostelCard key={hostel._id} similar={hostel} />)
          ) : (
            <p className="text-xl text-center font-semibold col-span-4">There is no similar data</p>
          )}
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default SimilarLike;
