"use client";

import Image from "next/image";

export default function JoinCommunity() {
  return (
    <section className="w-full max-w-5xl mx-auto pt-12 my-12 rounded-3xl bg-[#00BFA6]">
      <div className="flex flex-col items-center justify-center pb-6">
        <h2 className="text-4xl text-white font-semibold mb-3">
          Join Our Growing Community
        </h2>
        <p className="text-base text-white/80">
          Be part of thousands of verified stays, hosts, and happy guests
        </p>
      </div>
      <div className="rounded-4xl px-4 lg:px-20 grid md:grid-cols-2 gap-8 items-center text-white">
        {/* LEFT IMAGE */}
        <div className="relative h-[350px] md:h-[420px] rounded-3xl overflow-hidden">
          <Image
            fill
            src="/images/join.png"
            alt="community"
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h4 className="text-4xl font-bold mb-6">Why Join Us?</h4>

          <ul className="space-y-3 text-white">
            <li className="flex gap-3">
              <span>✔</span> Access verified listings
            </li>
            <li className="flex gap-3">
              <span>✔</span> Flexible stay durations
            </li>
            <li className="flex gap-3">
              <span>✔</span> 24×7 support team
            </li>
            <li className="flex gap-3">
              <span>✔</span> Exclusive member discounts
            </li>
            <li className="flex gap-3">
              <span>✔</span> 12,000+ members already exploring with us!
            </li>
          </ul>

          <button className="mt-10 bg-[#F1FF51] text-black font-semibold px-8 py-4 rounded-full">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
}
