"use client";

import Image from "next/image";
import Hero from "./stay_by_city/Hero";

export default function WhoWeAre() {
  return (
    <div>
        <Hero />
      <div className="grid md:grid-cols-2 gap-6 items-start bg-gray-50 w-full mx-auto px-4 lg:px-20 py-12">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6">
            Who we are
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            IndHostel started with a simple idea: to make safe, affordable and
            verified shared living options discoverable across India. From
            students looking for monthly PGs to travelers seeking affordable
            hostels, we bring listings, verification and seamless bookings under
            one roof
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We believe good living shouldn’t be expensive. Our mission is to
            enable comfortable, affordable and trusted stays across India —
            whether you need a dorm for a night or a PG for a semester
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 border border-[#00BFA6] rounded-full text-sm text-[#00BFA6] font-medium">
              Verified
            </span>
            <span className="px-4 py-2 border border-[#00BFA6] rounded-full text-sm text-[#00BFA6] font-medium">
              Flexible bookings
            </span>
            <span className="px-4 py-2 border border-[#00BFA6] rounded-full text-sm text-[#00BFA6] font-medium">
              Verified
            </span>
          </div>
        </div>

        {/* RIGHT IMAGES GRID */}
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
          {/* BIG LEFT IMAGE */}
          <div className="relative h-[520px] rounded-3xl overflow-hidden">
            <Image
              src="/images/1.png"
              alt="Bunk Beds"
              fill
              className="object-cover"
            />
          </div>

          {/* COLUMN OF 2 IMAGES RIGHT */}
          <div className="flex flex-col gap-4">
            {/* slightly tall image */}
            <div className="relative h-[325px] rounded-xl overflow-hidden">
              <Image
                src="/images/2.png"
                alt="People"
                fill
                className="object-cover"
              />
            </div>

            {/* smaller one */}
            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src="/images/3.png"
                alt="City"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
